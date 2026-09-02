"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getInstitutionData } from "@/lib/site-data";

interface FooterProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Footer({ activeInst = "lfjc" }: FooterProps) {
  const instData = getInstitutionData(activeInst);

  return (
    <footer className="bg-deep-navy text-royal-cream border-t border-heritage-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full border border-heritage-gold/30 overflow-hidden bg-white p-0.5 sm:p-1">
                <Image
                  src="/images/lfjc-logo.jpg"
                  alt="LFJC logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold italic text-heritage-gold-bright">{instData.shortName}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-royal-cream/55 font-sans">Uppal, Hyderabad</span>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-6">
            <address className="grid gap-2 not-italic text-xs leading-relaxed text-royal-cream/65 font-sans">
              <a href={`https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad`} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-white transition-colors">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                {instData.addressLine}
              </a>
              <a href={`tel:${instData.phone.replace(/\s/g, "")}`} className="flex gap-2 hover:text-white transition-colors">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                {instData.phone}
              </a>
              <a href={`mailto:${instData.email}`} className="flex gap-2 hover:text-white transition-colors">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-bright" />
                {instData.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-royal-cream/40 font-sans">
            © {new Date().getFullYear()} {instData.name}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { label: "Anti-Ragging", href: "/legal/anti-ragging" },
              { label: "Privacy", href: "/legal/privacy" },
              { label: "Terms", href: "/legal/terms" },
              { label: "Disclosures", href: "/legal/disclosures" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[10px] font-bold uppercase tracking-wider text-royal-cream/45 hover:text-heritage-gold-bright transition-colors font-sans">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}