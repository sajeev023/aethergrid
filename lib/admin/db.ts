import fs from "fs";
import path from "path";
import os from "os";

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

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const TMP_DATA_DIR = path.join(os.tmpdir(), "lfjc-data");

// In-memory fallback cache for serverless environments
const memoryCache = new Map<string, unknown>();

function getDataDir(): string {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    // Test write permission
    const testFile = path.join(LOCAL_DATA_DIR, ".write-test");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);
    return LOCAL_DATA_DIR;
  } catch {
    // Read-only filesystem (e.g. Vercel serverless runtime) -> use os.tmpdir()
    try {
      if (!fs.existsSync(TMP_DATA_DIR)) {
        fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
      }
      return TMP_DATA_DIR;
    } catch {
      return LOCAL_DATA_DIR;
    }
  }
}

// ─── Generic JSON Read / Write (atomic write via rename + memory fallback) ────

function readJSON<T>(filename: string, fallback: T): T {
  // First check memory cache
  if (memoryCache.has(filename)) {
    return memoryCache.get(filename) as T;
  }

  const dir = getDataDir();
  const filePath = path.join(dir, filename);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8").trim();
      if (raw.length > 0) {
        const parsed = JSON.parse(raw) as T;
        memoryCache.set(filename, parsed);
        return parsed;
      }
    }
    // Also try reading from local project data if tmpdir was empty
    if (dir !== LOCAL_DATA_DIR) {
      const localPath = path.join(LOCAL_DATA_DIR, filename);
      if (fs.existsSync(localPath)) {
        const raw = fs.readFileSync(localPath, "utf-8").trim();
        if (raw.length > 0) {
          const parsed = JSON.parse(raw) as T;
          memoryCache.set(filename, parsed);
          return parsed;
        }
      }
    }
    memoryCache.set(filename, fallback);
    return fallback;
  } catch (err) {
    console.warn(`[db] Notice: Could not read ${filename}, returning fallback:`, (err as Error).message);
    return fallback;
  }
}

function writeJSON<T>(filename: string, data: T): void {
  // Always update memory cache first
  memoryCache.set(filename, data);

  const dir = getDataDir();
  const filePath = path.join(dir, filename);
  const tmpPath = filePath + ".tmp";
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmpPath, filePath);
  } catch (err) {
    console.warn(`[db] Notice: Could not write ${filename} to disk (persisted in memory):`, (err as Error).message);
    try { fs.unlinkSync(tmpPath); } catch { /* ignore */ }
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
  const dataSubmissions = readJSON<Submission[]>("submissions.json", []);
  if (dataSubmissions.length > 0) return dataSubmissions;

  // Migrate from root submissions.json if it exists
  const rootPath = path.join(process.cwd(), "submissions.json");
  try {
    if (fs.existsSync(rootPath)) {
      const raw = fs.readFileSync(rootPath, "utf-8").trim();
      if (raw.length > 0) {
        const rootData = JSON.parse(raw) as Record<string, unknown>[];
        const migrated: Submission[] = rootData.map((entry) => ({
          id: String(entry.id ?? Math.random().toString(36).substring(2, 9)),
          refNumber: String(entry.refNumber ?? `LFJC-ADM-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`),
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
          consent: Boolean(entry.consent),
          activeInst: String(entry.activeInst ?? "lfjc"),
          status: "new" as const,
          notes: "",
          updatedAt: null,
        }));
        saveSubmissions(migrated);
        return migrated;
      }
    }
  } catch {
    // Ignore migration error
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
  if (log.length > MAX_AUDIT_ENTRIES) {
    log.length = MAX_AUDIT_ENTRIES;
  }
  writeJSON("audit-log.json", log);
}
