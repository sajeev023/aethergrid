/**
 * 🛡️ AETHERGRID ZERO-TRUST COMPREHENSIVE SECURITY TEST SUITE
 * 
 * Validates all 10 Non-Negotiable Security Principles:
 * - Multi-tenant IDOR defense
 * - AES-256-GCM encryption & HKDF key hierarchy separation
 * - GCM authentication tag verification & tamper failover
 * - Windows filesystem sandbox jail & traversal guards
 * - Ephemeral signed download tokens & expiration
 * - Node credential authentication & instant revocation
 * - Privacy boundaries & metadata leakage prevention
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getDatabase, createUser, findUserByEmail, registerStorageNode, revokeStorageNode, getStorageNodesByOwner, getStorageNodeById } from "../lib/db.ts";
import { 
  distributeAndStoreFile, 
  retrieveAndDecryptFile, 
  deleteFileDistributed,
  deriveUserMasterKey,
  deriveObjectKey,
  encryptChunk,
  decryptChunk,
  validateChunkHash,
  assertPathInsideStorageRoot,
  selectReplicaNodes,
  getNodeChunksDir
} from "../lib/orchestrator/index.ts";
import { createDownloadToken, verifyDownloadToken } from "../lib/auth.ts";
import { checkRateLimit } from "../lib/rate-limit.ts";

const ANSI_GREEN = "\x1b[32m";
const ANSI_RED = "\x1b[31m";
const ANSI_BLUE = "\x1b[34m";
const ANSI_YELLOW = "\x1b[33m";
const ANSI_RESET = "\x1b[0m";

function logPass(title) {
  console.log(`${ANSI_GREEN}  [PASS] ${title}${ANSI_RESET}`);
}

function logFail(title, error) {
  console.error(`${ANSI_RED}  [FAIL] ${title}${ANSI_RESET}`);
  console.error(error);
}

function logSection(title) {
  console.log(`\n${ANSI_BLUE}══════════════════════════════════════════════════════════════${ANSI_RESET}`);
  console.log(`${ANSI_YELLOW}${title}${ANSI_RESET}`);
  console.log(`${ANSI_BLUE}══════════════════════════════════════════════════════════════${ANSI_RESET}`);
}

async function runZeroTrustSecuritySuite() {
  console.log(`${ANSI_BLUE}🛡️ Starting AetherGrid Zero-Trust Security Verification Suite...${ANSI_RESET}\n`);

  let totalTests = 0;
  let passedTests = 0;

  function recordResult(name, fn) {
    totalTests++;
    try {
      fn();
      logPass(name);
      passedTests++;
    } catch (err) {
      logFail(name, err);
    }
  }

  async function recordResultAsync(name, fn) {
    totalTests++;
    try {
      await fn();
      logPass(name);
      passedTests++;
    } catch (err) {
      logFail(name, err);
    }
  }

  // Set environment for test isolation
  process.env.AETHER_JWT_SECRET = "test-jwt-secret-key-32-chars-minimum-length!";
  process.env.AETHER_STORAGE_SECRET = "test-master-storage-secret-key-2026-production";
  process.env.BETA_SINGLE_NODE_MODE = "false"; // Test multi-node replica behavior

  const db = getDatabase();
  const testRunId = Date.now();

  // Provision Test Users: Taker A and Taker B
  const takerAId = `usr_taker_a_${testRunId}`;
  const takerBId = `usr_taker_b_${testRunId}`;
  const giverAId = `usr_giver_a_${testRunId}`;
  const giverBId = `usr_giver_b_${testRunId}`;

  createUser({ id: takerAId, email: `takera_${testRunId}@aethergrid.io`, passwordHash: "hash_a", name: "Taker A", roles: "TAKER" });
  createUser({ id: takerBId, email: `takerb_${testRunId}@aethergrid.io`, passwordHash: "hash_b", name: "Taker B", roles: "TAKER" });
  createUser({ id: giverAId, email: `givera_${testRunId}@aethergrid.io`, passwordHash: "hash_ga", name: "Giver A", roles: "GIVER" });
  createUser({ id: giverBId, email: `giverb_${testRunId}@aethergrid.io`, passwordHash: "hash_gb", name: "Giver B", roles: "GIVER" });

  // Provision two test storage nodes with generous capacity so they rank highest
  const nodeStorageA = path.resolve(process.cwd(), `data/test_node_a_${testRunId}`);
  const nodeStorageB = path.resolve(process.cwd(), `data/test_node_b_${testRunId}`);
  fs.mkdirSync(path.join(nodeStorageA, "chunks"), { recursive: true });
  fs.mkdirSync(path.join(nodeStorageB, "chunks"), { recursive: true });

  const rawTokenA = `aeth_test_token_a_${testRunId}`;
  const rawTokenB = `aeth_test_token_b_${testRunId}`;
  const tokenHashA = crypto.createHash("sha256").update(rawTokenA).digest("hex");
  const tokenHashB = crypto.createHash("sha256").update(rawTokenB).digest("hex");

  const testNodeA = registerStorageNode({
    id: `node_test_a_${testRunId}`,
    ownerId: giverAId,
    nodeName: "Node Alpha (Test)",
    nodeTokenHash: tokenHashA,
    capacityBytes: BigInt(200) * BigInt(1024 * 1024 * 1024),
    storageDirectory: nodeStorageA,
  });

  const testNodeB = registerStorageNode({
    id: `node_test_b_${testRunId}`,
    ownerId: giverBId,
    nodeName: "Node Beta (Test)",
    nodeTokenHash: tokenHashB,
    capacityBytes: BigInt(150) * BigInt(1024 * 1024 * 1024),
    storageDirectory: nodeStorageB,
  });

  // Update taker subscriptions to 100 GB
  db.prepare(`
    UPDATE taker_subscriptions 
    SET quota_bytes = ?, status = 'ACTIVE' 
    WHERE user_id = ?
  `).run(100 * 1024 * 1024 * 1024, takerAId);

  db.prepare(`
    UPDATE taker_subscriptions 
    SET quota_bytes = ?, status = 'ACTIVE' 
    WHERE user_id = ?
  `).run(100 * 1024 * 1024 * 1024, takerBId);

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 1: CRYPTOGRAPHIC HIERARCHY & ENCRYPTION ISOLATION
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 1: Cryptographic Hierarchy & Encryption Isolation");

  recordResult("1.1 User Master Keys are mathematically separated by HKDF", () => {
    const keyA = deriveUserMasterKey(takerAId);
    const keyB = deriveUserMasterKey(takerBId);
    if (!Buffer.isBuffer(keyA) || keyA.length !== 32) throw new Error("Key A invalid length");
    if (!Buffer.isBuffer(keyB) || keyB.length !== 32) throw new Error("Key B invalid length");
    if (keyA.equals(keyB)) throw new Error("Cryptographic separation failed: User A and User B have identical keys!");
  });

  recordResult("1.2 Object Keys are uniquely derived per file ID", () => {
    const objKey1 = deriveObjectKey(takerAId, "file_001");
    const objKey2 = deriveObjectKey(takerAId, "file_002");
    if (objKey1.equals(objKey2)) throw new Error("Object keys collided for distinct files of same user!");
  });

  recordResult("1.3 Cross-User Decryption Attempt Fails (User B cannot decrypt User A chunk)", () => {
    const plaintext = Buffer.from("Highly classified financial ledger for Taker A");
    const { encryptedBuffer } = encryptChunk(plaintext, takerAId, "file_secret_001");
    
    // Attempt decrypting with Taker B's credentials
    let decryptionFailed = false;
    try {
      decryptChunk(encryptedBuffer, takerBId, "file_secret_001");
    } catch {
      decryptionFailed = true;
    }
    if (!decryptionFailed) {
      throw new Error("Security Critical: Taker B was able to decrypt Taker A's encrypted chunk!");
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 2: MULTI-TENANT IDOR DEFENSE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 2: Multi-Tenant IDOR & Cross-User Authorization");

  let uploadedFileId = "";
  const secretContent = "TOP-SECRET-FINANCIAL-PAYLOAD-2026-ZERO-TRUST-TEST";
  const secretBuffer = Buffer.from(secretContent);

  await recordResultAsync("2.1 Taker A uploads a sensitive document", async () => {
    const uploaded = await distributeAndStoreFile({
      userId: takerAId,
      originalName: "secret-financial-doc.pdf",
      mimeType: "application/pdf",
      fileBuffer: secretBuffer,
    });
    uploadedFileId = uploaded.id;
    if (!uploadedFileId) throw new Error("File ID not returned on upload");
  });

  await recordResultAsync("2.2 Taker B attempts IDOR download of Taker A's file (Must be blocked)", async () => {
    let accessBlocked = false;
    try {
      await retrieveAndDecryptFile(uploadedFileId, takerBId);
    } catch (err) {
      if (err.message.includes("Access Denied")) {
        accessBlocked = true;
      }
    }
    if (!accessBlocked) {
      throw new Error("IDOR Vulnerability Detected: Taker B was able to retrieve Taker A's file!");
    }
  });

  await recordResultAsync("2.3 Taker B attempts IDOR deletion of Taker A's file (Must be blocked)", async () => {
    let deleteBlocked = false;
    try {
      await deleteFileDistributed(uploadedFileId, takerBId);
    } catch (err) {
      if (err.message.includes("unauthorized") || err.message.includes("not found")) {
        deleteBlocked = true;
      }
    }
    if (!deleteBlocked) {
      throw new Error("IDOR Deletion Vulnerability: Taker B was able to delete Taker A's file!");
    }
  });

  await recordResultAsync("2.4 Taker A can successfully retrieve and decrypt their own document", async () => {
    const { fileBuffer, fileRecord } = await retrieveAndDecryptFile(uploadedFileId, takerAId);
    if (!fileBuffer.equals(secretBuffer)) {
      throw new Error("Downloaded buffer does not match original plaintext!");
    }
    if (fileRecord.name !== "secret-financial-doc.pdf") {
      throw new Error("File record name mismatch");
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 3: GIVER PRIVACY & ZERO PLAINTEXT AT REST
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 3: Giver Privacy & Zero Plaintext on Storage Nodes");

  recordResult("3.1 Physical storage on provider disks contains NO plaintext", () => {
    const chunks = db.prepare("SELECT * FROM storage_chunks WHERE file_id = ?").all(uploadedFileId);
    if (chunks.length === 0) throw new Error("No physical chunks found in DB!");

    for (const chunk of chunks) {
      const primaryNode = getStorageNodeById(chunk.primary_node_id);
      if (!primaryNode) throw new Error("Primary node not found");
      const primaryDir = getNodeChunksDir(primaryNode);
      const chunkPath = path.join(primaryDir, `${chunk.chunk_hash}.chunk`);
      if (!fs.existsSync(chunkPath)) throw new Error(`Primary chunk not found at ${chunkPath}`);

      const filename = path.basename(chunkPath);
      // Verify filename is strictly <sha256>.chunk
      if (!/^[a-f0-9]{64}\.chunk$/.test(filename)) {
        throw new Error(`Insecure chunk filename exposed: ${filename}`);
      }

      // Verify chunk binary contains zero plaintext content
      const chunkData = fs.readFileSync(chunkPath);
      if (chunkData.includes(Buffer.from(secretContent)) || chunkData.includes(Buffer.from("secret-financial-doc"))) {
        throw new Error(`Plaintext leakage detected inside physical chunk file: ${chunkPath}`);
      }
    }
  });

  recordResult("3.2 Giver queries explicitly OMIT node_token_hash and customer PII", () => {
    const nodes = getStorageNodesByOwner(giverAId);
    if (nodes.length === 0) throw new Error("Giver nodes not found");
    for (const n of nodes) {
      if (n.node_token_hash !== undefined) {
        throw new Error("Security Leak: node_token_hash was returned in Giver node query!");
      }
      if (n.customer_email || n.taker_id || n.customer_name) {
        throw new Error("Privacy Leak: Customer PII leaked in Giver query!");
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 4: GCM AUTHENTICATION TAG TAMPER DETECTION & FAILOVER
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 4: GCM Authentication Tag Tamper Detection & Failover");

  await recordResultAsync("4.1 Bit-flipping chunk on Primary Node triggers GCM tag mismatch & auto-failover", async () => {
    const chunks = db.prepare("SELECT * FROM storage_chunks WHERE file_id = ?").all(uploadedFileId);
    if (chunks.length === 0) throw new Error("No chunks found in DB");

    const primaryChunk = chunks[0];
    const primaryNode = getStorageNodeById(primaryChunk.primary_node_id);
    if (!primaryNode) throw new Error("Primary node record not found");
    const primaryDir = getNodeChunksDir(primaryNode);
    const chunkFile = path.join(primaryDir, `${primaryChunk.chunk_hash}.chunk`);
    
    if (!fs.existsSync(chunkFile)) {
      throw new Error(`Primary chunk file not found at ${chunkFile}`);
    }

    // Malicious Giver modifies 1 byte in the ciphertext payload
    const originalBytes = fs.readFileSync(chunkFile);
    const tamperedBytes = Buffer.from(originalBytes);
    // Flip a byte in the ciphertext portion (after IV [12] + AuthTag [16])
    tamperedBytes[30] ^= 0xff;
    fs.writeFileSync(chunkFile, tamperedBytes);

    // Verify direct decryptChunk throws DataTamperedError on corrupted buffer
    let tamperDetected = false;
    try {
      decryptChunk(tamperedBytes, takerAId, uploadedFileId);
    } catch (err) {
      if (err.message.includes("tampered") || err.message.includes("tag mismatch")) {
        tamperDetected = true;
      }
    }
    if (!tamperDetected) {
      throw new Error("Tamper Detection Failed: decryptChunk accepted corrupted chunk!");
    }

    // Now retrieve via retrieveAndDecryptFile: must automatically detect tamper on Primary and failover to Replica!
    const { fileBuffer, failoverUsed } = await retrieveAndDecryptFile(uploadedFileId, takerAId);
    if (!failoverUsed) {
      throw new Error("Failover was NOT triggered despite primary chunk tampering!");
    }
    if (!fileBuffer.equals(secretBuffer)) {
      throw new Error("Recovered buffer from replica does not match original checksum!");
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 5: FILESYSTEM SANDBOX JAIL & WINDOWS TRAVERSAL DEFENSE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 5: Filesystem Sandbox Jail & Traversal Defense");

  recordResult("5.1 Path Jail blocks Directory Traversal (../ and ..\\)", () => {
    let blocked = false;
    try {
      assertPathInsideStorageRoot(path.join(nodeStorageA, "../../../Windows/System32"), nodeStorageA);
    } catch (err) {
      if (err.message.includes("outside configured node sandbox")) blocked = true;
    }
    if (!blocked) throw new Error("Path traversal escape was NOT blocked!");
  });

  recordResult("5.2 Path Jail blocks Windows UNC Paths (\\\\server\\share)", () => {
    let blocked = false;
    try {
      assertPathInsideStorageRoot("\\\\evil-server\\share\\chunk.bin", nodeStorageA);
    } catch (err) {
      if (err.message.includes("UNC and device paths")) blocked = true;
    }
    if (!blocked) throw new Error("UNC path attack was NOT blocked!");
  });

  recordResult("5.3 Path Jail blocks Windows Device Paths (\\\\.\\ and \\\\?\\)", () => {
    let blocked = false;
    try {
      assertPathInsideStorageRoot("\\\\.\\PhysicalDrive0", nodeStorageA);
    } catch (err) {
      if (err.message.includes("UNC and device paths")) blocked = true;
    }
    if (!blocked) throw new Error("Device path attack was NOT blocked!");
  });

  recordResult("5.4 Path Jail blocks Null Byte Injections (\\0)", () => {
    let blocked = false;
    try {
      assertPathInsideStorageRoot(`${nodeStorageA}\\chunks\\valid\0.exe`, nodeStorageA);
    } catch (err) {
      if (err.message.includes("Null byte injection")) blocked = true;
    }
    if (!blocked) throw new Error("Null byte injection was NOT blocked!");
  });

  recordResult("5.5 Path Jail blocks Windows Alternate Data Streams (file:zone)", () => {
    let blocked = false;
    try {
      assertPathInsideStorageRoot(`${nodeStorageA}\\chunks\\data.chunk:Zone.Identifier`, nodeStorageA);
    } catch (err) {
      if (err.message.includes("Alternate Data Streams")) blocked = true;
    }
    if (!blocked) throw new Error("Alternate Data Stream injection was NOT blocked!");
  });

  recordResult("5.6 Chunk hash strictly rejects non-hex characters and traversal patterns", () => {
    const maliciousHashes = [
      "../etc/passwd",
      "..\\Windows\\boot.ini",
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855;rm -rf /",
      "short-hash",
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85G", // Invalid hex 'G'
    ];
    for (const h of maliciousHashes) {
      let rejected = false;
      try {
        validateChunkHash(h);
      } catch {
        rejected = true;
      }
      if (!rejected) {
        throw new Error(`Malicious hash pattern was accepted: ${h}`);
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 6: SIGNED EPHEMERAL DOWNLOAD TOKENS
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 6: Signed Ephemeral Download Tokens");

  await recordResultAsync("6.1 Valid download token for User A & File X succeeds", async () => {
    const token = await createDownloadToken(takerAId, uploadedFileId, 60);
    const verified = await verifyDownloadToken(token, uploadedFileId);
    if (!verified || verified.userId !== takerAId || verified.fileId !== uploadedFileId) {
      throw new Error("Valid download token verification failed!");
    }
  });

  await recordResultAsync("6.2 Download token issued for File X fails when used for File Y", async () => {
    const token = await createDownloadToken(takerAId, uploadedFileId, 60);
    const verified = await verifyDownloadToken(token, "file_different_999");
    if (verified !== null) {
      throw new Error("Token scoping violation: Token for File X accepted for File Y!");
    }
  });

  await recordResultAsync("6.3 Expired download token fails verification", async () => {
    // Generate token with 0 second TTL
    const expiredToken = await createDownloadToken(takerAId, uploadedFileId, -10);
    const verified = await verifyDownloadToken(expiredToken, uploadedFileId);
    if (verified !== null) {
      throw new Error("Security Violation: Expired download token was accepted!");
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 7: NODE CREDENTIAL SECURITY & INSTANT REVOCATION
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 7: Node Credential Security & Instant Revocation");

  recordResult("7.1 Revoking Node A immediately marks it REVOKED and invalidates credentials", () => {
    const revoked = revokeStorageNode(testNodeA.id, giverAId);
    if (!revoked) throw new Error("Revocation call returned false");

    const updated = db.prepare("SELECT status, revoked_at, node_token_hash FROM storage_nodes WHERE id = ?").get(testNodeA.id);
    if (updated.status !== "REVOKED") throw new Error("Node status is not REVOKED");
    if (!updated.revoked_at) throw new Error("revoked_at timestamp was not recorded");
    if (updated.node_token_hash === tokenHashA) throw new Error("node_token_hash was not invalidated!");
  });

  recordResult("7.2 Revoked node is immediately excluded from replica allocations", () => {
    const { primary, replica } = selectReplicaNodes(1024);
    if (primary.id === testNodeA.id || (replica && replica.id === testNodeA.id)) {
      throw new Error("Security Critical: Revoked node was selected as an active storage replica!");
    }
  });

  recordResult("7.3 Unauthorized user cannot revoke another Giver's node", () => {
    let blocked = false;
    try {
      revokeStorageNode(testNodeB.id, takerAId);
    } catch (err) {
      if (err.message.includes("Access Denied")) blocked = true;
    }
    if (!blocked) throw new Error("Unauthorized user was able to revoke another Giver's node!");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TEST GROUP 8: SLIDING-WINDOW RATE LIMITER & BRUTE FORCE MITIGATION
  // ──────────────────────────────────────────────────────────────────────────
  logSection("TEST GROUP 8: Sliding-Window Rate Limiting");

  recordResult("8.1 Rate limiter allows requests up to quota and blocks on limit breach", () => {
    const testIp = `test_ip_${testRunId}`;
    // Limit: 5 requests per 10 seconds
    for (let i = 0; i < 5; i++) {
      const check = checkRateLimit(testIp, 5, 10);
      if (!check.allowed) throw new Error(`Request ${i + 1} was incorrectly blocked!`);
    }
    // 6th request must be blocked
    const breachCheck = checkRateLimit(testIp, 5, 10);
    if (breachCheck.allowed) {
      throw new Error("Rate limiter failed to block on 6th request!");
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // CLEANUP & FINAL VERDICT
  // ──────────────────────────────────────────────────────────────────────────
  logSection("CLEANUP & TEST REPORT SUMMARY");
  try {
    fs.rmSync(nodeStorageA, { recursive: true, force: true });
    fs.rmSync(nodeStorageB, { recursive: true, force: true });
  } catch {}

  console.log(`\n${ANSI_BLUE}══════════════════════════════════════════════════════════════${ANSI_RESET}`);
  console.log(`${ANSI_YELLOW}Total Zero-Trust Tests Executed: ${totalTests}${ANSI_RESET}`);
  console.log(`${ANSI_GREEN}Passed: ${passedTests}${ANSI_RESET}`);
  console.log(`${ANSI_RED}Failed: ${totalTests - passedTests}${ANSI_RESET}`);
  console.log(`${ANSI_BLUE}══════════════════════════════════════════════════════════════${ANSI_RESET}`);

  if (totalTests === passedTests) {
    console.log(`\n${ANSI_GREEN}🏆 100% ZERO-TRUST SECURITY VERIFICATION PASSED — SYSTEM IS SECURITY READY!${ANSI_RESET}\n`);
    process.exit(0);
  } else {
    console.error(`\n${ANSI_RED}❌ ZERO-TRUST SECURITY GATE FAILED: ${totalTests - passedTests} tests failed.${ANSI_RESET}\n`);
    process.exit(1);
  }
}

runZeroTrustSecuritySuite().catch((err) => {
  console.error("FATAL SUITE ERROR:", err);
  process.exit(1);
});
