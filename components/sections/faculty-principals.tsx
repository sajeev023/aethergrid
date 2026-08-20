import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
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

function FormerPrincipalCard({ member, index }: { member: FacultySeedMember; index: number }) {
  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.03} className="h-full">
      <Card className="group h-full overflow-hidden bg-white transition-all duration-300 ease-out rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover">
        <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[1054/1492] w-full overflow-hidden bg-royal-cream/30">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-2 sm:p-3 relative text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-xs mb-1.5 sm:mb-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-heritage-gold-strong/60" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-academic-slate font-serif">{member.name}</p>
              <span className="text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-widest text-heritage-gold-strong/80 mt-0.5 sm:mt-1">
                Image Missing
              </span>
            </div>
          )}
        </div>
      </Card>
    </Reveal>
  );
}

export function FacultyPrincipals({ activeInst = "lfjc" }: FacultyPrincipalsProps) {
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultySeedMember[];
  const formerPrincipals = allStaff.filter((m) => getFacultyCategory(m) === "former-principal");

  return (
    <section id="former-principals" className="section-texture bg-white py-6 sm:py-8 md:py-12 overflow-hidden">
      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 mb-5 sm:mb-8">
        <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block">
          Institutional Leadership
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Former Principals
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          The official portrait gallery of the visionary principals who guided Little Flower Junior College
          through each chapter of its 50-year history. Their leadership is our institutional heritage.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {formerPrincipals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
            {formerPrincipals.map((member, index) => (
              <FormerPrincipalCard key={`${member.name}-${index}`} member={member} index={index} />
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
            <span className="font-sans text-[9px] sm:text-[10px] font-bold text-heritage-gold-strong uppercase tracking-[0.18em] block mb-1">
              Archival Asset (1999 Silver Jubilee)
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
              Principals Honored by Chief Minister N. Chandrababu Naidu
            </h2>
            <p className="text-[11px] sm:text-xs text-academic-slate/75 font-sans mt-1.5 sm:mt-2 leading-relaxed">
              Documentary photographs from the 25th Anniversary Closing Ceremony (December 11, 1999) showing the Hon&apos;ble Chief Minister conferring Silver Jubilee honors upon LFJC Principals.
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
                <div className="border border-stone-texture/60 bg-royal-cream/10 rounded-lg p-3 sm:p-3.5 shadow-2xs hover:shadow-md hover:border-heritage-gold/50 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded mb-2.5 sm:mb-3 border border-stone-texture/40">
                      <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 90vw" className="object-cover" />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-academic-slate">{p.name}</h3>
                    <span className="text-[9px] sm:text-[10px] font-sans font-bold text-heritage-gold-strong uppercase tracking-wider block mt-0.5">
                      {p.tenure}
                    </span>
                    <p className="text-[11px] font-sans text-academic-slate/75 leading-relaxed mt-1.5 sm:mt-2">{p.desc}</p>
                  </div>
                  <div className="mt-2.5 sm:mt-3 pt-2 border-t border-stone-texture/30 text-[8px] sm:text-[9px] font-bold text-montfortian-blue uppercase tracking-widest font-sans">
                    Silver Jubilee Archival Photo • 1999
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Legacy Note */}
        <Reveal className="mt-6 sm:mt-10 border-t border-stone-texture/30 pt-5 sm:pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="gold-rule gold-rule-center" />
            <p className="font-editorial text-sm sm:text-base leading-relaxed text-academic-slate/75 italic mt-3 sm:mt-4">
              &ldquo;The principals of Little Flower Junior College have carried forward the Montfortian mission with unwavering dedication — ensuring that every student who passed through these gates left transformed.&rdquo;
            </p>
            <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] font-sans text-academic-slate/50 uppercase tracking-widest">
              Golden Jubilee 1974–2024
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-5 sm:mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Link
            href="/faculty/teaching"
            className="inline-flex items-center gap-2 border border-stone-texture bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans"
          >
            Teaching &amp; Support Staff
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/faculty/retired"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Retired Faculty
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
