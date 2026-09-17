# 🔐 AETHERGRID SECURITY ARCHITECTURE
**Document Version**: 2.0.0 (Zero-Trust Master Specification)  
**Status**: APPROVED & IMPLEMENTED  
**Target Platform**: Next.js 16 (App Router), Node.js v24.19.0, SQLite (WAL Mode), Windows / POSIX Filesystems

---

## 1. Architectural Overview & Trust Boundary

AetherGrid enforces a strict **Hub-and-Spoke Zero-Trust Architecture**. No direct peer-to-peer data transport is permitted between Givers and Takers. All interactions, data encryption, key derivation, and file reassembly are mediated by the trusted AetherGrid Storage Orchestrator.

```
                  ┌──────────────────────────────┐
                  │         TAKER CLIENT         │
                  │  (Web Browser / Mobile App)  │
                  └──────────────┬───────────────┘
                                 │ TLS 1.3 (HTTPS)
                                 │ JWT Session / 60s Download Token
                                 ▼
                  ┌──────────────────────────────┐
                  │    AETHERGRID API GATEWAY    │
                  │  - Security Middleware       │
                  │  - Sliding Rate Limiter      │
                  │  - Auth & Role Guard         │
                  └──────────────┬───────────────┘
                                 │ Internal Memory Pipeline
                                 ▼
                  ┌──────────────────────────────┐
                  │     STORAGE ORCHESTRATOR     │
                  │  - HKDF-SHA256 Key Derivator │
                  │  - AES-256-GCM Encryptor     │
                  │  - Chunk Partitioner (2MB)   │
                  │  - Replica Node Dispatcher   │
                  │  - Checksum & Tag Verifier   │
                  └──────────────┬───────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐
        │   STORAGE NODE 001  │     │   STORAGE NODE 002  │
        │ Dedicated Disk (D:) │     │ Dedicated Disk (E:) │
        │ Opaque .chunk Files │     │ Opaque .chunk Files │
        │ Auth: Token Hash    │     │ Auth: Token Hash    │
        └─────────────────────┘     └─────────────────────┘
```

---

## 2. Cryptographic Architecture

### 2.1. Hierarchical Key Derivation (RFC 5869 HKDF-SHA256)
To eliminate the risk of a single global master key compromise, AetherGrid employs a **3-tier hierarchical key derivation structure**:

```
                  Platform Storage Secret (Environment / HSM)
                                     │
                                     ▼
                    HKDF-SHA256 (Salt: "aethergrid-user-key-salt", Info: userId)
                                     │
                                     ▼
                         User Master Key (32 bytes)
                                     │
                                     ▼
                    HKDF-SHA256 (Salt: fileId, Info: "aethergrid-chunk-v1")
                                     │
                                     ▼
                           Unique Object Key (32 bytes)
```

1. **Platform Storage Secret**: Stored in server environment (`AETHER_STORAGE_SECRET`) or hardware security module. Never exposed to database, logs, or network clients.
2. **User Master Key (`deriveUserMasterKey`)**: Mathematically derived per user ID using HKDF-SHA256. Guarantees mathematical isolation across tenants: even if User A compromises their own key, they cannot derive User B's keys.
3. **Object Encryption Key (`deriveObjectKey`)**: Mathematically derived for each file upload using the User Master Key and the unique `fileId`. Every stored object uses an independent 256-bit AES key.

### 2.2. Authenticated Encryption (AES-256-GCM)
Every 2MB file chunk is encrypted using **AES-256-GCM** (Galois/Counter Mode), providing both confidentiality and cryptographic integrity.

* **Initialization Vector (IV)**: 12 bytes of cryptographically secure pseudorandom bytes generated per chunk (`crypto.randomBytes(12)`).
* **Authentication Tag**: 16 bytes produced by GCM during encryption (`cipher.getAuthTag()`).
* **Chunk Payload on Disk**:
  ```
  +--------------------+-------------------------+---------------------------------+
  | IV (12 Bytes)      | Auth Tag (16 Bytes)     | Ciphertext Payload (Variable)   |
  +--------------------+-------------------------+---------------------------------+
  ```
* **Tamper Detection & Failover**: When reading a chunk from a Giver's disk, `decipher.setAuthTag()` enforces tag verification. If any byte was altered, bit-flipped, or truncated, `decipher.final()` throws a `DataTamperedError`. The orchestrator intercepts this, records a high-priority security event, and automatically redirects retrieval to the redundant replica chunk.

---

## 3. Storage Sandbox & Windows Filesystem Security

Because storage nodes operate on provider host systems (such as Windows with dedicated drives like `D:\AetherGridStorage`), AetherGrid implements strict filesystem isolation:

### 3.1. Chunk Hash Validation
All chunk operations must validate the chunk identifier:
```typescript
export function validateChunkHash(hash: string): void {
  if (!hash || typeof hash !== "string" || !/^[a-f0-9]{64}$/.test(hash)) {
    throw new Error("Security Violation: Invalid or malicious chunk hash format.");
  }
}
```
Because chunk filenames are strictly 64 hexadecimal characters, attackers cannot inject slashes, parent directory traversal sequences (`..`), null bytes, or control characters.

### 3.2. Sandbox Path Jail (`assertPathInsideStorageRoot`)
All filesystem reads, writes, and deletions must pass through the path jail guard:
1. **UNC Path Rejection**: Blocks `\\server\share`, `\\?\`, `\\.\` to prevent NTLM credential relay or raw disk device attacks.
2. **Null Byte Injection Guard**: Blocks `\0` string truncation attacks.
3. **Alternate Data Stream (ADS) Guard**: Blocks NTFS stream injections (`file.chunk:hidden_stream`).
4. **Canonical Boundary Verification**: `path.resolve(targetPath)` must start with `path.resolve(storageRoot) + path.sep`.

---

## 4. Node Credential Security & Lifecycle

### 4.1. Node Token Authentication
* Every registered storage node is issued a 64-character random cryptographic secret token (`aeth_prod_node_...`).
* The orchestrator stores only the **SHA-256 hash** of the token in `storage_nodes.node_token_hash`.
* Node tokens are never sent to customers, never returned in Taker APIs, and explicitly excluded from Giver dashboard queries.

### 4.2. Instant Node Revocation
When a node is compromised, retired, or revoked:
1. The Giver or Admin issues a `POST /api/nodes/[id]/revoke`.
2. The orchestrator sets `status = 'REVOKED'`, overwrites `node_token_hash` with an unmatchable random string, and sets `revoked_at`.
3. Subsequent heartbeat requests from that node immediately return `401/403`.
4. The node is immediately purged from candidate replica selection in `selectReplicaNodes`.

---

## 5. Network Isolation & IP Privacy

* **Mediation Principle**: Takers communicate exclusively with `https://aethergrid.io/api/*`. Storage nodes connect outbound to `https://aethergrid.io/api/nodes/heartbeat`.
* **Zero Direct Inbound Ports**: Givers are not required to configure port forwarding, open NAT pinholes, or expose web servers to the public Internet.
* **Metadata Stripping**: Taker APIs return only logical file metadata (name, size, checksum, status, replica health). Hostnames, provider IPs, and provider disk directories are never exposed to Takers.

---

## 6. Ephemeral Signed Download Tokens

For secure downloads without exposing persistent user session cookies:
* Download tokens are HMAC-SHA256 signed JWTs with a **60-second TTL**.
* Scoped strictly: `{ scope: "download", fileId: "file_...", sub: "usr_..." }`.
* A token for User A cannot be used by User B.
* A token generated for File X cannot be used to download File Y.
