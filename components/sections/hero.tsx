"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInstitutionData } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/counter";
import { MOTION_EASE } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

interface HeroProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  /** "lean" = homepage (headline + CTAs + stat strip only).
   *  "full"  = multi-institution landing (adds admissions sidebar + proof/flagship band). */
  variant?: "lean" | "full";
}

interface HeroSlide {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  objectPosition: string;
  mobileObjectPosition?: string;
  title: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1-building",
    src: "/images/hero/hero-1-building.webp",
    fallbackSrc: "/images/hero/hero-1-building.jpg",
    alt: "Little Flower Junior College Main Campus Building & Architectural Facade",
    objectPosition: "center 35%",
    mobileObjectPosition: "center 20%",
    title: "Campus Architecture & Main Building",
  },
  {
    id: "hero-2-campus-quad",
    src: "/images/hero/hero-2-campus-quad.webp",
    fallbackSrc: "/images/hero/hero-2-campus-quad.jpg",
    alt: "Eight-Acre Uppal Heritage Campus Grounds & Quadrangle Lawn",
    objectPosition: "center center",
    mobileObjectPosition: "center 35%",
    title: "Eight-Acre Green Campus & Quadrangle",
  },
  {
    id: "hero-3-academic-lab",
    src: "/images/hero/hero-3-academic-lab.webp",
    fallbackSrc: "/images/hero/hero-3-academic-lab.jpg",
    alt: "Hands-on Science & Technological Laboratory Training at LFJC",
    objectPosition: "center 40%",
    mobileObjectPosition: "center 30%",
    title: "Advanced Science & Technology Laboratories",
  },
  {
    id: "hero-4-central-library",
    src: "/images/hero/hero-4-central-library.webp",
    fallbackSrc: "/images/hero/hero-4-central-library.jpg",
    alt: "LFJC Central Library & Scholarly Reading Hall",
    objectPosition: "center 35%",
    mobileObjectPosition: "center 25%",
    title: "Central Library & Research Reading Hall",
  },
  {
    id: "hero-5-national-celebration",
    src: "/images/hero/hero-5-national-celebration.webp",
    fallbackSrc: "/images/hero/hero-5-national-celebration.jpg",
    alt: "Independence Day Flag Hoisting Ceremony & Institutional Gathering",
    objectPosition: "center center",
    mobileObjectPosition: "center 30%",
    title: "Flag Hoisting Ceremony & Campus Gathering",
  },
  {
    id: "hero-6-auditorium",
    src: "/images/hero/hero-6-auditorium.webp",
    fallbackSrc: "/images/hero/hero-6-auditorium.jpg",
    alt: "LFJC College Auditorium Assembly & Cultural Events",
    objectPosition: "center 30%",
    mobileObjectPosition: "center 30%",
    title: "College Auditorium & Student Assembly",
  },
  {
    id: "hero-7-sports-day",
    src: "/images/hero/hero-7-sports-day.webp",
    fallbackSrc: "/images/hero/hero-7-sports-day.jpg",
    alt: "Athletic Track & Annual Sports Day Competition at LFJC Grounds",
    objectPosition: "center center",
    mobileObjectPosition: "center 35%",
    title: "Athletic Track & Campus Sports Day",
  },
  {
    id: "hero-8-montfortian-heritage",
    src: "/images/hero/hero-8-montfortian-heritage.webp",
    fallbackSrc: "/images/hero/hero-8-montfortian-heritage.jpg",
    alt: "Montfortian Heritage Statue & Five-Decade Educational Legacy",
    objectPosition: "center 30%",
    mobileObjectPosition: "center 25%",
    title: "Montfortian Heritage & 50-Year Legacy",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: MOTION_EASE },
  },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.35, ease: MOTION_EASE },
  },
};

