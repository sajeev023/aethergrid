import { NextResponse } from "next/server";

import { getSessionFromCookie } from "@/lib/admin/auth";
import { getSubmissions } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "admissions")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const submissions = getSubmissions();

  const escapeCsvField = (val: string): string => {
    let clean = val ? String(val).trim() : "";
    if (/^[=\+\-\@\t\r]/.test(clean)) {
      clean = "'" + clean;
    }
    return `"${clean.replace(/"/g, '""')}"`;
  };

  const headers = [
    "ID", "Date", "Type", "Status", "Name", "Student Name", "Parent Name",
    "Email", "Phone", "Stream", "Board", "Percentage", "Message", "Notes",
  ];

  const rows = submissions.map((s) => [
    escapeCsvField(s.id),
    escapeCsvField(new Date(s.timestamp).toLocaleDateString("en-IN")),
    escapeCsvField(s.type),
    escapeCsvField(s.status),
    escapeCsvField(s.name),
    escapeCsvField(s.studentName ?? ""),
    escapeCsvField(s.parentName ?? ""),
    escapeCsvField(s.email),
    escapeCsvField(s.phone),
    escapeCsvField(s.stream ?? ""),
    escapeCsvField(s.board ?? ""),
    escapeCsvField(s.percentage ?? ""),
    escapeCsvField(s.message ?? ""),
    escapeCsvField(s.notes ?? ""),
  ]);

  const csv = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lfjc_submissions_${Date.now()}.csv"`,
    },
  });
}
