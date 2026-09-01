"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  HeartHandshake,
  Landmark,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

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
  { id: 106, src: "/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg", badge: "1976", title: "Dr. Emmanuel, Principal", category: "silver-jubilee" },
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

const CAMPUS_LABS_IMAGES: GalleryItem[] = [
  { id: 501, src: "/images/campus-drone.jpg", badge: "Campus", title: "Aerial view of campus", category: "campus" },
  { id: 502, src: "/images/campus-building.jpg", badge: "Campus", title: "Main academic block", category: "campus" },
  { id: 503, src: "/images/physics-lab.jpg", badge: "Lab", title: "Physics laboratory", category: "campus" },
  { id: 504, src: "/images/chemistry-lab.jpg", badge: "Lab", title: "Chemistry laboratory", category: "campus" },
  { id: 505, src: "/images/computer-lab.jpg", badge: "Lab", title: "Computer centre", category: "campus" },
  { id: 506, src: "/images/library-heritage.jpg", badge: "Library", title: "Reference library", category: "campus" },
  { id: 507, src: "/images/sports-arena.jpg", badge: "Sports", title: "Sports arena", category: "campus" },
];

const ALL_IMAGES: GalleryItem[] = [
  ...CAMPUS_LABS_IMAGES,
  ...SILVER_JUBILEE_IMAGES,
  ...GOLDEN_JUBILEE_IMAGES,
  ...ASSEMBLIES_IMAGES,
  ...SPORTS_IMAGES,
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
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-texture/50 bg-royal-cream text-left"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-navy/90 to-transparent p-2 sm:p-3">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-heritage-gold-bright font-sans">{item.badge}</span>
              <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight mt-0.5">{item.title}</p>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-heritage-gold-bright"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            disabled={lightbox === 0}
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ?? 0) - 1); }}
            className="absolute left-4 text-white disabled:opacity-30 hover:text-heritage-gold-bright"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            disabled={lightbox === items.length - 1}
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l ?? 0) + 1); }}
            className="absolute right-4 text-white disabled:opacity-30 hover:text-heritage-gold-bright"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]">
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

export function CampusLife({ activeInst = "lfjc" }: { activeInst?: "root" | "lfs" | "lfjc" | "lfdc" }) {
  void activeInst;
  return (
    <div id="campus" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-2 block">
              Campus Life
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
              Campus & Heritage
            </h1>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
              Visual archive of the LFJC campus, Silver Jubilee, Golden Jubilee, events, and sports.
            </p>
          </Reveal>
        </div>
      </Section>
      <Section id="campus" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <SectionHeading eyebrow="Campus" title="Campus & Labs" description="Eight-acre campus in Uppal." />
        <div className="mt-5 sm:mt-8">
          <GalleryGrid items={CAMPUS_LABS_IMAGES} />
        </div>
      </Section>
      <Section id="silver-jubilee" variant="default" className="bg-white">
        <SectionHeading eyebrow="1999" title="Silver Jubilee" description="25 years of LFJC." />
        <div className="mt-5 sm:mt-8">
          <GalleryGrid items={SILVER_JUBILEE_IMAGES} />
        </div>
      </Section>
      <Section id="golden-jubilee" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <SectionHeading eyebrow="2024" title="Golden Jubilee" description="50 years of LFJC." />
        <div className="mt-5 sm:mt-8">
          <GalleryGrid items={GOLDEN_JUBILEE_IMAGES} />
        </div>
      </Section>
      <Section id="events" variant="default" className="bg-white">
        <SectionHeading eyebrow="Activities" title="Events & Sports" description="Assemblies, seminars, tournaments." />
        <div className="mt-5 sm:mt-8 grid gap-8 sm:gap-10">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-3">Events & Seminars</h3>
            <GalleryGrid items={ASSEMBLIES_IMAGES} />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-3">Sports</h3>
            <GalleryGrid items={SPORTS_IMAGES} />
          </div>
        </div>
      </Section>
      <Section id="videos" variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <SectionHeading eyebrow="Footage" title="Golden Jubilee Videos" description="Recordings from the 50th anniversary." />
        <div className="mt-5 sm:mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
            <Reveal key={video.title} delay={idx * 0.05}>
              <div className="rounded-xl overflow-hidden border border-stone-texture/50 bg-white shadow-panel">
                <div className="relative aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-serif text-sm font-bold text-academic-slate">{video.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section variant="default" className="bg-white">
        <Reveal className="text-center">
          <Button asChild>
            <a href="/admissions" className="inline-flex items-center gap-2">
              Begin Admissions Inquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </Section>
    </div>
  );
}
