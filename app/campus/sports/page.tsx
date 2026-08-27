import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Flame, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SportsGalleryClient, type SportsPhotoItem } from "./sports-gallery-client";

export const metadata: Metadata = {
  title: "Sports & Athletics",
  description:
    "Explore LFJC's sports and athletics programme — inter-college basketball, volleyball, athletics, annual sports meets, and a dedicated two-acre sports arena at Uppal, Hyderabad.",
};

const ALL_SPORTS_IMAGES: SportsPhotoItem[] = [
  // ─── Volleyball Tournament (New Photos) ──────────────────────────────────
  {
    id: "vb-1",
    src: "/images/sports/volleyball-spike-action.jpg",
    title: "Volleyball Airborne Spike",
    desc: "Athletic student leaping high for a powerful smash over the net during competitive inter-house volleyball championship.",
    category: "volleyball",
  },
  {
    id: "vb-2",
    src: "/images/sports/volleyball-court-action.jpg",
    title: "Volleyball Tournament Rally",
    desc: "High-energy defensive positioning and multi-point rally during the inter-house volleyball fixtures on the central grounds.",
    category: "volleyball",
  },
  {
    id: "vb-3",
    src: "/images/sports/volleyball-service-play.jpg",
    title: "Volleyball Match Service",
    desc: "Student setting up service and team formation against the backdrop of the main collegiate academic building.",
    category: "volleyball",
  },
  {
    id: "vb-4",
    src: "/images/sports/volleyball-referee-match.jpg",
    title: "Volleyball Match Officiating",
    desc: "Student sports referee officiating at the volleyball net during the collegiate sports meet tournament.",
    category: "volleyball",
  },
  {
    id: "vb-5",
    src: "/images/sports/volleyball-team-faculty-1.jpg",
    title: "Volleyball Squad & Faculty Delegation",
    desc: "Volleyball house finalists assembled with academic faculty and Physical Education directors by the net.",
    category: "teams",
  },
  {
    id: "vb-6",
    src: "/images/sports/volleyball-team-faculty-2.jpg",
    title: "Volleyball Inter-House Finalists",
    desc: "House volleyball finalists assembled with faculty mentors and sports coaches at the central net.",
    category: "teams",
  },
  {
    id: "vb-7",
    src: "/images/sports/volleyball-team-faculty-3.jpg",
    title: "Volleyball Tournament Competitors",
    desc: "Student volleyball competitors and faculty celebrating athletic camaraderie and sportsmanship on sports day.",
    category: "teams",
  },

  // ─── Basketball Tournament (New Photos) ──────────────────────────────────
  {
    id: "bb-1",
    src: "/images/sports/basketball-court-match.jpg",
    title: "Basketball Tournament Match",
    desc: "Inter-house basketball match underway on the outdoor sports court with student spectators looking on.",
    category: "basketball",
  },
  {
    id: "bb-2",
    src: "/images/sports/basketball-fastbreak-dribble.jpg",
    title: "Basketball Fast-Break Drive",
    desc: "Point guard executing a fast-break dribble past defenders under the guidance of sports faculty on the blue court.",
    category: "basketball",
  },
  {
    id: "bb-3",
    src: "/images/sports/basketball-attack-transition.jpg",
    title: "Basketball Transition Offense",
    desc: "Fast-paced offensive transition play during the annual collegiate inter-house basketball championship.",
    category: "basketball",
  },
  {
    id: "bb-4",
    src: "/images/sports/basketball-drive-to-hoop.jpg",
    title: "Basketball Drive to Basket",
    desc: "Competitor cutting towards the hoop through defensive pressure during annual tournament play.",
    category: "basketball",
  },
  {
    id: "bb-5",
    src: "/images/sports/basketball-team-squad.jpg",
    title: "Basketball Championship Squad",
    desc: "Basketball tournament finalists posing with Physical Education faculty and sports coordinators on court.",
    category: "teams",
  },
  {
    id: "bb-6",
    src: "/images/sports/basketball-finalists-celebration.jpg",
    title: "Basketball Finalists Celebration",
    desc: "LFJC basketball squad celebrating sports day achievements and teamwork on the campus basketball court.",
    category: "teams",
  },
  {
    id: "bb-7",
    src: "/images/sports/basketball-squad-faculty.jpg",
    title: "Basketball Team & Faculty Honors",
    desc: "Official group portrait of the LFJC basketball championship squad with department directors and PET coaches.",
    category: "teams",
  },

  // ─── Coaching & Skills Demonstrations (New Photos) ───────────────────────
  {
    id: "coach-1",
    src: "/images/sports/basketball-coaching-freethrow.jpg",
    title: "Basketball Coaching & Clinic",
    desc: "Physical Education instructor demonstrating free-throw shooting form, body balance, and technique to students.",
    category: "coaching",
  },
  {
    id: "coach-2",
    src: "/images/sports/basketball-shooting-clinic.jpg",
    title: "Athletic Coaching Demonstration",
    desc: "Physical Education director demonstrating proper basketball arc and release during collegiate sports clinic.",
    category: "coaching",
  },

  // ─── Athletics & Track & Field (Existing Collection) ─────────────────────
  {
    id: "track-1",
    src: "/images/sports/100m-sprint-action.jpg",
    title: "100m Athletic Track Sprint",
    desc: "Female athletes competing in the annual 100-metre track sprint on the main collegiate athletic arena.",
    category: "athletics",
  },
  {
    id: "track-2",
    src: "/images/sports/athletics-sprint-finish.jpg",
    title: "Athletics Sprint Finish Line",
    desc: "High-intensity athletic finish line action during the annual sports meet on the collegiate track.",
    category: "athletics",
  },
  {
    id: "track-3",
    src: "/images/sports/relay-race-field.jpg",
    title: "Track & Field Relay Heat",
    desc: "Male students competing in inter-house baton relay heats on the central two-acre sports arena.",
    category: "athletics",
  },
  {
    id: "track-4",
    src: "/images/sports/sports-track-heats.jpg",
    title: "Annual Sprint Heats",
    desc: "Competitors sprinting towards the finish line in front of the main LFJC campus building.",
    category: "athletics",
  },
  {
    id: "track-5",
    src: "/images/sports/sports-winners-1st-year.jpg",
    title: "1st Year 100m Finalists & Medalists",
    desc: "Principal Rev. Bro. Arun Prakash honoring 1st Year 100m sprint finalists and medalists.",
    category: "teams",
  },
  {
    id: "track-6",
    src: "/images/sports/sports-winners-2nd-year.jpg",
    title: "2nd Year 100m Champions",
    desc: "Annual sports meet ceremony celebrating 2nd Year 100m athletic champions with faculty dignitaries.",
    category: "teams",
  },
  {
    id: "track-7",
    src: "/images/sports/sports-meet-competitors.jpg",
    title: "Inter-House Competitors Assembly",
    desc: "Students lined up for track event call-outs during collegiate sports competitions.",
    category: "athletics",
  },
  {
    id: "track-8",
    src: "/images/sports/sports-ground-assembly.jpg",
    title: "Sports Ground Opening Assembly",
    desc: "Athletes and sports faculty assembling on the central sports grounds before athletic fixtures.",
    category: "athletics",
  },
  {
    id: "track-9",
    src: "/images/sports/spectators-campus-steps.jpg",
    title: "Campus Spectator Gallery",
    desc: "Students lined up along shaded outdoor steps supporting house competitors during sports day.",
    category: "athletics",
  },
  {
    id: "track-10",
    src: "/images/sports/sports-arena-gallery-view.jpg",
    title: "Sports Day Spectator Stand",
    desc: "Full student audience watching annual sports day events from the shaded campus gallery.",
    category: "athletics",
  },
  {
    id: "track-11",
    src: "/images/sports/campus-sports-day-crowd.jpg",
    title: "Sports Day Atmosphere",
    desc: "Cheering student spectator sections during inter-house sports tournaments and track fixtures.",
    category: "athletics",
  },
  {
    id: "track-12",
    src: "/images/sports/field-event-action.jpg",
    title: "Outdoor Field Competitions",
    desc: "Field event action on the two-acre LFJC sports arena at Uppal, Hyderabad.",
    category: "athletics",
  },
];

