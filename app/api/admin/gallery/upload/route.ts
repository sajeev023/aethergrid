import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie, logAudit } from "@/lib/admin/auth";
import { hasPermission } from "@/lib/admin/types";

export const runtime = "nodejs";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "gallery-uploads");

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "gallery")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ message: "File too large. Maximum 5MB." }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { message: "Invalid file type. Only JPG, PNG, and WEBP allowed." },
      { status: 400 }
    );
  }

  const baseName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .toLowerCase()
    .substring(0, 100);
  const timestamp = Date.now();
  const safeFilename = `${timestamp}_${baseName}`;

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const filePath = path.join(UPLOAD_DIR, safeFilename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  const publicUrl = `/images/gallery-uploads/${safeFilename}`;

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  logAudit(session.userId, session.username, "gallery_photo_upload", `Uploaded: ${safeFilename}`, ip);

  return NextResponse.json({ message: "File uploaded.", url: publicUrl }, { status: 201 });
}
