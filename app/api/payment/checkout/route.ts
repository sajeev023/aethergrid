import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

const PLANS: Record<string, { name: string; priceInr: number; quotaGb: number }> = {
  PLAN_20GB: { name: "Starter Cloud (20 GB)", priceInr: 20, quotaGb: 20 },
  PLAN_55GB: { name: "Pro Cloud (55 GB)", priceInr: 55, quotaGb: 55 },
  PLAN_100GB: { name: "Ultra Cloud (100 GB)", priceInr: 99, quotaGb: 100 },
  PLAN_500GB: { name: "Master Grid (500 GB)", priceInr: 449, quotaGb: 500 },
};

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { planId } = body;

    const selectedPlan = PLANS[planId];
    if (!selectedPlan) {
      return NextResponse.json({ error: "Invalid storage plan selected." }, { status: 400 });
    }

    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

    return NextResponse.json({
      success: true,
      orderId,
      planId,
      planName: selectedPlan.name,
      amountInr: selectedPlan.priceInr,
      currency: "INR",
      notes: {
        userId: session.userId,
        email: session.email,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Checkout initiation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
