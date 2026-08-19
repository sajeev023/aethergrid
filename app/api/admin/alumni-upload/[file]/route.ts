import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie } from "@/lib/admin/auth";
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
 * Streams a pending alumni upload to an authenticated admin reviewer only.
 * Pending uploads live outside /public so they are never world-readable by
 * URL before approval. Requires the "alumni" permission.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "alumni")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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

  const data = fs.readFileSync(filePath);
  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": mime,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}