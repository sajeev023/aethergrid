import { NextResponse } from "next/server";
import { getAlumniSubmissions } from "@/lib/admin/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = getAlumniSubmissions();
    // Return only public display fields — drop sensitive PII (email, phone, studentId, verificationDetails, internal notes)
    const approved = submissions
      .filter((s) => s.status === "approved")
      .map((s) => ({
        id: s.id,
        name: s.name,
        batchFrom: s.batchFrom,
        batchTo: s.batchTo,
        stream: s.stream,
        category: s.category,
        position: s.position,
        company: s.company,
        industry: s.industry,
        qualification: s.qualification,
        achievements: s.achievements,
        bio: s.bio,
        linkedin: s.linkedin,
        city: s.city,
        country: s.country,
        photoUrl: s.photoUrl,
      }));

    return NextResponse.json({ approved });
  } catch {
    return NextResponse.json({ approved: [] }, { status: 500 });
  }
}
