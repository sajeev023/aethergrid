// ─── Admin Panel Type Definitions ────────────────────────────────────────────

export type AdminRole = "super_admin" | "administrator" | "content_manager";

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  displayName: string;
  role: AdminRole;
  createdAt: string;
  lastLoginAt: string | null;
}

/** Minimal session payload embedded in JWT */
export interface AdminSession {
  userId: string;
  username: string;
  displayName: string;
  role: AdminRole;
}

// ─── Faculty ─────────────────────────────────────────────────────────────────

export type FacultyCategory = "present" | "retired" | "former-principal";

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  department: string;
  experience: string;
  photoUrl: string;
  order: number;
  /** Institutional grouping — defaults to "present" when unset. */
  category?: FacultyCategory;
  createdAt: string;
  updatedAt: string;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  album: string;
  src: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

// ─── Alumni Videos ───────────────────────────────────────────────────────────
// Schema prepared for a future "Alumni Videos" section. The component
// `components/sections/alumni-videos.tsx` consumes this shape and renders
// nothing while the array stays empty — populating it (or wiring it to the
// admin DB) is the only step required to publish the section.

export interface AlumniVideo {
  id: string;
  title: string;
  /** YouTube embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID). */
  embedUrl: string;
  /** Canonical watch URL (e.g. https://www.youtube.com/watch?v=VIDEO_ID). */
  watchUrl: string;
  description?: string;
  /** Optional grouping label (e.g. "Reunions", "Milestone Talks"). */
  category?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export type SubmissionStatus = "new" | "contacted" | "under_review" | "completed";

export interface Submission {
  id: string;
  refNumber?: string;
  timestamp: string;
  type: string;
  name: string;
  studentName?: string;
  parentName?: string;
  email: string;
  phone: string;
  stream?: string;
  board?: string;
  percentage?: string;
  message: string;
  consent?: boolean;
  activeInst: string;
  status: SubmissionStatus;
  notes: string;
  updatedAt: string | null;
}

export type AlumniSubmissionStatus = "pending" | "approved" | "rejected";

export interface AlumniSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  batchFrom: string;
  batchTo: string;
  stream: string;
  position: string;
  company: string;
  industry: string;
  qualification: string;
  achievements: string;
  bio: string;
  linkedin: string;
  city: string;
  country: string;
  category?: string;
  photoUrl: string;
  supportingImages: string[];
  studentId?: string;
  verificationDetails?: string;
  status: AlumniSubmissionStatus;
  consentShare?: boolean;
  notes: string;
  updatedAt: string | null;
}

// ─── Editable Content ────────────────────────────────────────────────────────

export interface FeeScheduleItem {
  component: string;
  applicability: string;
  amount?: string;
  basis: string;
  status?: "approved" | "pending";
}

export interface AdmissionDateItem {
  phase: string;
  date: string;
  detail: string;
  status?: "confirmed" | "pending";
}

export interface EditableContent {
  principalMessage: string;
  aboutText: string;
  mission: string;
  vision: string;
  announcements: AnnouncementItem[];
  feeSchedule?: FeeScheduleItem[];
  admissionDates?: AdmissionDateItem[];
  admissionsBannerStatus?: "open" | "open_soon" | "closed";
  updatedAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  date: string;
  active: boolean;
}

// ─── Audit Log ───────────────────────────────────────────────────────────────

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  action: string;
  details: string;
  ip: string;
}

// ─── Permissions Map ─────────────────────────────────────────────────────────

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: [
    "dashboard",
    "content",
    "faculty",
    "gallery",
    "admissions",
    "alumni",
    "admin_users",
    "audit",
  ],
  administrator: [
    "dashboard",
    "content",
    "faculty",
    "gallery",
    "admissions",
    "alumni",
    "audit",
  ],
  content_manager: [
    "dashboard",
    "content",
  ],
};

export function hasPermission(role: AdminRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