export function Hero({ activeInst = "lfjc", variant = "full" }: HeroProps) {
  const data = getInstitutionData(activeInst);
  const isLean = variant === "lean";
  const prefersReducedMotion = useReducedMotion();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0, 1]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;
        const upcoming = (next + 1) % HERO_SLIDES.length;
        setLoadedIndices((current) => {
          if (current.includes(next) && current.includes(upcoming)) return current;
          const nextSet = new Set(current);
          nextSet.add(next);
          nextSet.add(upcoming);
          return Array.from(nextSet);
        });
        return next;
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const renderHeadline = () => {
    return (
      <>
        Fifty Years of{" "}
        <span className="text-heritage-gold italic font-editorial font-normal">
          Academic Excellence
        </span>
        <br className="hidden md:inline" />
        {" "}&amp; Character.
      </>
    );
  };

  const renderAdmissionsCard = (isMobile = false) => (
    <motion.aside
      variants={sidebarVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
      className={cn(
        "border border-white/15 bg-deep-navy/95 p-4 sm:p-5 lg:p-6 shadow-2xl backdrop-blur-xl rounded-xl w-full",
        isMobile ? "max-w-xl mx-auto" : "lg:max-w-[340px]"
      )}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 border-b border-white/10 pb-2.5 sm:pb-3.5">
        <span className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center bg-heritage-gold/15 text-heritage-gold-bright ring-1 ring-heritage-gold/25 rounded-md shrink-0">
          <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-heritage-gold-bright font-sans">
            Admissions Desk
          </p>
          <p className="mt-0.5 font-serif text-xs sm:text-sm lg:text-base font-bold text-white leading-tight">
            {data.admissionsLabel}
          </p>
        </div>
      </div>
      <div className="py-2.5 sm:py-3.5 text-xs sm:text-sm leading-relaxed text-royal-cream/80 font-sans">
        <p className="mb-2">
          Families can compare academic streams, confirm criteria, and submit an inquiry through a clear admissions pathway.
        </p>
        <p className="flex gap-2 text-royal-cream text-[11px] sm:text-xs">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-heritage-gold-bright" />
          Montfortian education with strong discipline and moral values.
        </p>
      </div>
      <a
        href="/admissions"
        className="premium-focus inline-flex w-full items-center justify-between border border-white/20 px-3.5 py-2 sm:px-4 sm:py-2.5 min-h-[40px] sm:min-h-[44px] text-xs font-bold uppercase tracking-wider text-royal-cream hover:bg-white hover:text-deep-navy transition-colors duration-300 rounded-sm font-sans"
      >
        Begin Admissions Inquiry
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </a>
    </motion.aside>
  );

  return (
    <div id="home-wrapper" className="relative w-full">
      {/* ─── 1. Deliberate Hero Banner (Contains Campus Photo ONLY) ─────── */}
      <section
        id="home"
        aria-label="Little Flower Junior College Hero"
        className="relative min-h-auto lg:min-h-[76svh] flex flex-col justify-center overflow-hidden bg-deep-navy text-white"
      >
        {/* Vivid Cinematic Background Image Carousel (Hero only) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-deep-navy">
          {HERO_SLIDES.map((slide, index) => {
            if (!loadedIndices.includes(index)) return null;
            const isActive = index === activeSlideIndex;
            return (
              <motion.div
                key={slide.id}
                initial={false}
                animate={{
                  opacity: isActive ? 0.90 : 0,
                  scale: isActive ? (prefersReducedMotion ? 1.0 : 1.04) : 1.0,
                }}
                transition={{
                  opacity: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1.0] },
                  scale: isActive && !prefersReducedMotion
                    ? { duration: 6.0, ease: "linear" }
                    : { duration: 0 },
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover [object-position:var(--mobile-pos)] lg:[object-position:var(--desktop-pos)]"
                  style={{
                    ["--mobile-pos" as string]: slide.mobileObjectPosition || slide.objectPosition,
                    ["--desktop-pos" as string]: slide.objectPosition,
                  }}
                />
              </motion.div>
            );
          })}

          {/* Directional Vignette: Strong on mobile to ensure 100% text contrast over photography */}
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/85 via-deep-navy/70 to-deep-navy/90 lg:bg-gradient-to-r lg:from-deep-navy/90 lg:via-deep-navy/65 lg:via-50% lg:to-deep-navy/15" />
          {/* Subtle top & bottom edge gradients for smooth blending into nav and lower sections */}
          <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-deep-navy/80 via-deep-navy/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-28 bg-gradient-to-t from-deep-navy/95 via-deep-navy/40 to-transparent" />
        </div>

        {/* Main Grid Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 w-full py-8 sm:py-12 md:py-16 lg:py-20 lg:grid lg:grid-cols-[1fr_340px] lg:items-center lg:gap-10 flex-grow flex flex-col justify-center">
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="max-w-3xl w-full"
          >
            <motion.div variants={itemVariants}>
              <Badge onDark className="mb-2.5 sm:mb-5 text-[11px] sm:text-xs py-1 px-3 sm:py-1.5 sm:px-3.5 tracking-wider font-semibold shadow-sm backdrop-blur-md bg-deep-navy/70 border border-white/20">
                Est. {data.established} • Uppal, Hyderabad
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-[1.65rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.14] sm:leading-[1.06] text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
            >
              {renderHeadline()}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-2.5 sm:mt-5 max-w-2xl border-l-[3px] border-heritage-gold pl-3 sm:pl-5 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream font-sans font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
            >
              {data.name}: Where Knowledge meets Virtue and Service. A premier institution shaping the leaders of tomorrow through discipline and dedicated pedagogy.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-4 sm:mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap w-full sm:w-auto"
              aria-label="Primary actions"
            >
              <Button asChild size="lg" className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider group">
                <a href="/admissions" className="inline-flex items-center justify-center gap-2">
                  Begin Admissions Inquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="inverse" size="lg" className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <a href="/about" className="inline-flex items-center justify-center">
                  Explore Our Legacy
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Desktop Admissions Sidebar (visible only on lg screens) */}
          {!isLean && (
            <div className="hidden lg:block">
              {renderAdmissionsCard(false)}
            </div>
          )}
        </div>
      </section>

      {/* ─── 2. Dedicated Mobile Admissions Section (Full variant, mobile only) ── */}
      {!isLean && (
        <section
          aria-label="Admissions Desk"
          className="lg:hidden bg-deep-navy border-t border-b border-white/10 px-4 py-6 sm:px-6 sm:py-8"
        >
          {renderAdmissionsCard(true)}
        </section>
      )}

      {/* ─── 3. Dedicated Statistics Section ───────────────────────────── */}
      <section
        aria-label="Institutional Statistics"
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 lg:py-0 lg:-mt-7"
      >
        <div className="grid border border-stone-texture/20 bg-white text-academic-slate shadow-float divide-y sm:divide-y-0 grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden sm:divide-x divide-stone-texture/30">
          {data.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "px-3 py-3 sm:px-6 sm:py-6 text-center lg:text-left hover:bg-royal-cream/40 transition-colors duration-300 relative group cursor-default",
                idx % 2 === 1 && "border-l border-stone-texture/30 sm:border-l-0"
              )}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-montfortian-blue leading-none mb-1 group-hover:text-heritage-gold-strong transition-colors duration-300">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-academic-slate/75 group-hover:text-academic-slate transition-colors duration-300 font-sans leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. Institutional Proof / Flagship Links Band ───────────────── */}
      {!isLean && (
        <section
          aria-label="Institutional Highlights and Quick Links"
          className="border-t border-white/10 bg-deep-navy/95 pt-5 pb-5 sm:pt-6 sm:pb-6 lg:pt-12 lg:pb-8 mt-4 sm:mt-6 lg:mt-10"
        >
          <div className="mx-auto grid max-w-7xl gap-3 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-y-2 sm:gap-y-4 gap-x-3 sm:gap-x-6 text-xs sm:text-sm text-white/80 grid-cols-1 sm:grid-cols-2 font-sans leading-relaxed">
              {data.institutionalProof.map((fact) => (
                <div key={fact.label}>
                  <span className="mb-0.5 block font-bold text-heritage-gold-bright tracking-wider uppercase text-[10px] sm:text-xs">{fact.label}</span>
                  <span className="text-royal-cream/90 text-xs sm:text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3">
              {data.flagshipLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="premium-focus group border border-white/15 bg-white/[0.05] p-3 sm:p-4 transition-colors hover:bg-white hover:text-deep-navy rounded-lg"
                >
                  <span className="flex items-center justify-between gap-2 sm:gap-3 font-serif text-xs sm:text-sm font-semibold text-white group-hover:text-montfortian-blue">
                    {link.title}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-heritage-gold group-hover:text-montfortian-blue transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-[11px] sm:text-xs leading-4 sm:leading-5 text-white/70 group-hover:text-academic-slate/75 font-sans">
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
