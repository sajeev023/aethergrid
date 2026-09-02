import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Calendar, ShieldCheck } from "lucide-react";

import { buildStructuredData } from "@/lib/structured-data";
import { programs, PORTAL_LINKS } from "@/lib/site-data";
import { firstYearSubjectStats, firstYearToppers } from "@/lib/toppers-data";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function LFJCPage() {
  const topThree = firstYearToppers.slice(0, 4);

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
            <span>Intermediate Admissions 2026–27 Open (MPC • BiPC • MEC • CEC)</span>
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

      {/* ─── 2024 IPE BOARD RESULTS HIGHLIGHTS ────────────────────────── */}
      <Section variant="default" className="bg-white py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              State Board Excellence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Intermediate 1st Year Toppers 2024
            </h2>
          </div>
          <Link
            href="/academics#toppers"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
          >
            View Full Merit List & Centum Record
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Centum Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {firstYearSubjectStats.slice(0, 5).map((stat) => (
            <div key={stat.subject} className="bg-royal-cream/30 p-3 rounded-xl border border-stone-texture/40 text-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-montfortian-blue leading-none">
                {stat.count}
              </div>
              <div className="text-[10px] font-bold text-heritage-gold-strong font-sans uppercase tracking-wider mt-1">
                {stat.subject} (Max {stat.highest})
              </div>
              <div className="text-[9px] text-academic-slate/60 font-sans">Scored Maximum</div>
            </div>
          ))}
        </div>

        {/* Top 4 Rankers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topThree.map((topper) => (
            <div
              key={`${topper.name}-${topper.group}`}
              className="bg-white p-3.5 rounded-xl border border-stone-texture/50 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold font-sans bg-heritage-gold/20 text-montfortian-blue border border-heritage-gold/30">
                  {topper.group} • Rank {topper.rank}
                </span>
                <h3 className="font-sans font-bold text-xs sm:text-sm text-academic-slate mt-1">
                  {topper.name}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <div className="font-serif text-lg font-bold text-montfortian-blue leading-none">
                  {topper.marks}
                </div>
                <div className="text-[9px] text-academic-slate/50 font-sans">/{topper.maxMarks}</div>
              </div>
            </div>
          ))}
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
                  Historic 2-Acre Campus
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  A Vibrant Campus Opposite Survey of India
                </h2>
                <p className="text-xs sm:text-sm text-royal-cream/80 font-sans leading-relaxed max-w-xl">
                  Enclosed by tall boundary walls and lush green trees, Little Flower Junior College Uppal features state-of-the-art science and computer laboratories, the historic Heritage Hall, a well-stocked central library, and spacious grounds for football, basketball, and volleyball.
                </p>
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="lg">
                    <Link href="/campus" className="inline-flex items-center gap-2">
                      Explore Campus & Labs
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