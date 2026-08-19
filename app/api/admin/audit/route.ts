import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie } from "@/lib/admin/auth";
import { getAuditLog } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "audit")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "50", 10)));

  const log = getAuditLog();
  const total = log.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = log.slice(start, start + limit);

  return NextResponse.json({
    entries: paged,
    pagination: { page, limit, total, totalPages },
  });
}
