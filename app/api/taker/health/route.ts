import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { calculateTakerStorageUsage, getTakerSubscription } from "@/lib/db";
import { evaluateNodeHealth } from "@/lib/orchestrator";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    evaluateNodeHealth();

    const usage = calculateTakerStorageUsage(session.userId);
    const subscription = getTakerSubscription(session.userId);

    const quotaBytes = subscription ? Number(subscription.quota_bytes) : 3 * 1024 * 1024 * 1024;
    const usedBytes = usage.totalUsedBytes;
    const percentUsed = Math.min(100, Math.round((usedBytes / quotaBytes) * 100));

    return NextResponse.json({
      subscription,
      quotaBytes,
      usedBytes,
      percentUsed,
      breakdown: {
        photosBytes: usage.photosBytes,
        videosBytes: usage.videosBytes,
        documentsBytes: usage.documentsBytes,
        otherBytes: usage.otherBytes,
        trashBytes: usage.trashBytes,
      },
      healthStatus: usage.healthStatus,
      healthMessage: usage.healthMessage,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch storage health" }, { status: 500 });
  }
}
