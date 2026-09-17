import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getStorageNodeById, setNodeStatus } from "@/lib/db";
import { evaluateNodeHealth } from "@/lib/orchestrator";
import { logger } from "@/lib/logger";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["ONLINE", "SUSPECTED_OFFLINE", "OFFLINE", "PAUSED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const node = getStorageNodeById(id);
    if (!node) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    if (String(node.owner_id) !== session.userId && !session.roles.includes("ADMIN")) {
      logger.security("Unauthorized attempt to alter node status", { nodeId: id, userId: session.userId });
      return NextResponse.json({ error: "Forbidden: You do not own this storage node." }, { status: 403 });
    }

    setNodeStatus(id, status);
    evaluateNodeHealth();

    const updated = getStorageNodeById(id);
    return NextResponse.json({ success: true, node: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update node status" }, { status: 500 });
  }
}
