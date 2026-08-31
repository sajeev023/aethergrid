import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Clock, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { UnifiedCampusGallery, VideoCard, type GalleryItem, type VideoItem } from "./gallery-client";

export const metadata: Metadata = {
  title: "Campus Life & Visual Archive",
  description:
    "Explore the complete visual archive of Little Flower Junior College — historic Silver & Golden Jubilee milestones, St. Montfort Auditorium assemblies, athletic championships, and campus life across our eight-acre Uppal campus.",
};

// ─── Core Featured Heritage Showcases (Strict Order: Silver 1st, Golden 2nd) ─

const SILVER_JUBILEE_FEATURE = {
  id: 101,
  badge: "Milestone Archive • 1999",
  title: "Silver Jubilee — 25 Years of Educational Excellence",
  caption: "The Captains of LFJC Honoured by the Hon'ble Chief Minister",
  desc: "Rare archival portrait from the landmark 1999 Silver Jubilee celebrations at Uppal campus, commemorating founding principals Rev. Bro. Vincent, Dr. Emmanuel, Rev. Bro. Claude, Rev. Bro. John Kallarackal, Rev. Bro. Celestine, and Rev. Bro. M.A. George honoured by Hon'ble Chief Minister N. Chandrababu Naidu.",
  src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg",
  alt: "1999 Silver Jubilee — Chief Minister Honors LFJC Principals",
  category: "heritage" as const,
};

const GOLDEN_JUBILEE_FEATURE = {
  id: 201,
  badge: "Historic Milestone • 1974–2024",
  title: "Golden Jubilee — 50 Years of Truth & Service",
  caption: "Inaugural Cultural Extravaganza & Jubilee Choir on Main Stage",
  desc: "The grand Golden Jubilee cultural celebrations commemorating five decades of Montfortian academic excellence, bringing together thousands of students, faculty, alumni, and provincial dignitaries under the official banner of Truth, Virtue, and Wisdom.",
  src: "/images/golden-jubilee/golden_jubilee_1.jpg",
  alt: "Golden Jubilee Inaugural Ceremony & Stage Celebration",
  category: "heritage" as const,
};

// ─── Master Unified Gallery Items ───────────────────────────────────────────

