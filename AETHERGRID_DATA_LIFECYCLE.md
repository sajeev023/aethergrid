# 🔄 AETHERGRID DATA LIFECYCLE SPECIFICATION
**Document Version**: 2.0.0 (Zero-Trust Master Specification)  
**Target Audience**: Data Engineers, Compliance Officers, Security Architects

---

## 1. End-to-End Data Flow Diagram

```
[TAKER CLIENT]
      │
      │ 1. POST /api/taker/files (Multipart Form Data)
      ▼
[ORCHESTRATOR INGESTION]
      │ 2. Authenticate Session / User ID
      │ 3. Check Server Quota: used + file.size <= quota
      │ 4. Generate fileId: file_<timestamp>_<random>
      │ 5. Calculate Original SHA-256 Checksum
      ▼
[CHUNKING & ENCRYPTION PIPELINE]
      │ 6. Partition fileBuffer into 2MB blocks
      │ 7. Derive ObjectKey: HKDF(UserMasterKey, fileId)
      │ 8. For each chunk:
      │    a. Generate random 12-byte IV
      │    b. AES-256-GCM encrypt chunk -> ciphertext + 16-byte AuthTag
      │    c. Package: [IV][AuthTag][Ciphertext]
      │    d. Compute chunkHash: SHA-256(package)
      ▼
[DISTRIBUTED STORAGE ALLOCATION]
      │ 9. Query candidate nodes: status='ONLINE' & free >= chunk.length
      │ 10. Write primary chunk: <storage_dir>/chunks/<chunkHash>.chunk
      │ 11. Write replica chunk: <storage_dir>/chunks/<chunkHash>.chunk
      │ 12. Record storage_chunks & files in SQLite
      ▼
[PHYSICAL PROVIDER STORAGE (D:)]
      Stores ONLY: <chunkHash>.chunk
      (Zero plaintext, zero customer metadata, zero keys)
```

---

## 2. Detailed Lifecycle Stages

### Stage 1: Ingestion & Admission Control
1. **Request Reception**: Taker client transmits file buffer over TLS 1.3.
2. **Authentication**: `getCurrentUser(request)` extracts and validates the session JWT.
3. **Payload Inspection**:
   * File size checked against `MAX_FILE_SIZE_BYTES` (default 100 MB for MVP).
   * MIME type categorized (`image/*`, `video/*`, `document`, `other`).
   * Logical filename sanitized with `path.basename()`.
4. **Server-Side Quota Enforcement**:
   * Retrieves active plan from `taker_subscriptions`.
   * Sums active un-trashed file bytes from `files`.
   * Rejects immediately with `400` if upload would exceed subscription quota.

### Stage 2: Cryptographic Chunking
1. **Partitioning**: File buffer is sliced into sequential 2 MB binary chunks (`CHUNK_SIZE_BYTES = 2097152`).
2. **Key Derivation**:
   * `deriveUserMasterKey(userId)` produces a 32-byte User Master Key.
   * `deriveObjectKey(userId, fileId)` produces an isolated 32-byte Object Key.
3. **AES-256-GCM Encryption**:
   * Cryptographic IV: 12 random bytes.
   * Ciphertext produced via GCM mode.
   * Authentication tag (16 bytes) appended.
   * Chunk hash: `crypto.createHash("sha256").update(encryptedBuffer).digest("hex")`.

### Stage 3: Storage Allocation & Jail Placement
1. **Node Selection**: `selectReplicaNodes` evaluates all `ONLINE` nodes with verified physical free space exceeding safety margins (`AETHERGRID_RESERVED_FREE_SPACE_GB`).
2. **Path Verification**: `assertPathInsideStorageRoot` validates the resolved target path against the allowed node chunks folder.
3. **Physical Write**: Chunk written synchronously with atomic error rollback.

### Stage 4: Retrieval & Authentication
1. **Access Authorization**:
   * Verified either by active user session or ephemeral 60-second signed download token (`?token=...`).
   * Strict IDOR check: `file.user_id === session.userId`.
2. **Chunk Assembly & Decryption**:
   * For each chunk index, primary node is queried.
   * Decryption verifies the GCM 16-byte authentication tag via `decipher.final()`.
   * If tag verification fails (indicating disk corruption or Giver tampering), the system automatically routes to the replica node.
3. **Integrity Confirmation**: Complete reassembled buffer SHA-256 checksum is compared against the database checksum recorded at upload time.

### Stage 5: Deletion & Disk Space Reclamation
1. **Soft Deletion**:
   * Moving a file to Trash sets `is_trashed = 1`, `trashed_at = <timestamp>`.
   * File remains restorable for a 30-day retention grace period.
2. **Permanent Distributed Deletion (`deleteFileDistributed`)**:
   * Authenticates caller ownership.
   * Queries all primary and replica chunks from `storage_chunks`.
   * Deletes physical `.chunk` files from provider disk paths within the path jail.
   * Decrements `storage_nodes.used_bytes` and `allocated_bytes`.
   * Removes logical metadata from `storage_chunks`, `photos`, and `files` tables.
