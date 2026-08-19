import { NextResponse } from "next/server";
import { getAlumniSubmissions } from "@/lib/admin/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = getAlumniSubmissions();
    const approved = submissions.filter((s) => s.status === "approved");
    return NextResponse.json({ approved });
  } catch {
    return NextResponse.json({ approved: [] }, { status: 500 });
  }
}
