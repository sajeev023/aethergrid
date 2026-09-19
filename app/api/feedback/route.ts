import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { addFeedback } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateCheck = checkRateLimit(`feedback_${clientIp}`, 10, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: "Too many feedback submissions. Please try again later." }, { status: 429 });
    }

    const session = await getCurrentUser(request).catch(() => null);
    const body = await request.json().catch(() => ({}));

    const message = typeof body.message === "string" ? body.message.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "GENERAL";
    const userEmail = session?.email || (typeof body.email === "string" ? body.email.trim() : undefined);

    if (!message || message.length < 3) {
      return NextResponse.json({ error: "Please enter your feedback message (at least 3 characters)." }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Feedback message must not exceed 2000 characters." }, { status: 400 });
    }

    const result = addFeedback({
      userId: session?.userId,
      userEmail,
      category,
      message,
    });

    logger.info("New feedback received", { category, hasUser: !!session });

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
      id: result.id,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to record feedback";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