const ALL_CAMPUS_GALLERY_IMAGES: GalleryItem[] = [
  // 1. SILVER JUBILEE (1st in archive)
  {
    id: 101,
    src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg",
    title: "1999 Silver Jubilee — Chief Minister Honors Founding Principals",
    desc: "Archival plate commemorating the 25th anniversary with Hon'ble CM N. Chandrababu Naidu honoring LFJC leadership.",
    category: "heritage",
  },
  // 2. GOLDEN JUBILEE (2nd in archive)
  {
    id: 201,
    src: "/images/golden-jubilee/golden_jubilee_1.jpg",
    title: "Golden Jubilee (1974–2024) — 50th Anniversary Grand Stage Celebration",
    desc: "Inaugural dance choreography and stage assembly celebrating 50 years of educational excellence.",
    category: "heritage",
  },

  // 3. ASSEMBLIES & STUDENT LIFE (From lite shot & campus events)
  {
    id: 1,
    src: "/images/events/montfort-auditorium-assembly.jpg",
    title: "St. Montfort Auditorium Full Student Assembly",
    desc: "Panoramic view of intermediate students assembled in the air-conditioned St. Montfort Auditorium.",
    category: "assemblies",
  },
  {
    id: 2,
    src: "/images/events/motivational-talk-session.jpg",
    title: "Motivational Talk & Leadership Address",
    desc: "Dynamic keynote speaker engaging the student body with guidance on goal-setting, discipline, and purpose.",
    category: "assemblies",
  },
  {
    id: 3,
    src: "/images/events/interactive-student-session.jpg",
    title: "Interactive Student Stage Forum",
    desc: "Students participating actively on stage in live discussion, problem solving, and interactive Q&A.",
    category: "assemblies",
  },
  {
    id: 4,
    src: "/images/events/speaker-felicitation-memento.jpg",
    title: "Speaker Felicitation & Memento Presentation",
    desc: "Senior college faculty presenting the official LFJC Golden Jubilee conference memento and kit to the guest speaker.",
    category: "assemblies",
  },
  {
    id: 5,
    src: "/images/events/student-co-curricular-assembly.jpg",
    title: "Co-Curricular Student Delegation",
    desc: "LFJC students in uniform seated attentively in St. Montfort Hall during guest orientation.",
    category: "assemblies",
  },
  {
    id: 6,
    src: "/images/events/career-guidance-seminar.jpg",
    title: "Career Guidance & Professional Seminars",
    desc: "Chartered Accountancy and Commerce stream career orientation led by industry mentors.",
    category: "assemblies",
  },
  {
    id: 7,
    src: "/images/events/auditorium-speaker-address.jpg",
    title: "Auditorium Perspective & Stage View",
    desc: "Perspective view from behind the dais overlooking the assembled student delegation.",
    category: "assemblies",
  },
  {
    id: 8,
    src: "/images/events/distinguished-speaker-podium.jpg",
    title: "Distinguished Guest Speaker Address",
    desc: "Eminent speaker delivering an address on academic ethics and career pathways.",
    category: "assemblies",
  },
  {
    id: 9,
    src: "/images/events/auditorium-panorama.jpg",
    title: "St. Montfort Hall Panoramic Gathering",
    desc: "Wide-angle perspective of the student audience engaged in campus orientation.",
    category: "assemblies",
  },
  {
    id: 10,
    src: "/images/events/auditorium-girls-section.jpg",
    title: "Student Academic Circles & Notes",
    desc: "Intermediate students taking notes during specialized academic and career workshops.",
    category: "assemblies",
  },
  {
    id: 11,
    src: "/images/faculty-mentor.jpg",
    title: "Interactive Faculty Mentorship",
    desc: "Department mentors and subject heads providing personalized guidance.",
    category: "assemblies",
  },

  // 4. SPORTS & ATHLETICS
  {
    id: 301,
    src: "/images/sports/volleyball-spike-action.jpg",
    title: "Volleyball Airborne Spike Action",
    desc: "High-flying spike over the net during competitive inter-house volleyball fixtures.",
    category: "sports",
  },
  {
    id: 302,
    src: "/images/sports/volleyball-court-action.jpg",
    title: "Volleyball Inter-House Rally",
    desc: "High-energy defensive teamwork and court positioning on the outdoor sports arena.",
    category: "sports",
  },
  {
    id: 303,
    src: "/images/sports/volleyball-service-play.jpg",
    title: "Volleyball Match Service Formation",
    desc: "Player executing service against the collegiate main building backdrop.",
    category: "sports",
  },
  {
    id: 304,
    src: "/images/sports/volleyball-team-faculty-1.jpg",
    title: "Volleyball Squad & Physical Education Faculty",
    desc: "Tournament finalists assembled with academic faculty and sports directors.",
    category: "sports",
  },
  {
    id: 308,
    src: "/images/sports/basketball-court-match.jpg",
    title: "Basketball Championship Tournament Match",
    desc: "Inter-house basketball action on the outdoor collegiate court.",
    category: "sports",
  },
  {
    id: 309,
    src: "/images/sports/basketball-fastbreak-dribble.jpg",
    title: "Basketball Fast-Break Drive",
    desc: "Point guard cutting past defenders on the outdoor blue court.",
    category: "sports",
  },
  {
    id: 312,
    src: "/images/sports/basketball-team-squad.jpg",
    title: "Basketball Championship Squad",
    desc: "LFJC basketball team posing with coaching faculty on court.",
    category: "sports",
  },
  {
    id: 315,
    src: "/images/sports/basketball-coaching-freethrow.jpg",
    title: "Athletic Coaching & Free-Throw Clinic",
    desc: "Physical Education director demonstrating proper shooting mechanics.",
    category: "sports",
  },
  {
    id: 317,
    src: "/images/sports/100m-sprint-action.jpg",
    title: "100m Track Sprint Heat",
    desc: "Athletes competing in the annual track sprint on the collegiate sports field.",
    category: "sports",
  },
  {
    id: 318,
    src: "/images/sports/athletics-sprint-finish.jpg",
    title: "Athletics Sprint Finish Line",
    desc: "High-intensity athletic finish line competition during annual sports meet.",
    category: "sports",
  },
  {
    id: 321,
    src: "/images/sports/relay-race-field.jpg",
    title: "Track & Field Relay Heat",
    desc: "Students competing in inter-house baton relay heats.",
    category: "sports",
  },
  {
    id: 319,
    src: "/images/sports/sports-winners-1st-year.jpg",
    title: "1st Year 100m Sprint Champions",
    desc: "1st Year 100m sprint medalists celebrated with Principal Rev. Bro. Arun.",
    category: "sports",
  },
  {
    id: 320,
    src: "/images/sports/sports-winners-2nd-year.jpg",
    title: "2nd Year 100m Sprint Champions",
    desc: "2nd Year 100m sprint finalists and champions on sports day.",
    category: "sports",
  },
  {
    id: 322,
    src: "/images/sports/spectators-campus-steps.jpg",
    title: "Campus Spectator Gallery",
    desc: "Students cheering on their house teams from the shaded campus stands.",
    category: "sports",
  },

  // 5. CAMPUS INFRASTRUCTURE & LABORATORIES
  {
    id: 401,
    src: "/images/campus-drone.jpg",
    title: "Eight-Acre Uppal Campus — Aerial View",
    desc: "Expansive eight-acre grounds featuring academic blocks, sports fields, and tree-lined avenues.",
    category: "campus",
  },
  {
    id: 402,
    src: "/images/campus-building.jpg",
    title: "Main Academic Block & Heritage Facade",
    desc: "The landmark collegiate building designed for holistic intermediate education.",
    category: "campus",
  },
  {
    id: 403,
    src: "/images/physics-lab.jpg",
    title: "Advanced Physics Laboratory",
    desc: "Equipped with precision optical benches, spectrometers, and electrical test rigs.",
    category: "campus",
  },
  {
    id: 404,
    src: "/images/chemistry-lab.jpg",
    title: "Advanced Chemistry Laboratory",
    desc: "Complete analytical and organic chemistry workstations for MPC & BiPC streams.",
    category: "campus",
  },
  {
    id: 405,
    src: "/images/computer-lab.jpg",
    title: "Modern Computer Centre",
    desc: "High-speed networked computing terminals and digital resource stations.",
    category: "campus",
  },
  {
    id: 406,
    src: "/images/library-heritage.jpg",
    title: "Central Reference Library & Reading Hall",
    desc: "Over 12,000 volumes, reference journals, competitive exam archives, and quiet study bays.",
    category: "campus",
  },

  // 6. ADDITIONAL HISTORICAL & GOLDEN JUBILEE ARCHIVES
  {
    id: 102,
    src: "/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg",
    title: "1999 Silver Jubilee — Chief Minister's Official Commendation",
    desc: "Congratulatory message from Chief Minister N. Chandrababu Naidu on 25 years of excellence.",
    category: "heritage",
  },
  {
    id: 104,
    src: "/images/silver-jubilee/silver-jubilee-rank-holders.jpg",
    title: "1999 Silver Jubilee — All-India IIT & State Rank Holders Record",
    desc: "Archival ledger of 1st All-India IIT, EAMCET, and BIE Intermediate state toppers.",
    category: "heritage",
  },
  {
    id: 105,
    src: "/images/silver-jubilee/silver-jubilee-celebrations-report.jpg",
    title: "1999 Silver Jubilee — Celebrations & Auditorium Report",
    desc: "Official summary of the Jubilee Auditorium inauguration and week-long festivities.",
    category: "heritage",
  },
  {
    id: 202,
    src: "/images/golden-jubilee/golden_jubilee_2.jpg",
    title: "Golden Jubilee — Dignitaries & Montfortian Leadership on Dais",
    desc: "Provincial leadership and guest dignitaries assembled on stage for the 50th year milestone.",
    category: "heritage",
  },
  {
    id: 203,
    src: "/images/golden-jubilee/golden_jubilee_3.jpg",
    title: "Golden Jubilee — Lighting of the Ceremonial Lamp",
    desc: "Auspicious lighting of the lamp by esteemed dignitaries and Brothers of St. Gabriel.",
    category: "heritage",
  },
  {
    id: 205,
    src: "/images/golden-jubilee/golden_jubilee_5.jpg",
    title: "Golden Jubilee — Souvenir Release & Commemorative Unveiling",
    desc: "Official release of the 50-Year Golden Jubilee commemorative souvenir book.",
    category: "heritage",
  },
  {
    id: 207,
    src: "/images/golden-jubilee/golden_jubilee_7.jpg",
    title: "Golden Jubilee — Distinguished Alumni Keynote Felicitation",
    desc: "Honoring eminent alumni who have achieved nationwide distinction in industry and public service.",
    category: "heritage",
  },
  {
    id: 210,
    src: "/images/golden-jubilee/golden_jubilee_10.jpg",
    title: "Golden Jubilee — Traditional Cultural Dance Performance",
    desc: "Classical dance invocation by intermediate students celebrating five decades of heritage.",
    category: "heritage",
  },
];

