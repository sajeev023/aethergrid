import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getDatabase } from "../lib/db.ts";

async function backupDatabase() {
  const db = getDatabase();
  const backupDir = path.resolve(process.cwd(), "data", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFileName = `aethergrid_backup_${timestamp}.db`;
  const backupFilePath = path.join(backupDir, backupFileName);

  console.log(`[Backup] Starting atomic SQLite snapshot to: ${backupFilePath}...`);

  // Execute atomic online backup
  db.exec(`VACUUM INTO '${backupFilePath.replace(/\\/g, "/")}'`);

  const stat = fs.statSync(backupFilePath);
  const fileBuffer = fs.readFileSync(backupFilePath);
  const checksum = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // Write metadata manifest
  const manifest = {
    backupFile: backupFileName,
    timestamp: new Date().toISOString(),
    sizeBytes: stat.size,
    sha256: checksum,
    sqliteVersion: "node:sqlite (Node 24)",
  };
  fs.writeFileSync(`${backupFilePath}.manifest.json`, JSON.stringify(manifest, null, 2));

  console.log(`✅ [Backup Complete] Size: ${(stat.size / 1024).toFixed(1)} KB | SHA-256: ${checksum}`);
  return { backupFilePath, checksum };
}

backupDatabase().catch((err) => {
  console.error("❌ Backup failed:", err);
  process.exit(1);
});
