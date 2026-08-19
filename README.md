# Little Flower Junior College Website

Production-ready Next.js 15 website based on the supplied LFJC premium redesign references.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS 4
- Shadcn-style UI primitives
- Framer Motion
- Lucide Icons
- Vercel-ready metadata, sitemap, robots, and structured data

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
npm run start
```

## Forms

The inquiry, contact, and admissions forms submit to `POST /api/inquiries`.

For production email delivery on Vercel, set these environment variables:

```bash
RESEND_API_KEY=your_resend_api_key
FORM_TO_EMAIL=info@lfjc.co.in
FORM_FROM_EMAIL="LFJC Website <verified-sender@your-domain.com>"
NEXT_PUBLIC_SITE_URL=https://www.lfjc.co.in
```

Without `RESEND_API_KEY`, local development validates and logs submissions. In production, the route returns a configuration error so submissions are not silently lost.

## Deployment To Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Set the environment variables above.
4. Use the default Vercel build settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output: Next.js default
5. Deploy.

## Structure

```text
app/
  api/inquiries/route.ts
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  motion/reveal.tsx
  sections/
    about.tsx
    admissions.tsx
    alumni.tsx
    contact.tsx
    faculty.tsx
    footer.tsx
    gallery.tsx
    hero.tsx
    navbar.tsx
    programs.tsx
    testimonials.tsx
  ui/
lib/
  site-data.ts
  structured-data.ts
  utils.ts
public/images/
```

## Content Notes

Core institutional details, contact information, principal, departments, and course names are aligned with LFJC's official public pages. The supplied redesign guided the visual system, layout rhythm, and section composition.
