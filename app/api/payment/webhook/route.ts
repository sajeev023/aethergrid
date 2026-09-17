import { NextRequest, NextResponse } from "next/server";
import { processVerifiedPaymentWebhook } from "@/lib/db";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-aether-signature") || request.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || "whsec_aethergrid_live_prod_secret_2026";

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
