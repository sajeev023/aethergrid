"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { firstYearToppers, firstYearSubjectStats } from "@/lib/toppers-data";

export function Toppers() {
  const [activePoster, setActivePoster] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const filteredToppers =
    selectedGroup === "All"
      ? firstYearToppers
      : firstYearToppers.filter((t) => t.group === selectedGroup);

  return (
    <div id="toppers" className="bg-white">
      {/* ─── OFFICIAL RESULTS POSTER SHOWCASE ────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-t border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl text-center mb-8">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Telangana State Board Results
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academic-slate mt-1">
              Intermediate 1st Year Toppers 2024
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/75 max-w-2xl mx-auto mt-2 font-sans">
              Official Little Flower Junior College IPE 1st Year Merit List and Subject-wise Centum achievements.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="relative group rounded-2xl overflow-hidden border-2 border-heritage-gold/40 shadow-float bg-white">
              <button
                type="button"
                onClick={() => setActivePoster("/images/official/top3.jpeg")}
                className="w-full block relative cursor-zoom-in"
                aria-label="View official LFJC 2024 IPE Toppers poster in high resolution"
              >
                <div className="relative aspect-[16/9] w-full bg-deep-navy">
                  <Image
                    src="/images/official/top3.jpeg"
                    alt="Official Little Flower Junior College 2024 IPE 1st Year Toppers Poster"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-deep-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans text-sm font-bold">
                  <ZoomIn className="w-5 h-5" />
                  <span>Click to view Full-Resolution Official Poster</span>
                </div>
              </button>
              <div className="p-3 bg-white border-t border-stone-texture/30 flex items-center justify-between text-xs font-sans text-academic-slate/75">
                <span className="font-semibold text-montfortian-blue">
                  Official Publication: LFJC Intermediate 1st Year Merit List 2024
                </span>
                <span className="text-[11px] bg-royal-cream px-2.5 py-0.5 rounded border border-stone-texture/40 font-bold">
                  BIE Telangana Ground Truth
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── SUBJECT-WISE CENTUM & HIGH-SCORE COUNTS ─────────────────── */}
      <Section variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Academic Centum Record
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Subject-Wise Highest Scores & Student Counts
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
              Number of LFJC students attaining maximum centum and top scores across board subjects:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {firstYearSubjectStats.map((stat, idx) => (
              <Reveal key={stat.subject} delay={idx * 0.02}>
                <div className="bg-royal-cream/30 p-3.5 rounded-xl border border-stone-texture/40 text-center hover:border-heritage-gold transition-colors">
                  <div className="font-serif text-2xl sm:text-3xl font-extrabold text-montfortian-blue leading-none">
                    {stat.count}
                  </div>
                  <div className="text-[11px] font-bold text-heritage-gold-strong font-sans uppercase tracking-wider mt-1">
                    {stat.subject}
                  </div>
                  <div className="text-[10px] text-academic-slate/70 font-sans font-medium mt-0.5">
                    Highest: {stat.highest}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── VERIFIED NAMED TOPPERS ROSTER ───────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-t border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Merit Roll
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
                Stream-Wise First Year Rankers
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-lg border border-stone-texture/50 self-start sm:self-auto">
              {["All", "MPC", "BiPC", "MEC", "CEC"].map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`px-3 py-1 rounded-md text-xs font-bold font-sans transition-colors ${
                    selectedGroup === grp
                      ? "bg-montfortian-blue text-white shadow-xs"
                      : "text-academic-slate/70 hover:text-academic-slate hover:bg-royal-cream/50"
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredToppers.map((topper, idx) => (
              <Reveal key={`${topper.name}-${topper.group}`} delay={idx * 0.02}>
                <div className="bg-white p-4 rounded-xl border border-stone-texture/50 shadow-xs flex items-center justify-between hover:border-heritage-gold/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-sans bg-heritage-gold/20 text-montfortian-blue border border-heritage-gold/30">
                        {topper.group}
                      </span>
                      <span className="text-[10px] font-bold text-academic-slate/50 font-sans">
                        Rank {topper.rank}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-xs sm:text-sm text-academic-slate">
                      {topper.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-serif text-lg sm:text-xl font-bold text-montfortian-blue leading-none">
                      {topper.marks}
                    </div>
                    <div className="text-[10px] text-academic-slate/50 font-sans">
                      out of {topper.maxMarks}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── LIGHTBOX MODAL ──────────────────────────────────────────── */}
      {activePoster && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActivePoster(null)}
        >
          <button
            type="button"
            onClick={() => setActivePoster(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close poster view"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-black rounded-xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePoster}
              alt="Official LFJC Toppers Poster"
              width={1600}
              height={1000}
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}