import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getReferralStats } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const stats = getReferralStats(session.userId);
    return NextResponse.json(stats);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to load referral stats";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
