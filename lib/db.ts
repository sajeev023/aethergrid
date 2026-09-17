import path from "path";
import fs from "fs";
import crypto from "crypto";
import { DatabaseSync } from "node:sqlite";
import { logger } from "./logger";

// ─── Database Connection & Singleton ─────────────────────────────────────────

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (!dbInstance) {
    const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.NOW_REGION;
    const dataDir = isServerless
      ? path.join("/tmp", "aethergrid-data")
      : path.resolve(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, "aethergrid.db");
    dbInstance = new DatabaseSync(dbPath);

    dbInstance.exec("PRAGMA foreign_keys = ON;");
    dbInstance.exec("PRAGMA journal_mode = WAL;");
    dbInstance.exec("PRAGMA synchronous = NORMAL;");

    initSchema(dbInstance);
    ensureNode001Provisioned(dbInstance);
  }
  return dbInstance;
}

function initSchema(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      roles TEXT DEFAULT 'TAKER' NOT NULL, -- 'GIVER', 'TAKER', 'GIVER,TAKER', 'ADMIN'
      referral_code TEXT UNIQUE,
      referred_by TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 🟢 GIVER STORAGE NODES
    CREATE TABLE IF NOT EXISTS storage_nodes (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      node_name TEXT NOT NULL,
      node_token_hash TEXT NOT NULL,
      status TEXT DEFAULT 'ONLINE' NOT NULL, -- 'ONLINE', 'SUSPECTED_OFFLINE', 'OFFLINE', 'PAUSED'
      capacity_bytes INTEGER NOT NULL,
      allocated_bytes INTEGER DEFAULT 0 NOT NULL,
      used_bytes INTEGER DEFAULT 0 NOT NULL,
      storage_directory TEXT NOT NULL,
      endpoint TEXT,
      last_heartbeat_at TEXT NOT NULL,
      uptime_seconds INTEGER DEFAULT 0 NOT NULL,
      version TEXT DEFAULT '1.0.0' NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS node_heartbeats (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL,
      status TEXT NOT NULL,
      used_bytes INTEGER NOT NULL,
      available_bytes INTEGER NOT NULL,
      latency_ms INTEGER DEFAULT 0 NOT NULL,
      recorded_at TEXT NOT NULL,
      FOREIGN KEY (node_id) REFERENCES storage_nodes(id) ON DELETE CASCADE
    );

    -- 🔵 TAKER SUBSCRIPTIONS & QUOTA
    CREATE TABLE IF NOT EXISTS taker_subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      plan_id TEXT NOT NULL, -- 'PLAN_20GB', 'PLAN_55GB', 'PLAN_100GB', 'PLAN_500GB'
      plan_name TEXT NOT NULL,
      status TEXT DEFAULT 'ACTIVE' NOT NULL, -- 'ACTIVE', 'TRIAL', 'PAST_DUE', 'CANCELLED'
      quota_bytes INTEGER NOT NULL,
      price_inr INTEGER NOT NULL,
      current_period_start TEXT NOT NULL,
      current_period_end TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- CAPACITY ALLOCATION
    CREATE TABLE IF NOT EXISTS storage_allocations (
      id TEXT PRIMARY KEY,
      taker_id TEXT NOT NULL,
      node_id TEXT NOT NULL,
      allocated_bytes INTEGER NOT NULL,
      used_bytes INTEGER DEFAULT 0 NOT NULL,
      status TEXT DEFAULT 'ACTIVE' NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (taker_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (node_id) REFERENCES storage_nodes(id) ON DELETE CASCADE
    );

    -- TAKER LOGICAL FILES
    CREATE TABLE IF NOT EXISTS files (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      folder_id TEXT,
      name TEXT NOT NULL,
      original_name TEXT NOT NULL,
      size INTEGER NOT NULL,
      mime_type TEXT NOT NULL,
      encryption_iv TEXT NOT NULL,
      checksum TEXT NOT NULL, -- SHA-256 of original file
      status TEXT DEFAULT 'HEALTHY' NOT NULL, -- 'HEALTHY', 'DEGRADED', 'REPAIRING'
      is_favorite INTEGER DEFAULT 0 NOT NULL,
      is_trashed INTEGER DEFAULT 0 NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- DISTRIBUTED ENCRYPTED CHUNKS
    CREATE TABLE IF NOT EXISTS storage_chunks (
      id TEXT PRIMARY KEY,
      file_id TEXT NOT NULL,
      chunk_index INTEGER NOT NULL,
      chunk_hash TEXT NOT NULL,
      chunk_size INTEGER NOT NULL,
      primary_node_id TEXT NOT NULL,
      replica_node_id TEXT,
      status TEXT DEFAULT 'REPLICATED' NOT NULL, -- 'REPLICATED', 'DEGRADED', 'CORRUPTED', 'SINGLE_REPLICA_BETA'
      created_at TEXT NOT NULL,
      FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE,
      FOREIGN KEY (primary_node_id) REFERENCES storage_nodes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS folders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      parent_id TEXT,
      is_trashed INTEGER DEFAULT 0 NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      file_id TEXT UNIQUE NOT NULL,
      width INTEGER,
      height INTEGER,
      taken_at TEXT,
      thumbnail_data TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS backups (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      device_name TEXT NOT NULL,
      device_model TEXT NOT NULL,
      status TEXT DEFAULT 'PENDING' NOT NULL,
      total_bytes INTEGER DEFAULT 0 NOT NULL,
      item_count INTEGER DEFAULT 0 NOT NULL,
      error_count INTEGER DEFAULT 0 NOT NULL,
      notes TEXT,
      started_at TEXT NOT NULL,
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS backup_items (
      id TEXT PRIMARY KEY,
      backup_id TEXT NOT NULL,
      item_type TEXT NOT NULL,
      relative_path TEXT NOT NULL,
      size INTEGER NOT NULL,
      checksum TEXT NOT NULL,
      status TEXT DEFAULT 'VERIFIED' NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (backup_id) REFERENCES backups(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS share_links (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      file_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      allow_download INTEGER DEFAULT 1 NOT NULL,
      view_count INTEGER DEFAULT 0 NOT NULL,
      is_revoked INTEGER DEFAULT 0 NOT NULL,
      expires_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
    );

    -- 💰 PROVIDER EARNINGS & PLATFORM LEDGER
    CREATE TABLE IF NOT EXISTS provider_earnings (
      id TEXT PRIMARY KEY,
      node_id TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      month_period TEXT NOT NULL,
      allocated_gb_hours REAL DEFAULT 0 NOT NULL,
      earnings_inr REAL DEFAULT 0 NOT NULL,
      pending_inr REAL DEFAULT 0 NOT NULL,
      paid_inr REAL DEFAULT 0 NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (node_id) REFERENCES storage_nodes(id) ON DELETE CASCADE,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ledger_entries (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      type TEXT NOT NULL, -- 'TAKER_PAYMENT', 'PROVIDER_PAYOUT', 'PLATFORM_MARGIN'
      amount_inr REAL NOT NULL,
      reference_id TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS payment_transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plan_id TEXT NOT NULL,
      amount_inr REAL NOT NULL,
      provider TEXT NOT NULL,
      provider_payment_id TEXT UNIQUE NOT NULL,
      provider_order_id TEXT,
      signature TEXT,
      status TEXT NOT NULL, -- 'SUCCESS', 'FAILED', 'REFUNDED'
      idempotency_key TEXT UNIQUE,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS referrals (
      id TEXT PRIMARY KEY,
      referrer_user_id TEXT NOT NULL,
      referred_user_id TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'PENDING' NOT NULL, -- 'PENDING', 'QUALIFIED', 'REWARDED'
      qualifying_payment_id TEXT,
      created_at TEXT NOT NULL,
      qualified_at TEXT,
      FOREIGN KEY (referrer_user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (referred_user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      action TEXT NOT NULL,
      ip_address TEXT,
      metadata_json TEXT,
      created_at TEXT NOT NULL
    );

    -- Indices for high performance
    CREATE INDEX IF NOT EXISTS idx_nodes_owner ON storage_nodes(owner_id);
    CREATE INDEX IF NOT EXISTS idx_nodes_status ON storage_nodes(status);
    CREATE INDEX IF NOT EXISTS idx_chunks_file ON storage_chunks(file_id);
    CREATE INDEX IF NOT EXISTS idx_chunks_primary ON storage_chunks(primary_node_id);
    CREATE INDEX IF NOT EXISTS idx_files_user ON files(user_id);
    CREATE INDEX IF NOT EXISTS idx_files_trashed ON files(is_trashed);
    CREATE INDEX IF NOT EXISTS idx_allocations_taker ON storage_allocations(taker_id);
    CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_user_id);
  `);

  // Migration helper for new user columns if database was pre-existing
  try {
    db.exec("ALTER TABLE users ADD COLUMN referral_code TEXT;");
  } catch {}
  try {
    db.exec("ALTER TABLE storage_nodes ADD COLUMN revoked_at TEXT;");
  } catch {}
  try {
    db.exec("ALTER TABLE users ADD COLUMN referred_by TEXT;");
  } catch {}
}

/**
 * Ensures Node #001 on the dedicated physical disk (e.g. D:\AetherGridStorage) is provisioned
 */
function ensureNode001Provisioned(db: DatabaseSync): void {
  const nodeId = process.env.AETHERGRID_NODE_ID || "AETHERGRID-NODE-001";
  const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.NOW_REGION;
  const defaultStoragePath = isServerless
    ? path.join("/tmp", "aethergrid-storage")
    : (process.platform === "win32" ? "D:\\AetherGridStorage" : path.resolve(process.cwd(), "data", "storage"));
  const storagePath = process.env.AETHERGRID_NODE_STORAGE_PATH || defaultStoragePath;
  const capacityGb = parseInt(process.env.AETHERGRID_NODE_CAPACITY_GB || "50", 10);
  const capacityBytes = BigInt(capacityGb) * BigInt(1024) * BigInt(1024) * BigInt(1024);
  const rawToken = process.env.AETHER_NODE_TOKEN || "aeth_prod_node_001_secret_token_live";
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const now = new Date().toISOString();

  // Ensure system owner user exists
  const systemOwnerId = "usr_system_node_001";
  const existingOwner = db.prepare("SELECT id FROM users WHERE id = ?").get(systemOwnerId);
  if (!existingOwner) {
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, password_hash, name, roles, referral_code, created_at, updated_at)
      VALUES (?, 'node001@aethergrid.io', 'system_locked', 'AetherGrid Dedicated Host', 'GIVER,ADMIN', 'SYS001', ?, ?)
    `).run(systemOwnerId, now, now);
  }

  // Ensure directories exist on physical disk
  try {
    const chunksDir = path.join(storagePath, "chunks");
    if (!fs.existsSync(chunksDir)) {
      fs.mkdirSync(chunksDir, { recursive: true });
    }
  } catch (err: unknown) {
    logger.warn(`Could not verify dedicated node storage directory on disk: ${storagePath}`);
  }

  // Upsert Node #001
  db.prepare(`
    INSERT INTO storage_nodes (id, owner_id, node_name, node_token_hash, status, capacity_bytes, storage_directory, endpoint, last_heartbeat_at, uptime_seconds, version, created_at, updated_at)
    VALUES (?, ?, 'Node #001 (Dedicated D: Storage)', ?, 'ONLINE', ?, ?, 'http://localhost:3000', ?, 0, '1.0.0', ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      storage_directory = excluded.storage_directory,
      capacity_bytes = excluded.capacity_bytes,
      node_token_hash = excluded.node_token_hash,
      updated_at = excluded.updated_at
  `).run(nodeId, systemOwnerId, tokenHash, Number(capacityBytes), storagePath, now, now, now);
}

// ─── User Repository ─────────────────────────────────────────────────────────

export function createUser(user: {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  roles?: string;
  referredBy?: string;
}) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const roles = user.roles || "TAKER";
  const referralCode = `AETH_${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, roles, referral_code, referred_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    user.id,
    user.email.toLowerCase().trim(),
    user.passwordHash,
    user.name,
    roles,
    referralCode,
    user.referredBy || null,
    now,
    now
  );

  // If user signed up with a referral code, record referral
  if (user.referredBy) {
    const referrer = db.prepare("SELECT id FROM users WHERE referral_code = ?").get(user.referredBy.trim().toUpperCase()) as { id: string } | undefined;
    if (referrer && referrer.id !== user.id) {
      db.prepare(`
        INSERT OR IGNORE INTO referrals (id, referrer_user_id, referred_user_id, status, created_at)
        VALUES (?, ?, ?, 'PENDING', ?)
      `).run(`ref_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`, referrer.id, user.id, now);
    }
  }

  // Provision initial 20 GB Taker trial subscription
  initTakerSubscription(
    user.id,
    "PLAN_20GB",
    "Starter Cloud (20 GB)",
    BigInt(20) * BigInt(1024) * BigInt(1024) * BigInt(1024),
    20
  );

  return findUserById(user.id)!;
}

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  roles: string;
  referral_code?: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
}

export function findUserByEmail(email: string): UserRecord | undefined {
  const db = getDatabase();
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase().trim()) as UserRecord | undefined;
}

export function findUserById(id: string): UserRecord | undefined {
  const db = getDatabase();
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRecord | undefined;
}

export function updateUserRoles(id: string, roles: string) {
  const db = getDatabase();
  db.prepare("UPDATE users SET roles = ?, updated_at = ? WHERE id = ?")
    .run(roles, new Date().toISOString(), id);
}

// ─── Taker Subscription Repository ───────────────────────────────────────────

export function initTakerSubscription(
  userId: string,
  planId: string,
  planName: string,
  quotaBytes: bigint,
  priceInr: number
) {
  const db = getDatabase();
  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const id = `sub_${userId}`;

  db.prepare(`
    INSERT OR REPLACE INTO taker_subscriptions (id, user_id, plan_id, plan_name, status, quota_bytes, price_inr, current_period_start, current_period_end, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    userId,
    planId,
    planName,
    Number(quotaBytes),
    priceInr,
    now.toISOString(),
    nextMonth.toISOString(),
    now.toISOString(),
    now.toISOString()
  );
}

export function getTakerSubscription(userId: string) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM taker_subscriptions WHERE user_id = ?").get(userId) as Record<string, unknown> | undefined;
}

// ─── Storage Nodes Repository (Givers) ───────────────────────────────────────

export function registerStorageNode(node: {
  id: string;
  ownerId: string;
  nodeName: string;
  nodeTokenHash: string;
  capacityBytes: bigint;
  storageDirectory: string;
  endpoint?: string;
}) {
  const db = getDatabase();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO storage_nodes (id, owner_id, node_name, node_token_hash, status, capacity_bytes, allocated_bytes, used_bytes, storage_directory, endpoint, last_heartbeat_at, uptime_seconds, version, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'ONLINE', ?, 0, 0, ?, ?, ?, 0, '1.0.0', ?, ?)
  `).run(
    node.id,
    node.ownerId,
    node.nodeName,
    node.nodeTokenHash,
    Number(node.capacityBytes),
    node.storageDirectory,
    node.endpoint || "local://",
    now,
    now,
    now
  );

  const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  db.prepare(`
    INSERT OR IGNORE INTO provider_earnings (id, node_id, owner_id, month_period, allocated_gb_hours, earnings_inr, pending_inr, paid_inr, updated_at)
    VALUES (?, ?, ?, ?, 0, 0, 0, 0, ?)
  `).run(`earn_${node.id}_${currentMonth}`, node.id, node.ownerId, currentMonth, now);

  return getStorageNodeById(node.id)!;
}

export function getStorageNodeById(id: string) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM storage_nodes WHERE id = ?").get(id) as Record<string, unknown> | undefined;
}

export function getStorageNodesByOwner(ownerId: string) {
  const db = getDatabase();
  return db.prepare(`
    SELECT id, owner_id, node_name, status, capacity_bytes, allocated_bytes, 
           used_bytes, storage_directory, endpoint, last_heartbeat_at, 
           uptime_seconds, version, revoked_at, created_at, updated_at 
    FROM storage_nodes 
    WHERE owner_id = ? 
    ORDER BY created_at DESC
  `).all(ownerId) as Record<string, unknown>[];
}

export function revokeStorageNode(nodeId: string, ownerId: string): boolean {
  const db = getDatabase();
  const now = new Date().toISOString();
  const node = db.prepare("SELECT owner_id FROM storage_nodes WHERE id = ?").get(nodeId) as { owner_id?: string } | undefined;
  if (!node) {
    throw new Error("Storage node not found.");
  }

  // Verify ownership or admin
  if (node.owner_id !== ownerId) {
    const caller = db.prepare("SELECT roles FROM users WHERE id = ?").get(ownerId) as { roles?: string } | undefined;
    if (!caller || !caller.roles?.includes("ADMIN")) {
      logger.security("Unauthorized attempt to revoke storage node", { nodeId, callerId: ownerId });
      throw new Error("Access Denied: You do not own this storage node.");
    }
  }

  const invalidHash = `revoked_${crypto.randomBytes(16).toString("hex")}`;
  db.prepare(`
    UPDATE storage_nodes 
    SET status = 'REVOKED', 
        node_token_hash = ?, 
        revoked_at = ?, 
        updated_at = ? 
    WHERE id = ?
  `).run(invalidHash, now, now, nodeId);

  logger.security("Storage node credential revoked immediately", { nodeId, revokedBy: ownerId });
  return true;
}

export function recordNodeHeartbeat(nodeId: string, usedBytes: number, availableBytes: number, latencyMs = 5) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const hbId = `hb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  db.prepare(`
    INSERT INTO node_heartbeats (id, node_id, status, used_bytes, available_bytes, latency_ms, recorded_at)
    VALUES (?, ?, 'HEALTHY', ?, ?, ?, ?)
  `).run(hbId, nodeId, usedBytes, availableBytes, latencyMs, now);

  db.prepare(`
    UPDATE storage_nodes SET
      status = 'ONLINE',
      used_bytes = ?,
      last_heartbeat_at = ?,
      uptime_seconds = uptime_seconds + 10,
      updated_at = ?
    WHERE id = ?
  `).run(usedBytes, now, now, nodeId);

  // Deterministic earnings accounting (₹1 per GB-month = ₹0.00138 per GB-hour)
  const node = getStorageNodeById(nodeId) as { allocated_bytes?: number } | undefined;
  if (node && Number(node.allocated_bytes || 0) > 0) {
    const allocatedGb = Number(node.allocated_bytes) / (1024 * 1024 * 1024);
    const earningsDelta = (allocatedGb * 1.0) / (30 * 24 * 6);
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    db.prepare(`
      UPDATE provider_earnings SET
        allocated_gb_hours = allocated_gb_hours + ?,
        earnings_inr = earnings_inr + ?,
        pending_inr = pending_inr + ?,
        updated_at = ?
      WHERE node_id = ? AND month_period = ?
    `).run(allocatedGb / 360, earningsDelta, earningsDelta, now, nodeId, currentMonth);
  }
}

export function setNodeStatus(nodeId: string, status: "ONLINE" | "SUSPECTED_OFFLINE" | "OFFLINE" | "PAUSED") {
  const db = getDatabase();
  db.prepare("UPDATE storage_nodes SET status = ?, updated_at = ? WHERE id = ?")
    .run(status, new Date().toISOString(), nodeId);
}

export function getProviderEarnings(ownerId: string) {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM provider_earnings WHERE owner_id = ?").all(ownerId) as Record<string, unknown>[];
  let totalEarned = 0;
  let pending = 0;
  for (const r of rows) {
    totalEarned += Number(r.earnings_inr || 0);
    pending += Number(r.pending_inr || 0);
  }
  return {
    thisMonth: Math.round(totalEarned * 100) / 100,
    pending: Math.round(pending * 100) / 100,
    totalEarned: Math.round(totalEarned * 100) / 100,
    history: rows,
  };
}

// ─── Taker Files & Storage Accounting ────────────────────────────────────────

export function calculateTakerStorageUsage(userId: string) {
  const db = getDatabase();
  const activeFiles = db.prepare("SELECT size, mime_type, status FROM files WHERE user_id = ? AND is_trashed = 0").all(userId) as Array<{ size: number; mime_type?: string; status: string }>;

  let photos = 0;
  let videos = 0;
  let docs = 0;
  let other = 0;

  for (const f of activeFiles) {
    const s = Number(f.size);
    const m = (f.mime_type || "").toLowerCase();
    if (m.startsWith("image/")) photos += s;
    else if (m.startsWith("video/")) videos += s;
    else if (m.includes("pdf") || m.startsWith("text/") || m.includes("document")) docs += s;
    else other += s;
  }

  const trashedFiles = db.prepare("SELECT size FROM files WHERE user_id = ? AND is_trashed = 1").all(userId) as Array<{ size: number }>;
  let trash = 0;
  for (const t of trashedFiles) trash += Number(t.size);

  const totalUsed = photos + videos + docs + other + trash;
  const isSingleNodeBeta = process.env.BETA_SINGLE_NODE_MODE === "true";

  const hasDegraded = activeFiles.some((f) => f.status === "DEGRADED");

  let healthStatus = "HEALTHY";
  let healthMessage = "All redundant storage replicas are online and healthy across the peer network.";

  if (isSingleNodeBeta) {
    healthStatus = "BETA_SINGLE_NODE";
    healthMessage = "Single-Node Beta Mode: Data is encrypted with AES-256-GCM and stored on Node #001 (Dedicated D: Drive). Redundant multi-node replication will activate as additional community providers join.";
  } else if (hasDegraded) {
    healthStatus = "DEGRADED";
    healthMessage = "One storage node is temporarily unreachable. Your files remain accessible via redundant replicas while our orchestrator repairs full redundancy.";
  }

  return {
    photosBytes: photos,
    videosBytes: videos,
    documentsBytes: docs,
    otherBytes: other,
    trashBytes: trash,
    totalUsedBytes: totalUsed,
    healthStatus,
    healthMessage,
  };
}

// ─── Payment & Webhook Verification ──────────────────────────────────────────

export function processVerifiedPaymentWebhook(params: {
  userId: string;
  planId: string;
  amountInr: number;
  provider: string;
  providerPaymentId: string;
  providerOrderId?: string;
  signature?: string;
  idempotencyKey?: string;
}) {
  const db = getDatabase();
  const now = new Date().toISOString();

  // 1. Idempotency Check
  const existing = db.prepare("SELECT * FROM payment_transactions WHERE provider_payment_id = ?").get(params.providerPaymentId) as Record<string, unknown> | undefined;
  if (existing) {
    return { success: true, status: "ALREADY_PROCESSED", transactionId: existing.id };
  }

  const txId = `tx_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  db.prepare(`
    INSERT INTO payment_transactions (id, user_id, plan_id, amount_inr, provider, provider_payment_id, provider_order_id, signature, status, idempotency_key, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'SUCCESS', ?, ?)
  `).run(
    txId,
    params.userId,
    params.planId,
    params.amountInr,
    params.provider,
    params.providerPaymentId,
    params.providerOrderId || null,
    params.signature || null,
    params.idempotencyKey || txId,
    now
  );

  // 2. Map Quotas
  let quotaBytes = BigInt(20) * BigInt(1024) * BigInt(1024) * BigInt(1024);
  let planName = "Starter Cloud (20 GB)";
  if (params.planId === "PLAN_55GB") {
    quotaBytes = BigInt(55) * BigInt(1024) * BigInt(1024) * BigInt(1024);
    planName = "Pro Cloud (55 GB)";
  } else if (params.planId === "PLAN_100GB") {
    quotaBytes = BigInt(100) * BigInt(1024) * BigInt(1024) * BigInt(1024);
    planName = "Ultra Cloud (100 GB)";
  } else if (params.planId === "PLAN_500GB") {
    quotaBytes = BigInt(500) * BigInt(1024) * BigInt(1024) * BigInt(1024);
    planName = "Master Grid (500 GB)";
  }

  initTakerSubscription(params.userId, params.planId, planName, quotaBytes, params.amountInr);

  // 3. Referral Qualification Check: "Bring 4 paying customers -> receive 55 GB free for 1 month"
  const pendingReferral = db.prepare("SELECT * FROM referrals WHERE referred_user_id = ? AND status = 'PENDING'").get(params.userId) as { id: string; referrer_user_id: string } | undefined;
  if (pendingReferral) {
    db.prepare("UPDATE referrals SET status = 'QUALIFIED', qualifying_payment_id = ?, qualified_at = ? WHERE id = ?")
      .run(txId, now, pendingReferral.id);

    // Count qualified referrals for referrer
    const countRow = db.prepare("SELECT COUNT(*) as c FROM referrals WHERE referrer_user_id = ? AND status IN ('QUALIFIED', 'REWARDED')").get(pendingReferral.referrer_user_id) as { c: number };
    if (countRow && countRow.c >= 4) {
      // Award 55 GB bonus for 30 days
      const referrerSub = getTakerSubscription(pendingReferral.referrer_user_id) as { quota_bytes?: number } | undefined;
      const currentQuota = BigInt(referrerSub?.quota_bytes || 20 * 1024 * 1024 * 1024);
      const bonusQuota = BigInt(55) * BigInt(1024) * BigInt(1024) * BigInt(1024);
      const newQuota = currentQuota + bonusQuota;

      db.prepare("UPDATE taker_subscriptions SET quota_bytes = ?, updated_at = ? WHERE user_id = ?")
        .run(Number(newQuota), now, pendingReferral.referrer_user_id);

      db.prepare("UPDATE referrals SET status = 'REWARDED' WHERE referrer_user_id = ? AND status = 'QUALIFIED'")
        .run(pendingReferral.referrer_user_id);

      logger.info(`Referral reward granted: 55 GB bonus added to referrer ${pendingReferral.referrer_user_id}`);
    }
  }

  return { success: true, status: "PROCESSED", transactionId: txId, planId: params.planId };
}

// ─── Referral Tracking ───────────────────────────────────────────────────────

export function getReferralStats(userId: string) {
  const db = getDatabase();
  const user = findUserById(userId) as { referral_code?: string } | undefined;
  const referrals = db.prepare(`
    SELECT r.id, r.referrer_user_id, r.status, r.created_at, r.qualified_at,
           u.name as referred_name, u.email as raw_email
    FROM referrals r
    JOIN users u ON r.referred_user_id = u.id
    WHERE r.referrer_user_id = ?
    ORDER BY r.created_at DESC
  `).all(userId) as Array<Record<string, unknown>>;

  const sanitizedReferrals = referrals.map((r) => {
    const raw = String(r.raw_email || "");
    const parts = raw.split("@");
    const maskedEmail = parts.length === 2 && parts[0].length > 2
      ? `${parts[0][0]}***${parts[0].slice(-1)}@${parts[1]}`
      : (parts.length === 2 ? `*@${parts[1]}` : "hidden");
    return {
      id: String(r.id),
      referrer_user_id: String(r.referrer_user_id),
      status: String(r.status),
      created_at: String(r.created_at),
      qualified_at: r.qualified_at ? String(r.qualified_at) : null,
      referred_name: String(r.referred_name),
      referred_email: maskedEmail,
    };
  });

  let qualifiedCount = 0;
  for (const r of sanitizedReferrals) {
    if (r.status === "QUALIFIED" || r.status === "REWARDED") {
      qualifiedCount++;
    }
  }

  return {
    referralCode: user?.referral_code || "N/A",
    referralLink: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/signup?ref=${user?.referral_code || ""}`,
    totalReferrals: sanitizedReferrals.length,
    qualifiedCount,
    progressText: `${Math.min(4, qualifiedCount)} / 4`,
    rewardEarned: qualifiedCount >= 4,
    rewardDescription: "Bring 4 paying customers → receive 55 GB free for 1 month.",
    referrals: sanitizedReferrals,
  };
}

// ─── Admin Marketplace Telemetry ────────────────────────────────────────────

export function getMarketplaceMetrics() {
  const db = getDatabase();
  const totalUsers = (db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number }).c;
  const givers = (db.prepare("SELECT COUNT(DISTINCT owner_id) as c FROM storage_nodes").get() as { c: number }).c;
  const takers = (db.prepare("SELECT COUNT(*) as c FROM taker_subscriptions WHERE status = 'ACTIVE'").get() as { c: number }).c;

  const nodes = db.prepare("SELECT status, capacity_bytes, allocated_bytes, used_bytes FROM storage_nodes").all() as Array<{
    status: string;
    capacity_bytes?: number;
    allocated_bytes?: number;
    used_bytes?: number;
  }>;
  let totalCapacity = 0;
  let totalAllocated = 0;
  let totalUsed = 0;
  let onlineNodes = 0;
  let offlineNodes = 0;

  for (const n of nodes) {
    totalCapacity += Number(n.capacity_bytes || 0);
    totalAllocated += Number(n.allocated_bytes || 0);
    totalUsed += Number(n.used_bytes || 0);
    if (n.status === "ONLINE") onlineNodes++;
    else offlineNodes++;
  }

  const filesCount = (db.prepare("SELECT COUNT(*) as c FROM files WHERE is_trashed = 0").get() as { c: number }).c;
  const chunksCount = (db.prepare("SELECT COUNT(*) as c FROM storage_chunks").get() as { c: number }).c;

  return {
    totalUsers,
    activeGivers: givers,
    activeTakers: takers,
    totalCapacityBytes: totalCapacity,
    allocatedBytes: totalAllocated,
    usedBytes: totalUsed,
    onlineNodes,
    offlineNodes,
    totalFiles: filesCount,
    totalChunks: chunksCount,
    isSingleNodeBeta: process.env.BETA_SINGLE_NODE_MODE === "true",
  };
}
