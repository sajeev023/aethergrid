import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Calendar, ShieldCheck } from "lucide-react";

import { buildStructuredData } from "@/lib/structured-data";
import { programs, PORTAL_LINKS, approvedInstitutionStats } from "@/lib/site-data";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function LFJCPage() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData("lfjc")),
        }}
      />

      <Hero activeInst="lfjc" />

      {/* ─── QUICK OFFICIAL ACTION STRIP ───────────────────────────────── */}
      <section className="bg-royal-cream/40 border-b border-stone-texture/30 py-4 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-academic-slate font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{approvedInstitutionStats.admissionsStatus} ({approvedInstitutionStats.streamList})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button asChild size="sm" className="bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy font-bold text-[11px] uppercase tracking-wider h-8">
              <a href={PORTAL_LINKS.studentSignup} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                Apply Online
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm" className="font-bold text-[11px] uppercase tracking-wider h-8 border-stone-texture/60">
              <Link href="/parent-login" className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-montfortian-blue" />
                Parent ERP Portal
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-bold text-[11px] uppercase tracking-wider h-8 text-montfortian-blue">
              <a href="/docs/academic-calendar-2024-25.pdf" download className="inline-flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Academic Calendar
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── OFFICIAL 2026 TOPPERS SHOWCASE TEASER ─────────────────────── */}
      <Section variant="default" className="bg-white py-10 sm:py-12 border-b border-stone-texture/30">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              State Board Excellence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate">
              Intermediate Board Toppers — 2026
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/75 font-sans max-w-xl">
              Celebrating our 1st Year &amp; 2nd Year state rankers, centum scorers, and merit list achievers across all four intermediate streams.
            </p>
          </div>
          <div className="shrink-0">
            <Button asChild variant="gold" size="lg">
              <Link href="/academics#toppers" className="inline-flex items-center gap-2">
                <span>View Official 2026 Toppers Posters</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ─── FOUR INTERMEDIATE STREAMS ─────────────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30 py-12 sm:py-14">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Academics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Four Intermediate Streams
            </h2>
          </div>
          <Link
            href="/academics"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
          >
            Curriculum & Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.slug}>
                <Link
                  href="/academics"
                  className="group flex flex-col rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-5 hover:border-heritage-gold/50 transition-all shadow-xs h-full justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal-cream text-montfortian-blue border border-stone-texture/60 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-bold text-academic-slate">{program.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{program.subtitle}</p>
                    <p className="mt-2 text-xs text-academic-slate/75 font-sans leading-relaxed line-clamp-2">
                      {program.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-texture/20 text-[11px] font-bold text-montfortian-blue font-sans inline-flex items-center gap-1">
                    <span>Explore Stream</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ─── CAMPUS LIFE TEASER ───────────────────────────────────────── */}
      <Section variant="feature" fullBleed className="!p-0 !py-0">
        <div className="relative overflow-hidden bg-deep-navy text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 relative z-10">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold font-sans">
                  Historic 8-Acre Campus
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  A Vibrant Campus Opposite Survey of India
                </h2>
                <p className="text-xs sm:text-sm text-royal-cream/80 font-sans leading-relaxed max-w-xl">
                  Enclosed by tall boundary walls and lush green trees, Little Flower Junior College Uppal features state-of-the-art science and computer laboratories, the historic Heritage Hall, a well-stocked central library, and spacious grounds for football, basketball, and volleyball.
                </p>
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="lg">
                    <Link href="/campus/campus-life" className="inline-flex items-center gap-2">
                      Explore Campus & Sports
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="inverse" size="lg" className="border-white/40 hover:border-white">
                    <Link href="/about">
                      Montfortian Heritage
                    </Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 shadow-float">
                  <Image
                    src="/images/campus-hero.jpg"
                    alt="Little Flower Junior College campus grounds in Uppal"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}