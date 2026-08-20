import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { GalleryGrid, VideoCard } from "./gallery-client";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "The complete photographic archive of Little Flower Junior College — Golden Jubilee celebrations, Silver Jubilee archives, campus life, and institutional milestones.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAMPUS_LIFE_IMAGES = [
  { id: 1, src: "/images/events/montfort-auditorium-assembly.jpg", title: "St. Montfort Auditorium Assembly", desc: "Full student body assembled in the air-conditioned St. Montfort Auditorium." },
  { id: 2, src: "/images/events/principal-felicitation-ceremony.jpg", title: "Leadership & Dignitary Felicitation", desc: "Principal Rev. Bro. Arun Prakash honoring distinguished guests." },
  { id: 3, src: "/images/events/student-food-fest-stalls.jpg", title: "Cultural Food Fest & Student Stalls", desc: "Female students presenting culinary stalls during campus fest." },
  { id: 4, src: "/images/events/distinguished-speaker-podium.jpg", title: "Guest Lecture Series", desc: "Eminent guest speaker addressing students from the podium." },
  { id: 5, src: "/images/events/bro-arun-memento-presentation.jpg", title: "Memento Presentation", desc: "Principal Bro. Arun presenting official memento to visiting guest." },
  { id: 6, src: "/images/events/auditorium-speaker-address.jpg", title: "Interactive Student Orientation", desc: "Guest speaker conducting interactive session with students in Montfort Hall." },
  { id: 7, src: "/images/alumni-group.jpg", title: "Alumni Reunions", desc: "Annual campus reunions connecting the 15,000+ global alumni network." },
  { id: 8, src: "/images/faculty-mentor.jpg", title: "Faculty Mentoring", desc: "HODs and department mentors conducting interactive guidance." },
];

const ANNUAL_SPORTS_IMAGES = [
  { id: 301, src: "/images/sports/100m-sprint-action.jpg", title: "100m Athletic Track Sprint", desc: "Female athletes competing in annual track sprint heat." },
  { id: 302, src: "/images/sports/sports-winners-1st-year.jpg", title: "1st Year 100m Champions", desc: "1st Year 100m sprint finalists and medalists with Principal Bro. Arun." },
  { id: 303, src: "/images/sports/sports-winners-2nd-year.jpg", title: "2nd Year 100m Champions", desc: "2nd Year 100m sprint finalists celebrated on sports day." },
  { id: 304, src: "/images/sports/relay-race-field.jpg", title: "Track & Field Relay Heat", desc: "Male students competing in inter-house baton relay heats." },
  { id: 305, src: "/images/sports/spectators-campus-steps.jpg", title: "Campus Spectator Gallery", desc: "Student audience cheering house competitors from shaded steps." },
  { id: 306, src: "/images/sports/sports-ground-assembly.jpg", title: "Sports Ground Assembly", desc: "Athletes and sports faculty assembling on the central sports ground." },
  { id: 307, src: "/images/sports/sports-arena-gallery-view.jpg", title: "Sports Arena Spectator View", desc: "Spectators watching annual athletic events from shaded stands." },
  { id: 308, src: "/images/sports/sports-track-heats.jpg", title: "Sprint Finish Line", desc: "Sprint heats approaching finish line in front of main building." },
];

