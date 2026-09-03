# LFJC Website Security Audit Report

**Scope:** Next.js 15 App Router admin API routes (`app/api/admin/**/*.ts`), public submission routes (`app/api/inquiries`, `app/api/alumni`), admin UI (`app/admin/**`), and auth helpers (`lib/admin/**`).

**Date:** 2026-09-03

---

## Summary

The admin area is protected by a JWT session cookie (`lfjc_admin_session`) enforced in both middleware (`middleware.ts`) and every admin route handler. Role-based checks (`super_admin`, `administrator`, `content_manager`) are applied to individual endpoints, and passwords are hashed with `bcryptjs` (cost factor 12). There is no real SQL database, payment flow, or sensitive secrets committed to source control.

Verified weaknesses are mostly medium/low and can be fixed without redesigning the site. The most important items are the hardcoded development JWT fallback and public API over-exposure of approved alumni PII.

---

## Findings

### 1. Hardcoded development JWT fallback secret (Medium)

- **Files:**
  - `lib/admin/auth.ts` lines 15–23 (line 22 contains the literal fallback key)
  - `middleware.ts` lines 7–15 (line 12 duplicates the same literal)
- **Issue:** If `ADMIN_JWT_SECRET` is missing and `NODE_ENV` is not set to `production`, the same hardcoded string is used to sign and verify admin sessions. The logic is also duplicated across two files, so an update in one place may not match the other.
- **Risk:** An attacker with access to source code could forge a valid admin session in any environment where the fallback is active.

### 2. Public alumni API returns full PII records (Medium)

- **File:** `app/api/alumni/route.ts` lines 7–15
- **Issue:** The endpoint returns the complete `AlumniSubmission` objects for approved profiles, including `email`, `phone`, `studentId`, `verificationDetails`, etc. The public UI only uses a subset, so the API over-shares personal data.
- **Risk:** Anyone who calls `/api/alumni` can retrieve full contact and identification details of approved alumni.

### 3. Admin faculty/gallery uploads rely on file extension only (Low–Medium)

- **Files:**
  - `app/api/admin/faculty/upload/route.ts` lines 36–42
  - `app/api/admin/gallery/upload/route.ts` lines 36–42
- **Issue:** Uploaded files are accepted based only on `path.extname(file.name)`. The content is not checked against magic bytes or MIME signatures before being written to `public/images/...` and served as static assets.
- **Risk:** An authenticated admin (or a compromised admin account) could upload a file renamed to `.jpg`/`.png` whose contents are not an image. This is a weaker control than the alumni upload route, which already validates magic bytes.

### 4. Inquiries route logs full PII payloads (Low)

- **File:** `app/api/inquiries/route.ts` line 114
- **Issue:** Every submission is logged with `console.info("[inquiries] Incoming payload:", JSON.stringify(payload))`, including names, email addresses, phone numbers, and messages.
- **Risk:** Server logs may contain parent/student PII, increasing exposure if logs are shared or retained.

### 5. In-memory rate-limit maps can grow unbounded (Low)

- **Files:**
  - `app/api/admin/auth/login/route.ts` lines 7–21 (`loginAttempts` Map)
  - `app/api/inquiries/route.ts` lines 32–43 (`ipHits` Map)
- **Issue:** Stale entries are never removed. On a long-running Node process the Maps will accumulate one entry per unique IP that hits the endpoints.
- **Risk:** Memory leak; also limits are process-local and reset on serverless cold starts.

### 6. Alumni submission accepts unlimited supporting files (Low)

- **File:** `app/api/alumni/submit/route.ts` lines 137–152
- **Issue:** `formData.getAll("supportingImages")` is iterated without a count cap. Each file is limited to 5 MB, but many files can still consume disk and memory.
- **Risk:** Denial of storage/resources by submitting a large batch of files.

### 7. Approved alumni photos remain behind admin authentication (Low / note)

- **Files:**
  - `app/api/alumni/submit/route.ts` line 120 stores `photoUrl` as `/api/admin/alumni-upload/<filename>`
  - `app/api/admin/alumni-upload/[file]/route.ts` lines 29–32 requires the `alumni` permission
