"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, User, X } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";

interface FacultyRetiredProps {
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
  tenure?: string;
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

function RetiredFacultyCard({
  member,
  index,
  onPhotoClick,
}: {
  member: FacultySeedMember;
  index: number;
  onPhotoClick: (src: string, alt: string) => void;
}) {
  const cleanName = member.name.replace(/^(Bro\.|Ms\.|Mr\.|Dr\.)\s+/i, "");
  const nameParts = cleanName.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.02} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden bg-white transition-all duration-300 ease-out rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-royal-cream/50 border-b border-stone-texture/40">
          {member.image ? (
            <button
              type="button"
              onClick={() => onPhotoClick(member.image!, member.name)}
              className="absolute inset-0 w-full h-full text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-heritage-gold block"
              aria-label={`View enlarged portrait of ${member.name}`}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
            </button>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-2 sm:p-3 relative text-center">
              <div className="absolute inset-0 opacity-[0.03] stone-pattern pointer-events-none" />
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-xs mb-1">
                <span className="font-serif text-sm sm:text-base font-bold text-montfortian-blue leading-none">{initials}</span>
              </div>
              <p className="text-xs font-bold text-academic-slate font-serif">{member.name}</p>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong/90 mt-0.5 sm:mt-1">
                Emeritus
              </span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong line-clamp-1">
              {member.designation}
            </p>
            <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold leading-snug text-ink group-hover:text-montfortian-blue transition-colors duration-300 line-clamp-2">
              {member.name}
            </h3>
            {member.tenure && (
              <p className="text-[11px] sm:text-xs text-academic-slate/80 font-sans line-clamp-1">
                {member.tenure}
              </p>
            )}
          </div>
          <p className="mt-2 pt-1.5 border-t border-stone-texture/30 text-[9px] sm:text-[10px] text-academic-slate/60 font-sans line-clamp-1">
            {member.department}
          </p>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function FacultyRetired({ activeInst = "lfjc" }: FacultyRetiredProps) {
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultySeedMember[];
  const retiredStaff = allStaff.filter((m) => getFacultyCategory(m) === "retired");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="retired-faculty" className="bg-white py-6 sm:py-8 md:py-12 overflow-hidden">
      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 mb-5 sm:mb-8">
        <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 sm:mb-2 block">
          Emeritus Educators • 50-Year Heritage
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Retired Faculty
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          Honoring the 27 dedicated educators whose teaching careers built the academic standing of Little Flower Junior College. All portraits have been preserved and restored from our institutional archives.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {retiredStaff.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {retiredStaff.map((member, index) => (
              <RetiredFacultyCard
                key={`${member.name}-${index}`}
                member={member}
                index={index}
                onPhotoClick={(src, alt) => setLightbox({ src, alt })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-16 text-academic-slate/50 font-sans">
            <User className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 opacity-40" />
            <p className="text-xs sm:text-sm">Retired faculty records will be published soon.</p>
          </div>
        )}

        {/* Tribute note */}
        <Reveal className="mt-6 sm:mt-10 border-t border-stone-texture/30 pt-5 sm:pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="gold-rule gold-rule-center" />
            <p className="font-editorial text-sm sm:text-base leading-relaxed text-academic-slate/75 italic mt-3 sm:mt-4">
              &ldquo;We owe our past and our present to the teachers who gave their best years to this institution. Their legacy lives in every student they taught, every life they touched.&rdquo;
            </p>
            <p className="mt-2 sm:mt-3 text-xs font-sans text-academic-slate/50 uppercase tracking-widest">
              Little Flower Junior College • Est. 1974
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-5 sm:mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Link
            href="/faculty/principals"
            className="inline-flex items-center gap-2 border border-stone-texture bg-white px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            Former Principals
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/faculty/teaching"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            Teaching &amp; Support Staff
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  );
}
