"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Search, ShieldCheck, X } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface FacultyTeachingProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  isPreview?: boolean;
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

const departmentOrder = [
  "Mathematics Department",
  "Physics Department",
  "Chemistry Department",
  "Biology Department",
  "Humanities Department",
  "Commerce Department",
  "Languages Department",
  "Computer Science Department",
  "Other Departments",
  "Office Administration",
  "Support Staff",
];

function FacultyMemberCard({ member, index }: { member: FacultySeedMember; index: number }) {
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
            <div className="absolute top-2 left-0 z-10 bg-heritage-gold-strong text-white font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] pl-3 pr-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-y border-r border-heritage-gold/30 rounded-r-sm flex items-center gap-1.5">
              <span>Head of Department</span>
            </div>
          )}
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream text-academic-slate p-3 relative">
              <div className="absolute inset-0 opacity-[0.03] stone-pattern pointer-events-none" />
              <div className="w-9 h-9 rounded-full border border-heritage-gold/30 flex items-center justify-center bg-white shadow-sm mb-1.5 group-hover:border-heritage-gold/80 transition-colors duration-300">
                <span className="font-serif text-base font-bold text-montfortian-blue leading-none">{initials}</span>
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-heritage-gold-strong/80">
                Faculty Mentor
              </span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 flex flex-col justify-between p-3 bg-white">
          <div className="space-y-1">
            {member.designation && (
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-heritage-gold-strong font-sans">
                {member.designation}
              </p>
            )}
            <h3 className="font-serif text-sm md:text-base font-bold leading-snug text-ink group-hover:text-montfortian-blue transition-colors duration-300">
              {member.name}
            </h3>
            {member.subject && (
              <p className="text-[11px] text-academic-slate/65 font-sans">
                {member.subject}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

export function FacultyTeaching({ activeInst = "lfjc", isPreview = false }: FacultyTeachingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const instData = getInstitutionData(activeInst);
  const allStaff = instData.faculty.slice(1) as FacultySeedMember[];
  const presentStaff = allStaff.filter((m) => getFacultyCategory(m) === "present");

  const filteredStaff = searchQuery.trim()
    ? presentStaff.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.designation && m.designation.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : presentStaff;

  return (
    <section id="teaching-faculty" className={cn("bg-white overflow-hidden", !isPreview && "py-8 md:py-12")}>
      {!isPreview && (
        <div className="mx-auto max-w-3xl text-center px-5 md:px-8 mb-6">
          <span className="font-sans text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-2 block">
            Academic Staff
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
            Teaching Faculty
          </h1>
          <p className="mt-3 text-sm leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            Our academic departments are led by board-certified educators, HODs, and subject specialists committed to student excellence in every stream.
          </p>
          <span className="gold-rule gold-rule-center" />
        </div>
      )}

      {/* Search Input Filter for Full Faculty View */}
      {!isPreview && (
        <div className="mx-auto max-w-xl px-5 md:px-8 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-academic-slate/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, department, or subject..."
              className="w-full pl-10 pr-10 py-2.5 text-xs rounded-full border border-stone-texture bg-royal-cream/20 text-academic-slate placeholder:text-academic-slate/50 focus:bg-white focus:border-heritage-gold focus:outline-none focus:ring-2 focus:ring-heritage-gold/20 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-academic-slate/40 hover:text-academic-slate transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-center text-[11px] text-academic-slate/70 font-sans">
              Showing results for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; ({filteredStaff.length} found)
            </p>
          )}
        </div>
      )}

      <div className={cn("mx-auto max-w-7xl", !isPreview && "px-5 md:px-8")}>
        <div id="departments" className="space-y-8">
          {departmentOrder.map((deptName) => {
            const deptStaff = filteredStaff.filter((m) => m.department === deptName);
            if (deptStaff.length === 0) return null;

            // In preview mode, only show first 2 departments
            if (isPreview) {
              const deptIndex = departmentOrder.indexOf(deptName);
              if (deptIndex >= 2) return null;
            }

            return (
              <div key={deptName} className="pt-6 first:pt-0 border-t border-stone-texture/20 first:border-t-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-6 bg-heritage-gold-strong rounded-full" />
                  <h2 className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-academic-slate">
                    {deptName}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {deptStaff.map((member, index) => (
                    <FacultyMemberCard key={`${member.name}-${index}`} member={member} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* No search results fallback */}
        {!isPreview && filteredStaff.length === 0 && (
          <div className="text-center py-12 text-academic-slate/70 font-sans">
            <p className="text-sm font-semibold">No faculty members found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-montfortian-blue underline font-bold"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {!isPreview && (
          <>
            {/* Bottom Highlight Row */}
            <Reveal className="mt-8">
              <div className="grid gap-4 border border-white/10 bg-academic-slate p-4 text-white md:grid-cols-3 rounded-lg shadow-lg">
                {[
                  ["Mentoring Model", "Department heads support stream selection, academic discipline, and student confidence.", ShieldCheck],
                  ["Learning Culture", "Faculty guidance is framed around clarity, conduct, and board exam readiness.", BookOpen],
                  ["Parent Connection", "The admissions and college office teams keep families oriented through each milestone.", HeartHandshake],
                ].map(([title, copy, Icon]) => {
                  const CurrentIcon = Icon as React.ComponentType<{ className?: string }>;
                  return (
                    <div key={title as string} className="border-l border-heritage-gold/35 pl-5 py-1">
                      <div className="flex items-center gap-2">
                        <CurrentIcon className="h-4 w-4 text-heritage-gold-bright shrink-0" />
                        <h3 className="font-serif text-base font-bold text-white">{title as string}</h3>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-royal-cream/75 font-sans">{copy as string}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/faculty/retired"
                className="inline-flex items-center gap-2 border border-stone-texture bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans"
              >
                View Retired Faculty
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
              >
                Begin Admissions Inquiry
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
