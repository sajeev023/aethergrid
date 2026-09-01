import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Sparkles,
  Building2,
  Trophy,
  Users,
  Film,
  Compass,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ChronologicalCampusArchive,
  VideoCard,
  type GalleryItem,
  type VideoItem,
} from "./gallery-client";

export const metadata: Metadata = {
  title: "Campus Life & Visual Archive",
  description:
    "Explore the complete chronological visual archive of Little Flower Junior College — from historic Silver & Golden Jubilee milestones to vibrant St. Montfort Auditorium assemblies, athletic championships, and science laboratories across our eight-acre Uppal campus.",
};

// ─── 1. SILVER JUBILEE (1999 • 25 Years of Excellence) ───────────────────────

const SILVER_JUBILEE_IMAGES: GalleryItem[] = [
  {
    id: 101,
    src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg",
    badge: "Founding Leadership • 1999",
    title: "1999 Silver Jubilee — Chief Minister Honors Founding Principals",
    desc: "Archival plate commemorating the 25th anniversary with Hon'ble CM N. Chandrababu Naidu honoring LFJC leadership.",
    category: "silver-jubilee",
  },
  {
    id: 102,
    src: "/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg",
    badge: "State Commendation • 1999",
    title: "1999 Silver Jubilee — Chief Minister's Official Commendation",
    desc: "Congratulatory message from Chief Minister N. Chandrababu Naidu on 25 years of excellence.",
    category: "silver-jubilee",
  },
  {
    id: 104,
    src: "/images/silver-jubilee/silver-jubilee-rank-holders.jpg",
    badge: "Academic Ledger • 1999",
    title: "1999 Silver Jubilee — All-India IIT & State Rank Holders Record",
    desc: "Archival ledger of 1st All-India IIT, EAMCET, and BIE Intermediate state toppers.",
    category: "silver-jubilee",
  },
  {
    id: 105,
    src: "/images/silver-jubilee/silver-jubilee-celebrations-report.jpg",
    badge: "Jubilee Souvenir • 1999",
    title: "1999 Silver Jubilee — Celebrations & Auditorium Report",
    desc: "Official summary of the Jubilee Auditorium inauguration and week-long festivities.",
    category: "silver-jubilee",
  },
];

// ─── 2. GOLDEN JUBILEE (1974–2024 • 50 Years of Truth & Service) ────────────

const GOLDEN_JUBILEE_IMAGES: GalleryItem[] = [
  {
    id: 201,
    src: "/images/golden-jubilee/golden_jubilee_1.jpg",
    badge: "50-Year Milestone • 1974–2024",
    title: "Golden Jubilee (1974–2024) — 50th Anniversary Grand Stage Celebration",
    desc: "Inaugural dance choreography and stage assembly celebrating 50 years of educational excellence.",
    category: "golden-jubilee",
  },
  {
    id: 202,
    src: "/images/golden-jubilee/golden_jubilee_2.jpg",
    badge: "Montfortian Dais • 2024",
    title: "Golden Jubilee — Dignitaries & Montfortian Leadership on Dais",
    desc: "Provincial leadership and guest dignitaries assembled on stage for the 50th year milestone.",
    category: "golden-jubilee",
  },
  {
    id: 203,
    src: "/images/golden-jubilee/golden_jubilee_3.jpg",
    badge: "Auspicious Inauguration • 2024",
    title: "Golden Jubilee — Lighting of the Ceremonial Lamp",
    desc: "Auspicious lighting of the lamp by esteemed dignitaries and Brothers of St. Gabriel.",
    category: "golden-jubilee",
  },
  {
    id: 205,
    src: "/images/golden-jubilee/golden_jubilee_5.jpg",
    badge: "Jubilee Release • 2024",
    title: "Golden Jubilee — Souvenir Release & Commemorative Unveiling",
    desc: "Official release of the 50-Year Golden Jubilee commemorative souvenir book.",
    category: "golden-jubilee",
  },
  {
    id: 207,
    src: "/images/golden-jubilee/golden_jubilee_7.jpg",
    badge: "Alumni Distinction • 2024",
    title: "Golden Jubilee — Distinguished Alumni Keynote Felicitation",
    desc: "Honoring eminent alumni who have achieved nationwide distinction in industry and public service.",
    category: "golden-jubilee",
  },
  {
    id: 210,
    src: "/images/golden-jubilee/golden_jubilee_10.jpg",
    badge: "Cultural Extravaganza • 2024",
    title: "Golden Jubilee — Traditional Cultural Dance Performance",
    desc: "Classical dance invocation by intermediate students celebrating five decades of heritage.",
    category: "golden-jubilee",
  },
];

