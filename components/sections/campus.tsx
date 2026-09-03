"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { goldenJubileeSchedule } from "@/lib/site-data";

export interface GalleryItem {
  id: number;
  src: string;
  badge: string;
  title: string;
  category: string;
}

export interface VideoItem {
  title: string;
  embedUrl: string;
  watchUrl: string;
}

const SILVER_JUBILEE_IMAGES: GalleryItem[] = [
  { id: 101, src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg", badge: "1999", title: "Silver Jubilee — Chief Minister honors LFJC Principals", category: "silver-jubilee" },
  { id: 102, src: "/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg", badge: "1999", title: "Chief Minister's commendation", category: "silver-jubilee" },
  { id: 103, src: "/images/silver-jubilee/silver-jubilee-governor-message.jpg", badge: "1999", title: "Governor's message", category: "silver-jubilee" },
  { id: 104, src: "/images/silver-jubilee/silver-jubilee-rank-holders.jpg", badge: "1999", title: "IIT & State Rank Holders record", category: "silver-jubilee" },
  { id: 105, src: "/images/silver-jubilee/silver-jubilee-bro-vincent-portrait.jpg", badge: "1974", title: "Founding Principal Rev. Bro. Vincent", category: "silver-jubilee" },
  { id: 106, src: "/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg", badge: "1976", title: "Rev. Bro. Emmanuel, Principal", category: "silver-jubilee" },
  { id: 107, src: "/images/silver-jubilee/silver-jubilee-bro-claude.jpg", badge: "1979", title: "Rev. Bro. Claude, Principal", category: "silver-jubilee" },
  { id: 108, src: "/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg", badge: "1983", title: "Rev. Bro. John Kallarackal, Principal", category: "silver-jubilee" },
  { id: 109, src: "/images/silver-jubilee/silver-jubilee-bro-celestine.jpg", badge: "1990", title: "Rev. Bro. Celestine, Principal", category: "silver-jubilee" },
  { id: 110, src: "/images/silver-jubilee/silver-jubilee-bro-george.jpg", badge: "1996", title: "Rev. Bro. M.A. George, Principal", category: "silver-jubilee" },
];

const GOLDEN_JUBILEE_IMAGES: GalleryItem[] = [
  { id: 201, src: "/images/golden-jubilee/golden_jubilee_1.jpg", badge: "2024", title: "Grand stage inauguration", category: "golden-jubilee" },
  { id: 202, src: "/images/golden-jubilee/golden_jubilee_2.jpg", badge: "2024", title: "Dignitaries on dais", category: "golden-jubilee" },
  { id: 203, src: "/images/golden-jubilee/golden_jubilee_3.jpg", badge: "2024", title: "Lighting of the lamp", category: "golden-jubilee" },
  { id: 204, src: "/images/golden-jubilee/golden_jubilee_5.jpg", badge: "2024", title: "Souvenir release", category: "golden-jubilee" },
  { id: 205, src: "/images/golden-jubilee/golden_jubilee_7.jpg", badge: "2024", title: "Distinguished alumni felicitation", category: "golden-jubilee" },
  { id: 206, src: "/images/golden-jubilee/golden_jubilee_10.jpg", badge: "2024", title: "Classical dance invocation", category: "golden-jubilee" },
  { id: 207, src: "/images/golden-jubilee/golden_jubilee_12.jpg", badge: "2024", title: "Thematic cultural presentation", category: "golden-jubilee" },
  { id: 208, src: "/images/golden-jubilee/golden_jubilee_14.jpg", badge: "2024", title: "Student choir & orchestra", category: "golden-jubilee" },
  { id: 209, src: "/images/golden-jubilee/golden_jubilee_18.jpg", badge: "2024", title: "Montfortian Brothers & faculty", category: "golden-jubilee" },
  { id: 210, src: "/images/golden-jubilee/golden_jubilee_20.jpg", badge: "2024", title: "Distinguished alumni awards", category: "golden-jubilee" },
  { id: 211, src: "/images/golden-jubilee/golden_jubilee_22.jpg", badge: "2024", title: "Alumni reunion", category: "golden-jubilee" },
  { id: 212, src: "/images/golden-jubilee/golden_jubilee_25.jpg", badge: "2024", title: "Honoring retired faculty", category: "golden-jubilee" },
  { id: 213, src: "/images/golden-jubilee/golden_jubilee_27.jpg", badge: "2024", title: "Principal's 50-year report", category: "golden-jubilee" },
  { id: 214, src: "/images/golden-jubilee/golden_jubilee_32.jpg", badge: "2024", title: "Grand finale", category: "golden-jubilee" },
  { id: 215, src: "/images/golden-jubilee/golden_jubilee_33.jpg", badge: "2024", title: "Concluding thanksgiving", category: "golden-jubilee" },
];

const CAMPUS_LABS_IMAGES: GalleryItem[] = [
  { id: 501, src: "/images/campus-drone.jpg", badge: "Campus", title: "Aerial view of 8-acre campus", category: "campus" },
  { id: 502, src: "/images/campus-building.jpg", badge: "Campus", title: "Main 3-storeyed academic block", category: "campus" },
  { id: 503, src: "/images/physics-lab.jpg", badge: "Lab", title: "Physics laboratory & competitive coaching", category: "campus" },
  { id: 504, src: "/images/chemistry-lab.jpg", badge: "Lab", title: "Chemistry laboratory", category: "campus" },
  { id: 505, src: "/images/computer-lab.jpg", badge: "Lab", title: "Computer centre & Humanities diploma", category: "campus" },
  { id: 506, src: "/images/library-heritage.jpg", badge: "Library", title: "Central reference library", category: "campus" },
  { id: 507, src: "/images/sports-arena.jpg", badge: "Sports", title: "Sports arena & playgrounds", category: "campus" },
];

const ASSEMBLIES_IMAGES: GalleryItem[] = [
  { id: 301, src: "/images/events/montfort-auditorium-assembly.jpg", badge: "Assembly", title: "St. Montfort Auditorium", category: "events" },
  { id: 302, src: "/images/events/motivational-talk-session.jpg", badge: "Seminar", title: "Motivational talk", category: "events" },
  { id: 303, src: "/images/events/career-guidance-seminar.jpg", badge: "Career", title: "Career guidance seminar", category: "events" },
  { id: 304, src: "/images/events/principal-felicitation-ceremony.jpg", badge: "Ceremony", title: "Principal felicitation", category: "events" },
  { id: 305, src: "/images/events/student-food-fest-stalls.jpg", badge: "Fest", title: "Student food fest", category: "events" },
  { id: 306, src: "/images/faculty-mentor.jpg", badge: "Mentorship", title: "Faculty mentorship", category: "events" },
];

const SPORTS_IMAGES: GalleryItem[] = [
  { id: 401, src: "/images/sports/volleyball-spike-action.jpg", badge: "Volleyball", title: "Volleyball spike", category: "sports" },
  { id: 402, src: "/images/sports/volleyball-team-faculty-1.jpg", badge: "Volleyball", title: "Volleyball squad", category: "sports" },
  { id: 403, src: "/images/sports/basketball-court-match.jpg", badge: "Basketball", title: "Basketball match", category: "sports" },
  { id: 404, src: "/images/sports/basketball-team-squad.jpg", badge: "Basketball", title: "Basketball squad", category: "sports" },
  { id: 405, src: "/images/sports/100m-sprint-action.jpg", badge: "Track", title: "100m sprint", category: "sports" },
  { id: 406, src: "/images/sports/relay-race-field.jpg", badge: "Track", title: "Relay race", category: "sports" },
  { id: 407, src: "/images/sports/sports-winners-1st-year.jpg", badge: "Winners", title: "1st Year champions", category: "sports" },
  { id: 408, src: "/images/sports/spectators-campus-steps.jpg", badge: "Spectators", title: "Campus spectators", category: "sports" },
];

const GOLDEN_JUBILEE_VIDEOS: VideoItem[] = [
  { title: "Alumni Meet & Golden Jubilee Reunion", embedUrl: "https://www.youtube.com/embed/uuTQ9vItJE0", watchUrl: "https://www.youtube.com/watch?v=uuTQ9vItJE0" },
  { title: "Arrival of Distinguished Guests", embedUrl: "https://www.youtube.com/embed/UJas6-D--oQ", watchUrl: "https://www.youtube.com/watch?v=UJas6-D--oQ" },
  { title: "Lighting of the Ceremonial Lamp", embedUrl: "https://www.youtube.com/embed/SkLQC0VXkok", watchUrl: "https://www.youtube.com/watch?v=SkLQC0VXkok" },
  { title: "Patroness Prayer Song", embedUrl: "https://www.youtube.com/embed/7Ssm9T5caT0", watchUrl: "https://www.youtube.com/watch?v=7Ssm9T5caT0" },
  { title: "Jubilee Welcome Dance", embedUrl: "https://www.youtube.com/embed/Oa_7j9xSH8I", watchUrl: "https://www.youtube.com/watch?v=Oa_7j9xSH8I" },
  { title: "Golden Jubilee Anthem", embedUrl: "https://www.youtube.com/embed/NVwrYhVYU4I", watchUrl: "https://www.youtube.com/watch?v=NVwrYhVYU4I" },
];

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(idx)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-texture/50 bg-royal-cream text-left shadow-xs hover:border-heritage-gold/60 transition-all"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/50 to-transparent p-2.5 sm:p-3">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-heritage-gold-bright font-sans">
                {item.badge}
              </span>
              <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight mt-0.5">
                {item.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            disabled={lightbox === 0}
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ?? 0) - 1); }}
            className="absolute left-4 p-2 text-white disabled:opacity-30 hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            disabled={lightbox === items.length - 1}
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ?? 0) + 1); }}
            className="absolute right-4 p-2 text-white disabled:opacity-30 hover:text-heritage-gold-bright transition-colors rounded-full bg-white/10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3] max-h-[85vh]">
            <Image
              src={items[lightbox].src}
              alt={items[lightbox].title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── 1. SILVER JUBILEE SUBPAGE VIEW ─────────────────────────────────────── */
export function SilverJubileeView() {
  return (
    <div className="bg-white">
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Historic 25-Year Milestone (1999)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Silver Jubilee Retrospective
            </h1>
            <p className="mt-2 text-sm sm:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Archival captures from the 25th anniversary celebrations, state honors by the Chief Minister, and IIT/State rank holders recognition.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="silver-jubilee" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Archival Records
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate mt-1">
                25 Years of Academic Excellence (1974–1999)
              </h2>
              <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
                Official honors, commendations from the Governor and Chief Minister, and founding Principal portraits:
              </p>
            </div>
            <div className="text-xs font-bold text-montfortian-blue bg-royal-cream px-3 py-1.5 rounded-full border border-stone-texture/40 shrink-0 font-sans">
              Silver Jubilee
            </div>
          </div>
          <GalleryGrid items={SILVER_JUBILEE_IMAGES} />
        </div>
      </Section>
    </div>
  );
}

/* ─── 2. GOLDEN JUBILEE SUBPAGE VIEW ─────────────────────────────────────── */
export function GoldenJubileeView() {
  return (
    <div className="bg-white">
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Historic 50-Year Milestone (1974–2024)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Golden Jubilee Celebrations
            </h1>
            <p className="mt-2 text-sm sm:text-base text-royal-cream/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Commemorating five decades of Montfortian education, global alumni reunions, retired faculty honors, and cultural presentations.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="golden-jubilee" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
                Celebration Gallery
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate mt-1">
                Jubilee Proceedings &amp; Reunions
              </h2>
              <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
                Visual highlights from the grand stage inauguration, dignitary honors, and alumni celebrations:
              </p>
            </div>
            <div className="text-xs font-bold text-montfortian-blue bg-royal-cream px-3 py-1.5 rounded-full border border-stone-texture/40 shrink-0 font-sans">
              50 Years of Excellence
            </div>
          </div>

          <GalleryGrid items={GOLDEN_JUBILEE_IMAGES} />

          {/* Official 22-Item Program Schedule (Verbatim from goldenjubilee.php) */}
          <div className="mt-12 bg-royal-cream/20 rounded-2xl border border-stone-texture/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-heritage-gold-strong" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">
                Official Golden Jubilee Celebration Program of Events
              </h3>
            </div>
            <p className="text-xs text-academic-slate/75 mb-6 font-sans">
              Order of proceedings conducted at the LFJC Golden Jubilee main stage:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {goldenJubileeSchedule.map((item, idx) => (
                <div
                  key={item}
                  className="bg-white p-3 rounded-lg border border-stone-texture/40 shadow-xs flex items-center gap-2.5 text-xs text-academic-slate font-sans"
                >
                  <span className="w-5 h-5 rounded-full bg-heritage-gold/20 text-montfortian-blue text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Official Golden Jubilee Videos Archive */}
      <Section id="videos" variant="default" className="bg-royal-cream/20 border-t border-stone-texture/30 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
            Video Archive
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1 mb-1">
            Official Celebration Videos &amp; Anthem
          </h2>
          <p className="text-xs sm:text-sm text-academic-slate/70 mb-6 font-sans">
            Live video recordings from the Little Flower Junior College Golden Jubilee ceremonies:
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
              <Reveal key={video.title} delay={idx * 0.04}>
                <div className="rounded-2xl overflow-hidden border border-stone-texture/50 bg-white shadow-xs hover:border-heritage-gold/60 transition-colors">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-bold text-academic-slate">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── 3. CAMPUS LIFE (CAMPUS & LABS + EVENTS & SPORTS COMBINED) ────────────── */
export function CampusLifeCombinedView() {
  return (
    <div className="bg-white">
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Campus &amp; Sports
            </h1>
          </Reveal>
        </div>
      </Section>

      {/* ─── SECTION 1: CAMPUS & LABS ──────────────────────────────────── */}
      <Section id="campus" variant="default" className="bg-white py-12 sm:py-16">
        <div id="campus-labs" className="mx-auto max-w-6xl scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate mt-1">
              Campus &amp; Laboratories Gallery
            </h2>
          </div>
          <GalleryGrid items={CAMPUS_LABS_IMAGES} />
        </div>


      </Section>

      {/* ─── SECTION 2: EVENTS & SPORTS ───────────────────────────────── */}
      <Section id="events" variant="default" className="bg-royal-cream/20 border-t border-stone-texture/30 py-12 sm:py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1 mb-1">
              Events, Seminars &amp; Assemblies
            </h2>
            <GalleryGrid items={ASSEMBLIES_IMAGES} />
          </div>

          <div id="sports" className="pt-8 border-t border-stone-texture/30 scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1 mb-1">
              Athletics &amp; Sports Tournaments
            </h2>
            <GalleryGrid items={SPORTS_IMAGES} />
          </div>
        </div>
      </Section>
    </div>
  );
}

/* Retain CampusLife for backward compatibility */
export function CampusLife({ activeInst = "lfjc" }: { activeInst?: "root" | "lfs" | "lfjc" | "lfdc" }) {
  void activeInst;
  return <CampusLifeCombinedView />;
}