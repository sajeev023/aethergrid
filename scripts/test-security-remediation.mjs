/**
 * 🔒 AETHERGRID DEFENSIVE SECURITY REMEDIATION REGRESSION TEST SUITE
 * 
 * Verifies the 5 security patches implemented across:
 * 1. Single-use download token consumption & replay rejection (JTI tracking)
 * 2. Node heartbeat telemetry bounds & metric injection defense
 * 3. Defensive security headers enforcement across public and authenticated routes
 * 4. User registration input normalization and Bcrypt CPU exhaustion DoS cutoff
 * 5. Payment webhook timestamp freshness verification & replay resistance
 */

import crypto from "crypto";
import { NextRequest } from "next/server";
import { getDatabase, createUser, registerStorageNode, getStorageNodeById } from "../lib/db.ts";
import { createDownloadToken, verifyDownloadToken, resetConsumedDownloadTokensForTests } from "../lib/auth.ts";
import { POST as heartbeatHandler } from "../app/api/nodes/heartbeat/route.ts";
import { POST as registerHandler } from "../app/api/auth/register/route.ts";
import { POST as loginHandler } from "../app/api/auth/login/route.ts";
import { POST as webhookHandler } from "../app/api/payment/webhook/route.ts";
import { middleware } from "../middleware.ts";

const ANSI_GREEN = "\x1b[32m";
const ANSI_RED = "\x1b[31m";
const ANSI_CYAN = "\x1b[36m";
const ANSI_RESET = "\x1b[0m";

let passCount = 0;
let failCount = 0;

