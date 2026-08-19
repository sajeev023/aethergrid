import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { getAdmins, saveAdmins } from "./db";
import type { AdminUser } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const INITIAL_PASSWORD_FILE = path.join(DATA_DIR, ".admin-initial-password.txt");

/**
 * Seeds the default Super Admin account if no admins exist.
 * Called automatically by auth.ts on first session check.
 *
 * SECURITY: There is NO hardcoded fallback password. Credentials must be
 * supplied via ADMIN_INITIAL_USERNAME / ADMIN_INITIAL_PASSWORD env vars. In
 * development, if those vars are absent, a strong random password is generated,
 * seeded, and written to data/.admin-initial-password.txt (gitignored) plus the
 * server log — so the default `LFJC@2024Admin` credential that was previously
 * committed to git can no longer be used to take over the admin panel.
 */
export async function seedDefaultAdmin(): Promise<void> {
  const existing = getAdmins();
  if (existing.length > 0) return; // Already seeded

  const username = process.env.ADMIN_INITIAL_USERNAME;
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!username || !password) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[seed] WARNING: No administrators seeded. In production, configure ADMIN_INITIAL_USERNAME and ADMIN_INITIAL_PASSWORD.");
      return;
    }
    // Dev-only: generate a strong one-time password and surface it once.
    const generated = randomBytes(12).toString("base64url");
    const devUsername = "admin";
    await seedAdmin(devUsername, generated);
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(
      INITIAL_PASSWORD_FILE,
      `LFJC dev admin (one-time, rotate immediately):\n  username: ${devUsername}\n  password: ${generated}\n`,
      "utf-8",
    );
    console.warn(`[seed] Dev admin seeded. Username: "${devUsername}"  Password written to ${INITIAL_PASSWORD_FILE}`);
    return;
  }

  await seedAdmin(username, password);
  console.info(`[seed] Default Super Admin seeded successfully with username: ${username}`);
}

async function seedAdmin(username: string, password: string): Promise<void> {
  const hash = await bcrypt.hash(password, 12);
  const superAdmin: AdminUser = {
    id: uuidv4(),
    username,
    passwordHash: hash,
    displayName: "LFJC Super Admin",
    role: "super_admin",
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
  };
  saveAdmins([superAdmin]);
}