const GOLDEN_JUBILEE_VIDEOS: VideoItem[] = [
  { title: "Alumni Meet & Golden Jubilee Reunion", embedUrl: "https://www.youtube.com/embed/uuTQ9vItJE0", watchUrl: "https://www.youtube.com/watch?v=uuTQ9vItJE0" },
  { title: "Arrival of Distinguished Guests & Dignitaries", embedUrl: "https://www.youtube.com/embed/UJas6-D--oQ", watchUrl: "https://www.youtube.com/watch?v=UJas6-D--oQ" },
  { title: "Lighting of the Ceremonial Lamp", embedUrl: "https://www.youtube.com/embed/SkLQC0VXkok", watchUrl: "https://www.youtube.com/watch?v=SkLQC0VXkok" },
  { title: "Patroness Prayer Song — St. Therese Feast", embedUrl: "https://www.youtube.com/embed/7Ssm9T5caT0", watchUrl: "https://www.youtube.com/watch?v=7Ssm9T5caT0" },
  { title: "Jubilee Welcome Dance Choreography", embedUrl: "https://www.youtube.com/embed/Oa_7j9xSH8I", watchUrl: "https://www.youtube.com/watch?v=Oa_7j9xSH8I" },
  { title: "Golden Jubilee Anthem & Choir Performance", embedUrl: "https://www.youtube.com/embed/NVwrYhVYU4I", watchUrl: "https://www.youtube.com/watch?v=NVwrYhVYU4I" },
];

