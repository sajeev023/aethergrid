import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie } from "@/lib/admin/auth";
import { getAlumniSubmissions } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "data", "alumni-uploads");

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/**
 * Streams alumni upload images.
 * - Authenticated admins with "alumni" permission can view pending and approved uploads.
 * - Public visitors can only view photos belonging to APPROVED alumni submissions.
 * - Pending uploads remain completely protected from unauthorized access.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  // Defend against path traversal: only allow a bare filename, no slashes/dots.
  const safeName = path.basename(file);
  if (safeName !== file || safeName.includes("..")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(safeName).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(UPLOAD_DIR, safeName);
  if (!filePath.startsWith(UPLOAD_DIR) || !fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const session = await getSessionFromCookie();
  const isAdmin = session && hasPermission(session.role, "alumni");

  if (!isAdmin) {
    // Verify whether this file belongs to an approved alumni record
    const submissions = getAlumniSubmissions();
    const isApproved = submissions.some(
      (s) =>
        s.status === "approved" &&
        (s.photoUrl.endsWith(safeName) ||
          s.supportingImages?.some((img) => img.endsWith(safeName)))
    );

    if (!isApproved) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  const data = fs.readFileSync(filePath);
  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": mime,
      "Cache-Control": isAdmin
        ? "private, max-age=0, no-store"
        : "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}