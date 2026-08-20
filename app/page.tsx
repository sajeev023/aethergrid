import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  Megaphone,
  ShieldCheck,
  ChevronRight,
  Award,
} from "lucide-react";

import { buildStructuredData } from "@/lib/structured-data";
import { programs, values } from "@/lib/site-data";
import { Hero } from "@/components/sections/hero";
import { Testimonials } from "@/components/sections/testimonials";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { icon: BookOpen, label: "Academics", href: "/academics" },
  { icon: Users, label: "Faculty", href: "/faculty" },
  { icon: Building2, label: "Campus Life", href: "/campus" },
  { icon: GraduationCap, label: "Alumni", href: "/alumni" },
];

const NEWS = [
  {
    icon: Megaphone,
    label: "Admission Notice",
    title: "Admissions 2026–27 Open",
    body: "Intermediate admissions for all four streams are open for the upcoming academic session. Submit your inquiry to begin.",
    cta: { label: "Begin Inquiry", href: "/admissions" },
  },
  {
    icon: ShieldCheck,
    label: "Compliance",
    title: "Mandatory Public Disclosures",
    body: "Affiliation, governance, fee structure, faculty, and infrastructure — published in full as required for affiliated intermediate colleges.",
    cta: { label: "View Disclosures", href: "/legal/disclosures" },
  },
  {
    icon: ShieldCheck,
    label: "Student Welfare",
    title: "Zero-Tolerance Anti-Ragging",
    body: "LFJC enforces a strict anti-ragging policy with a dedicated committee and helpline, in line with UGC regulations.",
    cta: { label: "Read Policy", href: "/legal/anti-ragging" },
  },
];

