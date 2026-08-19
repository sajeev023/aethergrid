import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/admin/auth";
import { hasPermission } from "@/lib/admin/types";
import { getFaculty, getGalleryItems, getSubmissions, getAuditLog } from "@/lib/admin/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "dashboard")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const faculty = getFaculty();
  const gallery = getGalleryItems();
  
  const canViewAdmissions = hasPermission(session.role, "admissions");
  const canViewAudit = hasPermission(session.role, "audit");

  const submissions = canViewAdmissions ? getSubmissions() : [];
  const auditLog = canViewAudit ? getAuditLog() : [];

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const recentSubmissions = submissions
    .filter((s) => new Date(s.timestamp) >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const recentAudit = auditLog.slice(0, 10);

  const statusBreakdown = {
    new: submissions.filter((s) => s.status === "new").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    under_review: submissions.filter((s) => s.status === "under_review").length,
    completed: submissions.filter((s) => s.status === "completed").length,
  };

  return NextResponse.json({
    stats: {
      totalFaculty: faculty.length,
      totalGallery: gallery.length,
      totalSubmissions: submissions.length,
      statusBreakdown,
    },
    recentSubmissions,
    recentAudit,
  });
}
