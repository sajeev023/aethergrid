# 🛡️ AETHERGRID THREAT MODEL
**Document Version**: 2.0.0 (Zero-Trust Production Release)  
**Security Classification**: CONFIDENTIAL & TECHNICAL  
**Target System**: AetherGrid Distributed Storage Marketplace  
**Scope**: Taker Client, Giver Storage Daemon, Platform Orchestrator, Network Transport

---

## 1. Executive Summary & Security Philosophy

AetherGrid is a peer-to-peer distributed storage marketplace where **Givers** contribute spare disk capacity and **Takers** rent secure personal cloud storage. 

The fundamental security challenge of AetherGrid is:
1. **A Taker must NEVER need to trust a Giver with the plaintext contents of their files.**
2. **A Giver must NEVER need to trust a Taker with access to their computer, filesystem, IP-sensitive infrastructure, or personal files.**

Therefore, AetherGrid is architected on **Absolute Zero Trust between Givers and Takers**. Neither party communicates directly with the other, neither party has access to the other's filesystem, and all cryptographic and routing operations are strictly mediated by the platform orchestrator.

---

## 2. System Boundaries & Trust Domains

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TAKER TRUST DOMAIN                              │
│  - Web Browser / Mobile App                                            │
│  - Holds User Credentials & Active Session Cookie                      │
│  - Plaintext files exist only in client memory before upload           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ TLS 1.3 (HTTPS)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   AETHERGRID ORCHESTRATOR DOMAIN                       │
│  - Authentication & Authorization Engine                               │
│  - Multi-Tenant IDOR Guard                                             │
│  - Cryptographic Key Derivation Engine (HKDF-SHA256)                   │
│  - Chunking & AES-256-GCM Encryption / Decryption Boundary             │
│  - Distributed Allocation & Health Monitor                             │
│  - SQLite Multi-Tenant Metadata Database (WAL Mode)                    │
└─────────────┬────────────────────────────────────────────┬─────────────┘
              │ Local Dedicated Bus / Outbound Heartbeat   │
              ▼                                            ▼