export default function CampusLifePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Campus Life" }]} />
      </div>

      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="section-texture bg-white py-8 sm:py-12 md:py-14 border-b border-stone-texture/50">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-gold-strong text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="h-3 w-3" />
            <span>Complete Photographic & Heritage Archive</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-academic-slate tracking-tight">
            Campus Life &{" "}
            <span className="text-heritage-gold italic font-editorial font-normal">
              Visual Archives
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-2xl mx-auto">
            Explore the living heritage of Little Flower Junior College across five decades — from our historic
            <strong> Silver Jubilee</strong> and landmark <strong> Golden Jubilee</strong> celebrations to vibrant auditorium assemblies,
            motivational guest lectures, athletic championships, and world-class science laboratories.
          </p>

          <span className="gold-rule gold-rule-center !mt-4 sm:!mt-5" />
        </div>
      </section>

      {/* ─── Prominent Heritage Showcase (Silver 1st, Golden 2nd) ─────────── */}
      <Section variant="dense" className="bg-royal-cream/25 border-b border-stone-texture/40">
        <SectionHeading
          align="center"
          eyebrow="Montfortian Heritage"
          title="Milestone Jubilee Archives"
          description="Honoring five decades of institutional excellence — the founding leadership celebrated at 25 years and our landmark 50-year Golden Jubilee."
        />

        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {/* 1st: SILVER JUBILEE */}
          <Reveal delay={0.05}>
            <div className="group flex flex-col h-full bg-white border-2 border-heritage-gold/40 rounded-2xl overflow-hidden shadow-panel hover:shadow-panel-hover transition-all duration-300">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-academic-slate overflow-hidden">
                <Image
                  src={SILVER_JUBILEE_FEATURE.src}
                  alt={SILVER_JUBILEE_FEATURE.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/90 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-academic-slate/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <Clock className="h-3 w-3 text-heritage-gold-bright" />
                  {SILVER_JUBILEE_FEATURE.badge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-bright font-sans block mb-0.5">
                    1st • Historical Foundation
                  </span>
                  <p className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {SILVER_JUBILEE_FEATURE.caption}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                    {SILVER_JUBILEE_FEATURE.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans">
                    {SILVER_JUBILEE_FEATURE.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-texture/40 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                    25-Year Institutional Record
                  </span>
                  <span className="text-xs font-semibold text-montfortian-blue font-sans">
                    Uppal Campus • 1999
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2nd: GOLDEN JUBILEE */}
          <Reveal delay={0.1}>
            <div className="group flex flex-col h-full bg-white border-2 border-heritage-gold/40 rounded-2xl overflow-hidden shadow-panel hover:shadow-panel-hover transition-all duration-300">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-academic-slate overflow-hidden">
                <Image
                  src={GOLDEN_JUBILEE_FEATURE.src}
                  alt={GOLDEN_JUBILEE_FEATURE.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/90 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-academic-slate/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <Sparkles className="h-3 w-3 text-heritage-gold-bright" />
                  {GOLDEN_JUBILEE_FEATURE.badge}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-bright font-sans block mb-0.5">
                    2nd • Landmark 50-Year Extravaganza
                  </span>
                  <p className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {GOLDEN_JUBILEE_FEATURE.caption}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                    {GOLDEN_JUBILEE_FEATURE.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans">
                    {GOLDEN_JUBILEE_FEATURE.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-texture/40 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                    50-Year Landmark Jubilee
                  </span>
                  <span className="text-xs font-semibold text-montfortian-blue font-sans">
                    1974–2024 Celebration
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── Master Unified Gallery Section ───────────────────────────────── */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Visual Collection"
          title="The Complete College Gallery"
          description="Browse our comprehensive photographic archive with filter categories for jubilees, auditorium assemblies, sports tournaments, and campus laboratories. Click any image to view in high resolution."
        />

        <div className="mt-6 sm:mt-8">
          <UnifiedCampusGallery images={ALL_CAMPUS_GALLERY_IMAGES} />
        </div>
      </Section>

      {/* ─── Golden Jubilee Video Archive ─────────────────────────────────── */}
      <Section variant="dense" className="bg-royal-cream/15 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Documentary Footage"
          title="Golden Jubilee Videos in Motion"
          description="Watch recorded highlights from our 50th Anniversary cultural extravaganza, alumni assemblies, and celebratory choir anthems."
        />

        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
            <Reveal key={video.title} delay={idx * 0.05}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Quick Navigation & Admissions CTA ────────────────────────────── */}
      <Section variant="default" className="bg-academic-slate text-white border-t border-white/10 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Award className="h-8 w-8 sm:h-10 sm:w-10 text-heritage-gold mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
            Be Part of Our Five-Decade Living Legacy
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/80 font-sans max-w-xl mx-auto">
            Intermediate admissions for MPC, BiPC, MEC, and CEC streams are open for the 2026–27 academic year. Begin your journey with Little Flower Junior College today.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans shadow-md"
            >
              Begin Admissions Inquiry
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/about/history"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans"
            >
              Read Institutional History
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}