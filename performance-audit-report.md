# LFJC Website — Focused Performance Audit

**Date:** 2026-09-03  
**Scope:** Next.js 15 App Router public site (app/ + components/sections/)

## Summary

The site uses modern Next.js patterns (`next/font/google`, `next/image`, AVIF/WebP hero formats, `optimizePackageImports`, `sharp`). Verified issues are concentrated in three areas: **hero slider LCP contention** from too many `priority` images, **below-fold `priority` overuse** on image-heavy pages, and **eager loading of heavy interactive sections** (alumni form, campus/faculty galleries). Font loading is clean. Layout shifts are generally controlled by aspect-ratio wrappers, with one low-risk CLS case in the sticky navbar height transition.

## Findings

### 1. `next/image` usage

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 1.1 | **Medium** | `components/sections/hero.tsx:156` | Both poster slides always set `priority`, plus the first non-poster slide at line 167. This creates **3 concurrent high-priority image downloads** on initial load, competing with the LCP image. | Remove `priority` from poster slides. Only the initially visible slide should be `priority`. If the first non-poster is the LCP, keep only `priority={index === 0}` for the background carousel and drop `priority` from the poster branch. |
| 1.2 | **Medium** | `components/sections/about.tsx:70`, `252` | Below-fold images (founder portrait, patroness portrait, campus-hero) use `priority`, forcing early fetch ahead of more critical content. The principal portrait at line 70 is the likely LCP on `/about` and can keep `priority`; the others cannot. | Remove `priority` from founder/patroness images (lines ~135, ~192) and from the campus-hero image at line 252. |
| 1.3 | **Medium** | `components/sections/about.tsx:338-343` | `/images/official/brothers.png` is a **2.8 MB PNG** and the `Image` has no `sizes` attribute, so Next.js falls back to a wasteful `100vw` srcset for what renders as a ~40 % width column image. | Add `sizes="(min-width: 1024px) 40vw, 90vw"`. Also convert the source to WebP/AVIF and re-compress; a 2.8 MB source will still inflate build/cache even when optimized. |
| 1.4 | **Low** | `components/sections/about.tsx:412-417` | Annual-theme image uses `fill` without `sizes`. | Add `sizes="(min-width: 1024px) 40vw, 90vw"` (matches the `lg:col-span-5` container). |
| 1.5 | **Low** | `components/sections/campus.tsx:166-172` | Lightbox image uses `fill` without `sizes`. | Add `sizes="(min-width: 1024px) 75vw, 100vw"` or similar for the modal viewport. |
| 1.6 | **Low** | `components/sections/toppers.tsx:176-183` | Full-screen poster lightbox uses `fill` without `sizes`. | Add `sizes="(min-width: 1024px) 75vw, 100vw"`. |
| 1.7 | **Low** (admin only) | `app/admin/gallery/page.tsx:158`, `214` | Admin gallery uses raw `<img>` tags instead of `next/image`, bypassing optimization. | Acceptable for admin dashboard; not public-facing. Verify in a future admin audit. |

### 2. Font loading

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 2.1 | **None / Not verified** | `app/layout.tsx:2-26` | Fonts are loaded via `next/font/google` with `display: "swap"`. No `@import`, `<link>`, or render-blocking font tags were found. | No action required. |

### 3. Layout shifts (CLS)

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 3.1 | **Low** | `components/sections/navbar.tsx:198-209` | The sticky header shrinks from `h-[68px]`/`h-[76px]` to `h-[60px]`/`h-[68px]` on scroll via React state. Because the element is in normal document flow (sticky top-0), the height transition can nudge the content below by ~8 px before the first user scroll. | Replace the dynamic height transition with a CSS-only solution that does not change layout, e.g. shrink only internal padding/scale the logo rather than the header height, or use a fixed header height. |
| 3.2 | **Not verified** | Most image components | Most `next/image` usages are wrapped in explicit aspect-ratio containers (`aspect-[4/3]`, `aspect-[3/4]`, `aspect-square`, fixed `width`/`height`). No missing-dimension CLS was verified. | Maintain existing aspect-ratio wrappers when adding new images. |

