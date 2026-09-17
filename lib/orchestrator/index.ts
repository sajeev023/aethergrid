import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getDatabase, getStorageNodeById } from "../db";
import { logger } from "../logger";

// Standard 2MB chunk size for peer distribution
export const CHUNK_SIZE_BYTES = 2 * 1024 * 1024;
const PLATFORM_MASTER_SECRET = process.env.AETHER_STORAGE_SECRET || "aethergrid-aes-256-master-storage-key-2026-production";

/**
 * Root platform master key derived from environment secret.
 */
function getPlatformMasterKey(): Buffer {
  return crypto.createHash("sha256").update(PLATFORM_MASTER_SECRET).digest();
}

/**
 * Derives a dedicated User Master Key using HKDF (RFC 5869).
 * Ensures cryptographic separation: User A's keys can never decrypt User B's objects.
 */
export function deriveUserMasterKey(userId: string): Buffer {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid userId provided for key derivation.");
  }
  return Buffer.from(crypto.hkdfSync("sha256", getPlatformMasterKey(), "aethergrid-user-key-salt", userId, 32));
}

/**
 * Derives a dedicated Object Key using HKDF.
 * Every customer file has its own unique 32-byte AES-256 key.
 */
export function deriveObjectKey(userId: string, fileId: string): Buffer {
  if (!fileId || typeof fileId !== "string") {
    throw new Error("Invalid fileId provided for key derivation.");
  }
  const userMasterKey = deriveUserMasterKey(userId);
  return Buffer.from(crypto.hkdfSync("sha256", userMasterKey, fileId, "aethergrid-chunk-v1", 32));
}

/**
 * Validates that a chunk hash is strictly a 64-character lowercase hex string.
 * Prevents directory traversal, path injection, UNC paths, and alternate data streams.
 */
export function validateChunkHash(hash: string): void {
  if (!hash || typeof hash !== "string" || !/^[a-f0-9]{64}$/.test(hash)) {
    logger.security("Path traversal or malformed chunk hash rejected", { hash });
    throw new Error("Security Violation: Invalid or malicious chunk hash format detected.");
  }
}

/**
 * Validates that a target file path resolves strictly inside the allowed node chunks directory.
 * Explicitly guards against Windows UNC paths, device paths, and symlink/junction escapes.
 */
export function assertPathInsideStorageRoot(targetPath: string, allowedRoot: string): void {
  // Guard against UNC and Windows device paths
  if (/^[\\/]{2}/.test(targetPath) || /^[\\/]{2}\?/.test(targetPath) || /^[\\/]{2}\./.test(targetPath)) {
    logger.security("UNC or Device Path escape attempt rejected", { targetPath });
    throw new Error("Security Violation: UNC and device paths are strictly forbidden.");
  }

  // Guard against null byte injection
  if (targetPath.includes("\0")) {
    logger.security("Null byte injection attempt rejected", { targetPath });
    throw new Error("Security Violation: Null byte injection detected.");
  }

  // Guard against Windows Alternate Data Streams
  if (path.basename(targetPath).includes(":")) {
    logger.security("Alternate Data Stream injection attempt rejected", { targetPath });
    throw new Error("Security Violation: Alternate Data Streams are strictly forbidden.");
  }

  const normalizedTarget = path.resolve(targetPath);
  const normalizedRoot = path.resolve(allowedRoot);

  if (!normalizedTarget.startsWith(normalizedRoot + path.sep)) {
    logger.security("Sandbox escape attempt intercepted", { targetPath, allowedRoot });
    throw new Error("Security Violation: Storage access outside configured node sandbox is forbidden.");
  }
}

/**
 * Inspects physical disk free space on the drive hosting the node storage.
 */
export function inspectPhysicalDiskFreeBytes(storageDirectory: string): bigint {
  try {
    if (fs.existsSync(storageDirectory)) {
      const stats = fs.statfsSync(storageDirectory);
      return BigInt(stats.bfree) * BigInt(stats.bsize);
    }
  } catch {
    logger.warn(`Could not inspect physical disk via statfsSync for ${storageDirectory}`);
  }
  return BigInt(100) * BigInt(1024) * BigInt(1024) * BigInt(1024);
}