export default function CampusSportsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Campus Life", href: "/campus" }, { label: "Sports & Athletics" }]} />
      </div>

      {/* Page Hero */}
      <section className="relative min-h-auto lg:min-h-[46svh] flex flex-col justify-center overflow-hidden bg-academic-slate text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sports/volleyball-spike-action.jpg"
            alt="LFJC Sports & Athletics — Annual Sports Meet"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-academic-slate/95 via-academic-slate/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-transparent to-academic-slate/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 w-full py-8 sm:py-10 md:py-14">
          <Reveal>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-bright uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2 sm:mb-3 block">
              Athletics & Physical Excellence
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] sm:leading-[1.08] text-white tracking-tight">
              Sports &{" "}
              <span className="text-heritage-gold italic font-editorial font-normal">
                Athletics
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl border-l-2 border-heritage-gold pl-3.5 sm:pl-5 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/90 font-sans font-medium">
              LFJC cultivates sportsmanship, teamwork, and athletic excellence alongside academic rigor. Our two-acre sports arena hosts inter-house volleyball, basketball tournaments, annual track and field meets, and year-round coaching clinics.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sports Ethos */}
      <Section variant="default" className="bg-white border-b border-stone-texture/40">
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-3">
          {[
            { label: "Sports Disciplines", value: "Basketball, Volleyball, Cricket, Football, Track & Field Athletics" },
            { label: "Facilities & Courts", value: "Two-acre arena, dedicated basketball court, volleyball grounds, athletic track" },
            { label: "Tournaments & Clinics", value: "Annual sports meet, inter-house championships, PET coaching clinics" },
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

      {/* Featured Sports Spotlight Bento Grid */}
      <Section variant="default" className="bg-royal-cream/15 border-b border-stone-texture/40">
        <SectionHeading
          eyebrow="Athletic Pillars"
          title="Core Tournament Disciplines"
          description="A glimpse into the flagship sporting events hosted on the LFJC Uppal campus."
        />

        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
          {/* Card 1: Volleyball */}
          <Reveal delay={0.05}>
            <div className="group relative bg-white border border-stone-texture rounded-xl overflow-hidden shadow-xs hover:shadow-panel-hover transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/sports/volleyball-spike-action.jpg"
                  alt="LFJC Volleyball Championship"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-academic-slate/80 backdrop-blur-sm border border-white/20 text-heritage-gold-bright text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Flame className="h-3 w-3" /> Volleyball
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-1 group-hover:text-montfortian-blue transition-colors">
                    Inter-House Volleyball
                  </h3>
                  <p className="text-xs text-academic-slate/75 leading-relaxed font-sans">
                    Fast-paced rallies and jumping spikes on the outdoor volleyball grounds, drawing intense house rivalry and spirited student cheering.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-texture/40 text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong">
                  Annual Championship Fixtures
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Basketball */}
          <Reveal delay={0.1}>
            <div className="group relative bg-white border border-stone-texture rounded-xl overflow-hidden shadow-xs hover:shadow-panel-hover transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/sports/basketball-fastbreak-dribble.jpg"
                  alt="LFJC Basketball Championship"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-academic-slate/80 backdrop-blur-sm border border-white/20 text-heritage-gold-bright text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Trophy className="h-3 w-3" /> Basketball
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-1 group-hover:text-montfortian-blue transition-colors">
                    Basketball Tournament
                  </h3>
                  <p className="text-xs text-academic-slate/75 leading-relaxed font-sans">
                    Full-court fast-breaks, free-throw clinics, and inter-house playoffs on the dedicated outdoor blue basketball court.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-texture/40 text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong">
                  Outdoor Court League
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Athletics & Track */}
          <Reveal delay={0.15}>
            <div className="group relative bg-white border border-stone-texture rounded-xl overflow-hidden shadow-xs hover:shadow-panel-hover transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/sports/100m-sprint-action.jpg"
                  alt="LFJC Athletics & Track"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-academic-slate/80 backdrop-blur-sm border border-white/20 text-heritage-gold-bright text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Track & Field
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-1 group-hover:text-montfortian-blue transition-colors">
                    Annual Track & Field Meet
                  </h3>
                  <p className="text-xs text-academic-slate/75 leading-relaxed font-sans">
                    100m sprints, 4x100m relay heats, long jumps, and medal presentations celebrating the college&apos;s fastest intermediate athletes.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-texture/40 text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong">
                  Track Heats & Relay Cups
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Complete Interactive Photo Gallery */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Sports Gallery"
          title="LFJC in Action — Visual Archive"
          description="Explore high-resolution documentary photographs from our annual sports meet, basketball championships, volleyball fixtures, and coaching clinics. Click any photo for full-screen view."
        />

        <div className="mt-6 sm:mt-8">
          <SportsGalleryClient images={ALL_SPORTS_IMAGES} />
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="bg-royal-cream/15 border-t border-stone-texture/40 py-6 sm:py-8 md:py-8">
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
            Full Photo Gallery
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
