# Little Flower Junior College (LFJC) — Content & Institutional Claim Verification Audit
**Document version:** 1.0 (Pre-Presentation & Launch Review)  
**Target Audience:** LFJC Management, Principal's Office, Legal & Media Committee  
**Status:** Audit Completed & Softened / Pending Formal Management Sign-Off

---

## Executive Summary

As part of the final pre-presentation and pre-launch engineering audit, all institutional facts, statistics, academic dates, alumni citations, and public claims across the LFJC website have been audited. High-risk, unverified, or ambiguous claims have been reconciled to a single source of truth (`approvedInstitutionStats` in `lib/site-data.ts`) or softened to prevent false representation.

This document identifies every claim retained, softened, or archived, along with items requiring explicit confirmation from college administration before public launch.

---

## 1. Centralized Institutional Statistics (Reconciled)

| Statistic | Previous Inconsistent Values | Current Reconciled Value | Source / Verification Note | Action Required from Management |
| :--- | :--- | :--- | :--- | :--- |
| **Foundation Year** | 1974 | **1974** | Confirmed founding date (Montfort Brothers of St. Gabriel). | Confirmed. |
| **Academic Legacy** | 46+, 49+, 50+ Years | **50+ Years** | 1974–2024 marked Golden Jubilee. Standardized everywhere. | Confirmed. |
| **Enrollment** | 1,483+, 1,567+, 1,600+ | **1,600+** | Standardized to current approximate student capacity. | Provide exact sanctioned enrollment if different. |
| **Campus Size** | 8 Acres / Varied | **8 Acres** | Standardized to 8-acre campus in Uppal. | Confirmed. |
| **Streams** | 4 Streams | **4 Streams (MPC, BiPC, MEC, CEC)** | TSBIE recognized intermediate programs. | Confirmed. |

---

## 2. Alumni Profiles & Public Figure Representation

The website includes a dedicated Alumni Community directory featuring distinguished graduates. In accordance with legal, privacy, and institutional standards, alumni records have been softened:
- Removed claims that online profiles are *"authenticated against college enrollment records"* without in-person records validation.
- Labeled the directory with: *"Profiles featured in this directory reflect published alumni records and submissions. Official academic transcripts and archival batch registers are held at the college office."*
- Centralized alumni network banners to reflect Montfortian legacy rather than unverified figures (previously `15,000+`, `18+ countries`, `50+ board medals`).

### Profiles Pending Formal Management Confirmation:

| Alumnus / Figure | Stated Role / Achievement | Stated Batch / Stream | Status / Recommendation |
| :--- | :--- | :--- | :--- |
| **Vijay Deverakonda** | Actor & Film Producer | Batch of 2007 (MPC) | Widely cited in college heritage; recommend formal verification of intermediate roll number. |
| **Akkineni Nagarjuna** | Actor & Entrepreneur | Batch of 1976 | Archival record; verify attendance at LFJC Uppal campus. |
| **Nandamuri Balakrishna** | Actor & Legislator | Batch of 1978 | Archival record; verify intermediate completion. |
| **Nara Lokesh** | Cabinet Minister, Govt of AP | Batch of 2000 (MPC) | Verify intermediate enrollment details before press launch. |
| **Shashanka K, IAS** | District Collector / Civil Servant | Batch of 2005 | Verify civil service cadre and batch year. |
| **Ronald Rose, IAS** | Civil Servant | Batch of 1997 | Verify civil service posting and batch year. |
| **Geetha Madhuri** | Playback Singer | Batch of 2006 | Cultural alumna; verify enrollment record. |
| **Nagesh Kukunoor** | Filmmaker & Screenwriter | Batch of 1984 | Archival record; verify completion. |

*Note: Any profile not formally confirmed by LFJC administration before launch can be disabled with a single toggle in `lib/site-data.ts` without affecting site layout.*

---

## 3. Academic Calendar & Theme

| Item | Current Public State | Status & Management Action |
| :--- | :--- | :--- |
| **Academic Calendar** | Labeled as: **"Archive — Academic Calendar 2024–2025"** | Awaiting Telangana State Board of Intermediate Education (TSBIE) 2026–27 annual schedule release. Management to upload new PDF once published. |
| **Academic Theme** | Labeled as: **"Recent Academic Theme Archive (2024–25): Excellence in Action"** | Awaiting Principal's current academic year motto/theme. |
| **Admissions Status** | Standardized to: **"Admissions Inquiries Open (2026–27) — Applications commence following Class X board results"** | Accurately sets parent expectations and avoids false claims of active portal closure or premature application acceptance. |

---

## 4. Faculty Directory Sanity

- **Placeholder Removal:** Removed unfinished entry `"Ms. PET Faculty"`. Physical Education department is represented by approved staff (`Mr. M L Prasad`, Physical Director).
- **Terminology Normalization:** Replaced non-standard foreign phrase `"board-certified educators"` with `"experienced educators, HODs, and subject specialists"`.
- **Staff Counts:** Directory currently reflects 44 verified teaching and support faculty.

---

## 5. Silver Jubilee & Historical Commendations

Archival images in `/campus/silver-jubilee` include scans of:
1. Chief Minister N. Chandrababu Naidu honoring LFJC Principals (1999).
2. Chief Minister's commendation letter.
3. Governor's message of goodwill.

**Verification Status:** Confirmed authentic archival artifacts from the printed 1999 Silver Jubilee Souvenir Book preserved by the Montfort Brothers of St. Gabriel.

---

## 6. Contact, Map & Portal Integrations

- **Contact Map:** Replaced bare Google Map embed with an institutional location card featuring complete address, Survey No., Uppal landmark, direct Google Maps navigation button, and campus image fallback.
- **External Portals:**
  - `MySkoolCom` identified as the **Primary Parent & Student Portal**.
  - Secondary application registration clearly demarcated with informational guidance.
  - Alumni Google Form explicitly linked alongside the native submission drawer.
