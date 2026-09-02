"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Award, Sparkles } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";

interface TopperPoster {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  badge: string;
  src: string;
  width: number;
  height: number;
}

const TOPPER_POSTERS: TopperPoster[] = [
  {
    id: "first-year",
    year: "2026",
    title: "1st Year Toppers — 2026",
    subtitle: "Official Telangana State Intermediate Board 1st Year Merit List & Centum Distinction Roster",
    badge: "TSBIE 1st Year Merit",
    src: "/images/toppers/1st-year-toppers-2026.jpg",
    width: 2882,
    height: 1802,
  },
  {
    id: "second-year",
    year: "2026",
    title: "2nd Year Toppers — 2026",
    subtitle: "Official Telangana State Intermediate Board 2nd Year Merit List & State Ranks",
    badge: "TSBIE 2nd Year Merit",
    src: "/images/toppers/2nd-year-toppers-2026.jpg",
    width: 1024,
    height: 640,
  },
];

interface ToppersProps {
  headingLevel?: "h1" | "h2";
}

export function Toppers({ headingLevel = "h2" }: ToppersProps = {}) {
  const [activePoster, setActivePoster] = useState<TopperPoster | null>(null);
  const Heading = headingLevel;

  return (
    <div id="toppers" className="bg-white">
      {/* ─── SECTION HEADER ─────────────────────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans mb-2">
              <Award className="w-3.5 h-3.5 text-heritage-gold-strong" />
              State Board Merit List
            </span>
            <Heading className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-academic-slate tracking-tight">
              Intermediate Board Toppers — 2026
            </Heading>
            <p className="mt-2.5 text-xs sm:text-sm text-academic-slate/75 font-sans max-w-2xl mx-auto leading-relaxed">
              Official Little Flower Junior College merit announcements, state rankers, and centum scorers published for Intermediate 1st and 2nd Year board examinations.
            </p>
            <span className="gold-rule gold-rule-center !mt-3 sm:!mt-4" />
          </Reveal>
        </div>

        {/* ─── COMPLETE OFFICIAL POSTERS DISPLAY ───────────────────────── */}
        <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
          {TOPPER_POSTERS.map((poster, index) => (
            <Reveal key={poster.id} delay={index * 0.1}>
              <div className="rounded-2xl border-2 border-heritage-gold/35 bg-white p-4 sm:p-6 md:p-8 shadow-panel">
                {/* Poster Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 sm:mb-6 border-b border-stone-texture/40">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-sans bg-heritage-gold/15 text-montfortian-blue border border-heritage-gold/30 mb-1">
                      <Sparkles className="w-3 h-3 text-heritage-gold-strong" />
                      {poster.badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-academic-slate">
                      {poster.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-0.5">
                      {poster.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActivePoster(poster)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans bg-academic-slate hover:bg-montfortian-blue text-white transition-colors cursor-pointer"
                      aria-label={`View full resolution poster for ${poster.title}`}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Full Screen</span>
                    </button>
                  </div>
                </div>

                {/* Complete Uncropped Poster Image Container */}
                <div className="relative group rounded-xl overflow-hidden border border-stone-texture/50 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setActivePoster(poster)}
                    className="w-full block relative cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-heritage-gold"
                    aria-label={`Click to expand full resolution ${poster.title} poster`}
                  >
                    <div className="relative w-full overflow-hidden flex items-center justify-center bg-royal-cream/10">
                      <Image
                        src={poster.src}
                        alt={`Official Little Flower Junior College ${poster.title} Merit List Poster`}
                        width={poster.width}
                        height={poster.height}
                        sizes="(min-width: 1280px) 1150px, (min-width: 768px) 90vw, 100vw"
                        className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.005]"
                        priority={index === 0}
                      />
                    </div>
                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-deep-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans text-xs sm:text-sm font-bold backdrop-blur-[1px] pointer-events-none">
                      <div className="bg-deep-navy/90 border border-heritage-gold/50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <ZoomIn className="w-4 h-4 text-heritage-gold-bright" />
                        <span>Click to view Full-Resolution High-Quality Poster</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Poster Footer Note */}
                <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-academic-slate/70">
                  <span className="font-semibold text-montfortian-blue">
                    Little Flower Junior College • Telangana Board Ground Truth
                  </span>
                  <span className="italic">
                    Click poster image to zoom and read individual ranks &amp; marks
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── FULL RESOLUTION LIGHTBOX MODAL ──────────────────────────── */}
      {activePoster && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={() => setActivePoster(null)}
        >
          {/* Close & Header Bar */}
          <div className="absolute top-3 left-4 right-4 sm:top-4 sm:left-6 sm:right-6 flex items-center justify-between text-white z-10 pointer-events-none">
            <div className="pointer-events-auto bg-deep-navy/80 px-3 py-1.5 rounded-lg border border-white/20">
              <span className="font-serif text-sm sm:text-base font-bold text-heritage-gold-bright">
                {activePoster.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActivePoster(null)}
              className="pointer-events-auto p-2 text-white hover:text-heritage-gold-bright transition-colors rounded-full bg-white/15 hover:bg-white/30 cursor-pointer"
              aria-label="Close full-screen poster view"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Image Wrapper with complete visibility */}
          <div
            className="relative w-full max-w-7xl max-h-[88vh] overflow-auto bg-black/60 rounded-xl p-1 sm:p-2 border border-white/20 shadow-2xl mt-10 sm:mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePoster.src}
              alt={activePoster.title}
              width={activePoster.width}
              height={activePoster.height}
              className="w-full h-auto object-contain max-h-[82vh] mx-auto rounded"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
}