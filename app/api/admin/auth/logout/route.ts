import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSessionFromCookie, logAudit } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (session) {
    logAudit(session.userId, session.username, "logout", "User logged out", ip);
  }

  await clearSessionCookie();

  return NextResponse.json({ message: "Logged out successfully." });
}
