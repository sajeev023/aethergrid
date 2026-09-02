"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShieldCheck, User, X } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  getInstitutionData,
  formerPrincipalsData,
  retiredFacultyData,
  FormerPrincipal,
  RetiredFacultyMember,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface FacultyProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

type FacultyMember = {
  name: string;
  designation: string;
  subject?: string;
  department: string;
  image?: string;
};

const departmentOrder = [
  "Mathematics Department",
  "Physics Department",
  "Chemistry Department",
  "Biology Department",
  "Humanities Department",
  "Department of English",
  "Languages Department",
  "Computer & Library Department",
  "Physical Education & Sports",
  "Office Administration",
  "Support Staff",
];

function FacultyMemberCard({ member, index }: { member: FacultyMember; index: number }) {
  const cleanName = member.name.replace(/^(Bro\.|Ms\.|Mr\.|Dr\.)\s+/i, "");
  const nameParts = cleanName.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : cleanName.slice(0, 2).toUpperCase();

  const isHOD = member.designation?.toLowerCase().includes("hod");

  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.02} className="h-full">
      <Card
        className={cn(
          "group h-full flex flex-col overflow-hidden bg-white transition-all duration-[400ms] ease-[0.16,1,0.3,1] rounded-lg border-2",
          isHOD
            ? "border-heritage-gold shadow-[0_12px_40px_rgba(194,155,83,0.16)] hover:shadow-[0_20px_50px_rgba(194,155,83,0.28)]"
            : "border-stone-texture/70 hover:border-heritage-gold/55 hover:shadow-[0_15px_30px_rgba(15,76,129,0.08)]"
        )}
      >
        <div className="relative aspect-[5/6] w-full overflow-hidden bg-royal-cream/50 border-b border-stone-texture/40">
          {isHOD && (
            <div className="absolute top-1.5 sm:top-2 left-0 z-10 bg-heritage-gold-strong text-white font-sans text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider pl-2.5 sm:pl-3 pr-2 sm:pr-2.5 py-0.5 sm:py-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-y border-r border-heritage-gold/30 rounded-r-sm flex items-center gap-1">
              <span>Head of Dept</span>
            </div>
          )}
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 640px) 40vw, 50vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-2 sm:p-3 relative">
              <div className="absolute inset-0 opacity-[0.03] stone-pattern pointer-events-none" />
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-xs mb-1 group-hover:border-heritage-gold/80 transition-colors duration-300">
                <span className="font-serif text-sm sm:text-base font-bold text-montfortian-blue leading-none">{initials}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong/90">
                Mentor
              </span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
          <div className="space-y-0.5 sm:space-y-1">
            {member.designation && (
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans line-clamp-1">
                {member.designation}
              </p>
            )}
            <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold leading-snug text-ink group-hover:text-montfortian-blue transition-colors duration-300 line-clamp-2">
              {member.name}
            </h3>
            {member.subject && (
              <p className="text-[11px] sm:text-xs text-academic-slate/75 font-sans line-clamp-1">
                {member.subject}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

function FormerPrincipalCard({ member, index }: { member: FormerPrincipal; index: number }) {
  return (
    <Reveal key={`${member.name}-${index}`} delay={index * 0.03} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden bg-white transition-all duration-300 ease-out rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/60 shadow-xs hover:shadow-panel-hover">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-royal-cream/30 border-b border-stone-texture/40">
          {member.image ? (
            <>
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
        <CardContent className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 bg-white">
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold text-heritage-gold-strong uppercase tracking-wider block">
              {member.tenure}
            </span>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors mt-0.5 line-clamp-2">
              {member.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-sans text-academic-slate/70 mt-0.5 line-clamp-1">
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

function RetiredFacultyCard({ member, index }: { member: RetiredFacultyMember; index: number }) {
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
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-heritage-gold-strong block">
                Faculty Emeritus
              </span>
              {member.tenure && (
                <span className="text-[10px] font-sans text-academic-slate/60">
                  {member.tenure}
                </span>
              )}
            </div>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors mt-0.5 line-clamp-2">
              {member.name}
            </h3>
            <p className="text-[11px] text-academic-slate/70 font-sans line-clamp-1 mt-0.5">
              {member.department}
            </p>
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

export function Faculty({ activeInst = "lfjc" }: FacultyProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const instData = getInstitutionData(activeInst);
  const principal = instData.faculty[0];
  const allStaff = instData.faculty.slice(1) as FacultyMember[];

  // 11 Visionary Former Principals (excluding current active principal)
  const formerPrincipals = formerPrincipalsData.filter(
    (p) => !p.tenure.toLowerCase().includes("present")
  );

  const filteredStaff = searchQuery.trim()
    ? allStaff.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.designation && m.designation.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allStaff;

  return (
    <div id="faculty" className="bg-white">
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-10 sm:py-14 border-b border-heritage-gold/20">
        <div className="mx-auto max-w-4xl text-center px-4">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Academic &amp; Administrative Faculty
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Faculty &amp; Staff Directory
            </h1>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Dedicated educators, subject masters, and administrative personnel committed to student character, academic distinction, and 50 years of Montfortian excellence.
            </p>
            <span className="gold-rule gold-rule-center !mt-4" />
          </Reveal>
        </div>
      </Section>

      {/* ─── 1. LEADERSHIP / PRINCIPAL ────────────────────────────────── */}
      <Section id="leadership" variant="default" className="bg-white py-8 sm:py-12 border-b border-stone-texture/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-6 bg-heritage-gold-strong rounded-full" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
              College Leadership
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-center bg-royal-cream/20 rounded-2xl border border-stone-texture/60 p-5 sm:p-8 shadow-xs">
            <Reveal className="lg:col-span-4 text-center lg:text-left">
              <div className="relative mx-auto max-w-[220px] sm:max-w-[260px] lg:mx-0">
                <div className="relative border border-stone-texture bg-white p-2 shadow-elevation rounded-lg">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-royal-cream/30">
                    <Image
                      src={principal.image || "/images/principals/bro_arun_prakash.jpg"}
                      alt={principal.name}
                      fill
                      sizes="(min-width: 1024px) 260px, 70vw"
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 border border-heritage-gold/30 m-1.5 rounded-sm pointer-events-none" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block">
                {principal.designation}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate">
                {principal.name}
              </h3>
              <p className="text-xs font-semibold text-montfortian-blue font-sans">
                Brothers of St. Gabriel Educational Society • Tenured 2023–Present
              </p>
              <blockquote className="border-l-2 border-heritage-gold pl-3 font-editorial italic text-sm sm:text-base text-academic-slate/85 leading-relaxed">
                &ldquo;At Little Flower Junior College, our Montfortian pedagogy ensures that our students are not just intellectually equipped to secure top ranks, but are also morally fortified to become compassionate leaders and responsible global citizens.&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-academic-slate/75 font-sans leading-relaxed">
                Guiding Little Flower Junior College in its historic Golden Jubilee milestone, fostering an educational ecosystem where academic discipline, competitive entrance mastery (IIT-JEE, NEET, CA-CPT), and compassionate mentorship empower each student for collegiate and professional leadership.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 2. ACTIVE DEPARTMENTS & SEARCH ───────────────────────────── */}
      <Section id="departments" variant="default" className="bg-royal-cream/15 py-8 sm:py-12 border-b border-stone-texture/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-heritage-gold-strong rounded-full" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
                  Academic &amp; Support Departments
                </h2>
                <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-0.5">
                  Official roster of 56 teaching faculty, department heads, and operational staff.
                </p>
              </div>
            </div>

            {/* Interactive Search Filter */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-academic-slate/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name, dept, subject..."
                className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm rounded-full border border-stone-texture bg-white text-academic-slate placeholder:text-academic-slate/50 focus:border-heritage-gold focus:outline-none focus:ring-2 focus:ring-heritage-gold/20 transition-all font-sans min-h-[40px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-academic-slate/40 hover:text-academic-slate transition-colors p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {searchQuery && (
            <p className="mb-6 text-xs text-academic-slate/70 font-sans">
              Showing results for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; ({filteredStaff.length} found)
            </p>
          )}

          <div className="space-y-8 sm:space-y-10">
            {departmentOrder.map((deptName) => {
              const deptStaff = filteredStaff.filter((m) => m.department === deptName);
              if (deptStaff.length === 0) return null;
              return (
                <div key={deptName} className="pt-6 first:pt-0 border-t border-stone-texture/20 first:border-t-0">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-4 bg-heritage-gold rounded-full" />
                      <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-montfortian-blue">
                        {deptName}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold bg-white border border-stone-texture/50 px-2.5 py-0.5 rounded-full text-academic-slate/70 font-sans">
                      {deptStaff.length} {deptStaff.length === 1 ? "Member" : "Members"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4">
                    {deptStaff.map((member, index) => (
                      <FacultyMemberCard key={`${member.name}-${index}`} member={member} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No search results fallback */}
          {filteredStaff.length === 0 && (
            <div className="text-center py-10 sm:py-16 text-academic-slate/70 font-sans bg-white rounded-xl border border-stone-texture/40">
              <p className="text-xs sm:text-sm font-semibold">No faculty members found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-montfortian-blue underline font-bold"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* ─── 3. FORMER PRINCIPALS GALLERY ─────────────────────────────── */}
      <Section id="principals" variant="default" className="bg-white py-8 sm:py-12 border-b border-stone-texture/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8">
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 block">
              Institutional Leadership • 1974–Present
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
              Former Principals
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
              The verified succession timeline of visionary principals who guided Little Flower Junior College through each chapter of its 50-year history. Restored from official institutional archives and Silver Jubilee records.
            </p>
            <span className="gold-rule gold-rule-center !mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {formerPrincipals.map((principal, idx) => (
              <FormerPrincipalCard key={`${principal.name}-${idx}`} member={principal} index={idx} />
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 4. RETIRED FACULTY ARCHIVE ───────────────────────────────── */}
      <Section id="retired" variant="default" className="bg-royal-cream/20 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8">
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 block">
              Emeritus Educators • 50-Year Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
              Retired Faculty
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
              Honoring the 27 dedicated educators whose teaching careers built the academic standing and moral legacy of Little Flower Junior College. All portraits have been preserved and restored from our institutional archives.
            </p>
            <span className="gold-rule gold-rule-center !mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {retiredFacultyData.map((member, index) => (
              <RetiredFacultyCard key={`${member.name}-${index}`} member={member} index={index} />
            ))}
          </div>

          {/* Heritage Tribute Note */}
          <Reveal className="mt-8 sm:mt-12 border-t border-stone-texture/30 pt-6 sm:pt-8">
            <div className="max-w-2xl mx-auto text-center">
              <span className="gold-rule gold-rule-center" />
              <p className="font-editorial text-sm sm:text-base leading-relaxed text-academic-slate/75 italic mt-3 sm:mt-4">
                &ldquo;We owe our past and our present to the teachers who gave their best years to this institution. Their legacy lives in every student they taught, every life they touched.&rdquo;
              </p>
              <p className="mt-2 text-xs font-sans text-academic-slate/50 uppercase tracking-widest">
                Little Flower Junior College • Est. 1974
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
