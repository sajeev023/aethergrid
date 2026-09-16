"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, User, X, ZoomIn } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { formerPrincipalsData, FormerPrincipal } from "@/lib/site-data";

interface FacultyPrincipalsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-deep-navy/95 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view of ${alt}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-heritage-gold cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative w-full max-w-2xl max-h-[82vh] h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(min-width: 1024px) 80vw, 95vw"
          priority
        />
      </div>
      <p className="mt-3 text-center text-royal-cream font-serif text-base sm:text-lg font-semibold tracking-wide select-none">
        {alt}
      </p>
    </div>
  );
}

function FormerPrincipalCard({
  member,
  index,
  onPhotoClick,
}: {
  member: FormerPrincipal;
  index: number;
  onPhotoClick: (src: string, alt: string) => void;
}) {
  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.04} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden bg-white rounded-xl border border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover transition-all duration-300">
        {/* Profile Image Frame */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-royal-cream/20">
          {member.image ? (
            <button
              type="button"
              onClick={() => onPhotoClick(member.image!, member.name)}
              className="absolute inset-0 w-full h-full text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-heritage-gold group/btn"
              aria-label={`View enlarged portrait of ${member.name}`}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-deep-navy/80 text-white p-2 rounded-full shadow-md">
                  <ZoomIn className="w-4 h-4 text-heritage-gold-bright" />
                </div>
              </div>
            </button>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-3 text-center">
              <div className="w-12 h-12 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-xs mb-2">
                <User className="h-6 w-6 text-heritage-gold-strong/60" />
              </div>
              <p className="text-xs font-bold text-academic-slate font-serif">{member.name}</p>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong/90 mt-1">
                Former Correspondent &amp; Principal
              </span>
            </div>
          )}
        </div>

        {/* Profile Caption Plate — Recreates official LFJC Heritage blue banner with refined typography */}
        <div className="bg-montfortian-blue text-white p-3.5 sm:p-4 text-center flex flex-col justify-center items-center flex-1 border-t border-heritage-gold/30 transition-colors duration-300 group-hover:bg-deep-navy">
          <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-snug group-hover:text-heritage-gold-bright transition-colors">
            {member.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-sans font-semibold text-heritage-gold-bright uppercase tracking-wider mt-1 whitespace-pre-line leading-normal">
            {member.designation}
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

export function FacultyPrincipals({ activeInst = "lfjc" }: FacultyPrincipalsProps) {
  void activeInst;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="former-principals" className="section-texture bg-white py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Official Section Heading Hierarchy */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 mb-8 sm:mb-12">
        <span className="font-sans text-[11px] sm:text-xs font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-2 block">
          LFJC Heritage • Institutional Leadership (1974–Present)
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-academic-slate tracking-tight">
          Former Correspondents &amp; Principals
        </h1>
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
          The verified succession timeline of visionary Correspondents and Principals who guided Little Flower Junior College through each chapter of its 50-year history.
        </p>
        <div className="w-24 h-1 bg-heritage-gold mx-auto mt-4 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* 4 Columns per Row on Desktop (Matching Official col-md-3 Grid Hierarchy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {formerPrincipalsData.map((member, index) => (
            <FormerPrincipalCard
              key={`${member.name}-${index}`}
              member={member}
              index={index}
              onPhotoClick={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>

        {/* Silver Jubilee Archival Award Ceremony Gallery */}
        <Reveal className="mt-12 sm:mt-16 border-t border-stone-texture/40 pt-8 sm:pt-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider block mb-1">
              Archival Evidence (1999 Silver Jubilee)
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
              Principals Honored by Chief Minister N. Chandrababu Naidu
            </h2>
            <p className="text-xs text-academic-slate/75 font-sans mt-2 leading-relaxed">
              Archival photographs from the 25th Anniversary Closing Ceremony (December 11, 1999) documenting the Hon&apos;ble Chief Minister conferring Silver Jubilee honors upon LFJC Principals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                name: "Rev. Bro. Vincent",
                tenure: "Founder Principal (1974–76 & 1982–83)",
                image: "/images/silver-jubilee/silver-jubilee-bro-vincent.jpg",
                desc: "Founder Principal of LFJC who established the college at Abids in 1974 and guided the 1982 move to Uppal.",
              },
              {
                name: "Dr. Emmanuel",
                tenure: "II Principal (1976–1979)",
                image: "/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg",
                desc: "Post-graduate in Chemistry with PhD in Education; known for compassionate student administration.",
              },
              {
                name: "Rev. Bro. Claude",
                tenure: "III Principal (1979–1982)",
                image: "/images/silver-jubilee/silver-jubilee-bro-claude.jpg",
                desc: "Double M.A. & Doctorate in Theology; introduced scientific symposiums and academic discipline.",
              },
              {
                name: "Rev. Bro. John Kallarackal",
                tenure: "IV Principal (1983–1989)",
                image: "/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg",
                desc: "Expanded state rank holders across Mathematics and Biology streams during campus growth.",
              },
              {
                name: "Rev. Bro. Celestine",
                tenure: "V Principal (1989–1994)",
                image: "/images/silver-jubilee/silver-jubilee-bro-celestine.jpg",
                desc: "Introduced extra-curricular competitions, literary meets, and state rank distinctions.",
              },
              {
                name: "Rev. Bro. M.A. George",
                tenure: "VI Principal (1994–2000)",
                image: "/images/silver-jubilee/silver-jubilee-bro-george.jpg",
                desc: "Led the Silver Jubilee celebrations, introduced co-education in 1997, and built the Silver Jubilee Auditorium.",
              },
            ].map((p, idx) => (
              <Reveal key={p.name} delay={idx * 0.05}>
                <div className="border border-stone-texture/60 bg-royal-cream/10 rounded-xl p-4 shadow-2xs hover:shadow-md hover:border-heritage-gold/50 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={() => setLightbox({ src: p.image, alt: `${p.name} (${p.tenure})` })}
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-3 border border-stone-texture/40 text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-heritage-gold block group/img"
                      aria-label={`View enlarged archival photograph of ${p.name}`}
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 90vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                      />
                    </button>
                    <div className="flex items-center gap-1 text-[10px] text-heritage-gold-strong font-bold uppercase tracking-wider mb-1 font-sans">
                      <Award className="h-3.5 w-3.5" />
                      <span>Original Archival Negative • 1999</span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">{p.name}</h3>
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold text-heritage-gold-strong uppercase tracking-wider block mt-0.5">
                      {p.tenure}
                    </span>
                    <p className="text-xs text-academic-slate/75 font-sans mt-1.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-texture/40 flex items-center justify-between text-[10px] text-academic-slate/60 font-sans">
                    <span>Restored Archival Negative</span>
                    <span className="font-semibold text-montfortian-blue">Dec 11, 1999</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Navigation back links */}
        <div className="mt-10 sm:mt-12 text-center flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-sans">
          <Link
            href="/faculty"
            className="font-bold text-montfortian-blue hover:text-montfortian-blue-light transition-colors"
          >
            ← Return to Faculty Directory
          </Link>
          <span className="text-stone-texture">•</span>
          <Link
            href="/about"
            className="font-bold text-montfortian-blue hover:text-montfortian-blue-light transition-colors"
          >
            About LFJC &amp; Montfortian History →
          </Link>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
