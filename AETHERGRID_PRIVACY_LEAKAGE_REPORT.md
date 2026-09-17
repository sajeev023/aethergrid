# 🔍 AETHERGRID PRIVACY LEAKAGE AUDIT & THREAT VECTOR REPORT
**Date**: 2026-09-17  
**Auditor**: Red-Team Privacy & Zero-Trust Infrastructure Lead  
**Scope**: API Surfaces, Database Metadata, Node Storage Filesystem, Structured Logs, Network Traffic  
**Classification**: CONFIDENTIAL TECHNICAL AUDIT

---

## 1. Executive Privacy Summary

AetherGrid enforces privacy through mathematical isolation, structural detachment, and server-side mediation. This report analyzes what information is exposed, accessible, or inferable across all participating actors under normal and compromised conditions.

---

## 2. Actor Privacy Profiles

### 2.1. What Can the Giver Learn?

The Giver owns the physical hardware hosting a storage node (e.g. Node #001 on `D:\AetherGridStorage`).

| Information Category | What Giver Can Access | Mechanism & Cryptographic Barrier | Residual Leakage Risk |
| :--- | :--- | :--- | :--- |
| **Plaintext File Contents** | **NONE (0%)** | All data encrypted with AES-256-GCM using unique Object Keys before writing to disk. | **ZERO**. Plaintext never touches provider disk. |
| **Customer Names & Emails** | **NONE (0%)** | Giver queries (`getStorageNodesByOwner`) select only node telemetry. No user foreign keys stored on node disks. | **ZERO**. Customer identity is decoupled. |
| **Customer Filenames** | **NONE (0%)** | Chunks are named strictly `<sha256(ciphertext)>.chunk`. Original filenames stored only in central database. | **ZERO**. No filenames on provider disks. |
| **Customer Encryption Keys** | **NONE (0%)** | Key derivation (HKDF-SHA256) executes exclusively in server memory. Keys never written to disk or sent to nodes. | **ZERO**. |
| **Object-to-Customer Correlation** | **NONE (0%)** | Chunks do not contain customer IDs or tenant tags. | **ZERO**. Multiple customers' chunks sit alongside one another as indistinguishable blobs. |
| **Chunk Size & Frequency** | **File Chunk Sizes** | Giver sees fixed 2MB or partial trailing binary `.chunk` files and write timestamps. | **LOW (Traffic/Storage Analysis)**: Provider can observe when a 2MB chunk was written and how much capacity was used. |
| **Total Allocated / Used Bytes** | **Aggregate Usage** | Provider dashboard displays total GB allocated and used on their machine. | **EXPECTED**: Required for billing and capacity accounting. |

---

### 2.2. What Can the Taker Learn?

The Taker is a customer renting distributed cloud storage.

| Information Category | What Taker Can Access | Defense & Containment | Residual Leakage Risk |
| :--- | :--- | :--- | :--- |
| **Other Customers' Files** | **NONE (0%)** | Enforced by strict server-side IDOR checks in `files`, `storage_chunks`, and `retrieveAndDecryptFile`. | **ZERO**. Unauthorized requests return 403 Forbidden. |
| **Giver Personal Identity** | **NONE (0%)** | Provider names, emails, and account IDs are completely stripped from Taker responses. | **ZERO**. Takers only interact with "AetherGrid". |
| **Giver Hostname / Machine Info** | **NONE (0%)** | Node names (e.g. "Node #001 (Dedicated D: Storage)") and machine specs are shielded. | **ZERO**. |
| **Giver Physical Disk Paths** | **NONE (0%)** | Physical storage paths (`D:\AetherGridStorage\chunks`) are stripped. | **ZERO**. Taker APIs return logical file metadata only. |
| **Giver IP Addresses** | **NONE (0%)** | All traffic routes through AetherGrid API gateway (`aethergrid.io`). | **ZERO**. No direct peer-to-peer network sockets exposed. |
| **Referred User Emails** | **Masked Emails Only** | Referral stats API masks emails (e.g. `j***e@gmail.com`). | **ZERO**. Raw emails are never exposed. |

---

### 2.3. What Can the AetherGrid Platform Learn?

The platform orchestrator coordinates network allocation, billing, and cryptographic mediation.

| Information Category | Platform Orchestrator Access | Protection & Retention |
| :--- | :--- | :--- |
| **Account Credentials** | User emails and **bcrypt password hashes** (10 salt rounds). | Plaintext passwords are never stored or logged. |
| **File Metadata** | Logical filenames, MIME types, file sizes, and original SHA-256 checksums. | Required to provide user personal cloud drive functionality. |
| **In-Memory Plaintext** | Files are processed in memory during the active upload/download pipeline. | Plaintext is never written to disk unencrypted; wiped from memory after buffer transmission. |
| **Billing & Transactions** | Subscription plan IDs, amounts, provider transaction IDs. | Tokenized via Razorpay / Stripe; card details never touch AetherGrid servers. |

---

### 2.4. What Can a Compromised Storage Node Learn?

Assume an attacker has fully taken over Node #001:

1. **Storage Contents**: The attacker can inspect `D:\AetherGridStorage\chunks`. They find only `.chunk` files containing AES-256-GCM ciphertext.
2. **Cryptographic Impossibility**: Without the User Master Key (stored only in server memory / environment), the ciphertext cannot be decrypted.
3. **Impersonation Attempt**: The attacker possesses Node #001's token. If they attempt to send malicious heartbeats, the platform validates disk metrics. Once the provider or admin revokes the node (`/api/nodes/[id]/revoke`), the token is destroyed instantly and future heartbeats return `401/403`.
4. **Data Corruption Attempt**: If the attacker alters bytes on disk, the next download verifies the 16-byte GCM authentication tag, detects the tamper, alerts security, and fails over to the healthy replica.

---

### 2.5. What Can an External Network Attacker Learn?

Assume an attacker intercepts traffic between clients, nodes, and AetherGrid:

1. **Transport Encryption**: All communication is secured via **TLS 1.3**.
2. **Traffic Analysis**: An ISP or network eavesdropper can see packet volume and domain name (`aethergrid.io`), but cannot inspect file contents, session cookies, download tokens, or chunk data.
3. **Session Hijacking**: Protected by `HttpOnly`, `SameSite=Lax`, and `Secure` cookie attributes.
4. **Download Links**: Protected by 60-second cryptographically signed JWT download tokens bound to `(userId, fileId)`.

---

## 3. Residual Risks & Future Roadmap

1. **Orchestrator Trust Boundary**: Currently, the platform orchestrator performs encryption and decryption. Future iterations will support client-side WebCrypto in the browser for end-to-end zero-knowledge.
2. **Storage Traffic Correlation**: A provider observing multiple chunk writes at the exact second a user uploads a large file could theoretically infer file sizes. Padding chunk sizes to uniform bounds will be evaluated for post-beta hardening.
