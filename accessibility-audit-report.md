# LFJC Website — Accessibility Audit Report

**Scope:** Next.js 15 App Router public pages (`app/**/page.tsx`) and key section components (`components/sections/*.tsx`), plus `components/lead-form.tsx`, `components/whatsapp-button.tsx`, `app/parent-login/page.tsx`.
**Date:** 2026-09-03
**Method:** Static code review against WCAG 2.1 AA.

---

## Summary

The site has a solid accessibility foundation: semantic `<main>`/`<section>` structure, a skip link, native form labels, focus-visible rings, keyboard-driven navigation menus, focus traps on drawers, reduced-motion support, and descriptive image `alt` text throughout. Verified issues are narrow and fixable without redesigning the visual identity.

**Verified issue count:** 9 (1 critical, 3 serious, 4 moderate, 1 minor).

---

## Findings

| # | Area | Severity | File (line) | Issue | Evidence / Impact |
|---|------|----------|-------------|-------|-------------------|
| 1 | Color contrast | **Critical** | `components/ui/button.tsx:22` | Gold button variant uses `bg-heritage-gold text-white`. #c29b53 on white has a contrast ratio of **2.59:1**, failing WCAG AA for normal text (needs 4.5:1). Used on many CTAs: *Apply Online*, *View Official Toppers*, *New Admissions Portal*, *Official Google Registration Form*, *Proceed to MySkoolCom Portal*. | Button text is bold uppercase but the largest size is only 16 px, which is below the 18.5 px “large text” threshold, so normal-text contrast applies. |
| 2 | Keyboard / forms | **Serious** | `components/sections/alumni.tsx:1111–1138` and `1142–1168` | Profile-photo and supporting-files inputs are visually hidden with `className="hidden"` and activated only by clicking their wrapping `<label>`. The labels are not in the tab order and cannot be reached or triggered with the keyboard. | Users who cannot use a mouse cannot upload required documents in the alumni registration drawer. |
| 3 | Keyboard / modals | **Serious** | `components/sections/about.tsx:489–531` | Full-resolution lightbox lacks `role="dialog"`, `aria-modal`, focus trap, and does not move focus into the modal when opened. | Keyboard focus remains on the page behind the modal; Tab can escape the overlay, and screen-reader users may not perceive a dialog context. |
| 4 | Keyboard / modals | **Serious** | `components/sections/toppers.tsx:149–186` | Full-screen poster lightbox also lacks `role="dialog"`, `aria-modal`, and a focus trap. | Same impact as finding #3 for the toppers zoom view. |
| 5 | Form labels | **Moderate** | `components/sections/faculty-teaching.tsx:151–156` | Faculty search `<input>` has no associated `<label>` and relies solely on placeholder text (`"Search faculty by name, department, or subject..."`). | Placeholders disappear once the user types, and the input is not programmatically labelled for screen readers. |
| 6 | Icons / images | **Moderate** | `components/sections/parent-login-content.tsx:30` | Decorative `ShieldCheck` icon is missing `aria-hidden="true"`. | Screen readers may announce an unnamed image inside an otherwise presentational context. |
| 7 | Buttons / state | **Moderate** | `components/sections/contact.tsx:173–187` | The *General Communication* / *Admissions Inquiry* toggles are `<button>` elements but do not expose their selected state programmatically (no `aria-selected` or `role="tab"`). | Screen-reader users cannot tell which form view is active. |
| 8 | Buttons / ARIA | **Moderate** | `components/sections/alumni.tsx:807–814` | Close button in the alumni registration drawer has no `aria-label`; it relies on an unlabelled `X` icon. | Announced only as "button" by screen readers. |
| 9 | Buttons | **Minor** | `app/error.tsx:38–44` | *Try Again* button does not declare `type="button"`. | Although it is not nested in a `<form>`, explicit type is safer and avoids future regression. |

---

## Recommended Fixes

1. **Gold button contrast** — Change the default gold button background from `bg-heritage-gold` to `bg-heritage-gold-strong` (or darken #c29b53 to #8a6625), keeping white text. #8a6625 on white is **5.24:1** and passes AA. Update `components/ui/button.tsx:22` and any one-off buttons that hardcode `bg-heritage-gold text-white` (e.g., `app/page.tsx:38`, `app/page.tsx:75`, `components/sections/admissions.tsx:45`, `components/sections/alumni.tsx:381`, `components/sections/parent-login-content.tsx:56`).

2. **Keyboard-accessible file uploads in alumni form** — Replace `className="hidden"` on the file inputs with a visually-hidden but focusable style (e.g., `sr-only`) and style the labels to look like buttons, or add `tabIndex={0}` and keyboard handlers (`Enter`/`Space`) to the labels that programmatically call `input.click()`. Ensure the labels retain their visible button appearance.

3. **Lightbox modals** — For `about.tsx`, `toppers.tsx`, and the `GalleryGrid` in `campus.tsx`:
   - Add `role="dialog"`, `aria-modal="true"`, and an `aria-label` (e.g., `aria-label="Enlarged image preview"`) to the fixed overlay.
   - Use the existing `useFocusTrap` hook to trap focus inside each lightbox and return focus to the trigger on close.

4. **Faculty search label** — Add an associated `<label htmlFor="faculty-search">` or `aria-label="Search faculty by name, department, or subject"` to the search input in `components/sections/faculty-teaching.tsx:151`.

5. **Decorative icon** — Add `aria-hidden="true"` to the `ShieldCheck` icon in `components/sections/parent-login-content.tsx:30`.

6. **Contact form toggle state** — Add `role="tab"`, `aria-selected={activeForm === type}`, and wrap the buttons in a `role="tablist"` element in `components/sections/contact.tsx:173–187`. Alternatively, keep them as buttons and add `aria-pressed={activeForm === type}`.

7. **Alumni drawer close button label** — Add `aria-label="Close alumni registration form"` to the close button in `components/sections/alumni.tsx:807–814`.

8. **Error reset button type** — Add `type="button"` to the reset button in `app/error.tsx:38`.

---

## Verdict

The LFJC site is **close to WCAG 2.1 AA compliance** but not yet fully conformant. The critical blocker is the gold-on-white button contrast. Once that is fixed and the alumni file-upload, lightbox focus-trap, and search-label issues are addressed, the remaining gaps are minor polish. No redesign is required; the institutional color identity can be preserved by shifting the gold CTA background to the existing darker gold token (`heritage-gold-strong`).

**Status:** Pass pending the 9 verified fixes above.
