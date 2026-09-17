# AetherGrid — Production Readiness Audit (Phase 0)

**Date**: 2026-09-17  
**Auditor**: Principal Infrastructure, Security & Launch Engineer  
**System Evaluated**: AetherGrid Distributed Peer Storage Marketplace MVP  
**Target Deployment**: Single-Node Beta Launch on Dedicated Physical Disk (`D:\AetherGridStorage`)

---

## 1. Executive Findings Summary

| Subsystem | MVP State | Production Target | Audit Result | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **Physical Storage Volume** | Used project folder on `C:` drive | Dedicated non-C volume (`D:\AetherGridStorage`) | **FAIL** | Mount & configure `D:\AetherGridStorage`, isolate from `C:` |
| **Path Traversal & Sandboxing** | Relies on path.join without strict jail | Strict canonical path prefix verification | **WARNING** | Implement `assertPathInsideStorageRoot()` with attack tests |
| **Capacity Management** | Soft quota checks | Multi-tier capacity + disk safety reserve | **WARNING** | Add `AETHERGRID_RESERVED_FREE_SPACE_GB` & hard capacity cap |
| **Node Identity & Auth** | Ad-hoc token passed in JSON body | Dedicated `AETHERGRID-NODE-001`, SHA-256 token hash | **WARNING** | Formalize Node 001 credentials & secure header auth |
| **Redundancy & Beta Mode** | UI reported 2x redundancy regardless of nodes | `BETA_SINGLE_NODE_MODE=true` honest status | **FAIL** | Add Single-Node Beta mode; honestly display 1x replication |
| **Payment & Subscriptions** | Auto-granted trial on register | Server-side signature verification & idempotent webhooks | **FAIL** | Implement webhook handler (HMAC signature) & plan checkout |
| **Multi-Tenant Authorization** | User ID checked on files | Strict ownership verification across all APIs | **PASS (with hardening)** | Audit all endpoints to prevent IDOR and cross-user leaks |
| **Referral System** | None | 4 paying customers $\rightarrow$ 55 GB for 30 days (`0/4` to `4/4`) | **FAIL** | Implement referral code generation, tracking & quota grant |
| **Admin Protection** | Route open to public / weak cookie | Strict server-side `ADMIN` role enforcement | **FAIL** | Protect `/admin` and `/api/admin` with RBAC |
| **Logging & Redaction** | Console logs raw errors | Structured JSON logs with redacted secrets/keys | **WARNING** | Implement logger sanitizing tokens, hashes & sensitive payloads |
| **Database & Backups** | SQLite WAL mode | Automated backup, restore script & integrity test | **WARNING** | Create `scripts/backup-db.mjs` and recovery verification |
| **Windows Daemon & Ops** | Basic Node CLI script | Robust Windows PowerShell scripts (`start/stop/status/logs`) | **WARNING** | Create dedicated operational scripts for Windows node service |

---

## 2. Detailed Subsystem Analysis

### 2.1 Storage Disk & Path Sandboxing
* **Current**: The previous prototype created sandbox folders inside `c:\...\data\nodes\...`.
* **Risk**: High risk of filling Windows system drive `C:`, potential path traversal via `..` or symlinks.
* **Finding**: `D:\` is a healthy physical NTFS volume with **476.81 GB free**.
* **Fix**: Enforce `AETHERGRID_NODE_STORAGE_PATH=D:\AetherGridStorage`. Implement strict path canonicalization via `fs.realpathSync` to ensure no chunk write or read can ever escape `D:\AetherGridStorage`.

### 2.2 Capacity Management
* **Current**: The system records `capacity_bytes` but did not inspect actual physical disk space before allocation.
* **Risk**: Risk of over-allocating physical disk space or choking host OS if disk fills up.
* **Fix**: Implement 3-tier hierarchy:
  1. `Physical Disk Free Space` (via `checkDiskSpace` or OS query)
  2. `Configured Node Capacity` (e.g. 50 GB for Node 001)
  3. `Configured Safety Reserve` (`AETHERGRID_RESERVED_FREE_SPACE_GB=10`)
  4. Hard rejection `STORAGE_CAPACITY_EXHAUSTED` when limits are reached.

### 2.3 Single-Node Beta Mode vs. Redundancy
* **Current**: UI displays "2x Redundant Encryption" by default.
* **Risk**: Misleads early users when only 1 physical node is deployed in early beta.
* **Fix**: Add `BETA_SINGLE_NODE_MODE=true` setting:
  - In single-node mode: Storage is honestly reported as `1x Provider Node (Single-Node Beta)`.
  - Architecture remains 100% prepared for Node 002+ (when second node joins, 2x replication activates seamlessly).

### 2.4 Payment & Subscription Security
* **Current**: Users were given an automatic 20 GB trial subscription upon registration.
* **Risk**: Payment buttons could be bypassed by invoking registration directly without verified checkout.
* **Fix**:
  - Implement real server-side payment checkout & webhook processing with HMAC SHA-256 signature verification.
  - Implement idempotent webhook handling using a `payment_transactions` database ledger.
  - Enforce expiration date & quota validation on every single upload attempt.

### 2.5 Multi-Tenant Isolation
* **Current**: File queries check `user_id = session.userId`.
* **Fix**: Ensure IDOR protection: every object lookup (`/api/taker/files/[id]`, `/api/taker/backup/[id]`) verifies `file.user_id === session.userId`. Re-test with hostile cross-user attack suite.

### 2.6 Referral System
* **Requirement**: "Bring 4 paying customers $\rightarrow$ receive 55 GB free for 1 month".
* **Fix**: Add `referral_code` to users, `referrals` tracking table with statuses `PENDING`, `QUALIFIED`, and automatic promotion when `count >= 4`.

---

## 3. Action Plan & Implementation Sequence

1. **Phase 1**: Configure `D:\AetherGridStorage` and update `.env`.
2. **Phase 2 & 3**: Implement path sandboxing and capacity safety reserve in `lib/orchestrator/`.
3. **Phase 4 & 5**: Register dedicated `AETHERGRID-NODE-001` with cryptographically secure token hash authentication.
4. **Phase 6 & 7**: Audit heartbeat thresholds and AES-256-GCM chunk encryption pipeline.
5. **Phase 8, 9, 10**: Harden upload/download pipeline, multi-tenancy, and cleanup on partial upload failure.
6. **Phase 11 & 12**: Implement `BETA_SINGLE_NODE_MODE` across backend and UI.
7. **Phase 13 & 14**: Implement server-side payment processing, signed webhooks, and subscription enforcement.
8. **Phase 15 & 16**: Implement Giver economics ledger and 4-customer referral reward engine.
9. **Phase 17 & 18**: Secure Admin role authorization and structured sanitizing logger.
10. **Phase 19 & 22**: Build database backup/restore tools and Windows node management scripts (`start-node.ps1`, `stop-node.ps1`, `status-node.ps1`, `view-logs.ps1`).
11. **Phase 23, 24, 28**: Execute automated security, path traversal, IDOR, and E2E verification test suite.
12. **Phase 29**: Generate `AETHERGRID_PRODUCTION_READINESS.md`.
