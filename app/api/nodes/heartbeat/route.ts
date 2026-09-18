import { NextRequest, NextResponse } from "next/server";
import { getDatabase, recordNodeHeartbeat } from "@/lib/db";
import { logger } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rate-limit";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateLimit = checkRateLimit(`heartbeat_${clientIp}`, 120, 60);
    if (!rateLimit.allowed) {
      logger.security("Heartbeat rate limit exceeded", { clientIp });
      return NextResponse.json({ error: "Too many heartbeat requests. Rate limited." }, { status: 429 });
    }

    let token: string | undefined;

    // 1. Check Authorization header first
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }

    // 2. Fallback to JSON body token
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {}

    if (!token && typeof body.token === "string") {
      token = body.token.trim();
    }

    if (!token) {
      logger.security("Heartbeat rejected: Missing node token");
      return NextResponse.json({ error: "Unauthorized: Missing node authentication token." }, { status: 401 });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const db = getDatabase();

    // Strictly authenticate node by token hash only — NEVER trust client-provided nodeId
    const node = db.prepare(`
      SELECT id, node_name, status, capacity_bytes, storage_directory, revoked_at 
      FROM storage_nodes 
      WHERE node_token_hash = ?
    `).get(tokenHash) as {
      id: string;
      node_name: string;
      status: string;
      capacity_bytes: number;
      storage_directory: string;
      revoked_at?: string;
    } | undefined;

    if (!node || node.status === "REVOKED" || node.revoked_at) {
      logger.security("Heartbeat rejected: Node token unrecognized or revoked", { tokenHashPrefix: tokenHash.substring(0, 8) });
      return NextResponse.json({ error: "Unauthorized: Node token unrecognized or revoked." }, { status: 401 });
    }

    // 3. Strict telemetry validation: protect against metric injection, NaN, Infinity, negative values, and capacity overflow
    if (body.usedBytes !== undefined) {
      if (typeof body.usedBytes !== "number" || !Number.isFinite(body.usedBytes) || body.usedBytes < 0) {
        logger.security("Heartbeat rejected: Malformed or negative usedBytes telemetry", { nodeId: node.id, usedBytes: body.usedBytes });
        return NextResponse.json({ error: "Invalid telemetry metrics: usedBytes must be a non-negative finite number." }, { status: 400 });
      }
      if (body.usedBytes > node.capacity_bytes) {
        logger.security("Heartbeat rejected: usedBytes exceeds registered node capacity", { nodeId: node.id, usedBytes: body.usedBytes, capacity: node.capacity_bytes });
        return NextResponse.json({ error: "Invalid telemetry metrics: usedBytes exceeds node capacity bounds." }, { status: 400 });
      }
    }

    if (body.availableBytes !== undefined) {
      if (typeof body.availableBytes !== "number" || !Number.isFinite(body.availableBytes) || body.availableBytes < 0) {
        logger.security("Heartbeat rejected: Malformed or negative availableBytes telemetry", { nodeId: node.id, availableBytes: body.availableBytes });
        return NextResponse.json({ error: "Invalid telemetry metrics: availableBytes must be a non-negative finite number." }, { status: 400 });
      }
    }

    if (body.latencyMs !== undefined) {
      if (typeof body.latencyMs !== "number" || !Number.isFinite(body.latencyMs) || body.latencyMs < 0 || body.latencyMs > 60000) {
        logger.security("Heartbeat rejected: Out of range latencyMs telemetry", { nodeId: node.id, latencyMs: body.latencyMs });
        return NextResponse.json({ error: "Invalid telemetry metrics: latencyMs must be a finite number between 0 and 60000 ms." }, { status: 400 });
      }
    }

    const usedBytes = typeof body.usedBytes === "number" ? Math.floor(body.usedBytes) : 0;
    const availableBytes = typeof body.availableBytes === "number" ? Math.floor(body.availableBytes) : Math.max(0, node.capacity_bytes - usedBytes);
    const latencyMs = typeof body.latencyMs === "number" ? Math.round(body.latencyMs) : 5;

    recordNodeHeartbeat(node.id, usedBytes, availableBytes, latencyMs);

    return NextResponse.json({
      status: "OK",
      nodeId: node.id,
      nodeName: node.node_name,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    logger.error("Heartbeat handler failed", { error: String(error) });
    return NextResponse.json({ error: "Heartbeat recording failed" }, { status: 500 });
  }
}
