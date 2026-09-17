# 👁️ AETHERGRID PRIVACY MODEL
**Document Version**: 2.0.0 (Zero-Trust Master Specification)  
**Classification**: PUBLIC TECHNICAL DISCLOSURE  
**Target Audience**: Takers, Givers, Security Auditors, Compliance Teams

---

## 1. Core Privacy Promise

AetherGrid is built upon two immutable privacy covenants:
1. **Givers provide capacity, not access to their personal computers.**
2. **Takers rent storage, not another person's filesystem.**

The system ensures that personal data, identities, network addresses, and plaintext files remain strictly partitioned between market participants.

---

## 2. Privacy Boundaries Matrix

| Entity | What Entity CAN See | What Entity CANNOT See |
| :--- | :--- | :--- |
| **TAKER (Customer)** | • Their own uploaded filenames and previews<br>• Total quota and used bytes breakdown<br>• Logical file checksums and replication health status<br>• Their active payment subscription status | • Any Giver's name, email, or identity<br>• Giver host IP addresses or physical network locations<br>• Physical disk paths on Giver machines (e.g. `D:\...`)<br>• Other Takers' files, metadata, or accounts |
| **GIVER (Storage Provider)** | • Total allocated storage and used bytes on their node<br>• Monthly GB-hour earnings and ledger payout history<br>• Node health, uptime, and heartbeat status<br>• Opaque, encrypted `.chunk` file sizes | • Customer names, emails, or user IDs<br>• Customer filenames, folders, or directory hierarchies<br>• Customer photo previews, document texts, or media<br>• Customer plaintext content or encryption keys |
| **AETHERGRID PLATFORM (Orchestrator)** | • User account emails and password hashes (bcrypt)<br>• Logical file records (name, size, MIME type, SHA-256)<br>• Node registry and heartbeat telemetry<br>• Billing transactions and referral accounting<br>• In-memory plaintext during active upload/download pipeline | • Plaintext files stored persistently at rest (chunks on disks are AES-256-GCM encrypted)<br>• Plaintext user passwords (never stored, only bcrypt hash)<br>• External payment card details (processed via Razorpay/Stripe tokenization) |
| **NETWORK OPERATOR / ISP** | • TLS 1.3 encrypted packets to `aethergrid.io`<br>• Destination domain name (via SNI) and IP address<br>• Volume and timing of network packets | • Content of files uploaded or downloaded<br>• Customer authentication tokens or session cookies<br>• Encryption keys or chunk hashes<br>• Identity of distributed peer storage nodes |

---

## 3. Failure & Compromise Scenarios

### 3.1. What happens if a Giver's machine is physically stolen or compromised?
* **Attacker's Visibility**: The attacker gains physical access to the storage directory (`D:\AetherGridStorage\chunks`). They see only opaque binary files named with 64-character hexadecimal SHA-256 hashes (e.g. `e3b0c44298fc1c14...chunk`).
* **Cryptographic Barrier**: Every chunk is encrypted with **AES-256-GCM** using a unique Object Key derived via **HKDF-SHA256**. Neither the User Master Key nor the Platform Master Secret resides on the Giver's machine. The attacker cannot decrypt, view, or parse customer data.
* **Tampering Response**: If the attacker modifies or bit-flips chunks on disk, the next download request detects the altered authentication tag, records a security alert, and transparently pulls the untampered replica from the secondary node.
* **Credential Invalidation**: Revoking the node immediately disables its token.

### 3.2. What happens if a Taker's account credentials are compromised?
* **Attacker's Visibility**: If an attacker steals a Taker's password and bypasses rate limits, they gain access to the victim's files in the Taker dashboard.
* **Containment**: The attacker **cannot** access any other customer's files (prevented by server-side multi-tenant IDOR guards) and **cannot** compromise or discover provider nodes.
* **Remediation**: The user or administrator triggers session invalidation and password reset.

### 3.3. What happens if a Giver node suddenly goes offline or crashes?
* **Telemetry**: The orchestrator's health monitor flags the node as `SUSPECTED_OFFLINE` after 30 seconds of missing heartbeats, and `OFFLINE` after 90 seconds.
* **Taker Experience**: Taker downloads remain fully available if a redundant replica exists on another node. The dashboard indicates `HEALTHY` or `DEGRADED` (if only 1 replica remains online) without ever displaying "Your file is sitting on John's PC".

---

## 4. Honest Security & Privacy Disclosure

AetherGrid values engineering truth over deceptive marketing claims:

1. **Not End-to-End Client-Side Zero-Knowledge (Beta Limitation)**: In the current architecture, encryption and key derivation occur at the **Trusted Storage Service Boundary (AetherGrid Orchestrator)**. Plaintext is briefly processed in orchestrator server memory before being chunked and encrypted with AES-256-GCM for peer distribution. While Givers have absolute zero access to plaintext, the platform orchestrator itself acts as the trusted privacy custodian. Full client-side browser WebCrypto encryption is scheduled on the post-beta roadmap.
2. **Beta Single-Node Mode vs Multi-Node Mode**: When running with only one physical storage node configured (`BETA_SINGLE_NODE_MODE=true`), data is encrypted and stored on Node #001. True multi-node peer redundancy activates automatically once additional provider nodes join the network.
3. **No Unrealistic Claims**: AetherGrid does not claim to be "100% unhackable" or "military grade." We provide mathematically verified, auditable cryptographic guarantees based on industry standards (AES-256-GCM, RFC 5869 HKDF-SHA256, bcrypt, TLS 1.3).
