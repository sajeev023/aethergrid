import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Sports & Athletics",
  description:
    "Explore LFJC's sports and athletics programme — inter-college football, cricket, basketball, annual sports meets, and a dedicated two-acre sports arena at Uppal, Hyderabad.",
};

const SPORTS_IMAGES = [
  { src: "/images/sports/100m-sprint-action.jpg", title: "100m Sprint Action", desc: "Female athletes competing in the annual 100-metre track sprint on the main athletic arena." },
  { src: "/images/sports/sports-winners-1st-year.jpg", title: "1st Year 100m Finalists", desc: "Principal Rev. Bro. Arun Prakash honoring 1st Year 100m sprint finalists and medalists." },
  { src: "/images/sports/sports-winners-2nd-year.jpg", title: "2nd Year 100m Finalists", desc: "Annual sports meet ceremony celebrating 2nd Year 100m athletic champions." },
  { src: "/images/sports/relay-race-field.jpg", title: "Track & Field Relay Heat", desc: "Male students competing in inter-house baton relay heats on the central sports arena." },
  { src: "/images/sports/spectators-campus-steps.jpg", title: "Campus Spectator Gallery", desc: "Students lined up along shaded outdoor steps supporting house competitors during sports day." },
  { src: "/images/sports/sports-ground-assembly.jpg", title: "Sports Ground Assembly", desc: "Athletes and sports faculty assembling on the sports grounds before athletic fixtures." },
  { src: "/images/sports/sports-arena-gallery-view.jpg", title: "Sports Day Spectator Stand", desc: "Full student audience watching annual sports day events from the shaded campus gallery." },
  { src: "/images/sports/sports-track-heats.jpg", title: "Annual Sprint Heats", desc: "Competitors sprinting towards the finish line in front of the main campus building." },
  { src: "/images/sports/athletics-sprint-finish.jpg", title: "Athletics Sprint Finish", desc: "High-intensity athletic finish line action during the annual sports meet." },
  { src: "/images/sports/sports-meet-competitors.jpg", title: "Inter-House Athletes", desc: "Students lined up for track event call-outs during collegiate sports competitions." },
  { src: "/images/sports/campus-sports-day-crowd.jpg", title: "Sports Day Atmosphere", desc: "Cheering student spectator sections during inter-house sports events." },
  { src: "/images/sports/field-event-action.jpg", title: "Outdoor Field Competitions", desc: "Field event action on the two-acre LFJC sports arena at Uppal." },
];

export default function CampusSportsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Campus Life", href: "/campus" }, { label: "Sports & Athletics" }]} />
      </div>

      {/* Page Hero */}
      <section className="relative min-h-auto lg:min-h-[44svh] flex flex-col justify-center overflow-hidden bg-academic-slate text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sports/100m-sprint-action.jpg"
            alt="LFJC Sports & Athletics"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-academic-slate/95 via-academic-slate/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-transparent to-academic-slate/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 w-full py-8 sm:py-10 md:py-14">
          <Reveal>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-bright uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2 sm:mb-3 block">
              Athletics Programme
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] sm:leading-[1.08] text-white tracking-tight">
              Sports &{" "}
              <span className="text-heritage-gold italic font-editorial font-normal">
                Athletics
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl border-l-2 border-heritage-gold pl-3.5 sm:pl-5 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/90 font-sans font-medium">
              LFJC nurtures physical excellence alongside academic achievement — our two-acre sports arena hosts inter-college tournaments, the annual sports meet, and year-round athletic coaching.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sports Ethos */}
      <Section variant="default" className="bg-white border-b border-stone-texture/40">
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-3">
          {[
            { label: "Sports Disciplines", value: "Cricket, Football, Basketball, Volleyball, Athletics" },
            { label: "Facilities", value: "Two-acre arena, athletic track, coaching nets, outdoor courts" },
            { label: "Annual Events", value: "Inter-house sports meet, inter-college tournaments, athletics day" },
          ].map((item) => (
            <Reveal key={item.label}>
              <div className="bg-royal-cream/20 border border-stone-texture rounded-xl p-3.5 sm:p-5 hover:border-heritage-gold/40 hover:bg-white transition-all duration-300">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong font-sans mb-1">
                  {item.label}
                </p>
                <p className="font-serif text-xs sm:text-sm font-semibold text-academic-slate leading-snug">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Photo Gallery */}
      <Section variant="default" className="bg-royal-cream/10">
        <SectionHeading
          eyebrow="Sports Gallery"
          title="LFJC in Action"
          description="Photographs from our sports meets, inter-college tournaments, and year-round athletic coaching sessions."
        />

        <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SPORTS_IMAGES.map((img, idx) => (
            <Reveal key={img.title} delay={idx * 0.03}>
              <div className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-texture shadow-xs hover:shadow-panel-hover transition-all duration-300">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/85 via-academic-slate/25 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-[11px] sm:text-xs font-bold text-white leading-tight line-clamp-1">{img.title}</h3>
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
            href="/campus/events"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans"
          >
            Events & Culture
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/campus/gallery"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Photo Gallery
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
