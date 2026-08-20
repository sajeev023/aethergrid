import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getInstitutionData } from "@/lib/site-data";
import { getSubmissions, saveSubmissions } from "@/lib/admin/db";
import type { Submission } from "@/lib/admin/types";

export const runtime = "nodejs";

const allowedTypes = new Set(["inquiry", "contact", "admissions", "alumni"]);

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
  consent?: boolean | string;
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  /** Honeypot — must stay empty. Bots fill hidden fields. */
  website?: string;
};

// ─── In-memory rate limiting ──────────────────────────────────────────────────
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
function saveSubmission(payload: Record<string, unknown>): { id: string; refNumber: string } {
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const year = new Date().getFullYear();
  const refCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  const prefix = payload.type === "admissions" ? "ADM" : payload.type === "alumni" ? "ALM" : "INQ";
  const refNumber = `LFJC-${prefix}-${year}-${refCode}`;

  const newAdminEntry: Submission = {
    id,
    refNumber,
    timestamp,
    type: String(payload.type ?? "inquiry"),
    name: String(payload.name ?? payload.studentName ?? ""),
    studentName: payload.studentName ? String(payload.studentName) : undefined,
    parentName: payload.parentName ? String(payload.parentName) : undefined,
    email: String(payload.email ?? ""),
    phone: String(payload.phone ?? ""),
    stream: payload.stream ? String(payload.stream) : undefined,
    board: payload.board ? String(payload.board) : undefined,
    percentage: payload.percentage ? String(payload.percentage) : undefined,
    message: String(payload.message ?? ""),
    consent: Boolean(payload.consent),
    activeInst: String(payload.activeInst ?? "lfjc"),
    status: "new",
    notes: "",
    updatedAt: null,
  };

  const adminSubmissions = getSubmissions();
  adminSubmissions.push(newAdminEntry);
  saveSubmissions(adminSubmissions);
  console.info(`[inquiries] Saved to admin DB id=${id} refNumber=${refNumber} type=${payload.type}`);
  return { id, refNumber };
}

export async function POST(request: NextRequest) {
  // ── Rate limit ──
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions. Please wait a few minutes and try again." },
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

  // Diagnostic logging: log every incoming payload shape
  console.info("[inquiries] Incoming payload:", JSON.stringify(payload));

  // ── Honeypot: bots fill the hidden "website" field. Silently accept & drop. ──
  const honeypot = String(payload.website ?? "").trim();
  if (honeypot.length > 0) {
    return NextResponse.json({
      success: true,
      message: "Thank you. Your request has been received.",
      refNumber: `LFJC-INQ-${new Date().getFullYear()}-00000`,
    });
  }

  // Inputs Sanitization and length caps
  const type = String(payload.type ?? "inquiry").trim().substring(0, 50);
  const studentName = String(payload.studentName ?? payload.name ?? "").trim().substring(0, 100);
  const rawName = String(payload.name ?? studentName).trim().substring(0, 100);
  const parentName = String(payload.parentName ?? (type === "admissions" ? "" : rawName)).trim().substring(0, 100);
  const message = String(payload.message ?? "").trim().substring(0, 3000);
  const email = String(payload.email ?? "").trim().substring(0, 100);
  const phone = String(payload.phone ?? "").trim().substring(0, 50);
  const stream = String(payload.stream ?? "").trim().substring(0, 100);
  const board = String(payload.board ?? "").trim().substring(0, 100);
  const percentage = String(payload.percentage ?? "").trim().substring(0, 50);
  const activeInst = (payload.activeInst as "root" | "lfs" | "lfjc" | "lfdc") ?? "lfjc";
  const consent = payload.consent === true || payload.consent === "true" || payload.consent === "on";

  if (!allowedTypes.has(type)) {
    return NextResponse.json(
      { message: "Please choose a valid form type." },
      { status: 400 },
    );
  }

  const name = type === "admissions" ? (studentName || rawName) : rawName;

  if (name.length < 2 || message.length < 8) {
    return NextResponse.json(
      { message: "Please enter a valid name and message (minimum 8 characters)." },
      { status: 400 },
    );
  }

  if (type === "admissions") {
    if (studentName.length < 2) {
      return NextResponse.json(
        { message: "Please enter a valid student name." },
        { status: 400 },
      );
    }
    if (parentName.length < 2) {
      return NextResponse.json(
        { message: "Please enter a valid parent/guardian name." },
        { status: 400 },
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address for parent communications." },
        { status: 400 },
      );
    }
    if (phone.length < 8) {
      return NextResponse.json(
        { message: "Please enter a valid contact phone number." },
        { status: 400 },
      );
    }
    if (!stream) {
      return NextResponse.json(
        { message: "Please select a preferred academic stream." },
        { status: 400 },
      );
    }
    if (!consent) {
      return NextResponse.json(
        { message: "Please provide consent for LFJC to contact you regarding admission enquiries." },
        { status: 400 },
      );
    }
  } else {
    if (!email && !phone) {
      return NextResponse.json(
        { message: "Please provide either an email address or mobile number." },
        { status: 400 },
      );
    }
  }

  // Assemble sanitized payload
  const sanitizedPayload: Record<string, unknown> = {
    type,
    name,
    message,
    email,
    phone,
    activeInst,
    consent,
  };

  if (type === "admissions") {
    sanitizedPayload.studentName = studentName || name;
    sanitizedPayload.parentName = parentName;
    sanitizedPayload.stream = stream;
    sanitizedPayload.board = board;
    sanitizedPayload.percentage = percentage;
  }

  // ── Persist FIRST (guarantees the lead is never lost, even if email fails) ──
  let savedId = "";
  let refNumber = "";
  try {
    const saved = saveSubmission(sanitizedPayload);
    savedId = saved.id;
    refNumber = saved.refNumber;
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

  const subject = `${instData.shortName} ${titleCase(type)} Submission [Ref: ${refNumber}] - ${name}`;
  const html = renderEmail(sanitizedPayload, instData.name, refNumber);

  const successMessage = type === "admissions"
    ? `Thank you. Your inquiry (Ref: ${refNumber}) has been recorded. The ${instData.shortName} admissions office will contact you within 24 hours.`
    : `Thank you. Your submission (Ref: ${refNumber}) has been recorded. The ${instData.shortName} office will review your request.`;

  // ── Email is an ALERT channel, not the system of record. ──
  if (!resendKey) {
    console.info(`[inquiries] RESEND_API_KEY not configured — lead ${refNumber} persisted to admin DB.`);
    return NextResponse.json({
      success: true,
      message: successMessage,
      refNumber,
      id: savedId,
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
      console.warn(`[inquiries] Resend alert rejected for ${refNumber}: ${response.statusText}. Record safe in admin DB.`);
    }
  } catch (error) {
    console.error(`[inquiries] Resend alert threw for ${refNumber}:`, error);
  }

  return NextResponse.json({
    success: true,
    message: successMessage,
    refNumber,
    id: savedId,
  });
}

function renderEmail(payload: Record<string, unknown>, schoolName: string, refNumber: string) {
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
      <h1 style="font-size:20px;margin:0 0 8px;color:#0f4c81;">${schoolName} Website Submission</h1>
      <p style="margin:0 0 16px;font-size:14px;color:#394c52;">
        A new submission arrived. Reference Number: <strong style="color:#8a6625;">${refNumber}</strong>
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;font-size:14px;">${rows}</table>
      <p style="margin:20px 0 0;font-size:12px;color:#6b7c82;">
        View and manage all submissions in the LFJC administrative dashboard.
      </p>
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