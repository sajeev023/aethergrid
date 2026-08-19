import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSessionFromCookie();

  if (!session) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      username: session.username,
      displayName: session.displayName,
      role: session.role,
    },
  });
}
