# 🌐 AetherGrid — Peer-to-Peer Distributed Storage Marketplace

> **"Your phone. Your files. Always recoverable."**  
> Decentralized, zero-trust cloud backup and peer storage marketplace. Givers earn passive income sharing surplus hard drive space; Takers rent ultra-secure, encrypted storage at a fraction of hyperscaler prices.

---

## 🚀 Key Features

* **🛡️ Zero-Knowledge / Zero-Trust Cryptography**:
  * Client/Server side HKDF-SHA256 key derivation per user & per file.
  * AES-256-GCM authenticated encryption with 128-bit authentication tags.
  * Givers receive *only* encrypted chunks (`.chunk`) and cannot read filenames, customer identities, or file contents.
* **⚡ Peer Distributed Storage Network**:
  * Automated 2MB content chunking with cryptographic integrity verification (SHA-256).
  * Multi-replica distribution across physical storage nodes.
  * Self-healing and failover engine if a node goes offline.
* **💰 Two-Sided Marketplace & Dynamic Ledger**:
  * **Takers**: Rent affordable storage tiers (20 GB, 100 GB, 1 TB) or earn free capacity through referrals.
  * **Givers**: Turn unused disk space (e.g. dedicated external/internal drives) into monthly INR/crypto earnings.
  * Proof-of-storage allocation tracking and transparent platform fee ledger.
* **📱 Mobile Simulator & Cloud Dashboard**:
  * One-tap phone backup simulation (Photos, Contacts, Vault).
  * Fast file explorer with drag-and-drop upload, previews, favorites, and 60-second time-limited signed download tokens.
* **🔒 Enterprise-Grade Security**:
  * 100% neutralized across 28 hostile penetration attack vectors.
  * Hardened against path traversal, symlink escapes, Windows NTFS Alternate Data Streams, and IDOR attacks.

---

## 🛠️ Architecture & Tech Stack

* **Framework**: Next.js 15 (App Router, Server Actions, Route Handlers)
* **Runtime & Storage**: Node.js 24 + Native SQLite (`node:sqlite` WAL mode)
* **Frontend**: React 19, Tailwind CSS 4, Framer Motion, Lucide Icons
* **Security & Auth**: Jose (JWT / HttpOnly Cookies), Bcrypt, HKDF-SHA256, AES-256-GCM
* **Dedicated Node Daemon**: Multi-platform PowerShell / Node.js storage worker

---

## 📦 Getting Started

### 1. Installation

```bash
git clone https://github.com/sajeev023/aethergrid.git
cd aethergrid
npm install
```

### 2. Environment Setup

Create `.env` using `.env.example`:

```bash
cp .env.example .env
```

Key environment variables:
```env
AETHER_STORAGE_SECRET=your-aes-256-master-storage-key
JWT_SECRET=your-jwt-auth-session-secret-key-32chars
AETHER_NODE_TOKEN=aeth_prod_node_001_secret_token_live
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to access the marketplace.

---

## 🧪 Verification & Test Suites

AetherGrid includes a comprehensive test harness covering end-to-end marketplace operations, zero-trust cryptographic boundaries, and adversarial penetration attacks:

```bash
# Run the Red-Team "Break Everything" Penetration Audit (28 tests)
npx tsx scripts/test-break-everything.mjs

# Run the Zero-Trust Cryptographic & Privacy Verification Suite (23 tests)
npm run test:zero-trust

# Run the Production Hardening & Failover Verification Suite (8 tests)
npm run test:production

# Run all test suites
npm run test:all
```

---

## 🖥️ Running a Dedicated Storage Node

To join the AetherGrid network as a storage provider:

1. Configure your storage path (e.g. `D:\AetherGridStorage`).
2. Start the storage daemon:
   ```powershell
   .\scripts\start-node.ps1
   ```
3. Check daemon status:
   ```powershell
   .\scripts\status-node.ps1
   ```

---

## 📄 License & Audit Reports

Full audit and threat model specifications:
- [`AETHERGRID_BREAK_EVERYTHING_AUDIT_REPORT.md`](./AETHERGRID_BREAK_EVERYTHING_AUDIT_REPORT.md)
- [`AETHERGRID_PRIVACY_LEAKAGE_REPORT.md`](./AETHERGRID_PRIVACY_LEAKAGE_REPORT.md)
- [`AETHERGRID_SECURITY_ARCHITECTURE.md`](./AETHERGRID_SECURITY_ARCHITECTURE.md)
- [`AETHERGRID_THREAT_MODEL.md`](./AETHERGRID_THREAT_MODEL.md)