// ─── 3A. ASSEMBLIES & SEMINARS ──────────────────────────────────────────────

const ASSEMBLIES_IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: "/images/events/montfort-auditorium-assembly.jpg",
    badge: "Auditorium Assembly",
    title: "St. Montfort Auditorium Full Student Assembly",
    desc: "Panoramic view of intermediate students assembled in the air-conditioned St. Montfort Auditorium.",
    category: "assemblies",
  },
  {
    id: 2,
    src: "/images/events/motivational-talk-session.jpg",
    badge: "Leadership Series",
    title: "Motivational Talk & Leadership Address",
    desc: "Dynamic keynote speaker engaging the student body with guidance on goal-setting, discipline, and purpose.",
    category: "assemblies",
  },
  {
    id: 3,
    src: "/images/events/interactive-student-session.jpg",
    badge: "Student Forum",
    title: "Interactive Student Stage Forum",
    desc: "Students participating actively on stage in live discussion, problem solving, and interactive Q&A.",
    category: "assemblies",
  },
  {
    id: 4,
    src: "/images/events/speaker-felicitation-memento.jpg",
    badge: "Guest Felicitation",
    title: "Speaker Felicitation & Memento Presentation",
    desc: "Senior college faculty presenting the official LFJC Golden Jubilee conference memento and kit to the guest speaker.",
    category: "assemblies",
  },
  {
    id: 5,
    src: "/images/events/student-co-curricular-assembly.jpg",
    badge: "Co-Curricular Delegation",
    title: "Co-Curricular Student Delegation",
    desc: "LFJC students in uniform seated attentively in St. Montfort Hall during guest orientation.",
    category: "assemblies",
  },
  {
    id: 6,
    src: "/images/events/career-guidance-seminar.jpg",
    badge: "Career Pathways",
    title: "Career Guidance & Professional Seminars",
    desc: "Chartered Accountancy and Commerce stream career orientation led by industry mentors.",
    category: "assemblies",
  },
  {
    id: 7,
    src: "/images/events/auditorium-speaker-address.jpg",
    badge: "Dais Perspective",
    title: "Auditorium Perspective & Stage View",
    desc: "Perspective view from behind the dais overlooking the assembled student delegation.",
    category: "assemblies",
  },
  {
    id: 8,
    src: "/images/events/distinguished-speaker-podium.jpg",
    badge: "Distinguished Address",
    title: "Distinguished Guest Speaker Address",
    desc: "Eminent speaker delivering an address on academic ethics and career pathways.",
    category: "assemblies",
  },
  {
    id: 9,
    src: "/images/events/auditorium-panorama.jpg",
    badge: "Hall Panorama",
    title: "St. Montfort Hall Panoramic Gathering",
    desc: "Wide-angle perspective of the student audience engaged in campus orientation.",
    category: "assemblies",
  },
  {
    id: 10,
    src: "/images/events/auditorium-girls-section.jpg",
    badge: "Academic Workshop",
    title: "Student Academic Circles & Notes",
    desc: "Intermediate students taking notes during specialized academic and career workshops.",
    category: "assemblies",
  },
  {
    id: 11,
    src: "/images/faculty-mentor.jpg",
    badge: "Faculty Mentorship",
    title: "Interactive Faculty Mentorship",
    desc: "Department mentors and subject heads providing personalized guidance.",
    category: "assemblies",
  },
];

// ─── 3B. SPORTS & ATHLETICS ─────────────────────────────────────────────────

