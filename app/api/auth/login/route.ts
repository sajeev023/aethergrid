import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateCheck = checkRateLimit(`login_${clientIp}`, 15, 60); // 15 attempts per 60s
    if (!rateCheck.allowed) {
      logger.security("Login brute-force rate limit reached", { clientIp });
      return NextResponse.json({ error: "Too many login attempts. Please try again in 1 minute." }, { status: 429 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user) {
      logger.security("Failed login attempt: user not found", { clientIp });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      logger.security("Failed login attempt: invalid password", { userId: user.id, clientIp });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    logger.security("Successful user login", { userId: user.id });

    const primaryRole = user.roles.includes("GIVER") ? "GIVER" : "TAKER";

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      activeRole: primaryRole,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        activeRole: primaryRole,
      },
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
