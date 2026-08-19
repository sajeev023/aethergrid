import fs from "fs";
import path from "path";

import type {
  AdminUser,
  AuditLogEntry,
  EditableContent,
  FacultyMember,
  GalleryAlbum,
  GalleryItem,
  Submission,
  AlumniSubmission,
} from "./types";

// ─── Data Directory ──────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ─── Generic JSON Read / Write (atomic write via rename) ─────────────────────

function readJSON<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8").trim();
    if (raw.length === 0) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    console.error(`[db] Failed to read ${filename}, returning fallback`);
    return fallback;
  }
}

function writeJSON<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  const tmpPath = filePath + ".tmp";
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpPath, filePath);
  } catch (err) {
    console.error(`[db] Failed to write ${filename}:`, err);
    // Cleanup tmp if rename failed
    try { fs.unlinkSync(tmpPath); } catch { /* ignore */ }
    throw err;
  }
}

// ─── Admin Users ─────────────────────────────────────────────────────────────

export function getAdmins(): AdminUser[] {
  return readJSON<AdminUser[]>("admins.json", []);
}

export function saveAdmins(admins: AdminUser[]): void {
  writeJSON("admins.json", admins);
}

export function getAdminByUsername(username: string): AdminUser | undefined {
  return getAdmins().find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );
}

export function getAdminById(id: string): AdminUser | undefined {
  return getAdmins().find((a) => a.id === id);
}

export function updateAdmin(id: string, patch: Partial<AdminUser>): void {
  const admins = getAdmins();
  const idx = admins.findIndex((a) => a.id === id);
  if (idx !== -1) {
    admins[idx] = { ...admins[idx], ...patch };
    saveAdmins(admins);
  }
}

// ─── Faculty ─────────────────────────────────────────────────────────────────

export function getFaculty(): FacultyMember[] {
  return readJSON<FacultyMember[]>("faculty.json", []);
}

export function saveFaculty(faculty: FacultyMember[]): void {
  writeJSON("faculty.json", faculty);
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function getGalleryItems(): GalleryItem[] {
  return readJSON<GalleryItem[]>("gallery.json", []);
}

export function saveGalleryItems(items: GalleryItem[]): void {
  writeJSON("gallery.json", items);
}

export function getGalleryAlbums(): GalleryAlbum[] {
  return readJSON<GalleryAlbum[]>("gallery-albums.json", []);
}

export function saveGalleryAlbums(albums: GalleryAlbum[]): void {
  writeJSON("gallery-albums.json", albums);
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export function getSubmissions(): Submission[] {
  // First check data/ directory, then fall back to root submissions.json
  const dataSubmissions = readJSON<Submission[]>("submissions.json", []);
  if (dataSubmissions.length > 0) return dataSubmissions;

  // Migrate from root submissions.json if it exists
  const rootPath = path.join(process.cwd(), "submissions.json");
  if (fs.existsSync(rootPath)) {
    try {
      const raw = fs.readFileSync(rootPath, "utf-8").trim();
      if (raw.length > 0) {
        const rootData = JSON.parse(raw) as Record<string, unknown>[];
        const migrated: Submission[] = rootData.map((entry) => ({
          id: String(entry.id ?? Math.random().toString(36).substring(2, 9)),
          timestamp: String(entry.timestamp ?? new Date().toISOString()),
          type: String(entry.type ?? "inquiry"),
          name: String(entry.name ?? entry.studentName ?? ""),
          studentName: entry.studentName ? String(entry.studentName) : undefined,
          parentName: entry.parentName ? String(entry.parentName) : undefined,
          email: String(entry.email ?? ""),
          phone: String(entry.phone ?? ""),
          stream: entry.stream ? String(entry.stream) : undefined,
          board: entry.board ? String(entry.board) : undefined,
          percentage: entry.percentage ? String(entry.percentage) : undefined,
          message: String(entry.message ?? ""),
          activeInst: String(entry.activeInst ?? "lfjc"),
          status: "new" as const,
          notes: "",
          updatedAt: null,
        }));
        saveSubmissions(migrated);
        return migrated;
      }
    } catch {
      console.error("[db] Failed to migrate root submissions.json");
    }
  }

  return [];
}

export function saveSubmissions(submissions: Submission[]): void {
  writeJSON("submissions.json", submissions);
}

// ─── Alumni Submissions ──────────────────────────────────────────────────────

export function getAlumniSubmissions(): AlumniSubmission[] {
  return readJSON<AlumniSubmission[]>("alumni-submissions.json", []);
}

export function saveAlumniSubmissions(submissions: AlumniSubmission[]): void {
  writeJSON("alumni-submissions.json", submissions);
}

// ─── Content ─────────────────────────────────────────────────────────────────

const DEFAULT_CONTENT: EditableContent = {
  principalMessage: "",
  aboutText: "",
  mission: "",
  vision: "",
  announcements: [],
  updatedAt: new Date().toISOString(),
};

export function getContent(): EditableContent {
  return readJSON<EditableContent>("content.json", DEFAULT_CONTENT);
}

export function saveContent(content: EditableContent): void {
  writeJSON("content.json", content);
}

// ─── Audit Log ───────────────────────────────────────────────────────────────

const MAX_AUDIT_ENTRIES = 5000;

export function getAuditLog(): AuditLogEntry[] {
  return readJSON<AuditLogEntry[]>("audit-log.json", []);
}

export function appendAuditLog(entry: AuditLogEntry): void {
  const log = getAuditLog();
  log.unshift(entry); // Newest first
  // Cap at max entries
  if (log.length > MAX_AUDIT_ENTRIES) {
    log.length = MAX_AUDIT_ENTRIES;
  }
  writeJSON("audit-log.json", log);
}
