import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserByEmail, createUser } from "@/lib/db";
import { hashPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateCheck = checkRateLimit(`register_${clientIp}`, 8, 60); // 8 accounts per 60s
    if (!rateCheck.allowed) {
      logger.security("Registration abuse rate limit reached", { clientIp });
      return NextResponse.json({ error: "Too many registration attempts. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      logger.security("Registration attempt with existing email", { clientIp });
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${crypto.randomBytes(8).toString("hex")}`;
    const initialRole = role && ["GIVER", "TAKER"].includes(role) ? role : "TAKER";

    const user = createUser({
      id: userId,
      email,
      passwordHash,
      name,
      roles: initialRole,
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      activeRole: initialRole,
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
        activeRole: initialRole,
      },
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
  }
}