const SILVER_JUBILEE_IMAGES = [
  { id: 101, src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg", title: "1999 Silver Jubilee — Chief Minister Honors Principals", desc: "Hon'ble Chief Minister N. Chandrababu Naidu conferring Silver Jubilee honors to LFJC Principals." },
  { id: 102, src: "/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg", title: "1999 Silver Jubilee — Chief Minister's Official Message", desc: "Official congratulatory message from Chief Minister N. Chandrababu Naidu for the 25th Anniversary." },
  { id: 103, src: "/images/silver-jubilee/silver-jubilee-bro-britto-report.jpg", title: "1999 Silver Jubilee — Institutional History & Uppal Report", desc: "Bro. Britto's Silver Jubilee report detailing the 1982 move to Uppal and co-education introduction." },
  { id: 104, src: "/images/silver-jubilee/silver-jubilee-rank-holders.jpg", title: "1999 Silver Jubilee — All-India IIT & Board Rank Holders", desc: "Archival record of 1st All-India IIT, EAMCET, and BIE Intermediate state rank holders." },
  { id: 105, src: "/images/silver-jubilee/silver-jubilee-celebrations-report.jpg", title: "1999 Silver Jubilee — Auditorium & Celebrations Report", desc: "Official summary of the Jubilee Auditorium inauguration and week-long celebrations." },
  { id: 106, src: "/images/silver-jubilee/silver-jubilee-devender-goud-message.jpg", title: "1999 Silver Jubilee — Message from Home Minister", desc: "Official Silver Jubilee message from Sri Devender Goud, AP Home Minister and LFJC Parent." },
  { id: 107, src: "/images/silver-jubilee/silver-jubilee-bro-george-interview.jpg", title: "1999 Silver Jubilee — Principal Bro. M.A. George Interview", desc: "Archival interview with Rev. Bro. M.A. George on academic standards and character formation." },
  { id: 108, src: "/images/silver-jubilee/silver-jubilee-captains-history-1.jpg", title: "1999 Silver Jubilee — Captains of LFJC History", desc: "Historical document commemorating the principals who led LFJC across its first 25 years." },
];

const GOLDEN_JUBILEE_TITLES = [
  "Golden Jubilee Inaugural Ceremony & Stage Assembly",
  "Dignitaries & Montfortian Leadership on Dais",
  "Lighting of the Ceremonial Lamp by Distinguished Guests",
  "Welcome Address & Montfortian Heritage Commemoration",
  "Golden Jubilee Souvenir Release & Unveiling",
  "Faculty Honors & Long-Standing Service Recognition",
  "Distinguished Alumni Felicitation & Keynote",
  "Montfort Auditorium Student Delegation & Gathering",
  "Golden Jubilee Commemorative Plaque & Address",
  "Cultural Invocation & Traditional Classical Dance",
  "Student Choir Performance — Jubilee Anthem",
  "Interactive Heritage Exhibition & Archival Showcase",
  "Chief Guests Addressing Intermediate Students",
  "Campus Blessing & Golden Jubilee Thanksgiving",
  "Inter-House Cultural Competitions & Trophies",
  "Presidential Address by Provincial Superior",
  "Celebratory Milestone Cake Cutting & Honors",
  "Science & Humanities Academic Project Display",
  "Alumni Gathering & Multi-Decade Batch Reunion",
  "Sports Champions & Athletic Medalists Felicitation",
  "Parent-Teacher Delegation & Community Assembly",
  "Montfortian Educational Philosophy Presentation",
  "Golden Jubilee Memorial Tree Plantation",
  "Student Council Leadership Investiture & Banner",
  "Special Musical Performance by LFJC Band",
  "Distinguished Educator Lifetime Achievement Honors",
  "Golden Jubilee Campus Illuminations & Evening Fest",
  "Student Art, Literary & Creative Writing Pavilion",
  "Montfort Hall Audience & Academic Dignitaries",
  "Golden Jubilee Valedictory & Vote of Thanks",
  "National Anthem & Flag Salutation Ceremony",
  "Faculty & Staff Jubilee Commemorative Portrait",
  "Golden Jubilee Historical Monument & Campus Grounds",
];

const GOLDEN_JUBILEE_IMAGES = Array.from({ length: 33 }, (_, i) => ({
  id: 200 + i + 1,
  title: GOLDEN_JUBILEE_TITLES[i] || `Golden Jubilee Celebration — Uppal Campus`,
  src: `/images/golden-jubilee/golden_jubilee_${i + 1}.jpg`,
  desc: "Official documentary photograph from the LFJC Golden Jubilee celebrations (1974–2024) at Uppal campus.",
}));

const GOLDEN_JUBILEE_VIDEOS = [
  { title: "Alumni Meet", embedUrl: "https://www.youtube.com/embed/uuTQ9vItJE0", watchUrl: "https://www.youtube.com/watch?v=uuTQ9vItJE0" },
  { title: "Arrival of Guests", embedUrl: "https://www.youtube.com/embed/UJas6-D--oQ", watchUrl: "https://www.youtube.com/watch?v=UJas6-D--oQ" },
  { title: "Lighting the Lamp", embedUrl: "https://www.youtube.com/embed/SkLQC0VXkok", watchUrl: "https://www.youtube.com/watch?v=SkLQC0VXkok" },
  { title: "Prayer Song", embedUrl: "https://www.youtube.com/embed/7Ssm9T5caT0", watchUrl: "https://www.youtube.com/watch?v=7Ssm9T5caT0" },
  { title: "Welcome Dance", embedUrl: "https://www.youtube.com/embed/Oa_7j9xSH8I", watchUrl: "https://www.youtube.com/watch?v=Oa_7j9xSH8I" },
  { title: "Jubilee Song", embedUrl: "https://www.youtube.com/embed/NVwrYhVYU4I", watchUrl: "https://www.youtube.com/watch?v=NVwrYhVYU4I" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CampusGalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="section-texture bg-white py-8 md:py-12 border-b border-stone-texture/50">
        <div className="mx-auto max-w-3xl text-center px-5 md:px-8">
          <span className="font-sans text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-2 block">
            Visual Archives
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
            Photo Gallery
          </h1>
          <p className="mt-3 text-sm leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            The complete photographic archive of Little Flower Junior College — Golden Jubilee celebrations,
            campus life, and institutional milestones across five decades.
          </p>
          <span className="gold-rule gold-rule-center" />
        </div>
      </section>

      {/* Campus Life */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Campus Life & Assemblies"
          title="Life at LFJC"
          description="Auditorium assemblies, dignitary felicitations, student food festivals, and student mentoring."
        />
        <div className="mt-6">
          <GalleryGrid images={CAMPUS_LIFE_IMAGES} />
        </div>
      </Section>

      {/* Annual Sports & Athletics */}
      <Section variant="default" className="bg-royal-cream/10 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Sports & Athletics"
          title="Annual Sports Meet & Tournaments"
          description="Action photography from our 100m track sprints, inter-house relays, outdoor spectator stands, and victory celebrations."
        />
        <div className="mt-6">
          <GalleryGrid images={ANNUAL_SPORTS_IMAGES} />
        </div>
      </Section>

      {/* 1999 Silver Jubilee Archival Collection */}
      <Section variant="default" className="bg-royal-cream/15 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Archival Collection (1999)"
          title="Silver Jubilee — 25 Years Milestone"
          description="Rare original historical photographs, state leader felicitations, rank holder ledgers, and official documents from the 25th Anniversary celebrations."
        />
        <div className="mt-6">
          <GalleryGrid images={SILVER_JUBILEE_IMAGES} />
        </div>
      </Section>

      {/* Golden Jubilee Photos */}
      <Section variant="default" className="bg-royal-cream/10 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Golden Jubilee (1974–2024)"
          title="50 Years — A Documentary Archive"
          description="Official documentary photographs from the LFJC Golden Jubilee celebrations — a landmark milestone in our 50-year institutional history."
        />
        <div className="mt-6">
          <GalleryGrid images={GOLDEN_JUBILEE_IMAGES} />
        </div>
      </Section>

      {/* Golden Jubilee Videos */}
      <Section variant="default" className="bg-white border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Golden Jubilee Videos"
          title="The Celebration in Motion"
          description="Video recordings from the Golden Jubilee cultural programme — dances, speeches, musical performances, and felicitation ceremonies."
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
            <Reveal key={video.title} delay={idx * 0.05}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="bg-white border-t border-stone-texture/40 py-8 md:py-8">
        <Reveal className="flex flex-wrap justify-center gap-4">
          <Link
            href="/campus/sports"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans"
          >
            Sports & Athletics
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/about/history"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Our Heritage
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