const SPORTS_IMAGES: GalleryItem[] = [
  {
    id: 301,
    src: "/images/sports/volleyball-spike-action.jpg",
    badge: "Volleyball Tournament",
    title: "Volleyball Airborne Spike Action",
    desc: "High-flying spike over the net during competitive inter-house volleyball fixtures.",
    category: "sports",
  },
  {
    id: 302,
    src: "/images/sports/volleyball-court-action.jpg",
    badge: "Inter-House Rally",
    title: "Volleyball Inter-House Rally",
    desc: "High-energy defensive teamwork and court positioning on the outdoor sports arena.",
    category: "sports",
  },
  {
    id: 303,
    src: "/images/sports/volleyball-service-play.jpg",
    badge: "Service Formation",
    title: "Volleyball Match Service Formation",
    desc: "Player executing service against the collegiate main building backdrop.",
    category: "sports",
  },
  {
    id: 304,
    src: "/images/sports/volleyball-team-faculty-1.jpg",
    badge: "Team & Coaches",
    title: "Volleyball Squad & Physical Education Faculty",
    desc: "Tournament finalists assembled with academic faculty and sports directors.",
    category: "sports",
  },
  {
    id: 308,
    src: "/images/sports/basketball-court-match.jpg",
    badge: "Basketball Championship",
    title: "Basketball Championship Tournament Match",
    desc: "Inter-house basketball action on the outdoor collegiate court.",
    category: "sports",
  },
  {
    id: 309,
    src: "/images/sports/basketball-fastbreak-dribble.jpg",
    badge: "Fastbreak Drive",
    title: "Basketball Fast-Break Drive",
    desc: "Point guard cutting past defenders on the outdoor blue court.",
    category: "sports",
  },
  {
    id: 312,
    src: "/images/sports/basketball-team-squad.jpg",
    badge: "Basketball Squad",
    title: "Basketball Championship Squad",
    desc: "LFJC basketball team posing with coaching faculty on court.",
    category: "sports",
  },
  {
    id: 315,
    src: "/images/sports/basketball-coaching-freethrow.jpg",
    badge: "Shooting Clinic",
    title: "Athletic Coaching & Free-Throw Clinic",
    desc: "Physical Education director demonstrating proper shooting mechanics.",
    category: "sports",
  },
  {
    id: 317,
    src: "/images/sports/100m-sprint-action.jpg",
    badge: "Track & Field",
    title: "100m Track Sprint Heat",
    desc: "Athletes competing in the annual track sprint on the collegiate sports field.",
    category: "sports",
  },
  {
    id: 318,
    src: "/images/sports/athletics-sprint-finish.jpg",
    badge: "Sprint Finish",
    title: "Athletics Sprint Finish Line",
    desc: "High-intensity athletic finish line competition during annual sports meet.",
    category: "sports",
  },
  {
    id: 321,
    src: "/images/sports/relay-race-field.jpg",
    badge: "Baton Relay",
    title: "Track & Field Relay Heat",
    desc: "Students competing in inter-house baton relay heats.",
    category: "sports",
  },
  {
    id: 319,
    src: "/images/sports/sports-winners-1st-year.jpg",
    badge: "1st Year Champions",
    title: "1st Year 100m Sprint Champions",
    desc: "1st Year 100m sprint medalists celebrated with Principal Rev. Bro. Arun.",
    category: "sports",
  },
  {
    id: 320,
    src: "/images/sports/sports-winners-2nd-year.jpg",
    badge: "2nd Year Champions",
    title: "2nd Year 100m Sprint Champions",
    desc: "2nd Year 100m sprint finalists and champions on sports day.",
    category: "sports",
  },
  {
    id: 322,
    src: "/images/sports/spectators-campus-steps.jpg",
    badge: "Spectator Gallery",
    title: "Campus Spectator Gallery",
    desc: "Students cheering on their house teams from the shaded campus stands.",
    category: "sports",
  },
];

// ─── 3C. CAMPUS & LABORATORIES ──────────────────────────────────────────────

