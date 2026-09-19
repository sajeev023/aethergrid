import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, verifyDownloadToken } from "@/lib/auth";
import { retrieveAndDecryptFile, deleteFileDistributed } from "@/lib/orchestrator";
import { renameUserFile } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let effectiveUserId: string;

    // 1. Check for ephemeral signed download token (?token=...)
    const token = request.nextUrl.searchParams.get("token");
    if (token) {
      const verified = await verifyDownloadToken(token, id);
      if (!verified) {
        logger.security("Forbidden: Invalid, expired, or mismatched download token", { fileId: id });
        return NextResponse.json({ error: "Forbidden: Download token is invalid, expired, or issued for a different file." }, { status: 403 });
      }
      effectiveUserId = verified.userId;
    } else {
      // 2. Standard authenticated session
      const session = await getCurrentUser(request);
      if (!session) {
        logger.security("Unauthenticated download attempt blocked", { fileId: id });
        return NextResponse.json({ error: "Unauthorized: Authentication required to download files." }, { status: 401 });
      }
      effectiveUserId = session.userId;
    }

    // Strictly enforce that the requesting user owns this file ID (IDOR Protection)
    const { fileRecord, fileBuffer, failoverUsed } = await retrieveAndDecryptFile(
      id,
      effectiveUserId
    );

    const headers = new Headers();
    headers.set("Content-Type", String(fileRecord.mime_type || "application/octet-stream"));
    headers.set("Content-Length", fileBuffer.length.toString());
    headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(String(fileRecord.original_name))}"`
    );
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-AetherGrid-Failover-Used", failoverUsed ? "true" : "false");
    headers.set("X-AetherGrid-Checksum", String(fileRecord.checksum));

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "File download failed";
    logger.warn("Download request failed", { error: msg });
    return NextResponse.json({ error: msg }, { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const newName = typeof body.name === "string" ? body.name.trim() : "";

    if (!newName) {
      return NextResponse.json({ error: "A valid file name is required." }, { status: 400 });
    }

    const result = renameUserFile(id, session.userId, newName);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to rename file";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const result = await deleteFileDistributed(id, session.userId);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete file";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

