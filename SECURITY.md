# AetherGrid Security Policy & Coordinated Vulnerability Disclosure (CVD)

**Effective Date:** September 18, 2026  
**Security Contact:** `security@aethergrid.io`  
**Security RFC 9116:** `https://aethergrid.io/.well-known/security.txt`  
**PGP Key:** `https://aethergrid.io/pgp-key.asc` (Fingerprint: `A4B1 8F2C 93D0 E57A 1C8B 49E2 7F01 38D2 6C9B 50E4`)

---

## 1. Vulnerability Disclosure Philosophy

AetherGrid is committed to the security, privacy, and integrity of our distributed private cloud storage network. We recognize the vital role that independent security researchers, ethical hackers, and defensive engineers play in keeping systems safe.

We welcome responsible, coordinated vulnerability disclosure against the authorized scope listed in this policy. If you believe you have found a security vulnerability in AetherGrid, please report it to us immediately following the guidelines below.

---

## 2. Safe Harbor Policy

If you conduct security research in good faith and in compliance with this policy, AetherGrid commits to the following:

- **No Legal Action:** We will not initiate or support legal action against you for research activities conducted within the scope of this policy.
- **Good-Faith Authorization:** We consider your research activities authorized under applicable anti-hacking laws (including the CFAA and state equivalents).
- **Safe Coordination:** If a third party initiates legal action against you in connection with activities conducted under this policy, we will make it known that your conduct complied with our policy.
- **Fair Recognition:** We will publicly acknowledge your responsible disclosure in our Security Hall of Fame (unless you request anonymity).

To remain eligible for Safe Harbor, you must:
1. Adhere strictly to the scope and prohibited actions defined in this document.
2. Stop testing and contact us immediately if you encounter any non-public sensitive user data. Do not view, download, alter, or share it.
3. Provide us reasonable time (as defined in Section 7) to remediate vulnerabilities before disclosing details publicly.

---

## 3. Authorized Scope

### In-Scope Assets
- **Web Application:** `https://aethergrid.io`, `https://app.aethergrid.io`
- **Core APIs:**
  - Authentication endpoints: `/api/auth/*`
  - Taker Cloud APIs: `/api/taker/*`
  - Giver Provider APIs: `/api/giver/*`
  - Node Control Plane: `/api/nodes/*`
  - Payment Webhooks: `/api/payment/webhook`
- **Open-Source Repository:** `https://github.com/sajeev023/aethergrid`
- **Storage Node Daemon:** `node-client/node-daemon.mjs`
- **Client Libraries:** Core cryptographic and orchestrator libraries (`lib/orchestrator/*`, `lib/auth.ts`, `lib/db.ts`)

### Out-of-Scope Assets & Third Parties
- Third-party hosting, infrastructure, DNS, or CDN providers (e.g., Vercel, AWS, Cloudflare).
- External payment gateway servers (e.g., Razorpay, Stripe infrastructure).
- Physical infrastructure, offices, or employee devices.
- Social media accounts and external communication channels.

---

## 4. Absolutely Prohibited Actions

The following actions are strictly prohibited and immediately void Safe Harbor protections:

1. **Denial of Service (DoS/DDoS):** Any attack designed to degrade, exhaust, or crash production availability or infrastructure capacity.
2. **Data Destruction or Exfiltration:** Stealing, altering, or permanently deleting customer or provider data.
3. **Mass Account Creation & Brute Forcing:** Automated credential stuffing, password spraying, or flooding registration endpoints.
4. **Social Engineering & Phishing:** Attacking AetherGrid employees, node providers, or users via email, voice, or physical deception.
5. **Physical Attacks:** Attempting physical access to provider nodes, offices, or data centers.
6. **Malicious Node Tampering:** Submitting corrupted or compromised node clients to deceive users outside synthetic sandbox environments.

---

## 5. Test Account Creation Policy

Researchers are authorized to create and test with synthetic accounts under the following rules:
- Register up to three (3) test accounts using email addresses ending with `@your-researcher-domain.com` or `@we-are-researchers.test`.
- Explicitly set user name prefix to `[Security Test]`.
- Interact only between your own test accounts (e.g., User A testing cross-account IDOR against User B where you own both User A and User B).
- Do not attempt cross-tenant testing against genuine third-party users.

---

## 6. How to Report a Vulnerability

Submit reports encrypted via PGP to **`security@aethergrid.io`** with the subject line:
`[Vulnerability Report] <Component / Route> - <Brief Description>`

Each submission must include:
1. **Summary:** Brief description of the issue and potential impact.
2. **Affected Asset:** Specific URL, API endpoint, or file.
3. **Severity Assessment:** Suggested CVSS v3.1 or v4.0 score and rating.
4. **Step-by-Step Reproduction:** Clear, minimal reproduction steps, curl commands, or script using synthetic test fixtures.
5. **Proof of Concept (PoC):** Safe non-destructive demonstration.
6. **Suggested Remediation:** Root cause analysis and suggested code fix, if known.

---

## 7. Response SLAs & Disclosure Timeline

AetherGrid adheres to coordinated vulnerability disclosure timelines:

| Stage | Target SLA |
|---|---|
| **Initial Acknowledgment** | Within 24 hours |
| **Triage & Severity Confirmation** | Within 72 hours |
| **Critical Severity Patch** | Within 7 business days |
| **High Severity Patch** | Within 14 business days |
| **Medium / Low Severity Patch** | Within 30 business days |
| **Public Coordinated Disclosure** | 90 days after triage (or mutually agreed date upon patch release) |

If an actively exploited zero-day is identified in the wild, remediation and disclosure will be expedited immediately.

---

## 8. Severity Taxonomy

We categorize vulnerabilities using the Common Vulnerability Scoring System (CVSS v3.1 / v4.0):

- **Critical (CVSS 9.0 - 10.0):** Remote code execution (RCE), unauthenticated cross-tenant file exfiltration, cryptographic key derivation compromise, arbitrary database writes.
- **High (CVSS 7.0 - 8.9):** Authenticated IDOR permitting unauthorized file access, privilege escalation to Administrator, webhook signature forgery, storage allocation manipulation.
- **Medium (CVSS 4.0 - 6.9):** CSRF with state change, rate-limiting bypass on sensitive routes, persistent XSS in restricted views, credential reuse via unconsumed ephemeral tokens.
- **Low (CVSS 0.1 - 3.9):** Information disclosure without immediate exploitability, missing defensive headers on subordinate routes, mixed-content warnings.
- **Informational:** Best practice improvements, defense-in-depth hardening suggestions.

---

## 9. Bug Bounty & Reward Guidelines

AetherGrid operates an invited researcher reward tier. Before a public monetary program is launched, rewards are governed by the following criteria:

- **Eligibility:** Valid, novel, in-scope security vulnerabilities with demonstrable business impact submitted first by the researcher.
- **Duplicate Reports:** If multiple researchers report the same issue, the first valid report received by `security@aethergrid.io` is eligible for reward.
- **Exclusions:** Known issues, automated scanner outputs without verified PoCs, social engineering, rate-limit headers without impact.
- **Payment Compliance:** Rewards are disbursed via bank wire or approved digital methods subject to applicable tax identification and sanctions screening.

---

## 10. Public Hall of Fame

Researchers who adhere to this policy and help secure AetherGrid will be recognized on our official Hall of Fame:
`https://aethergrid.io/security/hall-of-fame`

Thank you for helping us keep AetherGrid private, resilient, and secure.
