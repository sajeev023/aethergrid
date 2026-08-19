# A-to-Z Project Architecture & Tech Stack

This document provides a complete, low-level breakdown of the architecture, subsystems, and libraries used to build the premium LFJC (Little Flower Junior College) website.

---

## 🏗️ Core Framework & Runtime
* **Next.js 15.5.19**: The core framework. It utilizes the modern **App Router** (`app/` directory) which leverages React Server Components (RSC) to render pages on the server for ultra-fast page speeds and optimal SEO.
* **React 19**: The underlying UI library, featuring advanced server rendering hooks and performance improvements.
* **TypeScript 5.9.3**: Provides strict static typing across the entire codebase to prevent runtime crashes.

---

## 🎨 Styling, Typography, & Animations
* **Tailwind CSS v4.1.17**: Built using the brand-new Tailwind v4 engine, which uses CSS-first configuration inside [globals.css](file:///e:/lfjcv3/New%20project/app/globals.css) and leverages lightning-fast PostCSS processing via `@tailwindcss/postcss`.
* **Framer Motion 12.40.0**: Drives the high-end premium feel of the website with scroll-driven animations, hover micro-effects, fade-in reveals, and entry transitions.
* **Lucide React 1.17.0**: The vector icon library supplying the site's modern iconography.

---

## 💾 Custom Database & Data Storage
Rather than using a heavy external database server, the application implements a fast, robust file-based database.
* **Database Manager ([db.ts](file:///e:/lfjcv3/New%20project/lib/admin/db.ts))**: A custom service that reads and writes structured data.
* **Atomic Writes**: Writes are safe from corruption because it first writes to a temporary file (`.tmp`) and then atomically renames the file using `fs.renameSync()`.
* **Data Store Directories**: All data is saved inside the [data](file:///e:/lfjcv3/New%20project/data/) directory:
  * `admins.json`: Contains admin credentials (hashed).
  * `alumni-submissions.json`: Submissions from the alumni portal awaiting moderator review.
  * `submissions.json`: Inquiries submitted via admissions and contact forms.
  * `audit-log.json`: A record of all actions taken by administrators.
  * `content.json`: Dynamically editable page copy.

---

## 🔒 Security & Session Management
* **`bcryptjs`**: Cryptographically hashes administrative passwords (using a work factor of 12) before writing them to the database.
* **`jose`**: A lightweight cryptography library used to issue and verify JSON Web Tokens (JWT) for secure admin sessions. It is optimized to run inside Edge environments.
* **HTTP-Only Session Cookies**: Session tokens are written to `lfjc_admin_session` cookies. They use the `httpOnly: true`, `secure: true`, and `sameSite: "strict"` settings to block XSS and CSRF attacks.
* **Edge Middleware Security ([middleware.ts](file:///e:/lfjcv3/New%20project/middleware.ts))**: Automatically intercepts all traffic going to `/admin/*` and `/api/admin/*`. It verifies the JWT and attaches the decrypted credentials to request headers (`x-admin-user-id`, `x-admin-role`, etc.) before forwarding the request.

---

## 📂 Codebase Directory Layout

```
├── app/                      # Next.js pages and API routes
│   ├── about/                # About page route
│   ├── academics/            # Academics page route
│   ├── admissions/           # Admissions form and page
│   ├── alumni/               # Alumni list and submission pages
│   ├── admin/                # Admin Panel console (Dashboard, Audit, Content, etc.)
│   ├── api/                  # Backend endpoints (Admissions, Inquiries, Admin APIs)
│   ├── campus/               # Campus life page
│   ├── contact/              # Contact form page
│   ├── gallery/              # Interactive multimedia gallery
│   ├── lfdc/                 # Little Flower Degree College subpage
│   ├── lfjc/                 # Little Flower Junior College subpage
│   ├── lfs/                  # Little Flower School subpage
│   ├── parent-login/         # Portal for parent access
│   ├── globals.css           # Global CSS, Tailwind v4 imports, theme colors
│   ├── layout.tsx            # Global layout configuration
│   └── page.tsx              # Main homepage entry point
├── components/               # Reusable React components
│   ├── admin/                # Shared layout shells for admin console
│   ├── motion/               # Animation helper components (Scroll reveal, etc.)
│   ├── sections/             # Modular page sections (Hero, Programs, Alumni, Footer)
│   └── ui/                   # Reusable base elements (Buttons, Input, Card, Select)
├── lib/                      # Business logic, helpers, and types
│   ├── admin/                # Database managers, seed helpers, and types
│   ├── site-data.ts          # Static copy and configuration defaults
│   └── utils.ts              # Tailwind merger and formatting utilities
├── public/                   # Static resources
│   ├── images/               # Media resources (faculty portraits, campus pictures)
│   └── public_assets         # Logos, icons, site resources
```

---

## 🌐 SEO & Crawler Optimization
* **`app/sitemap.ts`**: Automatically builds a search engine crawler-friendly list of all site routes.
* **`app/robots.ts`**: Configures access permissions for indexers like Googlebot.
* **Layout Metadata**: Implements custom OpenGraph configurations (title, description, and keywords) inside [layout.tsx](file:///e:/lfjcv3/New%20project/app/layout.tsx) for dynamic links on social media platforms.
