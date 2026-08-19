import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Trophy, Camera, Music } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Campus Life",
  description:
    "Explore the eight-acre LFJC campus in Uppal, Hyderabad — world-class laboratories, sports grounds, a rich library, student clubs, and the Golden Jubilee archives.",
};

const CAMPUS_SECTIONS = [
  {
    icon: Building2,
    eyebrow: "Infrastructure",
    title: "Facilities & Laboratories",
    desc: "Tour the main academic blocks, chemistry and physics labs, computer centre, library, and the heritage auditorium.",
    href: "/campus/facilities",
    cta: "Explore Facilities",
    image: "/images/campus-building.jpg",
  },
  {
    icon: Trophy,
    eyebrow: "Athletics",
    title: "Sports & Athletics",
    desc: "Our two-acre sports arena hosts inter-college football, cricket, basketball, and the annual sports meet.",
    href: "/campus/sports",
    cta: "View Sports",
    image: "/images/sports.jpg",
  },
  {
    icon: Camera,
    eyebrow: "Archives",
    title: "Photo Gallery",
    desc: "The complete photographic archive — Golden Jubilee celebrations, campus life, and institutional milestones.",
    href: "/campus/gallery",
    cta: "Browse Gallery",
    image: "/images/golden-jubilee/golden_jubilee_1.jpg",
  },
  {
    icon: Music,
    eyebrow: "Student Life",
    title: "Events & Culture",
    desc: "Clubs, co-curricular activities, motivational talks, and cultural events that shape student character.",
    href: "/campus/events",
    cta: "Explore Events",
    image: "/images/alumni-group.jpg",
  },
];

export default function CampusPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative min-h-[50svh] flex flex-col justify-center overflow-hidden bg-academic-slate text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/campus-hero.jpg"
            alt="LFJC Campus — Uppal, Hyderabad"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-academic-slate/95 via-academic-slate/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-transparent to-academic-slate/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full py-10 md:py-16">
          <Reveal>
            <span className="font-sans text-[11px] font-bold text-heritage-gold-bright uppercase tracking-[0.24em] mb-3 block">
              The LFJC Campus
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] text-white tracking-tight">
              An Eight-Acre{" "}
              <span className="text-heritage-gold italic font-editorial font-normal">
                Living Heritage
              </span>
            </h1>
            <p className="mt-4 max-w-2xl border-l-2 border-heritage-gold pl-4 sm:pl-5 text-sm md:text-base leading-relaxed text-royal-cream/90 font-sans font-medium">
              The Uppal campus of Little Flower Junior College spans eight acres of academic grounds, sports arenas, heritage architecture, and student life — a complete ecosystem of learning and character formation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sub-page Gateway Cards */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Explore the Campus"
          title="What Would You Like to Discover?"
          description="From world-class laboratories to Golden Jubilee archives — explore every dimension of life at LFJC."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {CAMPUS_SECTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.07}>
                <Link
                  href={item.href}
                  className="group flex flex-col h-full bg-white border border-stone-texture rounded-xl overflow-hidden hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 relative"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-royal-cream/30">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white bg-academic-slate/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                      <Icon className="h-3 w-3 text-heritage-gold-bright" aria-hidden="true" />
                      {item.eyebrow}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-academic-slate mb-2 group-hover:text-montfortian-blue transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className="text-xs leading-5 text-academic-slate/70 font-sans">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-texture/40 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-montfortian-blue font-sans">
                        {item.cta}
                      </span>
                      <ArrowRight className="h-4 w-4 text-heritage-gold-strong group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Quick Stats Strip */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/40 py-6 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "8 Acres", label: "Campus Area" },
            { value: "4", label: "Specialized Laboratories" },
            { value: "50+", label: "Years of Legacy" },
            { value: "1,600+", label: "Students Enrolled" },
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.05}>
              <div className="text-center p-4 bg-white border border-stone-texture rounded-lg hover:border-heritage-gold/50 hover:shadow-sm transition-all duration-300 group">
                <div className="font-serif text-2xl md:text-3xl font-extrabold text-montfortian-blue leading-none mb-1 group-hover:text-heritage-gold-strong transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate/70">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="bg-white py-8 md:py-8">
        <Reveal className="flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-stone-texture bg-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans"
          >
            About Our College
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}