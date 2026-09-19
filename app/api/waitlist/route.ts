import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateCheck = checkRateLimit(`waitlist_${clientIp}`, 10, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : undefined;

    if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    addToWaitlist({ email, name, ipAddress: clientIp });
    logger.info("New waitlist entry added", { email: email.slice(0, 3) + "***" });

    return NextResponse.json({
      success: true,
      message: "You're on the list.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to join waitlist";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
