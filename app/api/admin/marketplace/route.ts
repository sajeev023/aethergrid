import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getMarketplaceMetrics, getDatabase } from "@/lib/db";
import { evaluateNodeHealth } from "@/lib/orchestrator";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      logger.security("Unauthenticated attempt to access admin marketplace API");
      return NextResponse.json({ error: "Unauthorized: Admin session required." }, { status: 401 });
    }

    if (!session.roles.includes("ADMIN")) {
      logger.security("Non-admin user attempted to access admin marketplace API", { userId: session.userId });
      return NextResponse.json({ error: "Forbidden: Admin privileges required." }, { status: 403 });
    }

    evaluateNodeHealth();
    const metrics = getMarketplaceMetrics();

    const db = getDatabase();
    const nodes = db.prepare(`
      SELECT 
        sn.id, sn.node_name, sn.status, sn.capacity_bytes, sn.allocated_bytes, 
        sn.used_bytes, sn.last_heartbeat_at, sn.uptime_seconds, u.name as owner_name
      FROM storage_nodes sn
      JOIN users u ON sn.owner_id = u.id
      ORDER BY sn.created_at DESC
    `).all() as any[];

    const recentHeartbeats = db.prepare(`
      SELECT nh.*, sn.node_name 
      FROM node_heartbeats nh
      JOIN storage_nodes sn ON nh.node_id = sn.id
      ORDER BY nh.recorded_at DESC
      LIMIT 10
    `).all() as any[];

    return NextResponse.json({
      metrics,
      nodes,
      recentHeartbeats,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load marketplace metrics" }, { status: 500 });
  }
}
