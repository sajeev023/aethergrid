import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { appendAuditLog, getAdminByUsername } from "./db";
import { seedDefaultAdmin } from "./seed";
import type { AdminRole, AdminSession, AuditLogEntry } from "./types";

// ─── Constants ───────────────────────────────────────────────────────────────

const COOKIE_NAME = "lfjc_admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

/** Secret key for JWT - in production, set ADMIN_JWT_SECRET env var */
function getJWTSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL SECURITY ERROR: ADMIN_JWT_SECRET environment variable must be set in production.");
    }
    return new TextEncoder().encode("lfjc-local-dev-jwt-secret-key-change-in-production-2026");
  }
  return new TextEncoder().encode(secret);
}

// ─── Password ────────────────────────────────────────────────────────────────

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, 12);
}

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

// ─── JWT Session ─────────────────────────────────────────────────────────────

export async function createSessionToken(
  session: AdminSession
): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getJWTSecret());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      displayName: payload.displayName as string,
      role: payload.role as AdminRole,
    };
  } catch {
    return null;
  }
}

// ─── Cookie Management ───────────────────────────────────────────────────────

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionFromCookie(): Promise<AdminSession | null> {
  await seedDefaultAdmin(); // Ensure admin exists on first access
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

// ─── Login Flow ──────────────────────────────────────────────────────────────

interface LoginResult {
  success: boolean;
  message: string;
  session?: AdminSession;
}

export async function login(
  username: string,
  password: string,
  ip: string
): Promise<LoginResult> {
  await seedDefaultAdmin();

  const admin = getAdminByUsername(username);
  if (!admin) {
    logAudit("system", username, "login_failed", `Failed login attempt for unknown user: ${username}`, ip);
    return { success: false, message: "Invalid username or password." };
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    logAudit(admin.id, admin.username, "login_failed", "Invalid password", ip);
    return { success: false, message: "Invalid username or password." };
  }

  const session: AdminSession = {
    userId: admin.id,
    username: admin.username,
    displayName: admin.displayName,
    role: admin.role,
  };

  const token = await createSessionToken(session);
  await setSessionCookie(token);

  logAudit(admin.id, admin.username, "login_success", `Logged in as ${admin.role}`, ip);

  return { success: true, message: "Login successful.", session };
}

// ─── Role Check ──────────────────────────────────────────────────────────────

const ROLE_HIERARCHY: Record<AdminRole, number> = {
  super_admin: 3,
  administrator: 2,
  content_manager: 1,
};

export function requireMinRole(
  session: AdminSession,
  minRole: AdminRole
): boolean {
  return ROLE_HIERARCHY[session.role] >= ROLE_HIERARCHY[minRole];
}

// ─── Audit Helper ────────────────────────────────────────────────────────────

export function logAudit(
  userId: string,
  username: string,
  action: string,
  details: string,
  ip: string
): void {
  const entry: AuditLogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    userId,
    username,
    action,
    details,
    ip,
  };
  appendAuditLog(entry);
}

// ─── Middleware helper (for edge-compatible verification) ─────────────────────

export async function verifyTokenFromValue(
  tokenValue: string
): Promise<AdminSession | null> {
  return verifySessionToken(tokenValue);
}
