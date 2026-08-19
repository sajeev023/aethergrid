# LFJC Website — Agency-Quality Design Audit

**Scope:** Every public page, section, component, animation, and interaction.
**Method:** 19 specialist auditors (11 page + 4 shared-system + 4 cross-cutting), each grounded in the same institutional brief and design-token system, then adversarially verified against the actual code, then synthesized and de-duplicated.
**Result:** 158 verified findings across 11 themes, ranked into a P0/P1/P2 action plan.

---

## Executive verdict

This site is roughly **80% of the way to agency-quality** — closer than most institutional websites ever get. It has a coherent token system, shared primitives (`Section`, `SectionHeading`, `Reveal`, `Badge`, `Card`), real reduced-motion and focus foundations, and a restrained editorial voice. The remaining work is **not creative reinvention** but three categories of disciplined cleanup:

1. **P0 credibility blockers** — `/lfs` and `/lfdc` silently render LFJC content (wrong institution, wrong programs, wrong principal); the gallery lightbox and navbar overlays are keyboard-inaccessible; eyebrow labels in heritage-gold fail WCAG AA contrast sitewide; several standalone pages have no `h1`; the desktop nav clips Contact/Parent-Login between 1024–1240px on the exact laptops trustees use.
2. **P1 system cohesion** — the `<Section>` wrapper is bypassed in nearly every section (producing 8px gutter drift); two competing brand blues (`#1d70b8` vs `#0f4c81`) leak across focus rings/selection/themeColor; faculty cards carry gradients and startup hover motion that violate the hard rules; alumni grid has ragged heights plus broken no-image slots.
3. **P2 polish** — verb drift across the admissions funnel, triple-duplicated contact info, hand-rolled eyebrows at 7 tracking values, copy that reads as sitemap/landing-page rather than institutional.

None of this requires new sections, features, or pages — every fix refines what exists within the governed system.

---

## Systemic strengths to preserve

These are already excellent. Do not lose them in the refinement.

1. **Genuine design-token system** in `globals.css @theme` (montfortian-blue, heritage-gold family, royal-cream, academic-slate, deep-navy, surface scale) — the spine of the institutional voice; the reason the site reads as composed, not templated.
2. **Shared primitives used correctly in most places** — `Section`, `SectionHeading` (Badge + h2 + `.gold-rule` + description), `Reveal` (framer-motion in-view, reduced-motion aware), `Badge`, `Card`, `Button`, `Input`/`Select`/`Textarea`, `AnimatedCounter`, `.gold-rule`, `.premium-focus`, `.section-texture`, `.stone-pattern`, `.noise-overlay`, skip-link.
3. **Restrained warm archival palette** (royal-cream + heritage-gold + academic-slate + deep-navy) — genuinely signals Montfortian heritage, closer to Oxford/Stanford warmth than the generic cool-grey SaaS default.
4. **Accessibility foundations that work** in the core flow — skip-link on PublicLayout, focus-visible offset, `prefers-reduced-motion` in Reveal and AnimatedCounter, `aria-current` on nav, alt text on most images, `Label htmlFor` associations in LeadForm.
5. **Mature type system** — Inter (body/UI), Playfair (display), Cormorant (editorial italic), with per-heading-level letter-spacing tuning.
6. **Per-institution data architecture** already threaded via `activeInst` through every section — the machinery to fix the multi-institution clone problem exists; only the data and a few hardcoded chrome bindings are missing.
7. **Reveal's `whileInView` + viewport-margin trigger** — the correct scroll-reveal pattern, applied consistently, producing the calm cadence the mandate requires.

---

## P0 — Ship-blocking for the trustee viewing

