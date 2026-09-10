"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  LayoutGrid,
  List,
  Search,
  User,
  X,
  ZoomIn,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  getInstitutionData,
  retiredStaffRoster,
  type RetiredStaffMember,
} from "@/lib/site-data";

interface FacultyRetiredProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

function Lightbox({
  member,
  onClose,
}: {
  member: RetiredStaffMember;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!member.image) return null;

  const tenureYears =
    Number.parseInt(member.dor, 10) - Number.parseInt(member.doa, 10);

  return (
    <div
      className="fixed inset-0 z-50 bg-deep-navy/95 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged portrait of ${member.name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 text-white hover:text-heritage-gold transition-colors rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-heritage-gold"
        aria-label="Close portrait view"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative w-full max-w-xl max-h-[75vh] h-[70vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(min-width: 1024px) 70vw, 95vw"
          priority
        />
      </div>

      <div
        className="mt-4 text-center max-w-lg px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-block text-[11px] font-bold font-sans uppercase tracking-[0.2em] text-heritage-gold mb-1">
          S.No. {String(member.sno).padStart(2, "0")} • {member.department}
        </span>
        <h2 className="text-white font-serif text-lg sm:text-xl font-bold tracking-wide">
          {member.name}
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-royal-cream/80 font-sans">
          <span>DOA: {member.doa}</span>
          <span className="text-heritage-gold/50">•</span>
          <span>DOR: {member.dor}</span>
          <span className="text-heritage-gold/50">•</span>
          <span className="text-heritage-gold-bright font-medium">
            {tenureYears > 0 ? `${tenureYears} Years Service` : "Emeritus"}
          </span>
        </div>
      </div>
    </div>
  );
}

function RetiredStaffCard({
  member,
  onPhotoClick,
}: {
  member: RetiredStaffMember;
  onPhotoClick: (member: RetiredStaffMember) => void;
}) {
  const isDeceased = member.name.includes("(LATE)");
  const cleanInitials = member.name
    .replace(/\(LATE\)/g, "")
    .replace(/^(DR\.|MR\.|MS\.|CH\.)\s+/i, "")
    .trim();
  const nameParts = cleanInitials.split(/\s+/).filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : cleanInitials.slice(0, 2).toUpperCase();

  const tenureYears =
    Number.parseInt(member.dor, 10) - Number.parseInt(member.doa, 10);

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden bg-white rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/70 shadow-xs hover:shadow-panel-hover transition-all duration-300">
        {/* S.No Badge (Prominent Order Lock) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-deep-navy/90 backdrop-blur-xs text-white border border-heritage-gold/40 px-2.5 py-1 rounded-sm shadow-xs">
          <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-heritage-gold">
            S.No.
          </span>
          <span className="font-mono text-xs font-bold text-white">
            {String(member.sno).padStart(2, "0")}
          </span>
        </div>

        {/* Photo or Dignified Monogram Avatar */}
        <div className="relative aspect-[5/6] w-full overflow-hidden bg-royal-cream/40 border-b border-stone-texture/40">
          {member.image ? (
            <button
              type="button"
              onClick={() => onPhotoClick(member)}
              className="relative w-full h-full text-left cursor-zoom-in group/img focus:outline-none focus:ring-2 focus:ring-inset focus:ring-heritage-gold block p-3"
              aria-label={`View enlarged portrait of ${member.name} (S.No. ${member.sno})`}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-deep-navy/80 text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                <ZoomIn className="h-3.5 w-3.5 text-heritage-gold" />
              </div>
            </button>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-royal-cream/70 text-academic-slate p-4 relative text-center">
              <div className="absolute inset-0 opacity-[0.03] stone-pattern pointer-events-none" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-heritage-gold/40 flex items-center justify-center bg-white shadow-xs mb-2 group-hover:border-heritage-gold transition-colors">
                <span className="font-serif text-lg sm:text-xl font-bold text-montfortian-blue leading-none">
                  {initials}
                </span>
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-heritage-gold-strong">
                Archive Record
              </span>
              <p className="text-[11px] text-academic-slate/60 font-sans mt-0.5">
                Portrait in College Annals
              </p>
            </div>
          )}
        </div>

        {/* Card Information Body */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white">
          <div>
            {/* Department Tag & Status */}
            <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
              <span className="inline-block text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-montfortian-blue bg-montfortian-blue/10 px-2 py-0.5 rounded-xs">
                {member.department}
              </span>
              {isDeceased && (
                <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider text-academic-slate/70 bg-stone-texture/40 px-1.5 py-0.5 rounded-xs">
                  Late
                </span>
              )}
            </div>

            {/* Staff Name */}
            <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors leading-snug">
              {member.name}
            </h3>
          </div>

          {/* Tenure & Chronology Bar */}
          <div className="mt-3 pt-2.5 border-t border-stone-texture/40">
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <div className="bg-royal-cream/40 rounded-xs p-1.5 border border-stone-texture/30">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-academic-slate/60">
                  Appointment
                </span>
                <span className="font-semibold text-academic-slate text-xs sm:text-[13px]">
                  DOA {member.doa}
                </span>
              </div>
              <div className="bg-royal-cream/40 rounded-xs p-1.5 border border-stone-texture/30">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-academic-slate/60">
                  Retirement
                </span>
                <span className="font-semibold text-academic-slate text-xs sm:text-[13px]">
                  DOR {member.dor}
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-academic-slate/70 font-sans">
              <span className="flex items-center gap-1 text-heritage-gold-strong font-medium">
                <Clock className="h-3 w-3" />
                {tenureYears > 0 ? `${tenureYears} Years of Service` : "Emeritus"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-academic-slate/50">
                {member.doa}–{member.dor}
              </span>
            </div>
          </div>
        </div>
      </Card>
  );
}

function RetiredStaffTable({
  staffList,
  onPhotoClick,
}: {
  staffList: RetiredStaffMember[];
  onPhotoClick: (member: RetiredStaffMember) => void;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border-2 border-stone-texture/70 bg-white shadow-xs">
      <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
        <thead>
          <tr className="bg-deep-navy text-white text-[11px] uppercase tracking-wider">
            <th className="py-3 px-3 sm:px-4 font-bold w-16 text-center text-heritage-gold">
              S.No.
            </th>
            <th className="py-3 px-3 sm:px-4 font-bold">Staff Member</th>
            <th className="py-3 px-3 sm:px-4 font-bold">Department / Area</th>
            <th className="py-3 px-3 sm:px-4 font-bold text-center">DOA</th>
            <th className="py-3 px-3 sm:px-4 font-bold text-center">DOR</th>
            <th className="py-3 px-3 sm:px-4 font-bold text-center">Service Tenure</th>
            <th className="py-3 px-3 sm:px-4 font-bold text-center">Portrait</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-texture/40">
          {staffList.map((member) => {
            const tenureYears =
              Number.parseInt(member.dor, 10) - Number.parseInt(member.doa, 10);
            return (
              <tr
                key={`row-${member.sno}`}
                className="hover:bg-royal-cream/30 transition-colors"
              >
                <td className="py-3 px-3 sm:px-4 text-center font-mono font-bold text-academic-slate bg-royal-cream/20">
                  {String(member.sno).padStart(2, "0")}
                </td>
                <td className="py-3 px-3 sm:px-4 font-serif font-bold text-academic-slate">
                  {member.name}
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-wider text-montfortian-blue bg-montfortian-blue/10 px-2 py-0.5 rounded-xs">
                    {member.department}
                  </span>
                </td>
                <td className="py-3 px-3 sm:px-4 text-center font-semibold text-academic-slate">
                  {member.doa}
                </td>
                <td className="py-3 px-3 sm:px-4 text-center font-semibold text-academic-slate">
                  {member.dor}
                </td>
                <td className="py-3 px-3 sm:px-4 text-center font-medium text-heritage-gold-strong">
                  {tenureYears > 0 ? `${tenureYears} Years` : "—"}
                </td>
                <td className="py-3 px-3 sm:px-4 text-center">
                  {member.image ? (
                    <button
                      type="button"
                      onClick={() => onPhotoClick(member)}
                      className="inline-flex items-center gap-1 text-xs text-montfortian-blue hover:text-heritage-gold font-bold transition-colors cursor-pointer"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-academic-slate/40 italic">
                      Annals
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function FacultyRetired({ activeInst = "lfjc" }: FacultyRetiredProps) {
  const instData = getInstitutionData(activeInst);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxMember, setLightboxMember] = useState<RetiredStaffMember | null>(
    null
  );

  // STRICT ORDER LOCK: Always strictly sorted by order / sno (1 to 39)
  const allRetiredStaff = useMemo(() => {
    const list = (instData.retiredStaff ?? retiredStaffRoster) as RetiredStaffMember[];
    return list.slice().sort((a, b) => (a.order ?? a.sno) - (b.order ?? b.sno));
  }, [instData.retiredStaff]);

  // Optional search filter preserving strict relative sequence
  const displayStaff = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allRetiredStaff;
    return allRetiredStaff.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.doa.includes(q) ||
        m.dor.includes(q) ||
        String(m.sno).includes(q)
    );
  }, [allRetiredStaff, searchQuery]);

  return (
    <section
      id="retired-faculty"
      className="bg-white py-6 sm:py-10 md:py-14 overflow-hidden"
    >
      {/* Page Header */}
      <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8 mb-6 sm:mb-10">
        <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-2 block">
          Emeritus Staff • 50-Year Heritage (1974–2024)
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Retired Staff
        </h1>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          Honoring the 39 dedicated educators and staff members whose careers built the academic standing and heritage of Little Flower Junior College across five decades. All records and restored portraits are preserved in our institutional archives in strict chronological order.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Controls Bar: Search & View Switcher */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-royal-cream/25 border border-stone-texture/60 p-2.5 sm:p-3 rounded-lg">
          {/* Search Filter */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-academic-slate/40" />
            <input
              type="text"
              placeholder="Search by name, dept, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-stone-texture/60 rounded-md focus:outline-none focus:ring-2 focus:ring-heritage-gold text-academic-slate"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-academic-slate/40 hover:text-academic-slate"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Roster Counter & View Mode Toggle */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <span className="text-xs font-sans text-academic-slate/70">
              Showing{" "}
              <strong className="text-academic-slate font-mono">
                {displayStaff.length}
              </strong>{" "}
              of 39 Staff
            </span>

            <div className="inline-flex rounded-md border border-stone-texture/60 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                  viewMode === "cards"
                    ? "bg-deep-navy text-white shadow-xs"
                    : "text-academic-slate/70 hover:text-academic-slate"
                }`}
                aria-label="Cards view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                  viewMode === "table"
                    ? "bg-deep-navy text-white shadow-xs"
                    : "text-academic-slate/70 hover:text-academic-slate"
                }`}
                aria-label="Register table view"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Register</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Rendering: Card Grid or Register Table */}
        {displayStaff.length > 0 ? (
          viewMode === "cards" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {displayStaff.map((member) => (
                <RetiredStaffCard
                  key={`card-${member.sno}`}
                  member={member}
                  onPhotoClick={(m) => setLightboxMember(m)}
                />
              ))}
            </div>
          ) : (
            <RetiredStaffTable
              staffList={displayStaff}
              onPhotoClick={(m) => setLightboxMember(m)}
            />
          )
        ) : (
          <div className="text-center py-12 text-academic-slate/60 font-sans bg-royal-cream/20 rounded-lg border border-stone-texture/40">
            <User className="h-8 w-8 mx-auto mb-2 opacity-40 text-academic-slate" />
            <p className="text-sm font-semibold">No retired staff member matches your query.</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 inline-block text-xs font-bold text-montfortian-blue underline"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Tribute Note */}
        <div className="mt-8 sm:mt-12 border-t border-stone-texture/40 pt-6 sm:pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="gold-rule gold-rule-center" />
            <p className="font-editorial text-sm sm:text-base leading-relaxed text-academic-slate/80 italic mt-3 sm:mt-4">
              &ldquo;We owe our past and our present to the teachers and staff who gave their best years to this institution. Their legacy lives in every student they taught, every life they touched.&rdquo;
            </p>
            <p className="mt-2.5 sm:mt-3 text-xs font-sans text-academic-slate/60 uppercase tracking-widest font-semibold">
              Little Flower Junior College • Est. 1974 • Uppal, Hyderabad
            </p>
          </div>
        </div>

        {/* Sub-Navigation Links */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            href="/faculty/principals"
            className="inline-flex items-center gap-2 border border-stone-texture bg-white px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            <Award className="h-3.5 w-3.5" />
            Former Principals
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/faculty/teaching"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            <Calendar className="h-3.5 w-3.5" />
            Teaching &amp; Support Staff
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxMember && (
        <Lightbox
          member={lightboxMember}
          onClose={() => setLightboxMember(null)}
        />
      )}
    </section>
  );
}
