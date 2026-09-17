import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDatabase } from "@/lib/db";
import { distributeAndStoreFile } from "@/lib/orchestrator";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const db = getDatabase();
    const backups = db.prepare(`
      SELECT b.*, 
        (SELECT COUNT(*) FROM backup_items WHERE backup_id = b.id) as actual_item_count
      FROM backups b
      WHERE b.user_id = ?
      ORDER BY b.started_at DESC
    `).all(session.userId) as any[];

    return NextResponse.json({ backups });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list backups" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const {
      deviceName = "Google Pixel 9 Pro",
      deviceModel = "Tensor G4 / Android 15",
      contactsCount = 142,
      photosCount = 28,
      notes = "Daily Auto-Backup",
      contactsData = [],
    } = body;

    const backupId = `bak_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const now = new Date().toISOString();

    // Create a real JSON payload containing the backup snapshot
    const backupSnapshot = {
      version: "1.0",
      backupId,
      userId: session.userId,
      deviceName,
      deviceModel,
      timestamp: now,
      metadata: {
        contactsCount,
        photosCount,
        notes,
      },
      contacts: contactsData.length > 0 ? contactsData : [
        { name: "Emergency Contact", phone: "+1 555-0199", email: "emergency@aethergrid.io" },
        { name: "Mom", phone: "+1 555-0144" },
        { name: "Work Support", phone: "+1 555-0100", email: "support@aethergrid.io" },
      ],
    };

    const backupBuffer = Buffer.from(JSON.stringify(backupSnapshot, null, 2), "utf-8");

    // Store distributedly
    const stored = await distributeAndStoreFile({
      userId: session.userId,
      originalName: `Backup_${deviceName.replace(/\\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.abk`,
      mimeType: "application/json",
      fileBuffer: backupBuffer,
    });

    const db = getDatabase();
    db.prepare(`
      INSERT INTO backups (id, user_id, device_name, device_model, status, total_bytes, item_count, error_count, notes, started_at, completed_at)
      VALUES (?, ?, ?, ?, 'COMPLETED', ?, ?, 0, ?, ?, ?)
    `).run(
      backupId,
      session.userId,
      deviceName,
      deviceModel,
      backupBuffer.length,
      contactsCount + photosCount,
      notes,
      now,
      now
    );

    // Insert backup items
    db.prepare(`
      INSERT INTO backup_items (id, backup_id, item_type, relative_path, size, checksum, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'VERIFIED', ?)
    `).run(
      `bki_${Date.now()}_1`,
      backupId,
      "CONTACTS",
      "contacts/database.json",
      backupBuffer.length,
      stored.checksum,
      now
    );

    return NextResponse.json({
      success: true,
      backupId,
      fileId: stored.id,
      totalBytes: backupBuffer.length,
      itemCount: contactsCount + photosCount,
      completedAt: now,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create device backup" }, { status: 500 });
  }
}