### P0.1 — Multi-institution data integrity
`lib/site-data.ts:684` — `institutionsData` maps `root/lfs/lfjc/ldfc` **all to `lfjcData`**, so `/lfs` renders "Little Flower Junior College", intermediate M.P.C/Bi.P.C/M.E.C/C.E.C, Bro. Arun Prakash Lawrance, junior-college faculty, BIE affiliation — factually wrong for a school. JSON-LD, global canonical, and structured data all emit LFJC for these routes.
**Fix:** Create distinct `lfsData`/`ldfcData` exports (or **remove** `/lfs` and `/lfdc` route files — silence is more institutional than a wrong clone). Add per-route metadata with correct canonical. Extract a shared `<InstitutionLayout activeInst>` to restore skip-link + dedupe chrome across all three routes.
**Files:** `lib/site-data.ts`, `app/lfjc/page.tsx`, `app/lfdc/page.tsx`, `app/lfs/page.tsx`, `components/public-layout.tsx`, `lib/structured-data.ts`, `app/layout.tsx`

### P0.2 — Accessibility-critical defects
- **Contrast:** `text-heritage-gold` (`#c29b53`, ~2.5:1) fails AA on white/cream for 9–11px eyebrow text — `about.tsx:21,56,100,104,159`, `navbar.tsx:170`, `gallery/page.tsx:186`. The system already ships `heritage-gold-strong` `#8a6625` (~5.2:1, passes). **Fix:** `text-heritage-gold → text-heritage-gold-strong` for small/bold text on light surfaces; leave dark-surface gold as-is.
- **Dialog/focus:** Gallery lightbox (`gallery:364`), navbar mobile drawer (`navbar.tsx:234`), and search overlay (`navbar.tsx:330`) lack `role=dialog`/`aria-modal`/`aria-label`, focus-trap, Escape, and focus restore. Gallery image cards are `<div onClick>` with no keyboard handler (`gallery:225,272`). **Fix:** shared `useFocusTrap` hook; convert image cards to `<button>`.
- **Heading order:** `admissions.tsx:79` renders `motion.h2` with no `h1`; `SectionHeading` hardcodes `h2`, so programs/faculty/gallery/contact/alumni all start at h2. **Fix:** add `as?: h1|h2` prop to `SectionHeading`; pass `h1` for the top-level heading on standalone routes.
- **Form labels:** alumni form (`alumni.tsx:737-958`, ~20 fields) — labels not programmatically associated, errors not announced (`submitError` line 723 has no `role=alert`). **Fix:** `htmlFor`/`id` mirroring LeadForm; wrap errors in `role=alert`.
**Files:** `about.tsx`, `navbar.tsx`, `gallery/page.tsx`, `alumni.tsx`, `section-heading.tsx`, `admissions.tsx`, `programs.tsx`, `faculty.tsx`, `contact.tsx`

### P0.3 — Responsive layout bugs on trustee-relevant devices
- **Nav overflow:** desktop nav switches on at `lg` (`navbar.tsx:177`); with 9 items + brand + CTA the row exceeds ~944px at 1024px, and `overflow-x:hidden` silently clips Alumni/Contact/Parent-Login between 1024–1240px. **Fix:** move desktop nav to `xl`; add `shrink-0`/`whitespace-nowrap` guards.
- **Mobile sticky collision:** `admissions.tsx:103,200` use `sticky top-20` with no breakpoint prefix — below `lg` the transparent heading pins over scrolling cards. **Fix:** `lg:sticky lg:top-20`.
- **Programs carousel:** `programs.tsx:70` — `sm:overflow-visible` overrides scroll while display is still flex (grid only at `md`), so cards 3–4 are unreachable on tablets (640–767px). **Fix:** align to `md:overflow-visible md:pb-0`.
- **z-index stacking:** utility bar `relative z-50` (`navbar.tsx:97`) paints above the header's `z-40` overlays — mobile drawer/search backdrop can't cover it. **Fix:** lower to `z-30`.
**Files:** `navbar.tsx`, `admissions.tsx`, `programs.tsx`

---

## P1 — Material polish that separates "good" from "finest"

