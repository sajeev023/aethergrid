import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { findUserById, updateUserRoles } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { targetRole } = body; // 'GIVER' | 'TAKER'

    if (!["GIVER", "TAKER"].includes(targetRole)) {
      return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
    }

    const user = findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Ensure user roles include both if switching
    const rolesArray = user.roles.split(",").map((r: string) => r.trim());
    if (!rolesArray.includes(targetRole)) {
      rolesArray.push(targetRole);
      updateUserRoles(user.id, rolesArray.join(","));
    }

    const newToken = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roles: rolesArray.join(","),
      activeRole: targetRole,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      activeRole: targetRole,
      roles: rolesArray.join(","),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to switch role" }, { status: 500 });
  }
}
