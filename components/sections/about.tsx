import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, BookOpen, Award } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getInstitutionData } from "@/lib/site-data";

interface AboutProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  showPrincipalMessage?: boolean;
}

const SUB_PAGES = [
  {
    icon: Clock,
    eyebrow: "Our Journey",
    title: "Heritage & History",
    desc: "Trace the milestones of our 50-year institutional journey — from Abids to the Golden Jubilee celebrations in Uppal.",
    href: "/about/history",
    cta: "Explore Our History",
  },
  {
    icon: BookOpen,
    eyebrow: "Philosophical Core",
    title: "Mission, Vision & Values",
    desc: "Discover the Montfortian pillars that guide every lesson, every interaction, and every student's formation at LFJC.",
    href: "/about/mission",
    cta: "Read Our Mission",
  },
  {
    icon: ShieldCheck,
    eyebrow: "From the Desk",
    title: "Principal's Message",
    desc: "A personal welcome and vision statement from the Correspondent & Principal of Little Flower Junior College.",
    href: "/about/principal",
    cta: "Read the Message",
  },
];

export function About({ activeInst = "lfjc", showPrincipalMessage = true }: AboutProps) {
  const instData = getInstitutionData(activeInst);
  void showPrincipalMessage; // prop kept for backward compatibility

  return (
    <div id="about" className="bg-white overflow-hidden">
      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-12 md:pt-16 pb-6 sm:pb-10 section-texture">
        <Reveal>
          <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 sm:mb-2 block">
            About our college
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-academic-slate tracking-tight">
            Truth, Virtue & Scholarship
          </h1>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            Shaping student potential through rigorous academic stream training, deep-rooted moral values, and disciplined collegiate life. Established in {instData.established} under the Montfort Brothers of St. Gabriel.
          </p>
          <span className="gold-rule gold-rule-center !mt-3 sm:!mt-5" />
        </Reveal>
      </div>

      {/* Hero split — image + intro blurb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-6 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative max-w-md lg:max-w-full mx-auto lg:mx-0">
              <div className="absolute -inset-2 sm:-inset-3 bg-stone-texture/25 rounded-xl z-0" />
              <div className="relative aspect-[4/3] w-full border border-stone-texture/50 bg-white p-1.5 sm:p-2 shadow-elevation z-10 rounded-xl overflow-hidden">
                <Image
                  src="/images/campus-drone.jpg"
                  alt="LFJC Campus — Uppal, Hyderabad"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover rounded-lg"
                />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 md:right-3 bg-montfortian-blue text-white p-3 sm:p-4 shadow-float border border-heritage-gold/30 rounded-xl z-20">
                <div className="font-serif text-xl sm:text-2xl font-bold leading-none mb-0.5">50+</div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-royal-cream/90 font-sans">
                  Years of Academic Journey
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-1.5 sm:mb-2 block">
                Who We Are
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-academic-slate mb-2.5 sm:mb-4 leading-tight">
                A Legacy of{" "}
                <span className="text-heritage-gold italic font-editorial font-normal">
                  Distinction
                </span>
              </h2>
              <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-academic-slate/75 font-sans">
                <p>
                  Little Flower Junior College was established in 1974 in Abids by upgrading the historic Little Flower School. In 1982, under the leadership of Rev. Bro. James Pannivelil, the institution was relocated to its present eight-acre campus in Uppal, Hyderabad.
                </p>
                <p>
                  Governed by the Brothers of St. Gabriel Educational Society and affiliated to the Board of Intermediate Education, Telangana, LFJC has produced thousands of distinguished alumni who have gone on to achieve excellence in engineering, medicine, law, civil services, arts, and entrepreneurship.
                </p>
                <p>
                  Our Golden Jubilee (1974–2024) is a testament to five decades of unwavering commitment to academic excellence and character formation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Heritage Stats Band */}
      <div className="bg-deep-navy text-white py-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: "1974", label: "Year Established" },
              { value: "15,000+", label: "Alumni Worldwide" },
              { value: "4", label: "Academic Streams" },
              { value: "60+", label: "Faculty Members" },
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.06} className="text-center">
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-gold-bright leading-none mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-royal-cream/75 font-sans">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Page Gateway Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-16">
        <SectionHeading
          eyebrow="Explore Further"
          title="Deeper Into Our Story"
          description="From our founding philosophy to the principal's vision — explore the pillars that define LFJC."
        />

        <div className="mt-5 sm:mt-8 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUB_PAGES.map((page, idx) => {
            const Icon = page.icon;
            return (
              <Reveal key={page.title} delay={idx * 0.07}>
                <Link
                  href={page.href}
                  className="group flex flex-col justify-between h-full bg-royal-cream/20 border border-stone-texture/60 rounded-xl p-4 sm:p-6 hover:bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 text-xs font-bold text-heritage-gold-strong uppercase tracking-wider font-sans">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{page.eyebrow}</span>
                    </div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate mb-1.5 sm:mb-2 group-hover:text-montfortian-blue transition-colors duration-300">
                      {page.title}
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans">
                      {page.desc}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-stone-texture/30 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-montfortian-blue font-sans">
                      {page.cta}
                    </span>
                    <ArrowRight className="h-4 w-4 text-heritage-gold-strong group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Button asChild>
            <Link href="/admissions" className="inline-flex items-center gap-2">
              Begin Admissions Inquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/faculty" className="inline-flex items-center gap-2">
              <Award className="h-4 w-4" />
              Meet Our Faculty
            </Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
