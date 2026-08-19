import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie, logAudit } from "@/lib/admin/auth";
import { getAlumniSubmissions, saveAlumniSubmissions } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";
import type { AlumniSubmissionStatus } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUSES = new Set<AlumniSubmissionStatus>(["pending", "approved", "rejected"]);

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "alumni")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));

  let submissions = getAlumniSubmissions();

  // Sort newest submissions first
  submissions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Search filter
  if (search) {
    submissions = submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.company.toLowerCase().includes(search) ||
        s.position.toLowerCase().includes(search) ||
        s.stream.toLowerCase().includes(search) ||
        s.industry.toLowerCase().includes(search) ||
        s.city.toLowerCase().includes(search) ||
        s.country.toLowerCase().includes(search)
    );
  }

  // Status filter
  if (status && VALID_STATUSES.has(status as AlumniSubmissionStatus)) {
    submissions = submissions.filter((s) => s.status === status);
  }

  const total = submissions.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = submissions.slice(start, start + limit);

  return NextResponse.json({
    submissions: paged,
    pagination: { page, limit, total, totalPages }
  });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "alumni")) {
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

  const submissions = getAlumniSubmissions();
  const idx = submissions.findIndex((s) => s.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ message: "Submission not found." }, { status: 404 });
  }

  if (body.status) {
    if (!VALID_STATUSES.has(body.status as AlumniSubmissionStatus)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }
    submissions[idx].status = body.status as AlumniSubmissionStatus;
  }

  if (body.notes !== undefined) {
    submissions[idx].notes = String(body.notes).trim().substring(0, 2000);
  }

  submissions[idx].updatedAt = new Date().toISOString();
  saveAlumniSubmissions(submissions);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(
    session.userId,
    session.username,
    "alumni_submission_update",
    `Updated alumni submission ${body.id}: status=${submissions[idx].status}`,
    ip
  );

  return NextResponse.json({
    message: "Alumni submission updated successfully.",
    submission: submissions[idx]
  });
}