### 4. JavaScript bundle size

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 4.1 | **Medium** | `components/sections/alumni.tsx:1-1246` | The `/alumni` page chunk is ~52 KB and includes the full alumni registration form (many controlled inputs, file handlers, `useState` hooks, inline SVG). This form is rendered eagerly even though most visitors never open it. | Lazy-load the registration form with `next/dynamic` and a skeleton fallback. Trigger load only when the user clicks "Join Web Directory" or "Apply to Feature Your Story". |
| 4.2 | **Low** | `lib/site-data.ts` | `founderData.fullText`, `patronessData.fullText`, and `managementData.fullText` are long unused strings, but the objects are imported by pages and bundled. | Split data into small exported pieces or remove unused `fullText` fields until a dedicated page needs them. |
| 4.3 | **Not verified** | `package.json:17-19` | `framer-motion` and `lucide-react` are configured in `next.config.ts:24-30` under `experimental.optimizePackageImports`, so icon/motion tree-shaking is already enabled. | No action required; verify with a bundle analyzer if chunk sizes grow. |

### 5. Lazy loading of below-fold sections/components

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 5.1 | **Medium** | `components/sections/campus.tsx`, `components/sections/faculty-teaching.tsx`, `components/sections/alumni.tsx` | Heavy image grids and card grids are imported synchronously on their routes. `Reveal` delays animation, not JS/HTML download. | Wrap the lower-priority portions (gallery grids, faculty directory body, alumni card grid) in `next/dynamic` with a static skeleton. Keep the page header and first visible section static for SEO/LCP. |
| 5.2 | **Low** | `components/sections/hero.tsx:100-106` | All 4 hero slides are mounted in the DOM immediately, even though only one is visible. | Keep current behavior if performance is acceptable; for stricter LCP, consider rendering only the active + previous slides. |

### 6. LCP/INP considerations

| # | Severity | File (line) | Issue | Verified fix |
|---|----------|-------------|-------|--------------|
| 6.1 | **Medium** | `components/sections/hero.tsx:100-106` | Auto-rotation every 4 s can change the LCP candidate before the initial image finishes painting, and causes ongoing main-thread motion work. | Increase the first-slide hold to at least 6–8 s, or pause rotation until `load`/`domContentLoaded`. Prefer CSS `transition` over `motion.div` for the opacity cross-fade to reduce JS animation overhead. |
| 6.2 | **Medium** | `components/sections/alumni.tsx:149-180` | Dynamic alumni data is fetched client-side in a `useEffect`, causing a secondary render/layout pass after initial paint. | Move the fetch into a Server Component (e.g. `app/alumni/page.tsx`) or wrap it in `<Suspense>` so the shell renders statically. |
| 6.3 | **Low** | `components/ui/counter.tsx:40` | `framer-motion`'s `animate()` runs a 1.8 s count-up on the main thread when the stats strip enters the viewport. | Use a CSS-driven counter (e.g. `@property` + `animation`) or reduce duration to ≤ 1 s; respect `prefers-reduced-motion` (already handled). |

## Recommended Fixes (prioritized)

1. **Hero LCP (highest impact)** — In `components/sections/hero.tsx`, remove `priority` from poster slides and keep it only on the first visible background slide.
2. **Remove false `priority` flags** — In `components/sections/about.tsx`, remove `priority` from founder, patroness, and campus-hero images; keep it only on the principal portrait.
3. **Optimize the 2.8 MB brothers PNG** — Convert `public/images/official/brothers.png` to WebP or AVIF, compress it, and add `sizes` to the corresponding `Image`.
4. **Lazy-load the alumni form** — Use `next/dynamic` for the form in `components/sections/alumni.tsx`.
5. **Add missing `sizes` attributes** — Annual theme, campus lightbox, toppers lightbox.
6. **Reduce sticky-navbar CLS** — Avoid header-height layout change on scroll.
7. **Server-fetch dynamic alumni** — Move `/api/alumni` fetch out of the client `useEffect`.
8. **Optional bundle cleanup** — Remove unused `fullText` strings from `lib/site-data.ts` or split exports.

## Verdict

The site is **performant by default** but has a few **fixable LCP and JS-loading inefficiencies**. The most impactful wins are (1) reducing hero `priority` contention, (2) removing below-fold `priority` flags, and (3) lazy-loading the alumni form. No redesign is required; these are minimal, targeted changes.

Font loading and image aspect-ratio discipline are already well handled. Image-format configuration (`avif`, `webp`) and `optimizePackageImports` are correctly set up in `next.config.ts`.
