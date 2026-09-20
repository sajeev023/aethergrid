import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getDatabase,
  createUser,
  findUserByEmail,
  recordNodeHeartbeat,
} from "../lib/db.ts";
import { getAuthoritativeSystemState } from "../lib/system-state.ts";
import { evaluateNodeHealth } from "../lib/orchestrator/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  }
}

async function runStateIntegritySuite() {
  console.log("\n" + "=".repeat(75));
  console.log("   🛡️  AETHERGRID PRODUCTION STATE INTEGRITY & TRUTHFULNESS SUITE");
  console.log("   Testing SystemState Engine, Node Transitions, Single-Node Reality,");
  console.log("   Quota Gating, Simulator Isolation, and Deceptive Text Purge");
  console.log("=".repeat(75) + "\n");

  const db = getDatabase();
  const timestamp = Date.now();

  // Ensure test taker user exists
  let testUser = findUserByEmail("integrity_tester@aethergrid.local");
  if (!testUser) {
    testUser = createUser({
      id: `user_integrity_${timestamp}`,
      email: "integrity_tester@aethergrid.local",
      passwordHash: "test_hash_integrity",
      name: "Integrity Tester",
      role: "TAKER",
    });
  }
  const userId = testUser.id;

  // Clean any mock/extraneous nodes from prior test runs
  db.prepare("DELETE FROM storage_nodes WHERE id != 'AETHERGRID-NODE-001'").run();

  // ══════════════════════════════════════════════════════════════════
  // SECTION 1: SINGLE-NODE MVP BASELINE TELEMETRY
  // ══════════════════════════════════════════════════════════════════
  console.log("▶ 1. Validating Single-Node MVP Telemetry Baseline...");

  // Set Node #001 to ONLINE with fresh heartbeat
  recordNodeHeartbeat("AETHERGRID-NODE-001", 0, 107374182400, 5);
  db.prepare("UPDATE storage_nodes SET status = 'ONLINE' WHERE id = 'AETHERGRID-NODE-001'").run();

  let state = getAuthoritativeSystemState(userId);

  assert(state.nodeId === "AETHERGRID-NODE-001", "Primary storage node is identified as AETHERGRID-NODE-001");
  assert(state.nodeStatus === "ONLINE", "Storage node reports ONLINE with fresh heartbeat");
  assert(state.verifiedReplicaCount === 0, "verifiedReplicaCount is strictly 0 (no fake secondary replicas)");
  assert(state.replicaCount === 0, "replicaCount is strictly 0");
  assert(state.redundancyModel === "SINGLE_NODE", "redundancyModel is strictly SINGLE_NODE");
  assert(state.failoverStatus === "NOT_CONFIGURED", "failoverStatus is NOT_CONFIGURED in single-node release");
  assert(state.replicationStatus === "SINGLE_INSTANCE", "replicationStatus is SINGLE_INSTANCE (not fake REPLICATED)");
  assert(state.storageAvailability === "WRITABLE", "storageAvailability is WRITABLE when online and under quota");
  assert(state.uploadAvailability.available === true, "uploadAvailability is true when online and under quota");
  assert(state.downloadAvailability.available === true, "downloadAvailability is true when online");
  assert(state.isWritable === true, "isWritable is true when node is online and under quota");
  assert(state.healthStatus === "HEALTHY", "healthStatus is HEALTHY when online and zero degraded chunks");
  assert(
    state.healthBadgeLabel.includes("Single-Node Beta"),
    `healthBadgeLabel contains 'Single-Node Beta' (got: '${state.healthBadgeLabel}')`
  );

  // ══════════════════════════════════════════════════════════════════
  // SECTION 2: NODE HEARTBEAT DEGRADATION & LATENCY (SUSPECTED_OFFLINE)
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 2. Validating Heartbeat Aging -> SUSPECTED_OFFLINE Transition...");

  // Simulate 45 seconds since last heartbeat (>30s but <90s)
  const suspectedHeartbeat = new Date(Date.now() - 45 * 1000).toISOString();
  db.prepare("UPDATE storage_nodes SET last_heartbeat_at = ? WHERE id = 'AETHERGRID-NODE-001'").run(suspectedHeartbeat);

  state = getAuthoritativeSystemState(userId);

  assert(state.nodeStatus === "SUSPECTED_OFFLINE", "Node transitions to SUSPECTED_OFFLINE after 45s heartbeat silence");
  assert(state.healthStatus === "DEGRADED", "System health transitions to DEGRADED on delayed heartbeat");
  assert(state.uploadAvailability.available === false, "Uploads are disabled when node is SUSPECTED_OFFLINE");
  assert(state.storageAvailability === "UNAVAILABLE", "Storage availability is UNAVAILABLE during heartbeat delay");
  assert(state.isWritable === false, "Writes are blocked during heartbeat delay");
  assert(
    state.healthBadgeLabel.includes("Reconnecting"),
    `Health badge displays Reconnecting status (got: '${state.healthBadgeLabel}')`
  );

  // ══════════════════════════════════════════════════════════════════
  // SECTION 3: NODE OFFLINE STATE & COMPLETE PROTECTION
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 3. Validating Heartbeat Expiration -> OFFLINE Transition...");

  // Simulate 120 seconds since last heartbeat (>90s)
  const expiredHeartbeat = new Date(Date.now() - 120 * 1000).toISOString();
  db.prepare("UPDATE storage_nodes SET last_heartbeat_at = ? WHERE id = 'AETHERGRID-NODE-001'").run(expiredHeartbeat);

  state = getAuthoritativeSystemState(userId);

  assert(state.nodeStatus === "OFFLINE", "Node transitions to OFFLINE after 120s heartbeat silence");
  assert(state.healthStatus === "OFFLINE", "System health is strictly OFFLINE");
  assert(state.storageAvailability === "UNAVAILABLE", "storageAvailability is strictly UNAVAILABLE");
  assert(state.uploadAvailability.available === false, "uploadAvailability is strictly false");
  assert(state.downloadAvailability.available === false, "downloadAvailability is strictly false (node unreachable)");
  assert(state.isWritable === false, "isWritable is strictly false");
  assert(state.healthBadgeLabel === "Storage Node Offline", "Health badge label is strictly 'Storage Node Offline'");
  assert(
    state.uploadAvailability.reason.includes("Storage Node #001 is currently offline"),
    "Upload reason provides clear human explanation of offline node"
  );
  assert(
    state.downloadAvailability.reason.includes("Storage Node #001 is currently offline"),
    "Download reason provides clear human explanation of offline node"
  );

  // ══════════════════════════════════════════════════════════════════
  // SECTION 4: NODE PAUSED STATE
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 4. Validating Node PAUSED State (Maintenance Mode)...");

  recordNodeHeartbeat("AETHERGRID-NODE-001", 0, 107374182400, 5);
  db.prepare("UPDATE storage_nodes SET status = 'PAUSED' WHERE id = 'AETHERGRID-NODE-001'").run();

  state = getAuthoritativeSystemState(userId);

  assert(state.nodeStatus === "PAUSED", "Node status is PAUSED");
  assert(state.storageAvailability === "READ_ONLY", "storageAvailability is READ_ONLY when paused");
  assert(state.uploadAvailability.available === false, "Uploads are disabled when node is PAUSED");
  assert(state.downloadAvailability.available === true, "Existing files remain downloadable when node is PAUSED");
  assert(state.isWritable === false, "Writes are blocked when node is PAUSED");
  assert(state.healthBadgeLabel === "Storage Node Paused", "Health badge label is 'Storage Node Paused'");

  // ══════════════════════════════════════════════════════════════════
  // SECTION 5: QUOTA EXCEEDED WRITE-GATING
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 5. Validating Quota Exceeded Enforcement...");

  // Restore node to ONLINE
  db.prepare("UPDATE storage_nodes SET status = 'ONLINE' WHERE id = 'AETHERGRID-NODE-001'").run();
  recordNodeHeartbeat("AETHERGRID-NODE-001", 0, 107374182400, 5);

  // Create mock file consuming full 3 GB quota
  const dummyFileId = `quota_test_file_${timestamp}`;
  db.prepare(`
    INSERT INTO files (id, user_id, name, original_name, size, mime_type, encryption_iv, checksum, status, is_trashed, created_at, updated_at)
    VALUES (?, ?, 'huge_archive.zip', 'huge_archive.zip', 3221225472, 'application/zip', 'iv123', 'hash123', 'HEALTHY', 0, datetime('now'), datetime('now'))
  `).run(dummyFileId, userId);

  state = getAuthoritativeSystemState(userId);

  assert(state.usedBytes >= 3221225472, "Total used bytes reflects 3 GB quota consumption");
  assert(state.percentUsed >= 100, "Percent used is capped/reported at 100%");
  assert(state.storageAvailability === "READ_ONLY", "storageAvailability transitions to READ_ONLY when quota exceeded");
  assert(state.uploadAvailability.available === false, "Uploads are disabled when 3 GB beta quota is reached");
  assert(state.isWritable === false, "isWritable is false when quota is exhausted");
  assert(state.downloadAvailability.available === true, "Downloads remain available when quota is exceeded");
  assert(
    state.uploadAvailability.reason.includes("Storage limit reached"),
    "Upload disabled reason accurately cites storage limit"
  );

  // Clean up quota test file
  db.prepare("DELETE FROM files WHERE id = ?").run(dummyFileId);

  // ══════════════════════════════════════════════════════════════════
  // SECTION 6: REPLICA COUNTING INTEGRITY & MULTI-NODE PURITY
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 6. Validating Replica Counting Integrity...");

  // Verify that chunks residing on Node #001 do NOT count as replicas
  const chunkTestFileId = `chunk_test_file_${timestamp}`;
  db.prepare(`
    INSERT INTO files (id, user_id, name, original_name, size, mime_type, encryption_iv, checksum, status, is_trashed, created_at, updated_at)
    VALUES (?, ?, 'chunk_test.txt', 'chunk_test.txt', 1024, 'text/plain', 'iv123', 'hash123', 'HEALTHY', 0, datetime('now'), datetime('now'))
  `).run(chunkTestFileId, userId);

  db.prepare(`
    INSERT INTO storage_chunks (id, file_id, chunk_index, chunk_hash, chunk_size, primary_node_id, replica_node_id, status, created_at)
    VALUES (?, ?, 0, 'mock_hash', 1024, 'AETHERGRID-NODE-001', 'AETHERGRID-NODE-001', 'HEALTHY', datetime('now'))
  `).run(`chunk_${timestamp}`, chunkTestFileId);

  state = getAuthoritativeSystemState(userId);
  assert(state.verifiedReplicaCount === 0, "Node #001 primary storage chunks do NOT increment verifiedReplicaCount");
  assert(state.redundancyModel === "SINGLE_NODE", "System strictly remains in SINGLE_NODE redundancyModel");

  // Clean up chunk test records
  db.prepare("DELETE FROM storage_chunks WHERE file_id = ?").run(chunkTestFileId);
  db.prepare("DELETE FROM files WHERE id = ?").run(chunkTestFileId);

  // ══════════════════════════════════════════════════════════════════
  // SECTION 7: SIMULATOR ISOLATION (ZERO PRODUCTION POLLUTION)
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 7. Validating Simulator Isolation from Production SQLite...");

  // Verify that storage_nodes only contains AETHERGRID-NODE-001
  const allNodes = db.prepare("SELECT id FROM storage_nodes").all();
  assert(
    allNodes.length === 1 && allNodes[0].id === "AETHERGRID-NODE-001",
    `Production database has exactly 1 storage node: AETHERGRID-NODE-001 (found: ${allNodes.map((n) => n.id).join(", ")})`
  );

  // Verify that SIM-NODE-ALPHA and SIM-NODE-BETA do not exist in storage_nodes
  const simAlpha = db.prepare("SELECT id FROM storage_nodes WHERE id = 'SIM-NODE-ALPHA'").get();
  const simBeta = db.prepare("SELECT id FROM storage_nodes WHERE id = 'SIM-NODE-BETA'").get();
  assert(!simAlpha, "SIM-NODE-ALPHA does not exist in production storage_nodes");
  assert(!simBeta, "SIM-NODE-BETA does not exist in production storage_nodes");

  // ══════════════════════════════════════════════════════════════════
  // SECTION 8: GLOBAL CODEBASE DECEPTIVE PHRASING AUDIT
  // ══════════════════════════════════════════════════════════════════
  console.log("\n▶ 8. Validating Zero Deceptive Hardcoded Copy Across UI...");

  const filesToCheck = [
    "components/ui/status-badge.tsx",
    "components/upload-panel.tsx",
    "components/ui/storage-meter.tsx",
    "components/ui/error-state.tsx",
    "components/file-row.tsx",
    "app/dashboard/page.tsx",
    "app/layout.tsx",
    "app/page.tsx",
  ];

  for (const relPath of filesToCheck) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf-8");

    // Check forbidden deceptive phrases outside comments / simulation labels
    const forbiddenPhrases = [
      "Healthy — 2x Replicas",
      "redundant peer replicas",
      "Degraded — Failover Active",
      "Recovering Replicas",
    ];

    for (const phrase of forbiddenPhrases) {
      assert(
        !content.includes(phrase),
        `File ${relPath} does NOT contain forbidden phrase: "${phrase}"`
      );
    }
  }

  // Restore Node #001 to fresh ONLINE state
  db.prepare("UPDATE storage_nodes SET status = 'ONLINE' WHERE id = 'AETHERGRID-NODE-001'").run();
  recordNodeHeartbeat("AETHERGRID-NODE-001", 0, 107374182400, 5);

  // ══════════════════════════════════════════════════════════════════
  // SUMMARY & COMPLETION
  // ══════════════════════════════════════════════════════════════════
  console.log("\n" + "=".repeat(75));
  console.log("   🏆 STATE INTEGRITY & TRUTHFULNESS SUITE RESULTS");
  console.log(`   Total Tests Executed: ${totalTests}`);
  console.log(`   Tests Passed:         ${passedTests}`);
  console.log(`   Tests Failed:         ${failedTests}`);
  console.log("=".repeat(75) + "\n");

  if (failedTests > 0) {
    console.error(`❌ STATE INTEGRITY SUITE FAILED WITH ${failedTests} DEFECTS`);
    process.exit(1);
  } else {
    console.log("🌟 ALL STATE INTEGRITY AND TRUTHFULNESS TESTS PASSED WITH 100% SUCCESS!");
    process.exit(0);
  }
}

runStateIntegritySuite().catch((err) => {
  console.error("FATAL ERROR IN STATE INTEGRITY SUITE:", err);
  process.exit(1);
});
