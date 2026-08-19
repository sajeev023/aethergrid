import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie, logAudit } from "@/lib/admin/auth";
import { getSubmissions, saveSubmissions } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";
import type { SubmissionStatus } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUSES = new Set<SubmissionStatus>(["new", "contacted", "under_review", "completed"]);

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "admissions")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "";
  const type = searchParams.get("type") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));

  let submissions = getSubmissions();

  // Sort newest first
  submissions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Filter by search
  if (search) {
    submissions = submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        (s.studentName?.toLowerCase().includes(search) ?? false) ||
        s.phone.includes(search) ||
        s.email.toLowerCase().includes(search) ||
        (s.stream?.toLowerCase().includes(search) ?? false)
    );
  }

  // Filter by status
  if (status && VALID_STATUSES.has(status as SubmissionStatus)) {
    submissions = submissions.filter((s) => s.status === status);
  }

  // Filter by type
  if (type) {
    submissions = submissions.filter((s) => s.type === type);
  }

  const total = submissions.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = submissions.slice(start, start + limit);

  return NextResponse.json({
    submissions: paged,
    pagination: { page, limit, total, totalPages },
  });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "admissions")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: { id?: string; status?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ message: "Submission ID is required." }, { status: 400 });
  }

  const submissions = getSubmissions();
  const idx = submissions.findIndex((s) => s.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ message: "Submission not found." }, { status: 404 });
  }

  if (body.status) {
    if (!VALID_STATUSES.has(body.status as SubmissionStatus)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }
    submissions[idx].status = body.status as SubmissionStatus;
  }

  if (body.notes !== undefined) {
    submissions[idx].notes = String(body.notes).trim().substring(0, 2000);
  }

  submissions[idx].updatedAt = new Date().toISOString();
  saveSubmissions(submissions);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(
    session.userId,
    session.username,
    "submission_update",
    `Updated submission ${body.id}: status=${submissions[idx].status}`,
    ip
  );

  return NextResponse.json({ message: "Submission updated.", submission: submissions[idx] });
}
