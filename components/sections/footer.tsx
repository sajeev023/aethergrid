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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3.5 sm:py-5 md:py-8">
          <div className="flex flex-col items-center gap-2.5 sm:gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3 text-center md:text-left">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-heritage-gold-bright shrink-0" />
              <div>
                <p className="text-[10px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-heritage-gold-bright font-sans">
                  Affiliated to Board of Intermediate Education, Telangana
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] text-royal-cream/50 font-sans mt-0.5">
                  Governed by Brothers of St. Gabriel Educational Society • Est. {instData.established}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-royal-cream/60 font-sans">
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-14">
        <div className="grid gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-3 sm:gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full border border-heritage-gold/30 overflow-hidden bg-white shadow-lg transition-transform group-hover:scale-105 p-0.5 sm:p-1">
                <Image
                  src="/images/lfjc-logo.jpg"
                  alt="LFJC Official Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold italic tracking-wide text-heritage-gold-bright">
                  {instData.shortName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-royal-cream/55 font-sans">
                  Uppal campus • Hyderabad
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed sm:leading-6 text-royal-cream/65 font-sans max-w-sm">
              A premier Montfortian institution dedicated to Truth, Virtue, and Academic Excellence since {instData.established}. Shaping leaders through discipline and dedicated pedagogy.
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={instData.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 text-royal-cream hover:bg-heritage-gold hover:border-heritage-gold hover:text-deep-navy hover:scale-110 transition-all duration-300 shadow-xs"
                aria-label="LFJC Official Website"
                title="Website"
              >
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/lfjcuppal/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 text-royal-cream hover:bg-heritage-gold hover:border-heritage-gold hover:text-deep-navy hover:scale-110 transition-all duration-300 shadow-xs"
                aria-label="LFJC Official Instagram"
                title="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`mailto:${instData.email}`}
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 text-royal-cream hover:bg-heritage-gold hover:border-heritage-gold hover:text-deep-navy hover:scale-110 transition-all duration-300 shadow-xs"
                aria-label={`Email LFJC at ${instData.email}`}
                title={`Email: ${instData.email}`}
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@lfjcuppal9616"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 text-royal-cream hover:bg-heritage-gold hover:border-heritage-gold hover:text-deep-navy hover:scale-110 transition-all duration-300 shadow-xs"
                aria-label="LFJC Official YouTube Channel"
                title="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-3 sm:mb-5 font-sans">
              Quick Links
            </h4>
            <nav className="grid gap-2 sm:gap-3" aria-label="Quick Links">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
                >
                  <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Institution Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-3 sm:mb-5 font-sans">
              The Montfortian Family
            </h4>
            <nav className="grid gap-2 sm:gap-3" aria-label="Institution Links">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower Junior College (LFJC)
              </Link>
              <a
                href="https://lfshyd.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower School (LFS)
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
              <a
                href="http://www.lfdc.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-royal-cream/70 hover:text-white hover:translate-x-1 transition-all duration-300 font-sans"
              >
                <span className="h-1 w-1 rounded-full bg-heritage-gold/40" />
                Little Flower Degree College (LFDC)
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </nav>
          </div>

          {/* Column 4: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-3 sm:mb-5 font-sans">
              Contact Office
            </h4>
            <address className="grid gap-2.5 sm:gap-4 not-italic text-xs sm:text-sm leading-relaxed sm:leading-6 text-royal-cream/65 font-sans">
              <a
                className="group flex gap-2.5 sm:gap-3 hover:text-white transition-colors"
                href="https://www.google.com/maps/search/?api=1&query=Little%20Flower%20Junior%20College%20Uppal%20Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin
                  className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
                  aria-hidden="true"
                />
                <span className="underline decoration-royal-cream/20 decoration-1 underline-offset-4 group-hover:decoration-heritage-gold transition-all">
                  {instData.addressLine}
                </span>
              </a>
              <a
                className="group flex gap-2.5 sm:gap-3 hover:text-white transition-colors"
                href={`tel:${instData.phone.replace(/\s/g, "")}`}
              >
                <Phone
                  className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
                  aria-hidden="true"
                />
                {instData.phone}
              </a>
              <a
                className="group flex gap-2.5 sm:gap-3 hover:text-white transition-colors"
                href={`mailto:${instData.email}`}
              >
                <Mail
                  className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-heritage-gold-bright group-hover:text-heritage-gold transition-colors"
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-3.5 sm:py-5 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-royal-cream/40 text-center font-sans">
            &copy; {new Date().getFullYear()} {instData.name} — {instData.tagline}
          </p>
          <nav aria-label="Legal and compliance" className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
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
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-royal-cream/45 hover:text-heritage-gold-bright transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-3.5 sm:pb-5 -mt-1 sm:-mt-2">
          <p className="text-[9px] sm:text-[10px] text-royal-cream/30 font-sans text-center md:text-right">
            Zahid Nagar, Opposite Survey of India, Uppal, Hyderabad 500039
          </p>
        </div>
      </div>
    </footer>
  );
}
