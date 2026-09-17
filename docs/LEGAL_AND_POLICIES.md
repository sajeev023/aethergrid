# AetherGrid — Legal, Privacy & Beta Policies

**Version**: 1.0 (Public Beta)  
**Effective Date**: 2026-09-17  

---

## 1. Beta Service Disclosure & Limitations
AetherGrid is currently operating in **Public Beta**. While files are protected using authenticated encryption (AES-256-GCM) and verified with SHA-256 checksums, beta users acknowledge:
1. **Single-Node Initial Phase**: Early beta storage may rely on a single primary provider node (`AETHERGRID-NODE-001`) until community providers expand the grid to multi-node redundancy.
2. **Availability**: No 100% uptime SLA is guaranteed during the beta phase. Periodic network maintenance may pause uploads.
3. **Backup Recommendation**: Users should maintain secondary copies of critical, life-essential documents.

---

## 2. Privacy Policy & Zero-Plaintext Security Model
- **Provider Blindness**: Storage providers (Givers) host only opaque, authenticated 2MB binary `.chunk` blobs. No provider has access to filenames, metadata, MIME types, or plaintext contents.
- **Key Separation**: Encryption keys are generated per-chunk using AES-256-GCM with distinct initialization vectors (IVs).
- **Personal Data**: Account credentials (emails, passwords) are stored with salted bcrypt hashes. We never sell or inspect customer personal data.

---

## 3. Acceptable Use Policy (AUP)
Users may not utilize AetherGrid to store, distribute, or coordinate:
- Malicious binaries, ransomware, or botnet command-and-control artifacts.
- Unlawful, abusive, or non-consensual imagery.
- Materials that violate intellectual property rights.
Violations result in immediate account termination and chunk deletion across all peer nodes.

---

## 4. Data Deletion & Retention Policy
- **User-Initiated Deletion**: When a user deletes a file from their cloud drive, the orchestrator issues immediate deletion instructions to all provider nodes holding chunk replicas.
- **Disk Shredding**: Chunk files on provider disks are unlinked and erased.
- **Account Termination**: If an account is closed, all associated metadata and chunks are permanently purged within 72 hours.

---

## 5. Storage Provider (Giver) Agreement
- Providers agree to allocate dedicated disk capacity (e.g. `D:\AetherGridStorage`) without interfering with or tampering with stored chunk blobs.
- Earnings accrue based on verified online heartbeat uptime and allocated GB-hours.
- Providers may safely decommission their node by signaling maintenance mode, allowing the orchestrator to re-replicate active chunks to surviving nodes before shutdown.
