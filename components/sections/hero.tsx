"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInstitutionData } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/counter";
import { MOTION_EASE } from "@/components/motion/variants";

interface HeroProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  /** "lean" = homepage (headline + CTAs + stat strip only).
   *  "full"  = multi-institution landing (adds admissions sidebar + proof/flagship band). */
  variant?: "lean" | "full";
}

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
  const heroImg = "/images/campus-hero.jpg";
  const isLean = variant === "lean";
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <section
      id="home"
      className="relative min-h-[72svh] lg:min-h-[78svh] flex flex-col justify-center overflow-hidden bg-deep-navy text-white"
    >
      {/* ─── Background Image with Layered Overlays ─────────────────────── */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1.01, opacity: 0.5 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.2, ease: MOTION_EASE }}
          className="w-full h-full relative"
        >
          <Image
            src={heroImg}
            alt={`${data.name} campus environment`}
            fill
            priority
            sizes="100vw"
            className="object-cover mix-blend-overlay"
          />
        </motion.div>
        {/* Multi-stop gradient for depth — Oxford/Stanford cinematic treatment */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/85 to-deep-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/40" />
      </div>

      {/* ─── Main Grid Content ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full py-14 md:py-20 lg:grid lg:grid-cols-[1fr_340px] lg:items-center lg:gap-10 flex-grow flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          className="max-w-3xl w-full"
        >
          <motion.div variants={itemVariants}>
            <Badge onDark className="mb-5 text-[11px] py-1.5 px-4 tracking-[0.22em]">
              Est. {data.established} • Uppal, Hyderabad
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] text-white tracking-tight"
          >
            {renderHeadline()}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl border-l-[3px] border-heritage-gold pl-5 sm:pl-6 text-sm md:text-base leading-relaxed text-royal-cream/90 font-sans font-medium"
          >
            {data.name}: Where Knowledge meets Virtue and Service. A premier institution shaping the leaders of tomorrow through discipline and dedicated pedagogy.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap w-full sm:w-auto"
            aria-label="Primary actions"
          >
            <Button asChild size="lg" className="w-full sm:w-auto h-auto py-3.5 text-xs sm:text-sm group">
              <a href="/admissions" className="inline-flex items-center justify-center gap-2.5">
                Begin Admissions Inquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="inverse" size="lg" className="w-full sm:w-auto h-auto py-3.5 text-xs sm:text-sm">
              <a href="/about" className="inline-flex items-center justify-center">
                Explore Our Legacy
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* ─── Admissions Sidebar (full variant only) ──────────────────── */}
        {!isLean && (
          <motion.aside
            variants={sidebarVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            className="mt-8 lg:mt-0 border border-white/12 bg-deep-navy/80 p-5 shadow-2xl backdrop-blur-xl rounded-lg w-full lg:max-w-[340px]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid h-10 w-10 place-items-center bg-heritage-gold/15 text-heritage-gold-bright ring-1 ring-heritage-gold/25 rounded-sm">
                <CalendarDays className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright font-sans">
                  Admissions Desk
                </p>
                <p className="mt-0.5 font-serif text-sm font-semibold text-white">
                  {data.admissionsLabel}
                </p>
              </div>
            </div>
            <div className="py-4 text-xs leading-relaxed text-royal-cream/70 font-sans">
              <p className="mb-2.5">
                Families can compare academic streams, confirm criteria, and submit an inquiry through a clear admissions pathway.
              </p>
              <p className="flex gap-2 text-royal-cream">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-heritage-gold-bright" />
                Montfortian education with strong discipline and moral values.
              </p>
            </div>
            <a
              href="/admissions"
              className="premium-focus inline-flex w-full items-center justify-between border border-white/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-royal-cream hover:bg-white hover:text-deep-navy transition-colors duration-300 rounded-sm font-sans"
            >
              Begin Admissions Inquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.aside>
        )}
      </div>

      {/* ─── Stats Banner ───────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 lg:translate-y-5">
        <div className="grid border border-stone-texture/20 bg-white text-academic-slate shadow-float divide-y lg:divide-y-0 lg:divide-x divide-stone-texture/40 grid-cols-2 lg:grid-cols-4 rounded-lg overflow-hidden">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="px-5 py-5 md:px-6 md:py-6 text-center lg:text-left hover:bg-royal-cream/40 transition-colors duration-300 relative group cursor-default"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="font-serif text-3xl md:text-4xl font-extrabold text-montfortian-blue leading-none mb-1.5 group-hover:text-heritage-gold-strong transition-colors duration-300">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate/70 group-hover:text-academic-slate transition-colors duration-300 font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Institutional Proof / Flagship Links Band ──────────────────── */}
      {!isLean && (
        <div className="border-t border-white/10 bg-deep-navy/95 pt-8 pb-6 lg:pt-12 lg:pb-8 mt-6 lg:mt-12">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-y-4 gap-x-6 text-sm text-white/80 sm:grid-cols-2 font-sans leading-relaxed">
              {data.institutionalProof.map((fact) => (
                <div key={fact.label}>
                  <span className="mb-1 block font-bold text-heritage-gold-bright tracking-wider uppercase text-[11px]">{fact.label}</span>
                  <span className="text-royal-cream/85">{fact.value}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {data.flagshipLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="premium-focus group border border-white/12 bg-white/[0.04] p-4 transition-colors hover:bg-white hover:text-deep-navy rounded-md"
                >
                  <span className="flex items-center justify-between gap-3 font-serif text-sm font-semibold text-white group-hover:text-montfortian-blue">
                    {link.title}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-heritage-gold group-hover:text-montfortian-blue transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-5 text-white/70 group-hover:text-academic-slate/70 font-sans">
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
