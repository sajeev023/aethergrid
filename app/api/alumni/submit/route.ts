import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getAlumniSubmissions, saveAlumniSubmissions } from "@/lib/admin/db";
import type { AlumniSubmission } from "@/lib/admin/types";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// Pending uploads are PRIVATE (PII: face photos, ID cards). They live outside
// /public so they cannot be world-read by URL-guessing before admin approval.
// An authenticated admin serve route (/api/admin/alumni-upload/[file]) streams
// them to logged-in reviewers only.
const UPLOAD_DIR = path.join(process.cwd(), "data", "alumni-uploads");

// ─── Magic-byte signature validation (defeats extension spoofing) ─────────────
const SIGNATURES: { ext: string; mime: string; match: (b: Buffer) => boolean }[] = [
  { ext: ".jpg", mime: "image/jpeg", match: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: ".png",
    mime: "image/png",
    match: (b) =>
      b.length >= 8 &&
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
      b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a,
  },
  {
    ext: ".webp",
    mime: "image/webp",
    match: (b) =>
      b.length >= 12 &&
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

function detectImage(buffer: Buffer): { ext: string; mime: string } | null {
  for (const sig of SIGNATURES) {
    if (sig.match(buffer)) return { ext: sig.ext, mime: sig.mime };
  }
  return null;
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const batchFrom = String(formData.get("batchFrom") ?? "").trim();
  const batchTo = String(formData.get("batchTo") ?? "").trim();
  const stream = String(formData.get("stream") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const qualification = String(formData.get("qualification") ?? "").trim();
  const achievements = String(formData.get("achievements") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const studentId = String(formData.get("studentId") ?? "").trim();
  const verificationDetails = String(formData.get("verificationDetails") ?? "").trim();
  const consent = formData.get("consent") === "true" || formData.get("consent") === "on";

  // Form Field Validation
  if (
    !name ||
    !email ||
    !phone ||
    !batchFrom ||
    !batchTo ||
    !stream ||
    !position ||
    !company ||
    !bio ||
    !consent
  ) {
    return NextResponse.json(
      { message: "Please fill in all required fields and accept the publishing consent." },
      { status: 400 }
    );
  }

  // Ensure private upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Validate + persist an uploaded image by magic bytes (not extension).
  const saveUploadedFile = async (file: File, prefix: string): Promise<string> => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File too large. Maximum size is 5MB.");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = detectImage(buffer);
    if (!detected) {
      throw new Error("Invalid file. Only JPG, PNG, and WEBP images are accepted.");
    }

    const cleanBase = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .toLowerCase()
      .substring(0, 30);
    const filename = `${prefix}_${Date.now()}_${cleanBase}${detected.ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    fs.writeFileSync(filePath, buffer);

    // Store the authenticated serve URL (NOT a public path) so pending PII
    // is only viewable by logged-in admins.
    return `/api/admin/alumni-upload/${filename}`;
  };

  let photoUrl = "";
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0) {
    try {
      photoUrl = await saveUploadedFile(photoFile, "profile");
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Unknown file error";
      return NextResponse.json({ message: errMsg }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: "Profile photo is required." }, { status: 400 });
  }

  const supportingImages: string[] = [];
  const supportFiles = formData.getAll("supportingImages") as File[];
  for (let i = 0; i < supportFiles.length; i++) {
    const file = supportFiles[i];
    if (file && file.size > 0) {
      try {
        const url = await saveUploadedFile(file, `support_${i}`);
        supportingImages.push(url);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unknown file error";
        return NextResponse.json(
          { message: `Supporting Image ${i + 1} Error: ${errMsg}` },
          { status: 400 }
        );
      }
    }
  }

  // Create submission record
  const id = uuidv4();
  const newSubmission: AlumniSubmission = {
    id,
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    batchFrom,
    batchTo,
    stream,
    position,
    company,
    industry,
    qualification,
    achievements,
    bio,
    linkedin,
    city,
    country,
    category: category || undefined,
    photoUrl,
    supportingImages,
    studentId: studentId || undefined,
    verificationDetails: verificationDetails || undefined,
    status: "pending",
    notes: "",
    updatedAt: null
  };

  const submissions = getAlumniSubmissions();
  submissions.push(newSubmission);
  saveAlumniSubmissions(submissions);

  return NextResponse.json(
    {
      message:
        "Your alumni profile application has been successfully submitted and is currently pending administrator review. Thank you for staying connected!",
      id
    },
    { status: 201 }
  );
}