┌───────────────────────────┐                ┌───────────────────────────┐
│     GIVER A DOMAIN        │                │     GIVER B DOMAIN        │
│  - Dedicated Disk (D:)    │                │  - Dedicated Disk (E:)    │
│  - Chunks Jail Directory  │                │  - Chunks Jail Directory  │
│  - Stores: <hash>.chunk   │                │  - Stores: <hash>.chunk   │
│  - NO Plaintext Content   │                │  - NO Plaintext Content   │
│  - NO Encryption Keys     │                │  - NO Encryption Keys     │
│  - NO User Identity/Names │                │  - NO User Identity/Names │
└───────────────────────────┘                └───────────────────────────┘
```

---

## 3. Threat Vector Analysis & Mitigations

### 3.1. Threats from TAKER (Potentially Malicious Customer)

| Threat ID | Threat Action | Attack Vector | AetherGrid Mitigation & Verification |
| :--- | :--- | :--- | :--- |
| **T-01** | **Insecure Direct Object Reference (IDOR)** | Taker guesses or increments file ID (`file_123`) to access another customer's files. | **Enforced**: `files` table queries join against `user_id = session.userId`. `retrieveAndDecryptFile` aborts with `Access Denied` if `file.user_id !== session.userId`. Object IDs use 128-bit cryptographic randomness (`file_<timestamp>_<random>`). |
| **T-02** | **Storage Quota Manipulation** | Taker attempts to spoof `clientReportedUsedStorage` or send oversized payloads to exceed quota. | **Enforced**: Storage quota is checked purely server-side from `taker_subscriptions` and `SUM(size)` in the database before allocating chunks. Oversized uploads are rejected immediately (`MAX_FILE_SIZE_BYTES`). |
| **T-03** | **Malicious File Execution** | Taker uploads executable binaries, web shells, SVG scripts, or malicious HTML. | **Enforced**: Uploaded files are chunked into raw binary fragments, encrypted with AES-256-GCM, and stored as `.chunk` files. No uploaded file is ever executed or served directly with executable MIME types without `X-Content-Type-Options: nosniff` and `Content-Disposition: attachment`. |
| **T-04** | **Download Token Forgery & Replay** | Taker steals or creates a forged signed URL or reuses an expired download link. | **Enforced**: Ephemeral download tokens are HS256 JWTs with a strict **60-second TTL**, bound to both the exact `userId` and `fileId`. Tokens cannot be reused across files or users. |
| **T-05** | **Direct Giver Host Attack** | Taker attempts to discover Giver IP/hostname and connect directly to exploit local ports. | **Enforced**: Giver network endpoints, physical disk paths, and machine identities are completely stripped from all Taker-facing API responses. Takers only communicate with AetherGrid API endpoints over TLS. |
| **T-06** | **Path Traversal in Filenames** | Taker names file `../../../../Windows/System32/calc.exe` or `C:\boot.ini`. | **Enforced**: Filenames are sanitized with `path.basename()` before database insertion. Chunks on provider nodes are named strictly `<sha256>.chunk`, divorcing user filenames from the physical filesystem. |
| **T-07** | **Payment Plan Manipulation** | Taker modifies client state to claim `plan=PRO_500GB` without payment. | **Enforced**: Subscription upgrades require HMAC-SHA256 verified webhooks from the payment gateway or server-side authorized transactions. Client-side claims are completely ignored. |
| **T-08** | **Session Hijacking & Brute Force** | Taker conducts credential stuffing or attempts to hijack cookies. | **Enforced**: Sessions use `HttpOnly`, `SameSite=Lax`, `Secure` JWT cookies. Sliding-window rate limiters block more than 15 login attempts per minute per IP. Passwords hashed with `bcrypt` (10 rounds). |

---

### 3.2. Threats from GIVER (Potentially Malicious Storage Provider)

| Threat ID | Threat Action | Attack Vector | AetherGrid Mitigation & Verification |
| :--- | :--- | :--- | :--- |
| **G-01** | **Inspecting Plaintext Customer Files** | Giver opens the storage folder on their hard drive to view customer documents or photos. | **Enforced**: Plaintext never touches provider disks. Data is chunked and encrypted with **AES-256-GCM** using unique per-object keys before writing. Provider sees only opaque binary `.chunk` files. |
| **G-02** | **Chunk Bit-Flipping & Data Tampering** | Giver modifies bytes inside a customer `.chunk` file to corrupt data or inject payloads. | **Enforced**: AES-256-GCM produces a 16-byte cryptographic authentication tag. On decryption, `decipher.final()` verifies the tag. Any single-bit alteration throws a tamper exception, logs a security alert, and triggers automatic failover to the replica node. |
| **G-03** | **Chunk Swapping & Replacement** | Giver replaces Chunk A with Chunk B or an empty file. | **Enforced**: In addition to GCM auth tags, the orchestrator computes and verifies the overall file SHA-256 checksum upon reassembly against the immutable checksum recorded during upload. |
| **G-04** | **Arbitrary Deletion of Customer Data** | Giver deletes `.chunk` files from their disk. | **Enforced**: Distributed replication (primary + secondary) ensures the file is transparently reconstructed from the replica node. Nodes failing heartbeats are flagged `SUSPECTED_OFFLINE` (30s) and `OFFLINE` (90s). |
| **G-05** | **Storage Sandbox Escape (Windows Paths)** | Giver daemon or attacker attempts path traversal using `..`, `C:\`, UNC paths (`\\server\share`), or Alternate Data Streams (`:zone`). | **Enforced**: Path jail verified by `assertPathInsideStorageRoot` and `validateChunkHash`. Rejects UNC paths (`/^[\\/]{2}/`), null bytes, ADS colons, and verifies canonical path starts with the configured sandbox directory. |
| **G-06** | **Customer Identity Correlation** | Giver attempts to correlate chunk filenames with specific customers or filenames. | **Enforced**: Chunks are named purely `<sha256(ciphertext)>.chunk`. No user ID, email, logical filename, or metadata is written to the provider disk or included in node payloads. |
| **G-07** | **Node Impersonation & Credential Theft** | Malicious node claims to be Node #001 by supplying `nodeId: "AETHERGRID-NODE-001"`. | **Enforced**: Node identity is derived strictly from `node_token_hash`. Client-supplied `nodeId` in request bodies is completely ignored. Tokens are hashed with SHA-256 in the database. |
| **G-08** | **Post-Revocation Node Activity** | Giver whose node was revoked continues to send heartbeats or accept allocations. | **Enforced**: Node revocation sets `status = 'REVOKED'`, generates an unmatchable token hash, and sets `revoked_at`. Revoked nodes are rejected from heartbeat (401/403) and excluded from storage allocations. |

---

### 3.3. Threats from PLATFORM (Orchestrator Boundary)

| Threat ID | Threat Action | Attack Vector | AetherGrid Mitigation & Verification |
| :--- | :--- | :--- | :--- |
| **P-01** | **Global Key Compromise** | An attacker steals a single encryption key and decrypts the entire database. | **Enforced**: AetherGrid implements a 3-tier **HKDF-SHA256 key hierarchy**. The platform secret derives a unique User Master Key per user, which derives a unique Object Key per file. Decrypting one object never compromises another. |
| **P-02** | **Provider Earnings Forgery** | Giver manipulates API to credit themselves arbitrary earnings. | **Enforced**: Earnings are calculated deterministically on the server during valid heartbeats using active allocated GB-hours and stored in an immutable audit ledger. |
| **P-03** | **Admin Role Escalation** | Regular Taker accesses `/api/admin/...` routes. | **Enforced**: Admin endpoints verify `session.roles.includes("ADMIN")` both in `middleware.ts` and in route handlers. Unprivileged attempts return 403 Forbidden and log security alerts. |

---

### 3.4. Threats from EXTERNAL ATTACKERS

| Threat ID | Threat Action | Attack Vector | AetherGrid Mitigation & Verification |
| :--- | :--- | :--- | :--- |
| **X-01** | **Denial of Service & API Flood** | Flooding auth, upload, or heartbeat endpoints. | **Enforced**: Sliding-window rate limiter throttles excessive requests (15/min for login, 8/min for register, 120/min for heartbeats) with automatic memory cleanup. |
| **X-02** | **Credential Stuffing** | Automated spraying of compromised password lists. | **Enforced**: Per-IP rate limiting, bcrypt password hashing, and structured security audit logging for anomalous failed attempt spikes. |
| **X-03** | **Physical Disk Failure or Theft** | Provider machine is stolen or dedicated drive crashes. | **Enforced**: Dedicated drive (`D:\AetherGridStorage`) contains only ciphertext chunks with zero keys or customer metadata. Data redundancy across nodes guarantees recoverability. |

---

## 4. Threat Matrix Summary

```
+-------------------+----------------------+--------------------+--------------------+
| Threat Category   | Threat Severity      | Primary Mitigation | Residual Risk      |
+-------------------+----------------------+--------------------+--------------------+
| IDOR File Access  | CRITICAL             | Server Auth & Join | NEGLIGIBLE         |
| Plaintext on Node | CRITICAL             | AES-256-GCM + HKDF | NEGLIGIBLE         |
| Chunk Tampering   | HIGH                 | GCM Auth Tag + Rep | ZERO (Auto-Failover|
| Windows Escape    | HIGH                 | Path Jail Guard    | NEGLIGIBLE         |
| Node Impersonation| HIGH                 | Token SHA-256 Hash | NEGLIGIBLE         |
| Replay/Auth Leak  | MEDIUM               | 60s Scoped Tokens  | NEGLIGIBLE         |
| Brute Force       | MEDIUM               | Rate Limiter (IP)  | LOW                |
+-------------------+----------------------+--------------------+--------------------+
```
