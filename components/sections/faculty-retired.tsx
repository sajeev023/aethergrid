"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Calendar,
  Search,
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
        className="absolute top-4 right-4 p-2.5 text-white hover:text-heritage-gold transition-colors rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-heritage-gold cursor-pointer"
        aria-label="Close portrait view"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative w-full max-w-xl max-h-[85vh] h-[80vh] flex items-center justify-center"
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
  if (!member.image) return null;

  return (
    <Card className="group relative overflow-hidden bg-white rounded-lg border-2 border-stone-texture/70 hover:border-heritage-gold/80 transition-all duration-300 shadow-xs hover:shadow-panel-hover">
      <button
        type="button"
        onClick={() => onPhotoClick(member)}
        className="relative aspect-[5/6] w-full block overflow-hidden bg-royal-cream/15 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-heritage-gold p-2 sm:p-2.5"
        aria-label={`View enlarged portrait of ${member.name}`}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-deep-navy/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xs">
          <ZoomIn className="h-3.5 w-3.5 text-heritage-gold" />
        </div>
      </button>
    </Card>
  );
}

export function FacultyRetired({ activeInst = "lfjc" }: FacultyRetiredProps) {
  const instData = getInstitutionData(activeInst);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxMember, setLightboxMember] = useState<RetiredStaffMember | null>(
    null
  );

  // STRICT CHRONOLOGICAL ORDER: Display only staff who have a restored photo card
  const staffWithPhotos = useMemo(() => {
    const list = (instData.retiredStaff ?? retiredStaffRoster) as RetiredStaffMember[];
    return list
      .filter((m) => Boolean(m.image))
      .slice()
      .sort((a, b) => (a.order ?? a.sno) - (b.order ?? b.sno));
  }, [instData.retiredStaff]);

  // Optional search filter preserving strict relative sequence
  const displayStaff = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return staffWithPhotos;
    return staffWithPhotos.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.doa.includes(q) ||
        m.dor.includes(q)
    );
  }, [staffWithPhotos, searchQuery]);

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
          Honoring our dedicated educators and staff members whose careers built the academic standing and heritage of Little Flower Junior College across five decades. Restored portraits are preserved in our institutional archives in chronological order.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Controls Bar: Search Filter & Counter */}
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

          {/* Roster Counter */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <span className="text-xs font-sans text-academic-slate/70">
              Showing{" "}
              <strong className="text-academic-slate font-mono">
                {displayStaff.length}
              </strong>{" "}
              Retired Staff Portraits
            </span>
          </div>
        </div>

        {/* Portrait Cards Grid */}
        {displayStaff.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {displayStaff.map((member) => (
              <RetiredStaffCard
                key={`card-${member.order ?? member.sno}`}
                member={member}
                onPhotoClick={(m) => setLightboxMember(m)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-academic-slate/60 font-sans bg-royal-cream/20 rounded-lg border border-stone-texture/40">
            <p className="text-sm font-semibold">No retired staff member matches your query.</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 inline-block text-xs font-bold text-montfortian-blue underline cursor-pointer"
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
