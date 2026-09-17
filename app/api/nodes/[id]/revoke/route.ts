import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { revokeStorageNode } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      logger.security("Unauthenticated node revocation attempt blocked");
      return NextResponse.json({ error: "Unauthorized: Authentication required." }, { status: 401 });
    }

    const { id } = await params;

    revokeStorageNode(id, session.userId);

    logger.security("Node successfully revoked by owner", { nodeId: id, userId: session.userId });

    return NextResponse.json({
      success: true,
      nodeId: id,
      status: "REVOKED",
      revokedAt: new Date().toISOString(),
      message: "Node credentials revoked immediately. The node can no longer send heartbeats or accept storage allocations.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Node revocation failed";
    const status = msg.includes("Access Denied") ? 403 : msg.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
