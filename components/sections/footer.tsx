"use client";

import { Mail, MapPin, Phone, Globe, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getInstitutionData, navItems } from "@/lib/site-data";

interface FooterProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Footer({ activeInst = "lfjc" }: FooterProps) {
  const instData = getInstitutionData(activeInst);

  return (
    <footer className="relative overflow-hidden bg-deep-navy text-royal-cream border-t border-heritage-gold/20">
      {/* Subtle texture */}
      <div className="absolute inset-0 stone-pattern opacity-[0.03] pointer-events-none" />

      {/* ─── Credentials Top Band ──────────────────────────────────────── */}
      <div className="relative z-10 border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 md:py-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Award className="h-6 w-6 md:h-7 md:w-7 text-heritage-gold-bright shrink-0" />
              <div>
                <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.16em] text-heritage-gold-bright font-sans">
                  Affiliated to Board of Intermediate Education, Telangana
                </p>
                <p className="text-[10px] md:text-[11px] text-royal-cream/50 font-sans mt-0.5">
                  Governed by Brothers of St. Gabriel Educational Society • Est. {instData.established}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-royal-cream/60 font-sans">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Minority Institution
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-heritage-gold" />
                Golden Jubilee (1974–2024)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Grid ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14">
        <div className="grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="group flex items-center gap-3.5">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-heritage-gold/30 overflow-hidden bg-white shadow-lg transition-transform group-hover:scale-105 p-1">
                <Image
                  src="/images/lfjc-logo.jpg"
                  alt="LFJC Official Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold italic tracking-wide text-heritage-gold-bright">
                  {instData.shortName}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-royal-cream/55 font-sans">
                  Uppal campus • Hyderabad
                </span>
              </div>
            </Link>
            <p className="text-sm leading-6 text-royal-cream/65 font-sans max-w-sm">
              A premier Montfortian institution dedicated to Truth, Virtue, and Academic Excellence since {instData.established}. Shaping leaders through discipline and dedicated pedagogy.
            </p>
            <div className="flex gap-3">
              <a
                href={instData.siteUrl}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-heritage-gold hover:border-heritage-gold hover:scale-110 transition-all duration-300"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/lfjcuppal/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-heritage-gold hover:border-heritage-gold hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={`mailto:${instData.email}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-heritage-gold hover:border-heritage-gold hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-5 font-sans">
              Quick Links
            </h4>
            <nav className="grid gap-3" aria-label="Quick Links">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
                >
                  <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Institution Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-5 font-sans">
              The Montfortian Family
            </h4>
            <nav className="grid gap-3" aria-label="Institution Links">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower Junior College (LFJC)
              </Link>
              <a
                href="https://lfshyd.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower School (LFS)
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
              <a
                href="http://www.lfdc.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower Degree College (LFDC)
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </nav>
          </div>

          {/* Column 4: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-5 font-sans">
              Contact Office
            </h4>
            <address className="grid gap-4 not-italic text-sm leading-6 text-royal-cream/65 font-sans">
              <a
                className="group flex gap-3 hover:text-white transition-colors"
                href="https://www.google.com/maps/search/?api=1&query=Little%20Flower%20Junior%20College%20Uppal%20Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
                  aria-hidden="true"
                />
                <span className="underline decoration-royal-cream/20 decoration-1 underline-offset-4 group-hover:decoration-heritage-gold transition-all">
                  {instData.addressLine}
                </span>
              </a>
              <a
                className="group flex gap-3 hover:text-white transition-colors"
                href={`tel:${instData.phone.replace(/\s/g, "")}`}
              >
                <Phone
                  className="mt-1 h-4 w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
                  aria-hidden="true"
                />
                {instData.phone}
              </a>
              <a
                className="group flex gap-3 hover:text-white transition-colors"
                href={`mailto:${instData.email}`}
              >
                <Mail
                  className="mt-1 h-4 w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
                  aria-hidden="true"
                />
                {instData.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ─── Sub-footer ────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-royal-cream/40 text-center font-sans">
            &copy; {new Date().getFullYear()} {instData.name} — {instData.tagline}
          </p>
          <nav aria-label="Legal and compliance" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {[
              { label: "Anti-Ragging", href: "/legal/anti-ragging" },
              { label: "Privacy", href: "/legal/privacy" },
              { label: "Terms", href: "/legal/terms" },
              { label: "Disclosures", href: "/legal/disclosures" },
              { label: "Refund & Cancellation", href: "/legal/refund-cancellation" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-royal-cream/45 hover:text-heritage-gold-bright transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-5 md:px-8 pb-5 -mt-2">
          <p className="text-[10px] text-royal-cream/30 font-sans text-center md:text-right">
            Zahid Nagar, Opposite Survey of India, Uppal, Hyderabad 500039
          </p>
        </div>
      </div>
    </footer>
  );
}
