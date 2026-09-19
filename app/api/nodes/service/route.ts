import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDatabase, getStorageNodeById } from "@/lib/db";
import { logger } from "@/lib/logger";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

function getNodePaths() {
  const storageDir = process.env.AETHERGRID_NODE_STORAGE_PATH || (
    process.platform === "win32"
      ? (fs.existsSync("D:\\") ? "D:\\AetherGridStorage" : path.resolve(process.cwd(), "data", "storage"))
      : path.resolve(process.cwd(), "data", "storage")
  );
  const pidFile = path.join(storageDir, "metadata", "daemon.pid");
  const logFile = path.join(storageDir, "logs", "node-daemon.log");
  return { storageDir, pidFile, logFile };
}

function isProcessRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { storageDir, pidFile, logFile } = getNodePaths();
    const nodeId = process.env.AETHERGRID_NODE_ID || "AETHERGRID-NODE-001";
    const dbNode = getStorageNodeById(nodeId) as Record<string, unknown> | undefined;

    let isRunning = false;
    let pid: number | null = null;

    if (fs.existsSync(pidFile)) {
      try {
        const rawPid = parseInt(fs.readFileSync(pidFile, "utf-8").trim(), 10);
        if (!isNaN(rawPid) && isProcessRunning(rawPid)) {
          isRunning = true;
          pid = rawPid;
        }
      } catch {}
    }

    // Read last few lines of daemon log
    let recentLogs: string[] = [];
    if (fs.existsSync(logFile)) {
      try {
        const content = fs.readFileSync(logFile, "utf-8");
        const lines = content.trim().split("\n");
        recentLogs = lines.slice(-10);
      } catch {}
    }

    return NextResponse.json({
      nodeId,
      nodeName: dbNode?.node_name || "Node #001",
      status: isRunning ? (dbNode?.status || "ONLINE") : "OFFLINE",
      isRunning,
      pid,
      storageDirectory: storageDir,
      capacityBytes: dbNode?.capacity_bytes || 100 * 1024 * 1024 * 1024,
      usedBytes: dbNode?.used_bytes || 0,
      recentLogs,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to query node service status";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { storageDir, pidFile } = getNodePaths();
    const nodeId = process.env.AETHERGRID_NODE_ID || "AETHERGRID-NODE-001";

    // Check if already running
    if (fs.existsSync(pidFile)) {
      try {
        const rawPid = parseInt(fs.readFileSync(pidFile, "utf-8").trim(), 10);
        if (!isNaN(rawPid) && isProcessRunning(rawPid)) {
          return NextResponse.json({
            success: true,
            message: `Storage node is already running (PID: ${rawPid})`,
            pid: rawPid,
          });
        }
      } catch {}
    }

    // Ensure storage subdirectories exist
    for (const sub of ["chunks", "metadata", "logs"]) {
      const p = path.join(storageDir, sub);
      if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
    }

    const daemonScript = path.resolve(process.cwd(), "node-client", "node-daemon.mjs");
    const capacityGb = parseInt(process.env.AETHERGRID_NODE_CAPACITY_GB || "100", 10);

    const child = spawn(
      process.execPath,
      [daemonScript, "--dir", storageDir, "--capacity", String(capacityGb), "--nodeId", nodeId],
      {
        detached: true,
        stdio: "ignore",
        windowsHide: true,
      }
    );

    child.unref();

    if (child.pid) {
      fs.writeFileSync(pidFile, String(child.pid));
      logger.info(`Node #001 daemon started via service manager (PID: ${child.pid})`);
    }

    return NextResponse.json({
      success: true,
      message: "Node #001 started successfully",
      pid: child.pid,
      storageDirectory: storageDir,
      capacityGb,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to start storage node service";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { pidFile } = getNodePaths();
    const nodeId = process.env.AETHERGRID_NODE_ID || "AETHERGRID-NODE-001";
    const db = getDatabase();

    let stoppedPid: number | null = null;
    if (fs.existsSync(pidFile)) {
      try {
        const rawPid = parseInt(fs.readFileSync(pidFile, "utf-8").trim(), 10);
        if (!isNaN(rawPid) && isProcessRunning(rawPid)) {
          process.kill(rawPid);
          stoppedPid = rawPid;
        }
        fs.unlinkSync(pidFile);
      } catch {}
    }

    // Immediately update status to OFFLINE in database
    const now = new Date().toISOString();
    db.prepare("UPDATE storage_nodes SET status = 'OFFLINE', updated_at = ? WHERE id = ?").run(now, nodeId);

    // Reconcile file status to DEGRADED
    db.prepare(`
      UPDATE files SET status = 'DEGRADED', updated_at = ?
      WHERE id IN (
        SELECT file_id FROM storage_chunks WHERE primary_node_id = ?
      )
    `).run(now, nodeId);

    logger.info(`Node #001 cleanly stopped via service manager (PID: ${stoppedPid})`);

    return NextResponse.json({
      success: true,
      message: "Node #001 shut down cleanly. Node status is now OFFLINE.",
      stoppedPid,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to stop storage node service";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
