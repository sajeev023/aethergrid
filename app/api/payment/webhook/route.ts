import { NextRequest, NextResponse } from "next/server";
import { processVerifiedPaymentWebhook } from "@/lib/db";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-aether-signature") || request.headers.get("x-razorpay-signature");

    if (process.env.NODE_ENV === "production" && !process.env.PAYMENT_WEBHOOK_SECRET) {
      logger.error("PAYMENT_WEBHOOK_SECRET is not configured in production environment!");
      return NextResponse.json({ error: "Internal Configuration Error" }, { status: 500 });
    }
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || "whsec_aethergrid_live_prod_secret_2026";

    // 1. Enforce Webhook Replay Protection via Timestamp Header (5-minute tolerance)
    const timestampHeader =
      request.headers.get("x-aether-timestamp") ||
      request.headers.get("x-razorpay-event-timestamp") ||
      request.headers.get("x-webhook-timestamp");

    if (timestampHeader) {
      const timestampNum = parseInt(timestampHeader, 10);
      if (isNaN(timestampNum)) {
        logger.security("Payment Webhook Rejected: Malformed timestamp header", { timestampHeader });
        return NextResponse.json({ error: "Forbidden: Malformed timestamp header." }, { status: 400 });
      }

      const nowSec = Math.floor(Date.now() / 1000);
      const eventSec = timestampNum > 1e11 ? Math.floor(timestampNum / 1000) : timestampNum;
      const MAX_TOLERANCE_SECONDS = 300; // 5 minutes

      if (Math.abs(nowSec - eventSec) > MAX_TOLERANCE_SECONDS) {
        logger.security("Payment Webhook Rejected: Timestamp outside tolerance window (replay protection)", {
          nowSec,
          eventSec,
          drift: Math.abs(nowSec - eventSec),
        });
        return NextResponse.json(
          { error: "Forbidden: Webhook event timestamp outside valid tolerance window (replay protection)." },
          { status: 403 }
        );
      }
    }

    if (!signature) {
      logger.security("Payment Webhook Rejected: Missing signature header");
      return NextResponse.json({ error: "Unauthorized: Missing webhook cryptographic signature." }, { status: 400 });
    }

    // Verify HMAC SHA-256 signature
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

    const sigBuffer = Buffer.from(signature, "utf-8");
    const expBuffer = Buffer.from(expectedSignature, "utf-8");

    if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      logger.security("Payment Webhook Rejected: Signature mismatch");
      return NextResponse.json({ error: "Forbidden: Cryptographic signature mismatch." }, { status: 403 });
    }

    let payload: Record<string, unknown> = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      userId,
      planId,
      amountInr,
      provider = "payment_gateway",
      providerPaymentId,
      providerOrderId,
    } = payload as {
      userId: string;
      planId: string;
      amountInr: number;
      provider?: string;
      providerPaymentId: string;
      providerOrderId?: string;
    };

    if (!userId || !planId || !amountInr || !providerPaymentId) {
      return NextResponse.json({ error: "Malformed payment event: Missing required transaction identifiers." }, { status: 400 });
    }

    // Process payment idempotently in relational database
    const result = processVerifiedPaymentWebhook({
      userId,
      planId,
      amountInr,
      provider,
      providerPaymentId,
      providerOrderId,
      signature,
      idempotencyKey: providerPaymentId,
    });

    logger.info("Payment webhook verified and processed", { providerPaymentId, userId, planId, status: result.status });

    return NextResponse.json({
      received: true,
      result,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Webhook processing failed";
    logger.error("Payment webhook error", { error: msg });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
