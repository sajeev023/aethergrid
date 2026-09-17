import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { distributeAndStoreFile, evaluateNodeHealth } from "@/lib/orchestrator";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    evaluateNodeHealth();

    const db = getDatabase();
    const files = db.prepare(`
      SELECT 
        f.*,
        (SELECT COUNT(*) FROM storage_chunks WHERE file_id = f.id) as chunk_count,
        (SELECT COUNT(*) FROM storage_chunks sc 
          JOIN storage_nodes sn ON sc.primary_node_id = sn.id 
          WHERE sc.file_id = f.id AND sn.status = 'ONLINE') as online_replicas
      FROM files f
      WHERE f.user_id = ? AND f.is_trashed = 0
      ORDER BY f.created_at DESC
    `).all(session.userId) as any[];

    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list files" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided in form data." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const stored = await distributeAndStoreFile({
      userId: session.userId,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
      fileBuffer,
    });

    return NextResponse.json({
      success: true,
      file: stored,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "File upload and distribution failed" }, { status: 500 });
  }
}