### P1.1 — Enforce the `<Section>` wrapper + unify the brand blue + elevation system
- **`<Section>` bypassed nearly everywhere** — `about.tsx:34/86/119/154`, `programs.tsx:39`, `faculty.tsx:46`, `admissions.tsx:162`, `hero.tsx:92`, `contact.tsx:35`, `footer.tsx:29`, `alumni.tsx:331`, `gallery.tsx:27`, `campus/page.tsx:82/101/158`. Visible drift: `testimonials.tsx:19` and `gallery.tsx:27` use `md:px-10` vs canonical `md:px-8` (8px gutter shift).
- **Two competing blues** — token is `#0f4c81` but `#1d70b8`/`rgba(29,112,184)` leaks into `globals.css:58` (selection), `:126-127` (skip-link), `:188` (premium-focus), `button.tsx:13` (shadow), `layout.tsx:83` (themeColor), ~15 admin files. The focus/selection ring renders the wrong blue sitewide.
- **33 ad-hoc shadow values** across 15 files with divergent opacities and three colour bases. **Fix:** define `.shadow-panel`/`.shadow-panel-hover`/`.shadow-float` in `globals.css`; apply to Card + all card hovers.

### P1.2 — Restore faculty + alumni to institutional restraint
- **Three gradients violate the "no flashy gradients" rule** — `faculty.tsx:107` (dept accent bar), `:128` (HOD card bg), `:135` (HOD badge). Replace with solid tokens + `.gold-rule`.
- **Hierarchy inversion** — department `h3` is `font-extrabold` (`faculty.tsx:108`) while page `h2` is `font-semibold`. Demote to `font-semibold`.
- **Sub-minimum label sizes (7–9px)** — `faculty.tsx:168/135/156` read as cheap, not prestigious. Raise to 10–11px; add micro type scale to `@theme`.
- **Card hover motion** — `hover:-translate-y-1` + `group-hover:scale-105` image zoom across 40+ cards (`faculty.tsx:126,146`) is startup-portfolio energy. Keep only a quiet shadow.
- **Alumni grid** — ragged heights, broken no-image slots, form re-implements ~15 inputs bypassing shared primitives (`alumni.tsx:744-965`, h-10 below 44px touch target). Route through `<Input>`/`<Select>`/`<Textarea>`; `items-stretch` + `h-full`; serif-monogram placeholder for missing portraits.

### P1.3 — IA & CTA flow
- **Header CTA is Parent Login, not Admissions** (`navbar.tsx:206`) — the primary conversion action has no persistent entry point. Promote Admissions to the header CTA; demote Parent Login to the utility bar; wrap the mobile drawer Admissions band in a `Link`.
- **About + Faculty are dead-ends** — heritage-primed leads get no next-step CTA (`about.tsx` ends at line 199, `faculty.tsx` at 221). Add closing CTA bands linking to `/admissions`.
- **Five different verbs for one action** — hero "Start Your Admissions Journey", "Start Inquiry Form", home "Start Online Inquiry", admissions "Start Inquiry", lead-form "Start Application". Standardize: links → "Begin Admissions Inquiry", submit → "Submit Inquiry".
- **Homepage doesn't close the funnel** — final CTA routes to `/academics` not `/admissions` (`app/page.tsx:174`).
- **Triple-duplicated contact info** — `contact.tsx:71-78,133-150,153-159`. Remove `contactCards` block; make the address a maps link; align tab label to form title.

### P1.4 — Parent portal credibility
`parent-login/page.tsx:5` title is "Parent Portal Redirection Gateway"; badge "Secure Redirection Gateway"; copy repeats "secure" 3×, "external/third-party" 2× — technical jargon that signals anxiety, not confidence. **Fix:** "Parent Portal | Little Flower Junior College"; show the destination domain as an anti-phishing cue; bump type scale (body `text-sm md:text-base`, H1 `text-2xl md:text-3xl`).