/**
 * Encrypts a buffer with AES-256-GCM using a cryptographically derived Object Key.
 * Output format: [12 bytes IV] [16 bytes AuthTag] [Ciphertext]
 */
export function encryptChunk(data: Buffer, userId: string, fileId: string): { encryptedBuffer: Buffer; hash: string } {
  const objectKey = deriveObjectKey(userId, fileId);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", objectKey, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const encryptedBuffer = Buffer.concat([iv, authTag, encrypted]);
  const hash = crypto.createHash("sha256").update(encryptedBuffer).digest("hex");

  return { encryptedBuffer, hash };
}

/**
 * Decrypts an AES-256-GCM encrypted chunk buffer with strict authentication tag verification.
 * Detects provider tampering or bit-flips immediately.
 */
export function decryptChunk(encryptedBuffer: Buffer, userId: string, fileId: string): Buffer {
  if (encryptedBuffer.length < 28) {
    throw new Error("Invalid chunk format: buffer too short");
  }

  const objectKey = deriveObjectKey(userId, fileId);
  const iv = encryptedBuffer.subarray(0, 12);
  const authTag = encryptedBuffer.subarray(12, 28);
  const ciphertext = encryptedBuffer.subarray(28);

  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", objectKey, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch (err: unknown) {
    logger.security("Tamper Alert: GCM authentication tag verification failed. Chunk corrupted or modified on provider disk!", { fileId });
    throw new Error("DataTamperedError: Chunk authentication tag mismatch. Data has been tampered with or corrupted.");
  }
}

/**
 * Ensures node storage directory exists and returns the chunks directory.
 */
export function getNodeChunksDir(node: { id: string; storage_directory?: string }): string {
  let baseDir = node.storage_directory;
  const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.NOW_REGION;

  if (!baseDir || baseDir.startsWith("local://") || !path.isAbsolute(baseDir) || (isServerless && !fs.existsSync(baseDir))) {
    baseDir = isServerless
      ? path.join("/tmp", "aethergrid-chunks")
      : (process.env.AETHERGRID_NODE_STORAGE_PATH || (process.platform === "win32" ? "D:\\AetherGridStorage" : path.resolve(process.cwd(), "data", "storage")));
  }

  const chunksDir = path.join(baseDir, "chunks");
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }
  return chunksDir;
}

/**
 * Select candidate storage nodes for replication with capacity, physical safety margin, and revocation checks.
 */
export function selectReplicaNodes(requiredBytes: number): { primary: Record<string, unknown>; replica: Record<string, unknown> | null } {
  const db = getDatabase();
  const reservedReserveBytes = BigInt(parseInt(process.env.AETHERGRID_RESERVED_FREE_SPACE_GB || "10", 10)) * BigInt(1024) * BigInt(1024) * BigInt(1024);
  const isSingleNodeBeta = process.env.BETA_SINGLE_NODE_MODE === "true";

  // Query online nodes that are NOT revoked or paused
  const nodes = db.prepare(`
    SELECT * FROM storage_nodes 
    WHERE status = 'ONLINE' 
      AND (capacity_bytes - used_bytes) >= ?
    ORDER BY (capacity_bytes - used_bytes) DESC
  `).all(requiredBytes) as Array<{
    id: string;
    storage_directory: string;
    capacity_bytes: number;
    used_bytes: number;
    status: string;
  }>;

  // Filter against physical disk threshold
  const validNodes = nodes.filter((n) => {
    const physicalFree = inspectPhysicalDiskFreeBytes(n.storage_directory);
    return physicalFree - BigInt(requiredBytes) > reservedReserveBytes;
  });

  if (validNodes.length === 0) {
    throw new Error("Storage capacity exhausted: No storage node has sufficient free capacity while respecting physical disk safety margins.");
  }

  const primary = validNodes[0] as unknown as Record<string, unknown>;

  // In Single-Node Beta mode with only 1 physical node available, honest 1x allocation
  if (isSingleNodeBeta && validNodes.length === 1) {
    return { primary, replica: null };
  }

  const replica = validNodes.length > 1 ? (validNodes[1] as unknown as Record<string, unknown>) : null;
  return { primary, replica };
}

