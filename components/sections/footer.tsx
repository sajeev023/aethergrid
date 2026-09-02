"use client";

import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getInstitutionData, PORTAL_LINKS } from "@/lib/site-data";

interface FooterProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Footer({ activeInst = "lfjc" }: FooterProps) {
  const instData = getInstitutionData(activeInst);

  return (
    <footer className="bg-deep-navy text-royal-cream border-t border-heritage-gold/20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-12 items-start">
          {/* Brand & Society */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border border-heritage-gold/30 overflow-hidden bg-white p-1 shrink-0">
                <Image
                  src="/images/lfjc-logo.jpg"
                  alt="LFJC Official Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold italic text-heritage-gold-bright leading-tight">
                  {instData.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-royal-cream/60 font-sans mt-0.5">
                  Knowledge is Truth • Est. {instData.established}
                </span>
              </div>
            </Link>
            <p className="text-xs text-royal-cream/65 leading-relaxed font-sans">
              Administered by the Brothers of St. Gabriel Educational Society. Affiliated to the Board of Intermediate Education, Telangana (BIE Telangana).
            </p>
          </div>

          {/* Quick Portal Navigation */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-bright">
              Official Portals & Links
            </p>
            <ul className="space-y-1.5 text-royal-cream/70 font-sans">
              <li>
                <a
                  href={PORTAL_LINKS.studentSignup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Student Admission Signup</span>
                  <ExternalLink className="w-3 h-3 text-heritage-gold" />
                </a>
              </li>
              <li>
                <a
                  href={PORTAL_LINKS.parentStudentLogin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Parent & Student ERP Login</span>
                  <ExternalLink className="w-3 h-3 text-heritage-gold" />
                </a>
              </li>
              <li>
                <a
                  href={PORTAL_LINKS.alumniRegistrationGoogleForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Golden Jubilee Alumni Form</span>
                  <ExternalLink className="w-3 h-3 text-heritage-gold" />
                </a>
              </li>
              <li>
                <a
                  href="/docs/academic-calendar-2024-25.pdf"
                  download
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Academic Calendar 2024–25 (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-bright mb-2">
              Campus Contact & Location
            </p>
            <address className="grid gap-2 not-italic text-xs leading-relaxed text-royal-cream/70 font-sans">
              <a
                href={`https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad`}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 hover:text-white transition-colors"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                <span>{instData.addressLine}</span>
              </a>
              <a
                href={`tel:${instData.phone.replace(/\s/g, "")}`}
                className="flex gap-2 hover:text-white transition-colors"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                <span>Office: {instData.phone} • Alumni: {instData.alumniPhone}</span>
              </a>
              <a
                href={`mailto:${instData.email}`}
                className="flex gap-2 hover:text-white transition-colors"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                <span>{instData.email} • {instData.secondaryEmail}</span>
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-royal-cream/40 font-sans">
            © {new Date().getFullYear()} {instData.name}, Uppal, Hyderabad. All Rights Reserved.
          </p>
          <nav aria-label="Legal & Policies" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { label: "Anti-Ragging Policy", href: "/legal/anti-ragging" },
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Terms & Conditions", href: "/legal/terms" },
              { label: "Mandatory Disclosures", href: "/legal/disclosures" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-wider text-royal-cream/45 hover:text-heritage-gold-bright transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}