// Main LFJC College Landing Page Component
export default function LFJCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData("lfjc")),
        }}
      />

      {/* 1. Cinematic Hero — full variant with stats + institutional proof */}
      <Hero activeInst="lfjc" variant="full" />

      {/* 2. Quick navigation anchors — utility bar */}
      <div className="bg-white border-b border-stone-texture/40">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8 py-3 sm:py-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3.5">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-stone-texture/70 bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-academic-slate/80 hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 font-sans shadow-xs hover:shadow-panel"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* 3. Gateway Section — asymmetric bento with editorial rhythm */}
      <Section variant="feature" className="bg-royal-cream/30 section-texture">
        <SectionHeading
          eyebrow="Discover LFJC"
          title="Where Would You Like to Begin?"
          description="Little Flower Junior College is more than an institution — it is a five-decade community of scholars, mentors, and leaders."
        />

        <div className="mt-6 sm:mt-10 lg:mt-12 grid gap-3.5 sm:gap-5 lg:grid-cols-12">
          {/* Primary Feature Card — Academics (spans 7 cols) */}
          <Reveal className="lg:col-span-7">
            <Link
              href="/academics"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-stone-texture/60 bg-white p-5 sm:p-6 md:p-8 shadow-panel hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-montfortian-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="flex items-center gap-2 text-xs font-bold text-heritage-gold-strong uppercase tracking-wider font-sans">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Academic Pathways</span>
              </div>
              <div className="mt-4 sm:mt-6">
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-academic-slate leading-tight group-hover:text-montfortian-blue transition-colors duration-300">
                  Four Streams of Academic Excellence
                </h2>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans max-w-lg">
                  MPC, BiPC, MEC, and CEC — board-recognized intermediate programmes that launch students into IITs, medical colleges, and premier careers. Structured systematically around your future.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                Explore Academics
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
              </div>
            </Link>
          </Reveal>

          {/* Secondary Cards Stack (spans 5 cols) */}
          <div className="lg:col-span-5 grid gap-3.5 sm:gap-5">
            {/* Admissions Card */}
            <Reveal delay={0.08}>
              <Link
                href="/admissions"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-heritage-gold/30 bg-royal-cream/40 p-5 sm:p-6 hover:bg-royal-cream hover:border-heritage-gold/60 hover:shadow-panel-hover transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-heritage-gold-strong uppercase tracking-wider font-sans">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  <span>Admissions 2026–27</span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate leading-tight group-hover:text-montfortian-blue transition-colors duration-300">
                    Begin Your Journey Here
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/65 font-sans">
                    A clear, transparent admissions pathway for families seeking academic excellence and disciplined character formation.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                  Start Inquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>

            {/* Alumni Card */}
            <Reveal delay={0.14}>
              <Link
                href="/alumni"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-stone-texture/60 bg-white p-5 sm:p-6 shadow-panel hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-heritage-gold-strong uppercase tracking-wider font-sans">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span>15,000+ Alumni</span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate leading-tight group-hover:text-montfortian-blue transition-colors duration-300">
                    A Legacy of Achievers
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/65 font-sans">
                    From national film icons to IAS officers and IITians — our alumni define the meaning of a Little Flower education.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                  Meet Our Alumni
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 3.5. Four Streams — programme grid (the core academic offer, surfaced early) */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Academic Programmes"
          title="Four Streams. Four Futures."
          description="Board-recognised intermediate pathways, each structured around a distinct career horizon — engineering, medicine, commerce, and law."
        />
        <div className="mt-6 sm:mt-10 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.slug} delay={index * 0.06}>
                <Link
                  href={`/academics/${program.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-stone-texture/60 bg-white p-5 sm:p-6 shadow-panel hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-royal-cream text-montfortian-blue border border-stone-texture/60 group-hover:bg-montfortian-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-base sm:text-lg font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                    {program.subtitle}
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans flex-1">
                    {program.description}
                  </p>
                  <span className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                    Explore Stream
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 4. Heritage & History — editorial split with image */}
      <Section variant="default" className="bg-white overflow-hidden">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-xl border border-stone-texture/50 shadow-elevation">
                <Image
                  src="/images/campus-drone.jpg"
                  alt="LFJC Heritage Campus — Uppal, Hyderabad"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              {/* Floating stat badge — evergreen (no stale year count) */}
              <div className="absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-3 md:right-6 bg-montfortian-blue text-white p-3.5 sm:p-5 md:p-6 shadow-float border border-heritage-gold/30 rounded-xl">
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-none">1974</div>
                <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-royal-cream/90 font-sans">
                  Montfortian Legacy
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-strong font-sans">
                Our Legacy
              </span>
              <h2 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-academic-slate leading-tight tracking-tight">
                Five Decades of{" "}
                <span className="text-heritage-gold italic font-editorial font-normal">
                  Truth & Service
                </span>
              </h2>
              <span className="gold-rule gold-rule-left" />
              <div className="mt-4 sm:mt-7 space-y-3 sm:space-y-5 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-academic-slate/75 font-sans">
                <p>
                  Established in 1974 in Abids and relocated to its present eight-acre campus in Uppal in 1982, Little Flower Junior College has been governed by the Brothers of St. Gabriel Educational Society — a congregation with over 300 years of educational heritage.
                </p>
                <p>
                  From our Golden Jubilee (1974–2024) to thousands of distinguished alumni achieving excellence in engineering, medicine, law, civil services, and entrepreneurship — the Montfortian pillars of truth, virtue, and service continue to guide every lesson.
                </p>
              </div>
              <div className="mt-5 sm:mt-9 flex flex-wrap gap-2.5 sm:gap-3">
                <Button asChild variant="secondary" size="default">
                  <Link href="/about/history" className="inline-flex items-center gap-2">
                    Explore Our History
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <Link href="/about/mission" className="inline-flex items-center gap-2">
                    Mission & Values
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 4.5. Why LFJC — Montfortian values strip */}
      <Section variant="dense" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <SectionHeading
          align="left"
          eyebrow="Why LFJC"
          title="The Montfortian Difference"
          description="Three pillars that have shaped every Little Flower graduate since 1974."
        />
        <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-5 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={index * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-6 hover:border-heritage-gold/40 hover:shadow-panel transition-all duration-300">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-montfortian-blue/10 text-montfortian-blue border border-montfortian-blue/20">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-sm sm:text-base font-bold text-academic-slate">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 5. News & Announcements — editorial notice board */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Notices"
            title="Latest News & Announcements"
            description="Stay informed with the latest updates regarding admissions, college milestones, and academic achievements."
          />
          <Link
            href="/admissions"
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
          >
            Admissions Updates
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 sm:mt-10 grid gap-3.5 sm:gap-5 md:grid-cols-3">
          {NEWS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.06}>
                <article className="group h-full rounded-xl border border-stone-texture/50 bg-white p-5 shadow-panel hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold text-heritage-gold-strong uppercase tracking-wider font-sans">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  <h3 className="mt-2.5 sm:mt-3 font-serif text-base sm:text-lg font-bold text-academic-slate leading-tight group-hover:text-montfortian-blue transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans flex-1">
                    {item.body}
                  </p>
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-texture/30">
                    <Link
                      href={item.cta.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
                    >
                      {item.cta.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 6. Campus Life teaser — visual editorial strip (full-bleed navy band) */}
      <Section variant="feature" as="div" fullBleed className="!p-0 !py-0">
        <div className="relative overflow-hidden bg-deep-navy text-white">
          {/* Background texture */}
          <div className="absolute inset-0 stone-pattern opacity-[0.04] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-24 relative z-10">
            <div className="grid gap-6 sm:gap-12 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-bright font-sans">
                  The LFJC Experience
                </span>
                <h2 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                  An Eight-Acre Living{" "}
                  <span className="text-heritage-gold italic font-editorial font-normal">
                    Heritage Campus
                  </span>
                </h2>
                <p className="mt-3 sm:mt-5 text-sm sm:text-base leading-relaxed sm:leading-7 text-royal-cream/80 font-sans max-w-xl">
                  From world-class laboratories and a rich library to sports grounds, student clubs, and the Golden Jubilee archives — every corner of our campus is designed to shape character and intellect.
                </p>
                <div className="mt-5 sm:mt-8">
                  <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
                    <Link href="/campus" className="inline-flex items-center justify-center gap-2">
                      Explore Campus Life
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  {[
                    { label: "Facilities & Labs", href: "/campus/facilities", icon: Building2 },
                    { label: "Sports & Athletics", href: "/campus/sports", icon: Award },
                    { label: "Photo Gallery", href: "/campus/gallery", icon: BookOpen },
                    { label: "Events & Culture", href: "/campus/events", icon: Users },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 md:p-6 hover:bg-white hover:text-deep-navy transition-all duration-300"
                      >
                        <Icon className="h-5 w-5 text-heritage-gold-bright group-hover:text-montfortian-blue transition-colors mb-2 sm:mb-4" aria-hidden="true" />
                        <span className="text-xs sm:text-[13px] md:text-sm font-bold text-royal-cream/90 group-hover:text-deep-navy font-sans block leading-tight">
                          {item.label}
                        </span>
                        <ChevronRight className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 h-4 w-4 text-heritage-gold-bright/40 group-hover:text-montfortian-blue opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 6.5. Institutional voice — honest testimonials (Principal's voice + alumni CTA) */}
      <Testimonials activeInst="lfjc" />

      {/* 7. Admissions CTA Band — strong conversion close */}
      <Section variant="default" className="bg-white">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-heritage-gold/30 bg-gradient-to-br from-royal-cream via-white to-royal-cream/60 p-6 sm:p-10 md:p-14 text-center shadow-panel">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-montfortian-blue via-heritage-gold to-montfortian-blue" />
            <Award className="h-8 w-8 sm:h-9 sm:w-9 text-heritage-gold mx-auto mb-3 sm:mb-5" />
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-academic-slate leading-tight">
              Begin Your Admissions Inquiry
            </h2>
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-academic-slate/75 font-sans max-w-2xl mx-auto">
              Intermediate programs in MPC, BiPC, MEC, and CEC are now open for the 2026–27 session. Join a five-decade legacy of academic excellence and character formation.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto min-h-[48px]">
                <Link href="/admissions" className="inline-flex items-center justify-center gap-2">
                  Begin Admissions Inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2">
                  Contact Admissions Office
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