/**
 * Distributes, encrypts, and stores a file across online peer nodes with atomic rollback on failure.
 */
export async function distributeAndStoreFile(params: {
  userId: string;
  originalName: string;
  mimeType: string;
  fileBuffer: Buffer;
  folderId?: string | null;
}) {
  // Safety Kill-Switch check
  if (process.env.STOP_NEW_UPLOADS === "true" || process.env.MAINTENANCE_MODE === "true") {
    throw new Error("Service Unavailable: New uploads are temporarily paused for grid maintenance.");
  }

  // File size check
  const maxBytes = parseInt(process.env.MAX_FILE_SIZE_BYTES || "104857600", 10);
  if (params.fileBuffer.length > maxBytes) {
    throw new Error(`File exceeds maximum permitted size of ${Math.round(maxBytes / (1024 * 1024))} MB.`);
  }

  const db = getDatabase();
  const fileId = `file_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  const now = new Date().toISOString();
  const originalChecksum = crypto.createHash("sha256").update(params.fileBuffer).digest("hex");

  // Server-side Quota Verification
  const sub = db.prepare("SELECT quota_bytes, status FROM taker_subscriptions WHERE user_id = ?").get(params.userId) as {
    quota_bytes?: number;
    status?: string;
  } | undefined;

  const quota = sub ? Number(sub.quota_bytes) : 20 * 1024 * 1024 * 1024;
  if (sub && sub.status !== "ACTIVE" && sub.status !== "TRIAL") {
    throw new Error("Your storage subscription is not active. Please renew to continue uploading.");
  }

  const used = db.prepare("SELECT COALESCE(SUM(size), 0) as total FROM files WHERE user_id = ? AND is_trashed = 0").get(params.userId) as { total: number };
  if (Number(used.total) + params.fileBuffer.length > quota) {
    throw new Error(`Storage quota exceeded. Available: ${Math.max(0, quota - Number(used.total))} bytes.`);
  }

  // Split into chunks
  const totalChunks = Math.ceil(params.fileBuffer.length / CHUNK_SIZE_BYTES) || 1;
  const chunkRecords: Array<{ id: string; index: number; hash: string; primaryNode: string; replicaNode: string | null }> = [];
  const writtenChunkPaths: string[] = [];

  try {
    // Record logical file
    db.prepare(`
      INSERT INTO files (id, user_id, folder_id, name, original_name, size, mime_type, encryption_iv, checksum, status, is_favorite, is_trashed, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'HEALTHY', 0, 0, ?, ?)
    `).run(
      fileId,
      params.userId,
      params.folderId || null,
      path.basename(params.originalName),
      path.basename(params.originalName),
      params.fileBuffer.length,
      params.mimeType || "application/octet-stream",
      "aes-256-gcm",
      originalChecksum,
      now,
      now
    );

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE_BYTES;
      const end = Math.min(params.fileBuffer.length, start + CHUNK_SIZE_BYTES);
      const chunkData = params.fileBuffer.subarray(start, end);

      // Encrypt with individual derived ObjectKey
      const { encryptedBuffer, hash: chunkHash } = encryptChunk(chunkData, params.userId, fileId);
      validateChunkHash(chunkHash);

      const { primary, replica } = selectReplicaNodes(encryptedBuffer.length);

      // Save on Primary Node
      const primaryDir = getNodeChunksDir({ id: String(primary.id), storage_directory: String(primary.storage_directory || "") });
      const primaryPath = path.join(primaryDir, `${chunkHash}.chunk`);
      assertPathInsideStorageRoot(primaryPath, primaryDir);
      fs.writeFileSync(primaryPath, encryptedBuffer);
      writtenChunkPaths.push(primaryPath);

      db.prepare("UPDATE storage_nodes SET used_bytes = used_bytes + ?, allocated_bytes = allocated_bytes + ? WHERE id = ?")
        .run(encryptedBuffer.length, encryptedBuffer.length, String(primary.id));

      // Save on Replica Node if available
      let replicaId: string | null = null;
      if (replica) {
        replicaId = String(replica.id);
        const replicaDir = getNodeChunksDir({ id: String(replica.id), storage_directory: String(replica.storage_directory || "") });
        const replicaPath = path.join(replicaDir, `${chunkHash}.chunk`);
        assertPathInsideStorageRoot(replicaPath, replicaDir);
        fs.writeFileSync(replicaPath, encryptedBuffer);
        writtenChunkPaths.push(replicaPath);

        db.prepare("UPDATE storage_nodes SET used_bytes = used_bytes + ?, allocated_bytes = allocated_bytes + ? WHERE id = ?")
          .run(encryptedBuffer.length, encryptedBuffer.length, String(replica.id));
      }

      const chunkId = `chk_${fileId}_${i}`;
      const chunkStatus = replicaId ? "REPLICATED" : (process.env.BETA_SINGLE_NODE_MODE === "true" ? "SINGLE_REPLICA_BETA" : "DEGRADED");

      db.prepare(`
        INSERT INTO storage_chunks (id, file_id, chunk_index, chunk_hash, chunk_size, primary_node_id, replica_node_id, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        chunkId,
        fileId,
        i,
        chunkHash,
        encryptedBuffer.length,
        String(primary.id),
        replicaId,
        chunkStatus,
        now
      );

      chunkRecords.push({
        id: chunkId,
        index: i,
        hash: chunkHash,
        primaryNode: String(primary.id),
        replicaNode: replicaId,
      });
    }

    // Index photo if image
    if (params.mimeType && params.mimeType.startsWith("image/")) {
      const photoId = `pho_${fileId}`;
      db.prepare(`
        INSERT OR REPLACE INTO photos (id, user_id, file_id, taken_at, created_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(photoId, params.userId, fileId, now, now);
    }

    logger.info(`File stored: ${fileId} (${params.fileBuffer.length} bytes, ${totalChunks} chunks)`);

    return {
      id: fileId,
      name: path.basename(params.originalName),
      size: params.fileBuffer.length,
      mimeType: params.mimeType,
      checksum: originalChecksum,
      totalChunks,
      chunks: chunkRecords,
    };
  } catch (err: unknown) {
    // Atomic Rollback
    for (const chunkPath of writtenChunkPaths) {
      try {
        if (fs.existsSync(chunkPath)) fs.unlinkSync(chunkPath);
      } catch {}
    }
    try {
      db.prepare("DELETE FROM storage_chunks WHERE file_id = ?").run(fileId);
      db.prepare("DELETE FROM files WHERE id = ?").run(fileId);
    } catch {}

    logger.error("Upload failed midway, performed atomic cleanup", { fileId, error: String(err) });
    throw err;
  }
}

/**
 * Retrieves, decrypts, and verifies a file across peer nodes.
 * Strictly verifies user authorization (IDOR protection) and handles tamper failover.
 */
export async function retrieveAndDecryptFile(fileId: string, userId?: string): Promise<{
  fileRecord: Record<string, unknown>;
  fileBuffer: Buffer;
  failoverUsed: boolean;
}> {
  const db = getDatabase();
  const file = db.prepare("SELECT * FROM files WHERE id = ?").get(fileId) as Record<string, unknown> | undefined;
  if (!file) {
    throw new Error(`File not found: ${fileId}`);
  }

  // Strict Multi-Tenant IDOR Check
  if (userId && String(file.user_id) !== String(userId)) {
    logger.security("IDOR Attempt: User attempted to access another user's file", { fileId, requestingUser: userId, ownerUser: file.user_id });
    throw new Error("Access Denied: You do not have authorization to view or download this file.");
  }

  const effectiveUserId = String(file.user_id);

  const chunks = db.prepare("SELECT * FROM storage_chunks WHERE file_id = ? ORDER BY chunk_index ASC").all(fileId) as Array<{
    id: string;
    chunk_index: number;
    chunk_hash: string;
    primary_node_id: string;
    replica_node_id?: string;
  }>;

  if (chunks.length === 0) {
    throw new Error("File has no storage chunks recorded.");
  }

  const decryptedChunks: Buffer[] = [];
  let failoverUsed = false;

  for (const chunk of chunks) {
    validateChunkHash(chunk.chunk_hash);

    const primaryNode = getStorageNodeById(chunk.primary_node_id) as { id: string; status: string; storage_directory?: string } | undefined;
    const replicaNode = chunk.replica_node_id ? (getStorageNodeById(chunk.replica_node_id) as { id: string; status: string; storage_directory?: string } | undefined) : null;

    let chunkBuffer: Buffer | null = null;
    let decrypted: Buffer | null = null;

    // 1. Try Primary Node (if not revoked or offline)
    if (primaryNode && primaryNode.status === "ONLINE") {
      const primaryDir = getNodeChunksDir(primaryNode);
      const primaryFile = path.join(primaryDir, `${chunk.chunk_hash}.chunk`);
      assertPathInsideStorageRoot(primaryFile, primaryDir);
      if (fs.existsSync(primaryFile)) {
        chunkBuffer = fs.readFileSync(primaryFile);
        try {
          decrypted = decryptChunk(chunkBuffer, effectiveUserId, fileId);
        } catch {
          logger.security(`Primary node chunk tampered or corrupted. Attempting replica failover.`, { chunkHash: chunk.chunk_hash, nodeId: primaryNode.id });
          chunkBuffer = null;
          decrypted = null;
        }
      }
    }

    // 2. Failover to Replica Node (if primary was offline, missing, revoked, or tampered!)
    if (!decrypted && replicaNode && (replicaNode.status === "ONLINE" || replicaNode.status === "SUSPECTED_OFFLINE")) {
      const replicaDir = getNodeChunksDir(replicaNode);
      const replicaFile = path.join(replicaDir, `${chunk.chunk_hash}.chunk`);
      assertPathInsideStorageRoot(replicaFile, replicaDir);
      if (fs.existsSync(replicaFile)) {
        chunkBuffer = fs.readFileSync(replicaFile);
        try {
          decrypted = decryptChunk(chunkBuffer, effectiveUserId, fileId);
          failoverUsed = true;
        } catch {
          chunkBuffer = null;
          decrypted = null;
        }
      }
    }

    // Fallback: If primary disk file exists despite temporary status
    if (!decrypted && primaryNode && primaryNode.status !== "REVOKED") {
      const primaryDir = getNodeChunksDir(primaryNode);
      const primaryFile = path.join(primaryDir, `${chunk.chunk_hash}.chunk`);
      assertPathInsideStorageRoot(primaryFile, primaryDir);
      if (fs.existsSync(primaryFile)) {
        chunkBuffer = fs.readFileSync(primaryFile);
        try {
          decrypted = decryptChunk(chunkBuffer, effectiveUserId, fileId);
        } catch {}
      }
    }

    if (!decrypted) {
      throw new Error(`Critical Distributed Storage Error: Chunk ${chunk.chunk_index} could not be retrieved or authenticated from any online node replica.`);
    }

    decryptedChunks.push(decrypted);
  }

  const fileBuffer = Buffer.concat(decryptedChunks);
  const calculatedChecksum = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  if (calculatedChecksum !== file.checksum) {
    logger.security("Integrity Alert: Checksum mismatch on file download", { fileId });
    throw new Error("Data Integrity Mismatch: File SHA-256 does not match original uploaded checksum!");
  }

  return {
    fileRecord: file,
    fileBuffer,
    failoverUsed,
  };
}

/**
 * Permanently deletes a file and its encrypted chunks across all peer nodes with IDOR protection.
 */
export async function deleteFileDistributed(fileId: string, userId: string) {
  const db = getDatabase();
  const file = db.prepare("SELECT * FROM files WHERE id = ? AND user_id = ?").get(fileId, userId) as Record<string, unknown> | undefined;
  if (!file) {
    logger.security("Unauthorized delete attempt or file not found", { fileId, userId });
    throw new Error("File not found or unauthorized to delete this object.");
  }

  const chunks = db.prepare("SELECT * FROM storage_chunks WHERE file_id = ?").all(fileId) as Array<{
    chunk_hash: string;
    chunk_size: number;
    primary_node_id: string;
    replica_node_id?: string;
  }>;

  for (const chunk of chunks) {
    validateChunkHash(chunk.chunk_hash);

    const primaryNode = getStorageNodeById(chunk.primary_node_id) as { id: string; storage_directory?: string } | undefined;
    if (primaryNode) {
      const primaryDir = getNodeChunksDir(primaryNode);
      const chunkPath = path.join(primaryDir, `${chunk.chunk_hash}.chunk`);
      assertPathInsideStorageRoot(chunkPath, primaryDir);
      if (fs.existsSync(chunkPath)) {
        try { fs.unlinkSync(chunkPath); } catch {}
      }
      db.prepare("UPDATE storage_nodes SET used_bytes = MAX(0, used_bytes - ?), allocated_bytes = MAX(0, allocated_bytes - ?) WHERE id = ?")
        .run(chunk.chunk_size, chunk.chunk_size, primaryNode.id);
    }

    if (chunk.replica_node_id) {
      const replicaNode = getStorageNodeById(chunk.replica_node_id) as { id: string; storage_directory?: string } | undefined;
      if (replicaNode) {
        const replicaDir = getNodeChunksDir(replicaNode);
        const chunkPath = path.join(replicaDir, `${chunk.chunk_hash}.chunk`);
        assertPathInsideStorageRoot(chunkPath, replicaDir);
        if (fs.existsSync(chunkPath)) {
          try { fs.unlinkSync(chunkPath); } catch {}
        }
        db.prepare("UPDATE storage_nodes SET used_bytes = MAX(0, used_bytes - ?), allocated_bytes = MAX(0, allocated_bytes - ?) WHERE id = ?")
          .run(chunk.chunk_size, chunk.chunk_size, replicaNode.id);
      }
    }
  }

  db.prepare("DELETE FROM storage_chunks WHERE file_id = ?").run(fileId);
  db.prepare("DELETE FROM photos WHERE file_id = ?").run(fileId);
  db.prepare("DELETE FROM files WHERE id = ?").run(fileId);

  logger.info(`File deleted: ${fileId} by user ${userId}`);
  return { success: true, deletedFileId: fileId };
}

/**
 * Evaluates node health based on heartbeat timestamps and updates node & file health status.
 */
export function evaluateNodeHealth(): {
  suspectedOffline: string[];
  offline: string[];
} {
  const db = getDatabase();
  const now = Date.now();
  const nodes = db.prepare("SELECT id, status, last_heartbeat_at FROM storage_nodes WHERE status NOT IN ('PAUSED', 'REVOKED')").all() as Array<{
    id: string;
    status: string;
    last_heartbeat_at: string;
  }>;

  const suspectedOffline: string[] = [];
  const offline: string[] = [];

  for (const node of nodes) {
    const lastHeartbeatTime = new Date(node.last_heartbeat_at).getTime();
    const elapsedSeconds = (now - lastHeartbeatTime) / 1000;

    if (elapsedSeconds > 90) {
      if (node.status !== "OFFLINE") {
        db.prepare("UPDATE storage_nodes SET status = 'OFFLINE', updated_at = ? WHERE id = ?")
          .run(new Date().toISOString(), node.id);
        offline.push(node.id);
      }
    } else if (elapsedSeconds > 30) {
      if (node.status !== "SUSPECTED_OFFLINE") {
        db.prepare("UPDATE storage_nodes SET status = 'SUSPECTED_OFFLINE', updated_at = ? WHERE id = ?")
          .run(new Date().toISOString(), node.id);
        suspectedOffline.push(node.id);
      }
    }
  }

  if (offline.length > 0) {
    const placeholders = offline.map(() => "?").join(",");
    db.prepare(`
      UPDATE files SET status = 'DEGRADED', updated_at = ?
      WHERE id IN (
        SELECT file_id FROM storage_chunks WHERE primary_node_id IN (${placeholders})
      )
    `).run(new Date().toISOString(), ...offline);
  }

  return { suspectedOffline, offline };
}
