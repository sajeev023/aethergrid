import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/admin/auth";

export const runtime = "nodejs";

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_ATTEMPTS) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many login attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required." },
      { status: 400 }
    );
  }

  if (username.length > 100 || password.length > 200) {
    return NextResponse.json(
      { message: "Invalid credentials." },
      { status: 400 }
    );
  }

  const result = await login(username, password, ip);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: result.message,
    user: result.session,
  });
}
