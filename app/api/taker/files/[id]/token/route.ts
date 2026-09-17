import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, createDownloadToken } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      logger.security("Unauthenticated attempt to generate download token");
      return NextResponse.json({ error: "Unauthorized: Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const db = getDatabase();

    // Verify ownership of the file before generating token
    const file = db.prepare("SELECT id, user_id FROM files WHERE id = ?").get(id) as { id: string; user_id: string } | undefined;
    if (!file) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    if (String(file.user_id) !== session.userId && !session.roles.includes("ADMIN")) {
      logger.security("Forbidden: User attempted to generate token for unowned file", { fileId: id, userId: session.userId });
      return NextResponse.json({ error: "Forbidden: You do not own this file." }, { status: 403 });
    }

    // Generate 60-second cryptographically signed token
    const expiresInSeconds = 60;
    const token = await createDownloadToken(session.userId, id, expiresInSeconds);

    logger.info("Ephemeral download token generated", { fileId: id, userId: session.userId, expiresInSeconds });

    return NextResponse.json({
      success: true,
      token,
      expiresInSeconds,
      downloadUrl: `/api/taker/files/${id}?token=${token}`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Token generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