const CAMPUS_LABS_IMAGES: GalleryItem[] = [
  {
    id: 401,
    src: "/images/campus-drone.jpg",
    badge: "Eight-Acre Campus",
    title: "Eight-Acre Uppal Campus — Aerial View",
    desc: "Expansive eight-acre grounds featuring academic blocks, sports fields, and tree-lined avenues.",
    category: "campus",
  },
  {
    id: 402,
    src: "/images/campus-building.jpg",
    badge: "Collegiate Facade",
    title: "Main Academic Block & Heritage Facade",
    desc: "The landmark collegiate building designed for holistic intermediate education.",
    category: "campus",
  },
  {
    id: 403,
    src: "/images/physics-lab.jpg",
    badge: "Science Lab",
    title: "Advanced Physics Laboratory",
    desc: "Equipped with precision optical benches, spectrometers, and electrical test rigs.",
    category: "campus",
  },
  {
    id: 404,
    src: "/images/chemistry-lab.jpg",
    badge: "Science Lab",
    title: "Advanced Chemistry Laboratory",
    desc: "Complete analytical and organic chemistry workstations for MPC & BiPC streams.",
    category: "campus",
  },
  {
    id: 405,
    src: "/images/computer-lab.jpg",
    badge: "Digital Learning",
    title: "Modern Computer Centre",
    desc: "High-speed networked computing terminals and digital resource stations.",
    category: "campus",
  },
  {
    id: 406,
    src: "/images/library-heritage.jpg",
    badge: "Reference Library",
    title: "Central Reference Library & Reading Hall",
    desc: "Over 12,000 volumes, reference journals, competitive exam archives, and quiet study bays.",
    category: "campus",
  },
];

// ─── MASTER ORDERED ARCHIVE (Strict: Silver -> Golden -> Assemblies -> Sports -> Labs) ───

const ALL_MASTER_IMAGES: GalleryItem[] = [
  ...SILVER_JUBILEE_IMAGES,
  ...GOLDEN_JUBILEE_IMAGES,
  ...ASSEMBLIES_IMAGES,
  ...SPORTS_IMAGES,
  ...CAMPUS_LABS_IMAGES,
];

// ─── GOLDEN JUBILEE VIDEO ARCHIVES ──────────────────────────────────────────

const GOLDEN_JUBILEE_VIDEOS: VideoItem[] = [
  {
    title: "Alumni Meet & Golden Jubilee Reunion",
    embedUrl: "https://www.youtube.com/embed/uuTQ9vItJE0",
    watchUrl: "https://www.youtube.com/watch?v=uuTQ9vItJE0",
  },
  {
    title: "Arrival of Distinguished Guests & Dignitaries",
    embedUrl: "https://www.youtube.com/embed/UJas6-D--oQ",
    watchUrl: "https://www.youtube.com/watch?v=UJas6-D--oQ",
  },
  {
    title: "Lighting of the Ceremonial Lamp",
    embedUrl: "https://www.youtube.com/embed/SkLQC0VXkok",
    watchUrl: "https://www.youtube.com/watch?v=SkLQC0VXkok",
  },
  {
    title: "Patroness Prayer Song — St. Therese Feast",
    embedUrl: "https://www.youtube.com/embed/7Ssm9T5caT0",
    watchUrl: "https://www.youtube.com/watch?v=7Ssm9T5caT0",
  },
  {
    title: "Jubilee Welcome Dance Choreography",
    embedUrl: "https://www.youtube.com/embed/Oa_7j9xSH8I",
    watchUrl: "https://www.youtube.com/watch?v=Oa_7j9xSH8I",
  },
  {
    title: "Golden Jubilee Anthem & Choir Performance",
    embedUrl: "https://www.youtube.com/embed/NVwrYhVYU4I",
    watchUrl: "https://www.youtube.com/watch?v=NVwrYhVYU4I",
  },
];

// ─── Chapter Jump Items ─────────────────────────────────────────────────────