- **Issue:** Once an alumni profile is approved, its profile photo URL still points to an admin-only endpoint. The public alumni page will request it without credentials and fail to load the image.
- **Risk:** This is primarily a functional/auth-scope mismatch, not a data leak. If public display is intended, approved photos need to be served from a public path or copied to `public/images/alumni/uploads` after approval.

### 8. No additional security headers are configured (Low)

- **File:** `next.config.ts` lines 1–62
- **Issue:** The Next.js config only disables the `X-Powered-By` header. It does not set `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or a minimal `Content-Security-Policy`.
- **Risk:** Missing defense-in-depth headers increase the impact of any future XSS or clickjacking bug.

---

## Recommended Fixes

1. **Remove hardcoded JWT fallback / centralize secret**
   - Create a small shared helper (e.g., `lib/admin/jwt-secret.ts`) that only imports `jose` and reads `ADMIN_JWT_SECRET`. Have both `lib/admin/auth.ts` and `middleware.ts` import it.
   - Throw if the secret is missing in **all** environments (local development should set `ADMIN_JWT_SECRET` in `.env.local`).

2. **Return a public-safe alumni DTO**
   - In `app/api/alumni/route.ts`, map approved records to a subset such as `{ id, name, category, position, company, batchFrom, batchTo, stream, bio, achievements, city, country, image }`. Drop `email`, `phone`, `studentId`, and `verificationDetails` from the public response.

3. **Add content validation to faculty/gallery uploads**
   - Reuse the magic-byte approach from `app/api/alumni/submit/route.ts` (or add a dependency like `file-type`) and reject files whose bytes do not match `.jpg`/`.jpeg`/`.png`/`.webp`.
   - Optionally validate the image with `sharp` before writing it to disk.

4. **Stop logging full PII in the inquiries route**
   - Replace `console.info("[inquiries] Incoming payload:", JSON.stringify(payload))` with a metadata-only log line: type, refNumber, IP, and timestamp.

5. **Prune stale rate-limit entries**
   - In both `login/route.ts` and `inquiries/route.ts`, delete entries whose window has expired before adding new ones, or use a simple LRU/cleanup timer.

6. **Cap alumni supporting files**
   - In `app/api/alumni/submit/route.ts`, limit `supportingImages` to a maximum number (e.g., 3) and optionally enforce a total upload size budget.

7. **Fix approved alumni photo visibility**
   - Either keep approved photos private (and do not expose them on the public page) or, after approval, copy them to a public directory such as `public/images/alumni/uploads` and update `photoUrl` to a public path.

8. **Add basic security headers**
   - Add an `async headers()` section in `next.config.ts` with:
     - `X-Frame-Options: DENY`
     - `X-Content-Type-Options: nosniff`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Strict-Transport-Security` (production, HTTPS only)
     - A minimal `Content-Security-Policy` that reflects the site’s sources (self, YouTube embeds, etc.).

---

## Verdict

The site is **acceptable for a static college website with no payment flow and no real database**, but the medium-severity items above should be fixed before considering it production-hardened.

- **Authentication/authorization:** Admin endpoints are not unprotected; both middleware and route handlers enforce JWT sessions and role permissions. The cookie is `httpOnly`, `sameSite: "strict"`, and `secure` in production.
- **Secrets:** No live API keys or passwords are committed to source; the only secret issue is the development-time JWT fallback.
- **XSS/CSRF:** React escapes rendered output; admin-edited content is not rendered via `dangerouslySetInnerHTML`. The admin cookie uses `SameSite=Strict`, which provides CSRF protection for admin actions.
- **SQL injection:** Not applicable — data is stored in JSON files via `lib/admin/db.ts`.
- **File uploads:** Alumni uploads already use magic-byte validation and a private upload directory. Faculty and gallery uploads should adopt the same content validation.
- **CORS:** No CORS headers are configured; cross-origin requests to the public APIs are blocked by default browser policy.

Overall: **secure enough for its intended use case after addressing the recommended fixes**.
