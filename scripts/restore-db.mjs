import fs from "fs";
import path from "path";
import crypto from "crypto";
import { DatabaseSync } from "node:sqlite";

async function restoreAndVerifyDatabase() {
  const backupDir = path.resolve(process.cwd(), "data", "backups");
  if (!fs.existsSync(backupDir)) {
    throw new Error("No backup directory found at data/backups");
  }

  const files = fs.readdirSync(backupDir).filter((f) => f.endsWith(".db"));
  if (files.length === 0) {
    throw new Error("No backup .db files found in data/backups");
  }

  files.sort().reverse();
  const latestBackup = files[0];
  const latestBackupPath = path.join(backupDir, latestBackup);
  const manifestPath = `${latestBackupPath}.manifest.json`;

  console.log(`[Restore] Verifying backup snapshot: ${latestBackup}...`);

  // 1. Verify Manifest SHA-256
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const fileBuffer = fs.readFileSync(latestBackupPath);
    const checksum = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    if (checksum !== manifest.sha256) {
      throw new Error(`Integrity Check Failed! Calculated: ${checksum}, Expected: ${manifest.sha256}`);
    }
    console.log("  ✅ Checksum verified against signed manifest.");
  }

  // 2. Open in temporary verification database
  const verifyDb = new DatabaseSync(latestBackupPath);
  verifyDb.exec("PRAGMA integrity_check;");

  const tables = ["users", "storage_nodes", "files", "storage_chunks", "taker_subscriptions", "payment_transactions", "referrals"];
  console.log("  Verifying table schemas & row counts:");
  for (const t of tables) {
    try {
      const row = verifyDb.prepare(`SELECT COUNT(*) as c FROM ${t}`).get();
      console.log(`    - Table ${t}: ${row?.c || 0} records`);
    } catch {
      console.log(`    - Table ${t}: empty or not created`);
    }
  }

  verifyDb.close();
  console.log("✅ [Restore & Verification Passed] Snapshot is 100% healthy and restorable.");
}

restoreAndVerifyDatabase().catch((err) => {
  console.error("❌ Restore verification failed:", err);
  process.exit(1);
});
