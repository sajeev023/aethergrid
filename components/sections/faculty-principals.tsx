"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, ShieldCheck, User, X } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";

interface FacultyPrincipalsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

type FacultyCategory = "present" | "retired" | "former-principal";
type FacultySeedMember = {
  name: string;
  designation: string;
  subject?: string;
  department: string;
  image?: string;
  category?: FacultyCategory;
};

function getFacultyCategory(member: FacultySeedMember): FacultyCategory {
  return member.category ?? "present";
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
        className="absolute top-4 right-4 p-2 text-white hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-heritage-gold"
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

function FormerPrincipalCard({ member, index, onPhotoClick }: { member: FacultySeedMember; index: number; onPhotoClick: (src: string, alt: string) => void }) {
  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.03} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden bg-white transition-all duration-300 ease-out rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-royal-cream/30 border-b border-stone-texture/40">
          {member.image ? (
            <button
              type="button"
              onClick={() => onPhotoClick(member.image!, member.name)}
              className="absolute inset-0 w-full h-full text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-heritage-gold"
              aria-label={`View enlarged portrait of ${member.name}`}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
            </button>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-2 sm:p-3 relative text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-xs mb-1.5 sm:mb-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-heritage-gold-strong/60" />
              </div>
              <p className="text-xs font-bold text-academic-slate font-serif">{member.name}</p>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong/90 mt-0.5 sm:mt-1">
                Former Principal
              </span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 flex flex-col justify-between p-3 bg-white">
          <div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
              {member.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-sans font-bold text-heritage-gold-strong uppercase tracking-wider mt-0.5 whitespace-pre-line">
              {member.designation}
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-stone-texture/30 flex items-center justify-between text-[9px] text-academic-slate/60 font-sans">
            <span>50-Year Heritage Archive</span>
            <span className="inline-flex items-center gap-0.5 text-montfortian-blue font-semibold">
              <ShieldCheck className="h-3 w-3 text-heritage-gold-strong" /> Verified
            </span>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function FacultyPrincipals({ activeInst = "lfjc" }: FacultyPrincipalsProps) {
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultySeedMember[];
  const formerPrincipals = allStaff.filter((m) => getFacultyCategory(m) === "former-principal");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="former-principals" className="section-texture bg-white py-6 sm:py-8 md:py-12 overflow-hidden">
      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 mb-5 sm:mb-8">
        <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 sm:mb-2 block">
          Institutional Leadership • 1974–Present
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Former Principals
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          The verified succession timeline of visionary principals who guided Little Flower Junior College through each chapter of its 50-year history. Restored from official institutional archives and Silver Jubilee records.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {formerPrincipals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
            {formerPrincipals.map((member, index) => (
              <FormerPrincipalCard key={`${member.name}-${index}`} member={member} index={index} onPhotoClick={(src, alt) => setLightbox({ src, alt })} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-16 text-academic-slate/50 font-sans">
            <User className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 opacity-40" />
            <p className="text-xs sm:text-sm">Former Principals gallery coming soon.</p>
          </div>
        )}

        {/* Silver Jubilee Archival Award Ceremony Gallery */}
        <Reveal className="mt-6 sm:mt-12 border-t border-stone-texture/40 pt-6 sm:pt-10">
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8">
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider block mb-1">
              Archival Evidence (1999 Silver Jubilee)
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
              Principals Honored by Chief Minister N. Chandrababu Naidu
            </h2>
            <p className="text-xs text-academic-slate/75 font-sans mt-1.5 sm:mt-2 leading-relaxed">
              Archival photographs from the 25th Anniversary Closing Ceremony (December 11, 1999) documenting the Hon&apos;ble Chief Minister conferring Silver Jubilee honors upon LFJC Principals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
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
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-2.5 sm:mb-3 border border-stone-texture/40 text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-heritage-gold block group/img"
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

        {/* Back Link */}
        <div className="mt-6 sm:mt-10 text-center">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-montfortian-blue hover:text-montfortian-blue-light transition-colors font-sans"
          >
            ← Return to All Faculty &amp; Academic Staff
          </Link>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
