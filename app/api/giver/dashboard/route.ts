import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getStorageNodesByOwner, getProviderEarnings } from "@/lib/db";
import { evaluateNodeHealth } from "@/lib/orchestrator";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Refresh node health states based on elapsed heartbeats
    evaluateNodeHealth();

    const nodes = getStorageNodesByOwner(session.userId);
    const earnings = getProviderEarnings(session.userId);

    let totalCapacity = 0;
    let totalAllocated = 0;
    let totalUsed = 0;
    let onlineCount = 0;

    for (const n of nodes) {
      totalCapacity += Number(n.capacity_bytes || 0);
      totalAllocated += Number(n.allocated_bytes || 0);
      totalUsed += Number(n.used_bytes || 0);
      if (n.status === "ONLINE") onlineCount++;
    }

    return NextResponse.json({
      nodes,
      summary: {
        totalNodes: nodes.length,
        onlineNodes: onlineCount,
        offlineNodes: nodes.length - onlineCount,
        totalCapacityBytes: totalCapacity,
        totalAllocatedBytes: totalAllocated,
        totalUsedBytes: totalUsed,
      },
      earnings,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load giver dashboard" }, { status: 500 });
  }
}
