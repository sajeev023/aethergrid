"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ZoomIn, X, Award, Sparkles, Loader2, AlertCircle, RotateCcw } from "lucide-react";

import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { useFocusTrap } from "@/lib/use-focus-trap";

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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRefMap = useRef<Record<string, HTMLButtonElement | null>>({});

  const Heading = headingLevel;

  // Trap focus inside modal while active and restore to trigger button on close
  useFocusTrap(activePoster !== null, modalRef);

  // Close on Escape and lock background scrolling
  useEffect(() => {
    if (!activePoster) return;

    setImageLoading(true);
    setImageError(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePoster(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activePoster]);

  const handleOpenPoster = (poster: TopperPoster) => {
    setImageLoading(true);
    setImageError(false);
    setActivePoster(poster);
  };

  const handleCloseModal = () => {
    const posterId = activePoster?.id;
    setActivePoster(null);
    if (posterId && triggerRefMap.current[posterId]) {
      triggerRefMap.current[posterId]?.focus();
    }
  };

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
                      ref={(el) => {
                        triggerRefMap.current[poster.id] = el;
                      }}
                      type="button"
                      onClick={() => handleOpenPoster(poster)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans bg-academic-slate hover:bg-montfortian-blue text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-heritage-gold"
                      aria-label={`View full screen poster for ${poster.title}`}
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
                    onClick={() => handleOpenPoster(poster)}
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
                        <span>Click to view Full-Resolution Poster</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Poster Footer Note */}
                <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-academic-slate/70">
                  <span className="font-semibold text-montfortian-blue">
                    Little Flower Junior College • Telangana State Board of Intermediate Education
                  </span>
                  <span className="italic">
                    Click poster image or Full Screen button to inspect individual ranks &amp; marks
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── FULL RESOLUTION ACCESSIBLE LIGHTBOX MODAL ────────────────── */}
      {activePoster && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="topper-modal-title"
        >
          {/* Modal Container with Focus Trap */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative w-full max-w-7xl max-h-[94vh] flex flex-col items-center justify-center focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Controls Bar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1 sm:px-2 z-10 shrink-0">
              <div className="bg-deep-navy/90 px-3.5 py-1.5 rounded-lg border border-white/20 shadow-md">
                <h2 id="topper-modal-title" className="font-serif text-sm sm:text-base font-bold text-heritage-gold-bright">
                  {activePoster.title}
                </h2>
                <p className="text-[10px] sm:text-xs text-royal-cream/70 font-sans">
                  {activePoster.badge} • Full Screen View (Press Esc to close)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold font-sans bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer border border-white/20 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-heritage-gold"
                  aria-label="Close full-screen poster view"
                  autoFocus
                >
                  <X className="h-4 w-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* Poster Image Container */}
            <div className="relative w-full max-h-[82vh] overflow-auto rounded-xl bg-black/80 border border-white/20 shadow-2xl p-2 sm:p-3 flex items-center justify-center min-h-[260px]">
              {/* Loading Spinner */}
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-royal-cream bg-black/60 z-20">
                  <Loader2 className="h-8 w-8 animate-spin text-heritage-gold-bright" />
                  <p className="text-xs font-sans font-medium text-white/90 tracking-wide">
                    Loading full-resolution poster...
                  </p>
                </div>
              )}

              {/* Error State Fallback */}
              {imageError ? (
                <div className="p-8 text-center text-white space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h3 className="font-serif text-lg font-bold">Poster Preview Unavailable</h3>
                  <p className="text-xs text-white/70 max-w-sm mx-auto font-sans">
                    The full-resolution image could not be decoded. Please retry or download the brochure from the admissions desk.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setImageError(false);
                        setImageLoading(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-heritage-gold text-deep-navy font-bold text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retry Loading
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg bg-white/20 text-white font-bold text-xs"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              ) : (
                <Image
                  src={activePoster.src}
                  alt={`Full Resolution ${activePoster.title} - Official Intermediate Board Merit List`}
                  width={activePoster.width}
                  height={activePoster.height}
                  unoptimized
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                  className={`w-full h-auto object-contain max-h-[78vh] mx-auto rounded transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}