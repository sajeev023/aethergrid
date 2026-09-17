#!/usr/bin/env node
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

// Parse CLI arguments
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
}

const nodeToken = getArg("token", process.env.AETHER_NODE_TOKEN || "aeth_prod_node_001_secret_token_live");
const storageDir = path.resolve(getArg("dir", process.env.AETHERGRID_NODE_STORAGE_PATH || "D:\\AetherGridStorage"));
const serverUrl = getArg("server", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
const capacityGb = parseInt(getArg("capacity", process.env.AETHERGRID_NODE_CAPACITY_GB || "50"), 10);
const capacityBytes = capacityGb * 1024 * 1024 * 1024;
const nodeId = getArg("nodeId", process.env.AETHERGRID_NODE_ID || "AETHERGRID-NODE-001");

// Ensure required subdirectories exist
const chunksDir = path.join(storageDir, "chunks");
const metaDir = path.join(storageDir, "metadata");
const logsDir = path.join(storageDir, "logs");

for (const dir of [chunksDir, metaDir, logsDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Write PID file for process tracking
const pidFile = path.join(metaDir, "daemon.pid");
fs.writeFileSync(pidFile, String(process.pid));

const logFile = path.join(logsDir, "node-daemon.log");
function writeLog(line) {
  const timeStr = new Date().toISOString();
  const formatted = `[${timeStr}] ${line}\n`;
  try {
    fs.appendFileSync(logFile, formatted);
  } catch {}
  process.stdout.write(formatted);
}

writeLog("=======================================================");
writeLog(`   🌐 AETHERGRID STORAGE NODE DAEMON — ${nodeId}`);
writeLog("=======================================================");
writeLog(`📡 Control Plane:   ${serverUrl}`);
writeLog(`💾 Storage Root:    ${storageDir}`);
writeLog(`📦 Node Capacity:   ${capacityGb} GB (${capacityBytes.toLocaleString()} bytes)`);
writeLog(`🔑 Token Digest:    ${nodeToken.slice(0, 8)}...[AUTHENTICATED]`);
writeLog(`⚙️ Process PID:     ${process.pid}`);
writeLog("-------------------------------------------------------");

function getPhysicalDiskFreeBytes() {
  try {
    const stats = fs.statfsSync(storageDir);
    return Number(BigInt(stats.bfree) * BigInt(stats.bsize));
  } catch {
    return capacityBytes;
  }
}

function calculateDirSize(dir) {
  let total = 0;
  let count = 0;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith(".chunk")) {
        const p = path.join(dir, file);
        const stat = fs.statSync(p);
        if (stat.isFile()) {
          total += stat.size;
          count++;
        }
      }
    }
  } catch {}
  return { totalBytes: total, fileCount: count };
}

let isHeartbeatInFlight = false;

async function sendHeartbeat() {
  if (isHeartbeatInFlight) return;
  isHeartbeatInFlight = true;

  const { totalBytes, fileCount } = calculateDirSize(chunksDir);
  const physicalFree = getPhysicalDiskFreeBytes();
  const availableBytes = Math.max(0, Math.min(capacityBytes - totalBytes, physicalFree));
  const startTime = Date.now();

  const payload = JSON.stringify({
    token: nodeToken,
    nodeId,
    usedBytes: totalBytes,
    availableBytes,
    chunkCount: fileCount,
    physicalFreeBytes: physicalFree,
    version: "1.0.0",
  });

  const url = new URL(`${serverUrl}/api/nodes/heartbeat`);
  const client = url.protocol === "https:" ? https : http;

  const req = client.request(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${nodeToken}`,
        "Content-Length": Buffer.byteLength(payload),
      },
      timeout: 8000,
    },
    (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        isHeartbeatInFlight = false;
        const latency = Date.now() - startTime;
        if (res.statusCode === 200) {
          const usedMb = (totalBytes / (1024 * 1024)).toFixed(2);
          const freeGb = (physicalFree / (1024 * 1024 * 1024)).toFixed(1);
          writeLog(`🟢 ONLINE | Chunks: ${fileCount} (${usedMb} MB) | Disk Free: ${freeGb} GB | Latency: ${latency}ms`);
        } else {
          writeLog(`⚠️ Server warning [HTTP ${res.statusCode}]: ${body}`);
        }
      });
    }
  );

  req.on("error", (err) => {
    isHeartbeatInFlight = false;
    writeLog(`🔴 Heartbeat failed: ${err.message}`);
  });

  req.on("timeout", () => {
    isHeartbeatInFlight = false;
    req.destroy();
    writeLog("🔴 Heartbeat timed out after 8000ms");
  });

  req.write(payload);
  req.end();
}

// Initial pulse
sendHeartbeat();

// Periodic 15s pulse
const interval = setInterval(sendHeartbeat, 15000);

function cleanup() {
  writeLog("🛑 Shutting down AetherGrid storage daemon cleanly...");
  clearInterval(interval);
  try {
    if (fs.existsSync(pidFile)) fs.unlinkSync(pidFile);
  } catch {}
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
