import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookie, logAudit } from "@/lib/admin/auth";
import { getContent, saveContent } from "@/lib/admin/db";
import { hasPermission } from "@/lib/admin/types";
import type { EditableContent } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "content")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const content = getContent();
  return NextResponse.json({ content });
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie();
  if (!session || !hasPermission(session.role, "content")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: Partial<EditableContent>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const current = getContent();

  const updated: EditableContent = {
    principalMessage:
      body.principalMessage !== undefined
        ? String(body.principalMessage).trim().substring(0, 5000)
        : current.principalMessage,
    aboutText:
      body.aboutText !== undefined
        ? String(body.aboutText).trim().substring(0, 10000)
        : current.aboutText,
    mission:
      body.mission !== undefined
        ? String(body.mission).trim().substring(0, 3000)
        : current.mission,
    vision:
      body.vision !== undefined
        ? String(body.vision).trim().substring(0, 3000)
        : current.vision,
    announcements: body.announcements ?? current.announcements,
    updatedAt: new Date().toISOString(),
  };

  saveContent(updated);

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const changedFields = Object.keys(body).filter((k) => k !== "updatedAt");
  logAudit(
    session.userId,
    session.username,
    "content_update",
    `Updated content fields: ${changedFields.join(", ")}`,
    ip
  );

  return NextResponse.json({ message: "Content updated.", content: updated });
}
