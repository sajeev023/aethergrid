import assert from "node:assert";
import { getDatabase, ensureUserRecord, findUserById, getTakerSubscription } from "../lib/db.ts";
import { distributeAndStoreFile } from "../lib/orchestrator/index.ts";
import { createSessionToken, getCurrentUser } from "../lib/auth.ts";

console.log("----------------------------------------------------------------");
console.log("TEST: Serverless Session Rehydration & Upload FK Integrity Test");
console.log("----------------------------------------------------------------\n");

async function runTests() {
  const db = getDatabase();

  // Test 1: ensureUserRecord on a brand new user
  console.log("Test 1: ensureUserRecord provisions user and active 3 GB beta subscription...");
  const testUserId = "usr_test_rehydrate_" + Date.now();
  const testEmail = testUserId + "@example.com";
  const user = ensureUserRecord(testUserId, testEmail, "Rehydration Tester", "TAKER");
  
  assert.strictEqual(user.id, testUserId);
  assert.strictEqual(user.email, testEmail);

  const found = findUserById(testUserId);
  assert.ok(found, "User record must exist in SQLite");
  
  const sub = getTakerSubscription(testUserId);
  assert.ok(sub, "Taker subscription must exist");
  assert.strictEqual(sub.plan_id, "PLAN_3GB_BETA");
  assert.strictEqual(sub.quota_bytes, 3 * 1024 * 1024 * 1024);
  console.log("  ✓ Test 1 passed: User and 3 GB subscription cleanly provisioned.\n");

  // Test 2: distributeAndStoreFile with a brand-new user without prior DB record (image upload)
  console.log("Test 2: distributeAndStoreFile with image file on a brand new userId...");
  const freshUserId = "usr_unseeded_" + Date.now();
  const dummyImage = Buffer.from("fake-png-content-stream-bytes-1234567890");
  
  // Notice: freshUserId is NOT inserted into users beforehand!
  const stored = await distributeAndStoreFile({
    userId: freshUserId,
    originalName: "ChatGPT Image Sep 19, 2026.png",
    mimeType: "image/png",
    fileBuffer: dummyImage,
  });

  assert.ok(stored.id, "Stored file must have an ID");
  assert.strictEqual(stored.name, "ChatGPT Image Sep 19, 2026.png");
  assert.ok(stored.chunks.length >= 1, "Must have stored chunks");

  // Verify file in DB
  const fileRow = db.prepare("SELECT * FROM files WHERE id = ?").get(stored.id);
  assert.ok(fileRow, "File record must exist in DB");
  assert.strictEqual(fileRow.user_id, freshUserId);

  // Verify photo in DB
  const photoRow = db.prepare("SELECT * FROM photos WHERE file_id = ?").get(stored.id);
  assert.ok(photoRow, "Photo index record must exist in DB without foreign key error");
  assert.strictEqual(photoRow.user_id, freshUserId);
  console.log("  ✓ Test 2 passed: Image upload succeeded with zero FK errors.\n");

  // Test 3: getCurrentUser rehydration from valid JWT
  console.log("Test 3: getCurrentUser auto-rehydration from signed JWT...");
  const jwtUserId = "usr_jwt_" + Date.now();
  const token = await createSessionToken({
    userId: jwtUserId,
    email: jwtUserId + "@example.com",
    name: "JWT User",
    roles: "TAKER",
    activeRole: "TAKER",
  });

  // Verify that jwtUserId is not in DB yet
  const before = db.prepare("SELECT id FROM users WHERE id = ?").get(jwtUserId);
  assert.strictEqual(before, undefined, "User must not exist before getCurrentUser call");

  // Simulate incoming request with cookie
  const fakeRequest = {
    headers: new Headers(),
    cookies: {
      get: (name) => (name === "aether_session" ? { value: token } : undefined),
    },
  };

  const session = await getCurrentUser(fakeRequest);
  assert.ok(session, "Session must be verified");
  assert.strictEqual(session.userId, jwtUserId);

  // User should now exist in DB
  const after = db.prepare("SELECT id FROM users WHERE id = ?").get(jwtUserId);
  assert.ok(after, "User must be rehydrated into SQLite");
  console.log("  ✓ Test 3 passed: Session rehydration verified.\n");

  console.log("================================================================");
  console.log("ALL 3 REHYDRATION & UPLOAD TESTS PASSED WITH ZERO ERRORS!");
  console.log("================================================================");
}

runTests().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