const CHAPTER_NAV = [
  { label: "01 Silver Jubilee (1999)", href: "#silver-jubilee", icon: Clock, count: SILVER_JUBILEE_IMAGES.length },
  { label: "02 Golden Jubilee (2024)", href: "#golden-jubilee", icon: Sparkles, count: GOLDEN_JUBILEE_IMAGES.length },
  { label: "Assemblies & Seminars", href: "#assemblies", icon: Users, count: ASSEMBLIES_IMAGES.length },
  { label: "Sports & Athletics", href: "#sports", icon: Trophy, count: SPORTS_IMAGES.length },
  { label: "Campus & Labs", href: "#campus-labs", icon: Building2, count: CAMPUS_LABS_IMAGES.length },
  { label: "Video Footage", href: "#videos", icon: Film, count: GOLDEN_JUBILEE_VIDEOS.length },
];

export default function CampusLifePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Campus Life & Visual Archives" }]} />
      </div>

      {/* ─── Hero & Editorial Prologue ────────────────────────────────────── */}
      <section className="section-texture bg-white py-8 sm:py-12 md:py-14 border-b border-stone-texture/50">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-gold-strong text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="h-3 w-3" />
            <span>Institutional Heritage Archive • 1974–Present</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-academic-slate tracking-tight">
            Campus Life &{" "}
            <span className="text-heritage-gold italic font-editorial font-normal">
              Visual Archives
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-2xl mx-auto">
            A chronological visual history of Little Flower Junior College across five decades of Montfortian excellence — 
            from the historic <strong>Silver Jubilee</strong> and landmark <strong>Golden Jubilee</strong> to our vibrant St. Montfort 
            Auditorium assemblies, athletic championships, and world-class science laboratories.
          </p>

          <span className="gold-rule gold-rule-center !mt-4 sm:!mt-5" />

          {/* Quick Chapter Navigation Bar */}
          <div className="mt-6 sm:mt-8 pt-5 border-t border-stone-texture/40">
            <div className="flex items-center justify-center gap-1.5 text-xs text-academic-slate/60 font-sans mb-3">
              <Compass className="h-3.5 w-3.5 text-heritage-gold" />
              <span className="font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                Archive Chapters ({ALL_MASTER_IMAGES.length} Photographs Total)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {CHAPTER_NAV.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.href}
                    href={ch.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-academic-slate/80 bg-royal-cream/40 hover:bg-montfortian-blue hover:text-white border border-stone-texture hover:border-montfortian-blue transition-all duration-300 font-sans shadow-xs group cursor-pointer"
                  >
                    <Icon className="h-3 w-3 text-heritage-gold group-hover:text-heritage-gold-bright transition-colors" />
                    <span>{ch.label}</span>
                    <span className="ml-0.5 text-[10px] font-mono opacity-60 group-hover:opacity-100">
                      ({ch.count})
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Chronological Visual Archive (Silver -> Golden -> Campus Life) ─ */}
      <Section variant="default" className="bg-white">
        <ChronologicalCampusArchive
          silverJubileeImages={SILVER_JUBILEE_IMAGES}
          goldenJubileeImages={GOLDEN_JUBILEE_IMAGES}
          assembliesImages={ASSEMBLIES_IMAGES}
          sportsImages={SPORTS_IMAGES}
          campusLabsImages={CAMPUS_LABS_IMAGES}
          allImages={ALL_MASTER_IMAGES}
        />
      </Section>

      {/* ─── Golden Jubilee Video Archive ─────────────────────────────────── */}
      <section id="videos" className="scroll-mt-28 bg-royal-cream/25 border-t border-stone-texture/50 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Milestone Footage"
            title="Golden Jubilee Documentary Archive"
            description="Watch recorded highlights from our 50th Anniversary cultural extravaganza, dignitary invocations, choir anthems, and alumni reunions."
          />

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
              <Reveal key={video.title} delay={idx * 0.05}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Admissions CTA ─────────────────────────────────────────── */}
      <Section variant="default" className="bg-academic-slate text-white border-t border-white/10 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Award className="h-8 w-8 sm:h-10 sm:w-10 text-heritage-gold mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Be Part of Our Five-Decade Living Legacy
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/80 font-sans max-w-xl mx-auto">
            Intermediate admissions for MPC, BiPC, MEC, and CEC streams are open for the 2026–27 academic year. 
            Join Little Flower Junior College and experience an institution built on 50 years of holistic excellence.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3">
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