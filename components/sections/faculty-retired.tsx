import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

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
};

function getFacultyCategory(member: FacultySeedMember): FacultyCategory {
  return member.category ?? "present";
}

function RetiredFacultyCard({ member, index }: { member: FacultySeedMember; index: number }) {
  const cleanName = member.name.replace(/^(Bro\.|Ms\.|Mr\.|Dr\.)\s+/i, "");
  const nameParts = cleanName.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.02} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden bg-white transition-all duration-300 ease-out rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover">
        <div className="relative aspect-[600/720] w-full overflow-hidden bg-royal-cream/30 border-b border-stone-texture/40">
          {member.image ? (
            <>
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-2 left-2 z-10">
                <span className="inline-flex items-center gap-1 bg-deep-navy/85 backdrop-blur-xs text-heritage-gold-bright border border-heritage-gold/30 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider shadow-sm">
                  Restored Archival Portrait
                </span>
              </div>
            </>
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
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong block">
              Faculty Emeritus
            </span>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors mt-0.5 line-clamp-2">
              {member.name}
            </h3>
          </div>
          <div className="mt-2 pt-1.5 border-t border-stone-texture/30 flex items-center justify-between text-[9px] text-academic-slate/60 font-sans">
            <span>LFJC Heritage Archive</span>
            <span className="text-montfortian-blue font-semibold">Verified</span>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function FacultyRetired({ activeInst = "lfjc" }: FacultyRetiredProps) {
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultySeedMember[];
  const retiredStaff = allStaff.filter((m) => getFacultyCategory(m) === "retired");

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {retiredStaff.map((member, index) => (
              <RetiredFacultyCard key={`${member.name}-${index}`} member={member} index={index} />
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
    </section>
  );
}
