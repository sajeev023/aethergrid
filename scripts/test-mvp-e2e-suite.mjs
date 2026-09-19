import crypto from "crypto";
import fs from "fs";
import path from "path";
import {
  getDatabase,
  createUser,
  findUserById,
  findUserByEmail,
  getTakerSubscription,
  getUserFiles,
  renameUserFile,
  getStorageNodeById,
  recordNodeHeartbeat,
  calculateTakerStorageUsage,
  addToWaitlist,
  addFeedback,
} from "../lib/db.ts";
import {
  createSessionToken,
  verifySessionToken,
  hashPassword,
  verifyPassword,
} from "../lib/auth.ts";
import {
  distributeAndStoreFile,
  retrieveAndDecryptFile,
  deleteFileDistributed,
  validateChunkHash,
  assertPathInsideStorageRoot,
  inspectPhysicalDiskFreeBytes,
  MAX_BETA_USER_QUOTA_BYTES,
} from "../lib/orchestrator/index.ts";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  }
}

async function runMvpE2ESuite() {
  console.log("\n" + "=".repeat(70));
  console.log("   🚀 AETHERGRID MVP FINAL RELEASE E2E VERIFICATION SUITE");
  console.log("   Testing Functionality, Reliability, Security, Node & Sandbox");
  console.log("=".repeat(70) + "\n");

  const db = getDatabase();
  const timestamp = Date.now();

  // Purge any stale mock test nodes from previous test runs to ensure Node #001 is the sole physical storage node
  db.prepare("DELETE FROM storage_nodes WHERE id != 'AETHERGRID-NODE-001'").run();
  db.prepare("UPDATE storage_nodes SET status = 'ONLINE', last_heartbeat_at = ? WHERE id = 'AETHERGRID-NODE-001'").run(new Date().toISOString());

  // ══════════════════════════════════════════════════════════════════
  // 1. AUTHENTICATION & 3 GB BETA QUOTA INITIALIZATION
  // ══════════════════════════════════════════════════════════════════
  console.log("━━━ [1/9] AUTHENTICATION & 3 GB BETA QUOTA LIFECYCLE ━━━");

  const emailA = `alice_${timestamp}@aethergrid.io`;
  const emailB = `bob_${timestamp}@aethergrid.io`;

  const userA = createUser({
    id: `usr_a_${timestamp}`,
    email: emailA,
    passwordHash: "bcrypt_hash_simulated_user_a",
    name: "Alice User",
    roles: "TAKER",
  });
  assert(userA.id.startsWith("usr_a_"), "User A created successfully");

  const userB = createUser({
    id: `usr_b_${timestamp}`,
    email: emailB,
    passwordHash: "bcrypt_hash_simulated_user_b",
    name: "Bob User",
    roles: "TAKER",
  });
  assert(userB.id.startsWith("usr_b_"), "User B created successfully");

  // Verify duplicate registration rejection
  let dupRejected = false;
  try {
    createUser({
      id: `usr_dup_${timestamp}`,
      email: emailA,
      passwordHash: "another_hash",
      name: "Duplicate Alice",
      roles: "TAKER",
    });
  } catch (err) {
    dupRejected = true;
  }
  assert(dupRejected, "Duplicate email registration rejected by database");

  // Verify 3 GB Beta Quota provisioned
  const subA = getTakerSubscription(userA.id);
  assert(subA !== null, "User A subscription allocated");
  assert(
    Number(subA.quota_bytes) === MAX_BETA_USER_QUOTA_BYTES,
    `User A quota strictly initialized to 3 GB (${subA.quota_bytes} bytes === ${MAX_BETA_USER_QUOTA_BYTES})`
  );
  assert(subA.plan_id === "PLAN_3GB_BETA", "Plan ID assigned as PLAN_3GB_BETA");

  // Password hashing & verification
  const testPw = "SuperSecretBeta2026!";
  const hashed = await hashPassword(testPw);
  const isValidPw = await verifyPassword(testPw, hashed);
  const isInvalidPw = await verifyPassword("WrongPassword123", hashed);
  assert(isValidPw === true, "Bcrypt password hashing and validation verified");
  assert(isInvalidPw === false, "Invalid password correctly rejected by bcrypt");

  // Session creation & verification
  const sessionToken = await createSessionToken({
    userId: userA.id,
    email: userA.email,
    name: userA.name,
    roles: "TAKER",
    activeRole: "TAKER",
  });
  assert(typeof sessionToken === "string" && sessionToken.length > 20, "Session token generated");
  const verifiedSession = await verifySessionToken(sessionToken);
  assert(verifiedSession && verifiedSession.userId === userA.id, "Session token verified with correct userId");

  // ══════════════════════════════════════════════════════════════════
  // 2. REAL NODE #001 & SANDBOX SPECIFICATION
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [2/9] NODE #001 REAL HARDWARE & SANDBOX INTEGRITY ━━━");

  const storagePath = process.env.AETHERGRID_NODE_STORAGE_PATH || "D:\\AetherGridStorage";
  assert(fs.existsSync(storagePath), `Dedicated storage path exists: ${storagePath}`);
  assert(!storagePath.toUpperCase().startsWith("C:"), `Storage path is isolated from system C: drive (${storagePath})`);

  const freeBytes = inspectPhysicalDiskFreeBytes(storagePath);
  const freeGb = (Number(freeBytes) / (1024 * 1024 * 1024)).toFixed(1);
  assert(Number(freeBytes) > 50 * 1024 * 1024 * 1024, `Physical free space verified: ${freeGb} GB available`);

  const node001 = getStorageNodeById("AETHERGRID-NODE-001");
  assert(node001 !== null, "Node #001 found in database");
  const nodeCapGb = Math.round(node001.capacity_bytes / (1024 * 1024 * 1024));
  assert(nodeCapGb === 100, `Node #001 configured with 100 GB allocation (${nodeCapGb} GB)`);

  // Ensure Node #001 is ONLINE for upload testing
  db.prepare("UPDATE storage_nodes SET status = 'ONLINE', last_heartbeat_at = ? WHERE id = 'AETHERGRID-NODE-001'").run(new Date().toISOString());

  // ══════════════════════════════════════════════════════════════════
  // 3. STORAGE & CRYPTOGRAPHIC INTEGRITY ACROSS ALL FORMATS
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [3/9] STORAGE & CRYPTOGRAPHIC INTEGRITY ACROSS FORMATS ━━━");

  const testPayloads = [
    {
      name: "sample_photo.jpg",
      mime: "image/jpeg",
      data: Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), crypto.randomBytes(128 * 1024), Buffer.from([0xff, 0xd9])]),
    },
    {
      name: "vector_diagram.png",
      mime: "image/png",
      data: Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), crypto.randomBytes(64 * 1024)]),
    },
    {
      name: "clip_screencast.mp4",
      mime: "video/mp4",
      data: Buffer.concat([Buffer.from("....ftypisom....", "ascii"), crypto.randomBytes(256 * 1024)]),
    },
    {
      name: "whitepaper.pdf",
      mime: "application/pdf",
      data: Buffer.concat([Buffer.from("%PDF-1.7\n%âãÏÓ\n", "utf-8"), crypto.randomBytes(80 * 1024), Buffer.from("\n%%EOF", "utf-8")]),
    },
    {
      name: "backup_bundle.zip",
      mime: "application/zip",
      data: Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), crypto.randomBytes(90 * 1024)]),
    },
    {
      name: "manifest_log.txt",
      mime: "text/plain",
      data: Buffer.from("AetherGrid MVP 2026 Pre-launch Manifest. Integrity guaranteed.\n".repeat(200), "utf-8"),
    },
    {
      name: "multi_chunk_5mb.bin",
      mime: "application/octet-stream",
      data: crypto.randomBytes(5 * 1024 * 1024), // 5 MB triggers multiple 2 MB chunks
    },
    {
      name: "日本語_файл_नमस्ते_2026.dat",
      mime: "application/octet-stream",
      data: crypto.randomBytes(45 * 1024),
    },
  ];

  const storedFiles = [];

  for (const testItem of testPayloads) {
    const originalHash = crypto.createHash("sha256").update(testItem.data).digest("hex");

    const fileRecord = await distributeAndStoreFile({
      userId: userA.id,
      originalName: testItem.name,
      mimeType: testItem.mime,
      fileBuffer: testItem.data,
    });

    assert(fileRecord && fileRecord.id, `Uploaded: ${testItem.name} (${testItem.data.length} bytes)`);

    const { fileBuffer: downloadedBuffer, fileRecord: meta } = await retrieveAndDecryptFile(fileRecord.id, userA.id);
    const downloadedHash = crypto.createHash("sha256").update(downloadedBuffer).digest("hex");

    assert(
      originalHash === downloadedHash,
      `SHA-256 byte-for-byte integrity verified for: ${testItem.name} [${originalHash.slice(0, 12)}...]`
    );
    assert(meta.name === testItem.name, `Filename metadata preserved: ${testItem.name}`);

    storedFiles.push(fileRecord);
  }

  // ══════════════════════════════════════════════════════════════════
  // 4. FILE MANAGEMENT: LIST, RENAME, & CLEAN DELETION
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [4/9] FILE MANAGEMENT: LIST, RENAME & CLEAN DELETION ━━━");

  // Verify list
  const userAFiles = getUserFiles(userA.id);
  assert(userAFiles.length === testPayloads.length, `User A file list contains all ${testPayloads.length} uploaded files`);

  // Rename a file
  const fileToRename = storedFiles[0];
  const newFileName = "renamed_photo_final_2026.jpg";
  const renameSuccess = renameUserFile(fileToRename.id, userA.id, newFileName);
  assert(renameSuccess, "renameUserFile returned true");

  const updatedFiles = getUserFiles(userA.id);
  const renamedMatch = updatedFiles.find((f) => f.id === fileToRename.id);
  assert(renamedMatch && renamedMatch.name === newFileName, `File name updated in database to: ${newFileName}`);

  // Retrieve with new name and verify integrity still intact
  const { fileBuffer: renamedDownload } = await retrieveAndDecryptFile(fileToRename.id, userA.id);
  const renamedHash = crypto.createHash("sha256").update(renamedDownload).digest("hex");
  const expectedRenamedHash = crypto.createHash("sha256").update(testPayloads[0].data).digest("hex");
  assert(renamedHash === expectedRenamedHash, "Renamed file downloads with 100% cryptographic integrity");

  // Clean Deletion
  const deleteResult = await deleteFileDistributed(fileToRename.id, userA.id);
  assert(deleteResult && deleteResult.success, "deleteFileDistributed returned success: true");

  const postDeleteFiles = getUserFiles(userA.id);
  assert(!postDeleteFiles.some((f) => f.id === fileToRename.id), "File removed from user file list");

  let downloadDeletedBlocked = false;
  try {
    await retrieveAndDecryptFile(fileToRename.id, userA.id);
  } catch (err) {
    downloadDeletedBlocked = true;
  }
  assert(downloadDeletedBlocked, "Attempting to download deleted file is blocked with 404/Error");

  // ══════════════════════════════════════════════════════════════════
  // 5. SERVER-SIDE 3 GB QUOTA ENFORCEMENT & CONCURRENT RACE DEFENSE
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [5/9] 3 GB QUOTA LIMIT & CONCURRENT RACE DEFENSE ━━━");

  // Test quota calculation
  const usageBefore = calculateTakerStorageUsage(userA.id);
  assert(
    usageBefore.maxQuotaBytes === MAX_BETA_USER_QUOTA_BYTES,
    `Calculated quota shows strict 3 GB limit (${usageBefore.maxQuotaGb} GB)`
  );

  // Attempt to upload beyond 3 GB by creating a mock user with almost full storage
  const quotaTestUser = createUser({
    id: `usr_quota_${timestamp}`,
    email: `quota_${timestamp}@aethergrid.io`,
    passwordHash: "hash123",
    name: "Quota Tester",
    roles: "TAKER",
  });

  // Temporarily set used quota in database to 3 GB - 1 MB
  const nearFullBytes = MAX_BETA_USER_QUOTA_BYTES - (1024 * 1024);
  const nowIso = new Date().toISOString();
  db.prepare(`
    INSERT INTO files (id, user_id, name, original_name, size, mime_type, encryption_iv, checksum, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `file_filler_${timestamp}`,
    quotaTestUser.id,
    "filler.bin",
    "filler.bin",
    nearFullBytes,
    "application/octet-stream",
    "iv",
    "hash",
    "HEALTHY",
    nowIso,
    nowIso
  );

  const usageNearFull = calculateTakerStorageUsage(quotaTestUser.id);
  assert(usageNearFull.usedBytes === nearFullBytes, "User quota usage updated to near 3 GB");

  // Attempt to upload 2 MB file (which will exceed 3 GB quota by ~1 MB)
  let quotaExceededBlocked = false;
  try {
    await distributeAndStoreFile({
      userId: quotaTestUser.id,
      originalName: "exceed_quota.bin",
      mimeType: "application/octet-stream",
      fileBuffer: crypto.randomBytes(2 * 1024 * 1024),
    });
  } catch (err) {
    if (err.message.includes("quota exceeded") || err.message.includes("3 GB") || err.message.includes("Storage limit reached")) {
      quotaExceededBlocked = true;
    }
  }
  assert(quotaExceededBlocked, "Backend strictly rejected upload exceeding 3 GB beta quota!");

  // Test concurrent upload race condition:
  // User has 1 MB remaining. Fire two simultaneous 800 KB uploads. Only ONE can succeed; second must be rejected!
  const raceUser = createUser({
    id: `usr_race_${timestamp}`,
    email: `race_${timestamp}@aethergrid.io`,
    passwordHash: "hash123",
    name: "Race Tester",
    roles: "TAKER",
  });

  // Set raceUser to have only 1 MB free
  const raceNearFull = MAX_BETA_USER_QUOTA_BYTES - (1024 * 1024);
  db.prepare(`
    INSERT INTO files (id, user_id, name, original_name, size, mime_type, encryption_iv, checksum, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `file_race_filler_${timestamp}`,
    raceUser.id,
    "filler_race.bin",
    "filler_race.bin",
    raceNearFull,
    "application/octet-stream",
    "iv",
    "hash",
    "HEALTHY",
    nowIso,
    nowIso
  );

  const uploadPayload800k = crypto.randomBytes(800 * 1024);
  const raceResults = await Promise.allSettled([
    distributeAndStoreFile({
      userId: raceUser.id,
      originalName: "race_file_1.bin",
      mimeType: "application/octet-stream",
      fileBuffer: uploadPayload800k,
    }),
    distributeAndStoreFile({
      userId: raceUser.id,
      originalName: "race_file_2.bin",
      mimeType: "application/octet-stream",
      fileBuffer: uploadPayload800k,
    }),
  ]);

  const fulfilledCount = raceResults.filter((r) => r.status === "fulfilled").length;
  const rejectedCount = raceResults.filter((r) => r.status === "rejected").length;
  assert(
    fulfilledCount === 1 && rejectedCount === 1,
    `Concurrent upload race defense verified: exactly 1 succeeded, 1 rejected (${fulfilledCount} fulfilled, ${rejectedCount} rejected)`
  );

  // ══════════════════════════════════════════════════════════════════
  // 6. MULTI-TENANT USER ISOLATION (ZERO-KNOWLEDGE & IDOR)
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [6/9] MULTI-TENANT USER ISOLATION & IDOR DEFENSE ━━━");

  const victimFile = storedFiles[1]; // Owned by Alice

  // Bob attempts IDOR Read
  let bobReadBlocked = false;
  try {
    await retrieveAndDecryptFile(victimFile.id, userB.id);
  } catch (err) {
    bobReadBlocked = true;
  }
  assert(bobReadBlocked, "IDOR Read: Bob cannot download Alice's file (Blocked)");

  // Bob attempts IDOR Rename
  let bobRenameBlocked = false;
  try {
    renameUserFile(victimFile.id, userB.id, "hacked_by_bob.png");
  } catch (err) {
    bobRenameBlocked = true;
  }
  assert(bobRenameBlocked, "IDOR Rename: Bob cannot rename Alice's file (Rejected)");

  // Bob attempts IDOR Delete
  let bobDeleteBlocked = false;
  try {
    const res = await deleteFileDistributed(victimFile.id, userB.id);
    if (!res) bobDeleteBlocked = true;
  } catch (err) {
    bobDeleteBlocked = true;
  }
  assert(bobDeleteBlocked, "IDOR Delete: Bob cannot delete Alice's file (Blocked)");

  // Bob file list must be empty
  const bobFiles = getUserFiles(userB.id);
  assert(bobFiles.length === 0, "Bob file listing strictly isolates User A data");

  // ══════════════════════════════════════════════════════════════════
  // 7. HONEST NODE FAILURE & RECOVERY BEHAVIOR
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [7/9] HONEST NODE SHUTDOWN & RECOVERY LIFECYCLE ━━━");

  // 1. Simulate Node #001 Shutdown
  db.prepare("UPDATE storage_nodes SET status = 'OFFLINE', last_heartbeat_at = datetime('now', '-30 minutes') WHERE id = 'AETHERGRID-NODE-001'").run();

  const usageOffline = calculateTakerStorageUsage(userA.id);
  assert(
    usageOffline.storageNodeOffline === true,
    "calculateTakerStorageUsage honestly flags storageNodeOffline = true when node is down"
  );
  assert(
    usageOffline.status === "NODE_OFFLINE",
    "calculateTakerStorageUsage returns honest NODE_OFFLINE status"
  );

  // Attempt download during shutdown
  let downloadFailsWhenOffline = false;
  try {
    await retrieveAndDecryptFile(victimFile.id, userA.id);
  } catch (err) {
    if (err.message.includes("Storage node offline") || err.message.includes("unreachable")) {
      downloadFailsWhenOffline = true;
    }
  }
  assert(
    downloadFailsWhenOffline,
    "Download honestly fails with 503 Storage Node Offline (No fake disk fallback!)"
  );

  // 2. Simulate Node #001 Reconnect & Recovery
  recordNodeHeartbeat("AETHERGRID-NODE-001", 1024 * 1024 * 50, 400 * 1024 * 1024 * 1024, 12);

  const nodeRecovered = getStorageNodeById("AETHERGRID-NODE-001");
  assert(nodeRecovered.status === "ONLINE", "Heartbeat restores Node #001 to ONLINE state");

  const usageRecovered = calculateTakerStorageUsage(userA.id);
  assert(
    usageRecovered.storageNodeOffline === false,
    "calculateTakerStorageUsage restores storageNodeOffline = false"
  );

  // Download succeeds after recovery
  const { fileBuffer: recoveredDownload } = await retrieveAndDecryptFile(victimFile.id, userA.id);
  assert(recoveredDownload.length > 0, "File download succeeds immediately after node returns ONLINE");

  // ══════════════════════════════════════════════════════════════════
  // 8. SECURITY RED TEAM: PATH TRAVERSAL & INJECTION ATTACKS
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [8/9] RED TEAM: PATH TRAVERSAL, ESCAPE & INJECTION DEFENSE ━━━");

  const traversalPayloads = [
    "../../etc/shadow",
    "..\\..\\Windows\\System32\\config\\SAM",
    "\\\\attacker-smb\\share\\evil.chunk",
    "\\\\?\\C:\\Windows\\System32\\cmd.exe",
    "C:\\Users\\ADMIN\\secret.txt",
    "D:\\AetherGridStorage\\..\\..\\Windows",
    "chunk.bin\x00.exe",
    "test.txt:stream",
  ];

  for (const payload of traversalPayloads) {
    let rejected = false;
    try {
      assertPathInsideStorageRoot(payload, "D:\\AetherGridStorage\\chunks");
    } catch (err) {
      rejected = true;
    }
    assert(rejected, `Path escape rejected: ${payload.replace(/\0/g, "\\0")}`);
  }

  // ══════════════════════════════════════════════════════════════════
  // 9. WAITLIST & FEEDBACK SUBMISSION
  // ══════════════════════════════════════════════════════════════════
  console.log("\n━━━ [9/9] WAITLIST & FEEDBACK CAPTURE ━━━");

  const waitlistEntry = addToWaitlist({ email: `beta_seeker_${timestamp}@example.com`, name: "Beta Pioneer" });
  assert(waitlistEntry && waitlistEntry.email, "Waitlist entry successfully registered");

  // Duplicate waitlist submission
  const waitlistDup = addToWaitlist({ email: `beta_seeker_${timestamp}@example.com`, name: "Duplicate Name" });
  assert(waitlistDup && waitlistDup.success, "Duplicate waitlist entry handled idempotently");

  const feedbackEntry = addFeedback({
    userId: userA.id,
    userEmail: userA.email,
    message: "AetherGrid MVP 3 GB Beta is incredibly fast and responsive!",
    category: "GENERAL",
  });
  assert(feedbackEntry && feedbackEntry.id, "User feedback successfully recorded in database");

  // ══════════════════════════════════════════════════════════════════
  // CLEANUP & FINAL VERIFICATION SUMMARY
  // ══════════════════════════════════════════════════════════════════
  console.log("\n" + "=".repeat(70));
  console.log("   🏆 MVP E2E VERIFICATION SUITE RESULTS");
  console.log(`   Total Tests:  ${totalTests}`);
  console.log(`   Passed:       ${passedTests}`);
  console.log(`   Failed:       ${failedTests}`);
  console.log("=".repeat(70) + "\n");

  if (failedTests > 0) {
    console.error(`❌ MVP E2E SUITE FAILED WITH ${failedTests} FAILURES`);
    process.exit(1);
  } else {
    console.log("🌟 ALL MVP END-TO-END TESTS PASSED WITH ZERO DEFECTS!");
  }
}

runMvpE2ESuite().catch((err) => {
  console.error("FATAL ERROR IN MVP E2E SUITE:", err);
  process.exit(1);
});
