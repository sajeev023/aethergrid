import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Mic, Music, Trophy, Users } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Events & Culture",
  description:
    "Discover LFJC's vibrant student life — cultural events, co-curricular clubs, motivational talks, and the activities that shape character beyond the classroom.",
};

const EVENT_HIGHLIGHT_PHOTOS = [
  { src: "/images/events/montfort-auditorium-assembly.jpg", title: "St. Montfort Auditorium Assembly", desc: "Full student body assembled in St. Montfort Auditorium." },
  { src: "/images/events/principal-felicitation-ceremony.jpg", title: "Dignitary Felicitation", desc: "Principal Rev. Bro. Arun Prakash honoring distinguished guests." },
  { src: "/images/events/distinguished-speaker-podium.jpg", title: "Guest Lecture Series", desc: "Guest speaker addressing students from the podium." },
  { src: "/images/events/student-food-fest-stalls.jpg", title: "Cultural Food Fest", desc: "Female students hosting culinary & sweets stalls during campus celebrations." },
  { src: "/images/events/bro-arun-memento-presentation.jpg", title: "Memento Presentation", desc: "Rev. Bro. Arun presenting memento plate to visiting dignitary." },
  { src: "/images/events/ptm-welcome-banner.jpg", title: "Parent-Teacher Meeting", desc: "Annual Parent-Teacher Meeting welcome banner and event schedule." },
];

const CLUBS = [
  { icon: BookOpen, name: "Literary Society", desc: "Debate, elocution, essay writing, and book reading circles that cultivate command of language and critical thinking." },
  { icon: Music, name: "Cultural Arts Club", desc: "Classical and western dance, vocal music, drama, and mime performances that celebrate cultural heritage." },
  { icon: Trophy, name: "Science & Mathematics Club", desc: "Quiz competitions, model exhibitions, and science fairs for MPC and BiPC stream students." },
  { icon: Users, name: "Commerce & Leadership Society", desc: "Business case studies, mock debates, and leadership workshops for MEC and CEC stream students." },
  { icon: Mic, name: "Public Speaking Forum", desc: "Structured practice in oratory, presentation, and interpersonal communication for all streams." },
];

const EVENTS = [
  {
    title: "Annual Day Celebration",
    desc: "A spectacular end-of-year cultural gala featuring dance, music, drama, and the prize distribution ceremony recognising academic and co-curricular excellence.",
    icon: "🎭",
  },
  {
    title: "Independence & Republic Day",
    desc: "National celebration events held on campus with flag hoisting, patriotic programmes, and speeches commemorating India's freedom movement.",
    icon: "🇮🇳",
  },
  {
    title: "College Spiritual Feast — The Little Flower",
    desc: "Annual patroness feast of St. Therese of Lisieux — the institution's most cherished spiritual and cultural gathering for students and faculty.",
    icon: "✝️",
  },
  {
    title: "Motivational Talk Series",
    desc: "Distinguished alumni, IAS officers, medical professionals, and civil society leaders are regularly invited to share their journeys with current students.",
    icon: "🎙️",
  },
  {
    title: "Inter-College Competitions",
    desc: "Students actively represent LFJC at regional and national competitions in academics, sports, arts, and public speaking — winning honours for the institution.",
    icon: "🏆",
  },
  {
    title: "Golden Jubilee Cultural Programme",
    desc: "The landmark 50th-year cultural extravaganza — welcoming distinguished alumni, faculty, and community leaders to celebrate five decades of institutional excellence.",
    icon: "✨",
  },
];

export default function CampusEventsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Campus Life", href: "/campus" }, { label: "Events & Culture" }]} />
      </div>

      {/* Page Hero */}
      <section className="section-texture bg-white py-6 sm:py-8 md:py-12 border-b border-stone-texture/50">
        <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8">
          <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block">
            Student Life
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
            Events & Culture
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            Education at LFJC extends far beyond the classroom and examination hall. Our co-curricular
            programme shapes the whole student — intellectually, artistically, and morally.
          </p>
          <span className="gold-rule gold-rule-center !mt-3 sm:!mt-4" />
        </div>
      </section>

      {/* Campus Events */}
      <Section variant="default" className="bg-white">
        <SectionHeading
          eyebrow="Campus Events"
          title="Milestones in the Academic Calendar"
          description="Every year, LFJC marks a rich calendar of celebrations, competitions, and community events that become lasting memories."
        />

        <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, idx) => (
            <Reveal key={event.title} delay={idx * 0.06}>
              <div className="group bg-royal-cream/15 border border-stone-texture rounded-xl p-4 sm:p-5 hover:bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 h-full">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{event.icon}</div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate mb-1 sm:mb-1.5 group-hover:text-montfortian-blue transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans">{event.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Clubs & Co-Curricular */}
      <Section variant="default" className="bg-royal-cream/10 border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Student Societies"
          title="Clubs & Co-Curricular"
          description="LFJC's student societies provide a structured platform for passion, leadership, and personal growth outside the academic stream."
        />

        <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club, idx) => {
            const Icon = club.icon;
            return (
              <Reveal key={club.name} delay={idx * 0.07}>
                <div className="group bg-white border border-stone-texture rounded-xl p-4 sm:p-5 hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-montfortian-blue transition-colors duration-300">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-montfortian-blue group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate mb-1 sm:mb-1.5 group-hover:text-montfortian-blue transition-colors">
                    {club.name}
                  </h3>
                  <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans">{club.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Motivational Talks */}
      <Section variant="default" className="bg-academic-slate text-white border-t border-white/10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-center">
          <Reveal>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright mb-1.5 sm:mb-2 block">
              Guest Lecture Series
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Conversations with{" "}
              <span className="text-heritage-gold italic font-editorial font-normal">
                Distinguished Speakers
              </span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-royal-cream/75 font-sans max-w-lg">
              LFJC regularly hosts distinguished alumni, IAS and IPS officers, doctors, lawyers, and civil society leaders on campus. These sessions expose students to real-world journeys and inspire purposeful ambition.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-2 sm:space-y-3">
              {[
                "Mr. Shashanka K., IAS — District Collector & LFJC Alumnus",
                "Distinguished IIT and NEET achievers from past batches",
                "Faculty from prestigious institutions and research bodies",
                "Entrepreneurs, artists, and social reformers",
              ].map((speaker) => (
                <div key={speaker} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-royal-cream/80 font-sans">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-heritage-gold-bright shrink-0" />
                  {speaker}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Event Photo Highlights */}
      <Section variant="default" className="bg-white border-t border-stone-texture/40">
        <SectionHeading
          eyebrow="Event Highlights"
          title="Moments from Campus Life"
          description="Documented highlights from student assemblies, felicitation ceremonies, food festivals, and parent-teacher meetings."
        />

        <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-2 lg:grid-cols-3">
          {EVENT_HIGHLIGHT_PHOTOS.map((img, idx) => (
            <Reveal key={img.title} delay={idx * 0.05}>
              <div className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-texture shadow-xs hover:shadow-panel-hover transition-all duration-300">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/90 via-academic-slate/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">{img.title}</h3>
                  <p className="text-[11px] sm:text-xs text-royal-cream/90 font-sans mt-0.5 line-clamp-1 sm:line-clamp-2">{img.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="default" className="bg-white py-6 sm:py-8 md:py-8">
        <Reveal className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Link
            href="/campus/gallery"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            View Photo Gallery
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans min-h-[44px]"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
