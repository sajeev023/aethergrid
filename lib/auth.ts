import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "aether_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.AETHER_JWT_SECRET || "aethergrid-production-grade-master-secret-key-2026-launch"
);

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  roles: string; // 'GIVER', 'TAKER', 'GIVER,TAKER', 'ADMIN'
  activeRole: string; // 'GIVER' | 'TAKER' | 'ADMIN'
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Creates an ephemeral, cryptographically signed single-use download token.
 * Valid strictly for 60 seconds and tied to a specific userId and fileId.
 */
export async function createDownloadToken(userId: string, fileId: string, expiresInSeconds = 60): Promise<string> {
  return new SignJWT({ scope: "download", fileId })
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInSeconds}s`)
    .sign(JWT_SECRET);
}

/**
 * Verifies that an ephemeral download token is valid, unexpired, and issued for the requested file.
 */
export async function verifyDownloadToken(
  token: string,
  expectedFileId: string
): Promise<{ userId: string; fileId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.scope !== "download") return null;
    if (payload.fileId !== expectedFileId) return null;
    if (!payload.sub) return null;

    return {
      userId: String(payload.sub),
      fileId: String(payload.fileId),
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(request?: NextRequest): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (request) {
    // 1. Check Authorization header (for mobile daemon / API clients)
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
    // 2. Check cookie on NextRequest
    if (!token) {
      token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    }
  } else {
    // 3. Check Next.js server cookies()
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      // Not in a server component context
    }
  }

  if (!token) return null;
  return verifySessionToken(token);
}
