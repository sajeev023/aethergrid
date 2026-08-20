import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Facilities & Laboratories",
  description:
    "Explore LFJC's world-class academic facilities — main blocks, chemistry and physics laboratories, computer centre, library, and the heritage auditorium in Uppal, Hyderabad.",
};

const FACILITIES = [
  {
    title: "Heritage Brick Facade",
    src: "/images/campus-hero.jpg",
    desc: "The classic brick exterior of the Uppal campus, erected in 1982 under Bro. James Pannivelil.",
  },
  {
    title: "Main Academic Block",
    src: "/images/campus-building.jpg",
    desc: "Classroom wings arranged around tree-lined courtyards for quiet, focused study.",
  },
  {
    title: "Administrative Wing",
    src: "/images/contact-campus.jpg",
    desc: "Offices of the Correspondent, Principal, and admissions counselors.",
  },
  {
    title: "Aerial Campus View",
    src: "/images/campus-drone.jpg",
    desc: "A drone perspective of the integrated academic and athletic grounds at Uppal.",
  },
];

const LABS = [
  {
    title: "Chemistry Laboratory",
    src: "/images/chemistry-lab.jpg",
    desc: "BIE-recognised chemistry lab with individual workstation benches and full apparatus.",
    badge: "BiPC & MPC",
  },
  {
    title: "Physics Laboratory",
    src: "/images/physics-lab.jpg",
    desc: "Practical physics laboratory outfitted for intermediate experimentation and board practicals.",
    badge: "MPC Stream",
  },
  {
    title: "Computer Laboratory",
    src: "/images/computer-lab.jpg",
    desc: "Modern computing facilities supporting digital literacy and programming fundamentals.",
    badge: "All Streams",
  },
];

export default function CampusFacilitiesPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Campus Life", href: "/campus" }, { label: "Facilities & Laboratories" }]} />
      </div>

      {/* Page Hero */}
      <section className="section-texture bg-white py-6 sm:py-8 md:py-12 border-b border-stone-texture/50">
        <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8">
          <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block">
            Campus Infrastructure
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
            Facilities & Laboratories
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            From the iconic heritage brick facade to purpose-built science laboratories and a well-stocked
            library — our facilities provide the infrastructure for world-class intermediate education.
          </p>
          <span className="gold-rule gold-rule-center !mt-3 sm:!mt-4" />
        </div>
      </section>

      {/* Campus Infrastructure */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="The Uppal Estate"
          title="Campus Infrastructure"
          description="Eight acres of carefully developed academic and athletic grounds in the heart of Uppal, Hyderabad."
        />
        <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.06}>
              <div className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-texture shadow-xs hover:shadow-panel-hover transition-all duration-300">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/85 via-academic-slate/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight mb-0.5 sm:mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] sm:text-xs leading-4 sm:leading-4 text-royal-cream/90 font-sans line-clamp-2">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Laboratories */}
      <Section variant="default" className="bg-royal-cream/20 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Academic Laboratories"
          title="State-of-the-Art Labs"
          description="BIE-recognised science and computing laboratories providing hands-on practical experience for all intermediate streams."
        />
        <div className="mt-5 sm:mt-6 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab, idx) => (
            <Reveal key={lab.title} delay={idx * 0.07}>
              <div className="group bg-white border border-stone-texture rounded-xl overflow-hidden hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={lab.src}
                    alt={lab.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-heritage-gold text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 sm:py-1 rounded-full">
                    {lab.badge}
                  </div>
                </div>
                <div className="p-3.5 sm:p-4">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate mb-1 group-hover:text-montfortian-blue transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans">{lab.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Library & Auditorium */}
      <Section variant="default" className="bg-white border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Campus Spaces"
          title="Library & St. Montfort Auditorium"
          description="Beyond classrooms and labs, LFJC provides dedicated spaces for scholarship, culture, and large student assemblies."
        />
        <div className="mt-5 sm:mt-6 grid gap-3.5 sm:gap-5 sm:grid-cols-2">
          {[
            {
              icon: "📚",
              title: "The LFJC Library",
              desc: "Our well-stocked library houses thousands of reference titles, intermediate board preparation materials, competitive examination guides, and periodicals. Open to all students throughout the academic day.",
              highlight: "Thousands of curated academic titles",
              src: "/images/library-heritage.jpg",
            },
            {
              icon: "🎭",
              title: "St. Montfort Auditorium",
              desc: "An air-conditioned multi-purpose auditorium for general assemblies, cultural programmes, career counseling seminars, and golden jubilee celebrations.",
              highlight: "Full AV-equipped venue for campus assemblies",
              src: "/images/events/montfort-auditorium-assembly.jpg",
            },
          ].map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08}>
              <div className="group bg-royal-cream/15 border border-stone-texture rounded-xl overflow-hidden hover:bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{item.icon}</div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate mb-1.5 sm:mb-2 group-hover:text-montfortian-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans mb-3 sm:mb-4 flex-1">{item.desc}</p>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-heritage-gold-strong">
                    <span className="w-3 h-0.5 bg-heritage-gold" />
                    {item.highlight}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="bg-white border-t border-stone-texture/40 py-6 sm:py-8 md:py-8">
        <Reveal className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Link
            href="/campus/sports"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans"
          >
            Sports & Athletics
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