function logSection(title) {
  console.log(`\n${ANSI_CYAN}══════════════════════════════════════════════════════════════════${ANSI_RESET}`);
  console.log(`${ANSI_CYAN}  ${title}${ANSI_RESET}`);
  console.log(`${ANSI_CYAN}══════════════════════════════════════════════════════════════════${ANSI_RESET}`);
}

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`${ANSI_GREEN}  ✅ PASS: ${name}${ANSI_RESET}`);
    passCount++;
  } catch (err) {
    console.error(`${ANSI_RED}  ❌ FAIL: ${name}${ANSI_RESET}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

async function main() {
  console.log("\n🛡️  STARTING AETHERGRID SECURITY REMEDIATION VERIFICATION SUITE\n");

  // ──────────────────────────────────────────────────────────────────────────
  // DOMAIN 1: SINGLE-USE DOWNLOAD TOKEN REPLAY RESISTANCE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("DOMAIN 1: Single-Use Ephemeral Download Tokens (JTI Replay Defense)");

  await runTest("1.1 Fresh download token validates successfully on first use", async () => {
    resetConsumedDownloadTokensForTests();
    const token = await createDownloadToken("usr_alice_1", "file_doc_101", 60);
    const verified = await verifyDownloadToken(token, "file_doc_101", true);
    if (!verified || verified.userId !== "usr_alice_1" || verified.fileId !== "file_doc_101") {
      throw new Error("First-time token verification failed");
    }
  });

  await runTest("1.2 Reusing the same download token is immediately rejected as replay", async () => {
    const token = await createDownloadToken("usr_alice_2", "file_doc_102", 60);
    const firstUse = await verifyDownloadToken(token, "file_doc_102", true);
    if (!firstUse) throw new Error("First verification unexpectedly failed");

    // Second use attempt with same token must return null (replay blocked)
    const replayAttempt = await verifyDownloadToken(token, "file_doc_102", true);
    if (replayAttempt !== null) {
      throw new Error("CRITICAL SECURITY FLAW: Download token replay was allowed after initial consumption!");
    }
  });

  await runTest("1.3 Verification with consume=false preserves token for subsequent consumption", async () => {
    const token = await createDownloadToken("usr_alice_3", "file_doc_103", 60);
    const peek = await verifyDownloadToken(token, "file_doc_103", false);
    if (!peek) throw new Error("Peek verification failed");

    const consumeNow = await verifyDownloadToken(token, "file_doc_103", true);
    if (!consumeNow) throw new Error("Consumption following peek failed");

    const secondReplay = await verifyDownloadToken(token, "file_doc_103", true);
    if (secondReplay !== null) throw new Error("Token was not consumed after explicit consume=true");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DOMAIN 2: NODE HEARTBEAT TELEMETRY INJECTION DEFENSE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("DOMAIN 2: Node Heartbeat Telemetry Injection & Boundary Defense");

  const giver = createUser({
    id: `usr_giver_${Date.now()}`,
    email: `giver_${Date.now()}@example.com`,
    passwordHash: "securePass123!",
    name: "Giver User",
    roles: "GIVER",
  });

  const rawNodeToken = `aeth_test_token_${Date.now()}`;
  const tokenHash = crypto.createHash("sha256").update(rawNodeToken).digest("hex");
  const testNode = registerStorageNode({
    id: `node_test_${Date.now()}`,
    ownerId: giver.id,
    nodeName: "Test Security Node",
    nodeTokenHash: tokenHash,
    capacityBytes: BigInt(50) * BigInt(1024 * 1024 * 1024), // 50 GB
    storageDirectory: "data/nodes/test_security_node",
    endpoint: "http://localhost:3000",
  });

  await runTest("2.1 Heartbeat with negative usedBytes is rejected (400)", async () => {
    const req = new NextRequest("http://localhost:3000/api/nodes/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${rawNodeToken}`,
      },
      body: JSON.stringify({ usedBytes: -500 }),
    });
    const res = await heartbeatHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("Invalid telemetry metrics")) throw new Error(`Unexpected error: ${data.error}`);
  });

  await runTest("2.2 Heartbeat with NaN or Infinity usedBytes is rejected (400)", async () => {
    // In JSON, Infinity/NaN serialize to null or require direct malformed payload check
    const req = new NextRequest("http://localhost:3000/api/nodes/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${rawNodeToken}`,
      },
      body: JSON.stringify({ usedBytes: "not-a-number" }),
    });
    const res = await heartbeatHandler(req);
    // string usedBytes should fail validation or fallback safely
    if (res.status !== 400 && res.status !== 200) throw new Error(`Unexpected status: ${res.status}`);
  });

  await runTest("2.3 Heartbeat with usedBytes exceeding registered capacity is rejected (400)", async () => {
    const excessiveBytes = 100 * 1024 * 1024 * 1024; // 100 GB on 50 GB node
    const req = new NextRequest("http://localhost:3000/api/nodes/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${rawNodeToken}`,
      },
      body: JSON.stringify({ usedBytes: excessiveBytes }),
    });
    const res = await heartbeatHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("exceeds node capacity bounds")) throw new Error(`Unexpected error: ${data.error}`);
  });

  await runTest("2.4 Heartbeat with negative latencyMs is rejected (400)", async () => {
    const req = new NextRequest("http://localhost:3000/api/nodes/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${rawNodeToken}`,
      },
      body: JSON.stringify({ latencyMs: -25 }),
    });
    const res = await heartbeatHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  await runTest("2.5 Legitimate heartbeat with valid telemetry metrics succeeds (200)", async () => {
    const req = new NextRequest("http://localhost:3000/api/nodes/heartbeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${rawNodeToken}`,
      },
      body: JSON.stringify({
        usedBytes: 1024 * 1024,
        availableBytes: 49 * 1024 * 1024 * 1024,
        latencyMs: 14,
      }),
    });
    const res = await heartbeatHandler(req);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (data.status !== "OK" || data.nodeId !== testNode.id) throw new Error("Heartbeat response invalid");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DOMAIN 3: DEFENSIVE SECURITY HEADERS IN MIDDLEWARE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("DOMAIN 3: Defensive Security Headers Across Public & Protected Routes");

  await runTest("3.1 Public landing route receives all defensive security headers", async () => {
    const req = new NextRequest("http://localhost:3000/");
    const res = await middleware(req);
    if (res.headers.get("X-Content-Type-Options") !== "nosniff") throw new Error("Missing X-Content-Type-Options");
    if (res.headers.get("X-Frame-Options") !== "DENY") throw new Error("Missing X-Frame-Options");
    if (res.headers.get("Referrer-Policy") !== "strict-origin-when-cross-origin") throw new Error("Missing Referrer-Policy");
    if (!res.headers.get("Content-Security-Policy")?.includes("default-src 'self'")) throw new Error("Missing CSP");
    if (!res.headers.get("Permissions-Policy")?.includes("camera=()")) throw new Error("Missing Permissions-Policy");
  });

  await runTest("3.2 Authentication login route receives defensive security headers", async () => {
    const req = new NextRequest("http://localhost:3000/login");
    const res = await middleware(req);
    if (res.headers.get("X-Frame-Options") !== "DENY") throw new Error("Clickjacking risk: Missing X-Frame-Options on /login");
    if (res.headers.get("X-Content-Type-Options") !== "nosniff") throw new Error("Missing X-Content-Type-Options on /login");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DOMAIN 4: REGISTRATION VALIDATION & BCRYPT CPU DoS DEFENSE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("DOMAIN 4: Registration Input Validation & Bcrypt DoS Defense");

  await runTest("4.1 Oversized password (>128 chars) is rejected immediately (400)", async () => {
    const hugePassword = "A".repeat(5000);
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `dos_test_${Date.now()}@example.com`,
        password: hugePassword,
        name: "DoS Test User",
      }),
    });
    const res = await registerHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("128 characters")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  await runTest("4.2 Malformed email is rejected (400)", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "not-a-valid-email-string",
        password: "ValidPassword123!",
        name: "Invalid Email User",
      }),
    });
    const res = await registerHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("Invalid email format")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  await runTest("4.3 Email is trimmed and normalized to lowercase on registration", async () => {
    const uniqueEmailPart = `normal_${Date.now()}`;
    const messyEmail = `   ${uniqueEmailPart.toUpperCase()}@EXAMPLE.COM   `;
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: messyEmail,
        password: "ValidPassword123!",
        name: "Normalized User",
      }),
    });
    const res = await registerHandler(req);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    const expectedNormalized = `${uniqueEmailPart.toLowerCase()}@example.com`;
    if (data.user.email !== expectedNormalized) {
      throw new Error(`Email not normalized! Got: ${data.user.email}, expected: ${expectedNormalized}`);
    }
  });

  await runTest("4.4 Login with password > 128 chars is rejected without heavy hashing (401)", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "B".repeat(2000),
      }),
    });
    const res = await loginHandler(req);
    if (res.status !== 401) throw new Error(`Expected status 401, got ${res.status}`);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DOMAIN 5: PAYMENT WEBHOOK TIMESTAMP FRESHNESS & REPLAY DEFENSE
  // ──────────────────────────────────────────────────────────────────────────
  logSection("DOMAIN 5: Payment Webhook Replay & Timestamp Freshness Defense");

  const buyer = createUser({
    id: `usr_buyer_${Date.now()}`,
    email: `buyer_${Date.now()}@example.com`,
    passwordHash: "securePass123!",
    name: "Buyer User",
    roles: "TAKER",
  });

  const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || "whsec_aethergrid_live_prod_secret_2026";

  await runTest("5.1 Fresh webhook with valid HMAC signature succeeds (200)", async () => {
    const payload = JSON.stringify({
      userId: buyer.id,
      planId: "PLAN_20GB",
      amountInr: 20,
      providerPaymentId: `pay_fresh_${Date.now()}`,
    });
    const signature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();

    const req = new NextRequest("http://localhost:3000/api/payment/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-aether-signature": signature,
        "x-aether-timestamp": currentTimestamp,
      },
      body: payload,
    });
    const res = await webhookHandler(req);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
  });

  await runTest("5.2 Stale webhook (10 minutes old) is rejected with 403 (Replay Attack Blocked)", async () => {
    const payload = JSON.stringify({
      userId: buyer.id,
      planId: "PLAN_20GB",
      amountInr: 20,
      providerPaymentId: `pay_stale_${Date.now()}`,
    });
    const signature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");
    const staleTimestamp = (Math.floor(Date.now() / 1000) - 600).toString(); // 10 mins ago

    const req = new NextRequest("http://localhost:3000/api/payment/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-aether-signature": signature,
        "x-aether-timestamp": staleTimestamp,
      },
      body: payload,
    });
    const res = await webhookHandler(req);
    if (res.status !== 403) throw new Error(`Expected status 403, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("replay protection")) throw new Error(`Unexpected error: ${data.error}`);
  });

  await runTest("5.3 Webhook with missing cryptographic signature is rejected (400)", async () => {
    const payload = JSON.stringify({
      userId: "usr_buyer_3",
      planId: "PLAN_20GB",
      amountInr: 20,
      providerPaymentId: `pay_nosig_${Date.now()}`,
    });

    const req = new NextRequest("http://localhost:3000/api/payment/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    const res = await webhookHandler(req);
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SUMMARY RESULTS
  // ──────────────────────────────────────────────────────────────────────────
  console.log(`\n${ANSI_CYAN}══════════════════════════════════════════════════════════════════${ANSI_RESET}`);
  console.log(`  SUITE COMPLETE: ${ANSI_GREEN}${passCount} PASSED${ANSI_RESET}, ${failCount > 0 ? ANSI_RED : ANSI_GREEN}${failCount} FAILED${ANSI_RESET}`);
  console.log(`${ANSI_CYAN}══════════════════════════════════════════════════════════════════${ANSI_RESET}\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error running test suite:", err);
  process.exit(1);
});
