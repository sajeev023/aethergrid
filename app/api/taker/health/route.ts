import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getTakerSubscription } from "@/lib/db";
import { getAuthoritativeSystemState } from "@/lib/system-state";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const state = getAuthoritativeSystemState(session.userId);
    const subscription = getTakerSubscription(session.userId);

    return NextResponse.json({
      subscription,
      ...state,
      // Backwards-compatibility aliases
      storageNodeOffline: state.nodeStatus !== "ONLINE",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch storage health" }, { status: 500 });
  }
}
