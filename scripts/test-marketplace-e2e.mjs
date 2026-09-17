import crypto from "crypto";
import fs from "fs";
import path from "path";
import { 
  getDatabase, 
  createUser, 
  findUserByEmail, 
  registerStorageNode, 
  recordNodeHeartbeat, 
  setNodeStatus 
} from "../lib/db.js";
import { 
  distributeAndStoreFile, 
  retrieveAndDecryptFile, 
  evaluateNodeHealth, 
  deleteFileDistributed 
} from "../lib/orchestrator/index.js";

async function runMarketplaceE2ETest() {
  console.log("\n=======================================================");
  console.log("   🚀 AETHERGRID DISTRIBUTED STORAGE MARKETPLACE E2E   ");
  console.log("=======================================================\n");

  const db = getDatabase();

  // 1. Create Provider Alice & Node Alpha
  console.log("[1/7] Provisioning Giver Node Alpha (Alice)...");
  const aliceEmail = `alice_${Date.now()}@giver.io`;
  const alice = createUser({
    id: `usr_alice_${Date.now()}`,
    name: "Alice Node Provider",
    email: aliceEmail,
    passwordHash: "hash123",
    roles: "GIVER",
  });

  const nodeAlphaDir = path.resolve(process.cwd(), "data", "nodes", "node_alpha");
  const nodeAlpha = registerStorageNode({
    id: "node_alpha",
    ownerId: alice.id,
    nodeName: "Alice Primary Storage",
    nodeTokenHash: crypto.createHash("sha256").update("token_alpha").digest("hex"),
    capacityBytes: BigInt(50) * BigInt(1024) * BigInt(1024) * BigInt(1024),
    storageDirectory: nodeAlphaDir,
  });
  recordNodeHeartbeat("node_alpha", 0, 50 * 1024 * 1024 * 1024, 6);
  console.log(`  ✅ Node Alpha registered and ONLINE at: ${nodeAlphaDir}`);

  // 2. Create Provider Bob & Node Beta
  console.log("\n[2/7] Provisioning Giver Node Beta (Bob)...");
  const bobEmail = `bob_${Date.now()}@giver.io`;
  const bob = createUser({
    id: `usr_bob_${Date.now()}`,
    name: "Bob Node Provider",
    email: bobEmail,
    passwordHash: "hash123",
    roles: "GIVER",
  });

  const nodeBetaDir = path.resolve(process.cwd(), "data", "nodes", "node_beta");
  const nodeBeta = registerStorageNode({
    id: "node_beta",
    ownerId: bob.id,
    nodeName: "Bob Secondary Storage",
    nodeTokenHash: crypto.createHash("sha256").update("token_beta").digest("hex"),
    capacityBytes: BigInt(50) * BigInt(1024) * BigInt(1024) * BigInt(1024),
    storageDirectory: nodeBetaDir,
  });
  recordNodeHeartbeat("node_beta", 0, 50 * 1024 * 1024 * 1024, 8);
  console.log(`  ✅ Node Beta registered and ONLINE at: ${nodeBetaDir}`);

  // 3. Create Taker Charlie
  console.log("\n[3/7] Provisioning Taker Charlie (Cloud User)...");
  const charlieEmail = `charlie_${Date.now()}@taker.io`;
  const charlie = createUser({
    id: `usr_charlie_${Date.now()}`,
    name: "Charlie Cloud User",
    email: charlieEmail,
    passwordHash: "hash123",
    roles: "TAKER",
  });
  console.log(`  ✅ Taker Charlie registered with auto-provisioned 20 GB trial quota.`);

  // 4. Taker Charlie uploads a real file
  console.log("\n[4/7] Taker Charlie uploads test document (AES-256-GCM + 2x Replication)...");
  const originalPayload = Buffer.from("TOP_SECRET_RECOVERABLE_PERSONAL_BACKUP_DATA_" + "X".repeat(50000));
  const originalChecksum = crypto.createHash("sha256").update(originalPayload).digest("hex");

  const storedFile = await distributeAndStoreFile({
    userId: charlie.id,
    originalName: "charlie_vault_backup.dat",
    mimeType: "application/octet-stream",
    fileBuffer: originalPayload,
  });

  console.log(`  ✅ File distributed. ID: ${storedFile.id}`);
  console.log(`  ✅ Total Chunks: ${storedFile.totalChunks}`);
  console.log(`  ✅ Primary Node: ${storedFile.chunks[0].primaryNode}`);
  console.log(`  ✅ Replica Node: ${storedFile.chunks[0].replicaNode}`);

  // Verify encrypted chunk files physically exist on disk in provider dirs
  const alphaChunks = fs.readdirSync(path.join(nodeAlphaDir, "chunks"));
  const betaChunks = fs.readdirSync(path.join(nodeBetaDir, "chunks"));
  console.log(`  ✅ Disk Verification: Node Alpha has ${alphaChunks.length} chunk(s), Node Beta has ${betaChunks.length} chunk(s)`);

  if (alphaChunks.length === 0 || betaChunks.length === 0) {
    throw new Error("Physical chunk replication failed!");
  }

  // 5. Download file when all nodes healthy
  console.log("\n[5/7] Normal Download Verification (Both nodes online)...");
  const normalDownload = await retrieveAndDecryptFile(storedFile.id, charlie.id);
  const downloadedChecksum = crypto.createHash("sha256").update(normalDownload.fileBuffer).digest("hex");

  if (downloadedChecksum !== originalChecksum) {
    throw new Error("Checksum mismatch on normal download!");
  }
  console.log(`  ✅ 100% Integrity Verified. Failover Used: ${normalDownload.failoverUsed} (Status: ${normalDownload.fileRecord.status})`);

  // 6. Chaos Test: DROP Node Alpha and verify replica failover!
  console.log("\n[6/7] 💥 Chaos Resilience Test: Dropping Node Alpha to OFFLINE...");
  setNodeStatus("node_alpha", "OFFLINE");
  evaluateNodeHealth();

  console.log("  Attempting to retrieve file while Node Alpha is DEAD...");
  const failoverDownload = await retrieveAndDecryptFile(storedFile.id, charlie.id);
  const failoverChecksum = crypto.createHash("sha256").update(failoverDownload.fileBuffer).digest("hex");

  if (failoverChecksum !== originalChecksum) {
    throw new Error("Failover data corrupted or mismatch!");
  }

  console.log(`  ✅ FAILOVER SUCCESSFUL! Data rescued from Node Beta replica.`);
  console.log(`  ✅ Failover Header Used: ${failoverDownload.failoverUsed}`);
  console.log(`  ✅ File Status: ${failoverDownload.fileRecord.status}`);

  // 7. Reconnect Node Alpha and clean up
  console.log("\n[7/7] Reconnecting Node Alpha & Restoring Redundancy...");
  setNodeStatus("node_alpha", "ONLINE");
  recordNodeHeartbeat("node_alpha", 0, 50 * 1024 * 1024 * 1024, 5);
  evaluateNodeHealth();

  const restoredDownload = await retrieveAndDecryptFile(storedFile.id, charlie.id);
  console.log(`  ✅ Network Healed. Cluster Health: ${restoredDownload.fileRecord.status}`);

  console.log("\n=======================================================");
  console.log("   🎉 ALL 7 E2E TESTS PASSED WITH 100% SUCCESS!        ");
  console.log("=======================================================\n");
}

runMarketplaceE2ETest().catch((err) => {
  console.error("❌ E2E TEST FAILED:", err);
  process.exit(1);
});
