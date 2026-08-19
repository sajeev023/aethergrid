import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getInstitutionData } from "@/lib/site-data";
import { getSubmissions, saveSubmissions } from "@/lib/admin/db";
import type { Submission } from "@/lib/admin/types";

export const runtime = "nodejs";

const allowedTypes = new Set(["inquiry", "contact", "admissions"]);

type InquiryPayload = Record<string, unknown> & {
  type?: string;
  name?: string;
  studentName?: string;
  parentName?: string;
  email?: string;
  phone?: string;
  stream?: string;
  board?: string;
  percentage?: string;
  message?: string;
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  /** Honeypot — must stay empty. Bots fill hidden fields. */
  website?: string;
};

// ─── In-memory rate limiting ──────────────────────────────────────────────────
// NOTE: This only works on a single long-lived instance (dev / a single Vercel
// function instance). For multi-instance production, replace with Upstash
// Ratelimit or Vercel KV. It is a first line of defense, not a complete one.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5; // 5 submissions per IP per window
const ipHits = new Map<string, { count: number; firstAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.firstAt > RATE_WINDOW_MS) {
    ipHits.set(ip, { count: 1, firstAt: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Local storage helper — single source of truth: data/submissions.json (admin DB)
function saveSubmission(payload: Record<string, string>): string {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const newAdminEntry: Submission = {
    id,
    timestamp,
    type: payload.type ?? "inquiry",
    name: payload.name ?? "",
    studentName: payload.studentName,
    parentName: payload.parentName,
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    stream: payload.stream,
    board: payload.board,
    percentage: payload.percentage,
    message: payload.message ?? "",
    activeInst: payload.activeInst ?? "lfjc",
    status: "new",
    notes: "",
    updatedAt: null,
  };

  const adminSubmissions = getSubmissions();
  adminSubmissions.push(newAdminEntry);
  saveSubmissions(adminSubmissions);
  console.info(`[inquiries] Saved to admin DB id=${id} type=${payload.type}`);
  return id;
}

export async function POST(request: NextRequest) {
  // ── Rate limit ──
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions from your address. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  // ── Honeypot: bots fill the hidden "website" field. Silently accept & drop. ──
  const honeypot = String(payload.website ?? "").trim();
  if (honeypot.length > 0) {
    // Pretend success so bots don't retry with variations.
    return NextResponse.json({ message: "Thank you. Your request has been received." });
  }

  // Inputs Sanitization and Cap length limits
  const type = String(payload.type ?? "").trim().substring(0, 50);
  const name = String(payload.name ?? payload.studentName ?? "").trim().substring(0, 100);
  const parentName = String(payload.parentName ?? "").trim().substring(0, 100);
  const message = String(payload.message ?? "").trim().substring(0, 3000);
  const email = String(payload.email ?? "").trim().substring(0, 100);
  const phone = String(payload.phone ?? "").trim().substring(0, 50);
  const stream = String(payload.stream ?? "").trim().substring(0, 100);
  const board = String(payload.board ?? "").trim().substring(0, 100);
  const percentage = String(payload.percentage ?? "").trim().substring(0, 50);
  const activeInst = (payload.activeInst as "root" | "lfs" | "lfjc" | "lfdc") ?? "lfjc";

  if (!allowedTypes.has(type)) {
    return NextResponse.json(
      { message: "Please choose a valid form type." },
      { status: 400 },
    );
  }

  if (name.length < 2 || message.length < 8) {
    return NextResponse.json(
      { message: "Please enter a valid name and message (minimum 8 characters)." },
      { status: 400 },
    );
  }

  if (!email && !phone) {
    return NextResponse.json(
      { message: "Please provide either an email address or mobile number." },
      { status: 400 },
    );
  }

  if (type === "admissions") {
    if (parentName.length < 2) {
      return NextResponse.json(
        { message: "Please enter a valid parent/guardian name." },
        { status: 400 },
      );
    }
    if (!stream) {
      return NextResponse.json(
        { message: "Please select a preferred academic stream." },
        { status: 400 },
      );
    }
  }

  // Assemble sanitized payload
  const sanitizedPayload: Record<string, string> = {
    type,
    name,
    message,
    email,
    phone,
    activeInst,
  };

  if (type === "admissions") {
    sanitizedPayload.studentName = name;
    sanitizedPayload.parentName = parentName;
    sanitizedPayload.stream = stream;
    sanitizedPayload.board = board;
    sanitizedPayload.percentage = percentage;
  }

  // ── Persist FIRST (guarantees the lead is never lost, even if email fails) ──
  let savedId = "";
  try {
    savedId = saveSubmission(sanitizedPayload);
  } catch (error) {
    console.error("[inquiries] CRITICAL: failed to persist submission:", error);
    return NextResponse.json(
      { message: "We could not record your submission right now. Please call the office or try again." },
      { status: 500 },
    );
  }

  const instData = getInstitutionData(activeInst);
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.FORM_TO_EMAIL ?? instData.email;
  const fromEmail =
    process.env.FORM_FROM_EMAIL ?? `${instData.shortName} Website <onboarding@resend.dev>`;

  const subject = `${instData.shortName} ${titleCase(type)} Submission - ${name}`;
  const html = renderEmail(sanitizedPayload, instData.name);

  // ── Email is an ALERT channel, not the system of record. ──
  // The submission is already saved to the admin DB above, so the admissions
  // office will see it in the admin dashboard regardless of email outcome.
  // We are honest with the visitor: we confirm their submission was recorded,
  // and we only say "received your request" (implying email) when delivery
  // actually succeeded. We never report an email failure as a success.
  if (!resendKey) {
    console.warn(`[inquiries] RESEND_API_KEY not set — submission ${savedId} saved to admin DB only. Configure Resend to email-alert the admissions office.`);
    return NextResponse.json({
      message: `Thank you. Your submission has been recorded. The ${instData.shortName} office will contact you shortly.`,
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
        reply_to: email || undefined,
      }),
    });

    if (!response.ok) {
      // Saved to DB already — alert the operator, don't lie to the visitor.
      console.warn(`[inquiries] Resend rejected delivery for ${savedId}: ${response.statusText}. Submission is still in the admin DB.`);
      return NextResponse.json({
        message: `Thank you. Your submission has been recorded. The ${instData.shortName} office will contact you shortly.`,
      });
    }
  } catch (error) {
    console.error(`[inquiries] Resend threw for ${savedId}:`, error);
    return NextResponse.json({
      message: `Thank you. Your submission has been recorded. The ${instData.shortName} office will contact you shortly.`,
    });
  }

  return NextResponse.json({
    message: `Thank you. The ${instData.shortName} office has received your request and will be in touch.`,
  });
}

function renderEmail(payload: Record<string, string>, schoolName: string) {
  const rows = Object.entries(payload)
    .filter(([key, value]) => key !== "activeInst" && String(value ?? "").trim().length > 0)
    .map(([key, value]) => {
      return `<tr><td style="padding:8px 12px;border:1px solid #dde4e6;font-weight:600;">${escapeHtml(
        labelize(key),
      )}</td><td style="padding:8px 12px;border:1px solid #dde4e6;">${escapeHtml(
        String(value),
      )}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#161d1f;line-height:1.6;">
      <h1 style="font-size:22px;margin:0 0 12px;">${schoolName} Website Submission</h1>
      <p style="margin:0 0 18px;">A new form submission arrived from the ${schoolName} digital portal.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table>
    </div>
  `;
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}