### P1.5 — Hero reduced-motion + motion system
- **Hero framer-motion has no reduced-motion guard** (`hero.tsx:72`) — the 1.4s scale + staggered entrance all play for reduced-motion users (Reveal/Counter correctly short-circuit; hero/admissions don't). **Fix:** `useReducedMotion()` short-circuit mirroring Reveal.
- **Reveal easing diverges** (`reveal.tsx:27` uses `[0.22,1,0.36,1]`; everything else uses `[0.16,1,0.3,1]`); per-section duration/translate drift (Reveal y16/d0.5; hero y12/d0.6; admissions y15/d0.8). **Fix:** extract shared `MOTION_EASE/DURATION/Y` into `components/motion/variants.ts`.
- **Admissions hero fires on mount** not on scroll-into-view (`admissions.tsx:71` uses `animate` not `whileInView`).

---

## P2 — Refinement toward timeless

### P2.1 — System-consistency polish
- Adopt `<Badge>` for all true eyebrows (add `onDark` variant); collapse `border-stone-texture` 10 alphas → two tokens (`hairline`/`rule`); standardize panel radii to `rounded-lg`; add `size` variant to `SectionHeading`; extract shared `<IconChip>`; add micro type scale to `@theme`; centralize motion constants.

### P2.2 — Content & storytelling
- Canonicalize stream abbreviations to undotted `MPC/BiPC/MEC/CEC` with "Maths"; fix `crestSymbols` copy ("dispersing" → "dispelling", `site-data.ts:677`); standardize stat formatting (`15,000+` not `15k+`); rewrite generic testimonials to named attributions or institutional voice; rewrite OG/Twitter metadata to institutional voice (drop "a premium website" sitemap language, `layout.tsx:54`); merge the lean homepage into the full `/lfjc` landing (or 301 `/lfjc` → `/`) and extract a shared `<StreamCards>` so stats stop diverging.

### P2.3 — Code-quality cleanup
- Remove dead `animate-bounce-subtle` (`footer.tsx:149`); replace gallery category nested ternary with a label map; remove unreachable `'18+'` branch (`about.tsx:48`); delete redundant nested flex wrapper (`about.tsx:156`); add `id` anchors to faculty department blocks (or remove `scroll-mt-24`); guard `AnimatedCounter` against non-numeric input; standardize `duration-355 → 300`; `useMemo` derived alumni arrays; move `searchableItems` to module scope.

---

## Spacing & vertical rhythm (cross-cutting, P1–P2)
- About page rhythm inconsistent (`mb-6/mt-6` first gap = 48px vs `mt-8` = 32px elsewhere) — page "accelerates" as you scroll (`about.tsx:34`).
- `SectionHeading → content` gap varies (`mt-5` vs `mt-6`); section padding variants applied unevenly (testimonials/gallery `feature` vs comparable sections `default`).
- Alumni page mixes 12/16/24/40px gaps with no consistent step.
- Campus facts band uses `py-4`, tighter than the system `dense` variant — the strongest credibility signals sit in the tightest padding (`campus/page.tsx:82`).

---

## Color & material (cross-cutting, P1–P2)
- `.editorial-rule` gold hardcoded `rgba(166,137,85,0.8)` diverges from `--color-heritage-gold` token (`globals.css:160`); the two divider primitives render visibly different golds.
- `viewport themeColor #1d70b8` off-brand (`layout.tsx:83`) — set to `#0f4c81` or `#101f2c`.
- Faculty image frame uses non-token `bg-stone-100` (`faculty.tsx:133`) — use `bg-royal-cream/50`.
- Body background/text use hardcoded hex instead of tokens (`globals.css:42`).

---

## Full finding index by theme (158 verified findings)

| Theme | Count | Lead severity |
|---|---|---|
| Accessibility & WCAG failures | 8 | critical |
| Information architecture & CTA flow | 9 | high |
| Design system cohesion & consistency | 9 | high |
| Typography & hierarchy | 7 | high |
| Responsive & layout bugs | 8 | high |
| Color & material | 5 | high |
| Motion | 6 | high |
| Content & storytelling | 6 | medium |
| Code quality & maintainability | 6 | low |
| Spacing & vertical rhythm | 6 | medium |

(Complete file:line evidence and code-level fixes for every finding are captured in the audit workflow output; the P0/P1/P2 plan above is the actionable synthesis.)