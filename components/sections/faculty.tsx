import Link from "next/link";
import { ArrowRight, Award, History, Users } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getInstitutionData } from "@/lib/site-data";
import { FacultyTeaching } from "@/components/sections/faculty-teaching";

interface FacultyProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

const SUB_PAGES = [
  {
    icon: Award,
    eyebrow: "Institutional Leadership",
    title: "Former Correspondents & Principals",
    desc: "The official portrait gallery of the visionary correspondents and principals who led Little Flower Junior College across five decades.",
    href: "/faculty/principals",
    cta: "View Correspondents & Principals",
  },
  {
    icon: Users,
    eyebrow: "Academic Staff",
    title: "Teaching & Support Staff",
    desc: "Meet our board-recognized department heads and subject educators who guide students toward academic excellence.",
    href: "/faculty/teaching",
    cta: "Meet Our Faculty",
  },
  {
    icon: History,
    eyebrow: "Emeritus Educators",
    title: "Retired Faculty",
    desc: "Honoring the teachers who built our legacy — 27 distinguished educators whose dedication shaped generations.",
    href: "/faculty/retired",
    cta: "View Retired Faculty",
  },
];

export function Faculty({ activeInst = "lfjc", headingLevel = "h2" }: FacultyProps) {
  const Heading = headingLevel;
  const instData = getInstitutionData(activeInst);

  return (
    <Section id="faculty" variant="default" className="bg-white border-b border-stone-texture/50">
      <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-10">
        <Reveal>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block">
            Our Mentors
          </span>
          <Heading className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
            Faculty Excellence
          </Heading>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-7 text-academic-slate/75 font-sans max-w-2xl mx-auto">
            {instData.shortName}&apos;s academic departments are staffed by highly qualified educators committed to excellence in academics, languages, sciences, commerce, and human formation.
          </p>
          <span className="gold-rule gold-rule-center !mt-3 sm:!mt-5" />
        </Reveal>
      </div>

      {/* Sub-Page Gateway Cards */}
      <div className="grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-12">
        {SUB_PAGES.map((page, idx) => {
          const Icon = page.icon;
          return (
            <Reveal key={page.title} delay={idx * 0.07}>
              <Link
                href={page.href}
                className="group flex flex-col justify-between h-full bg-royal-cream/15 border border-stone-texture/60 rounded-xl p-4 sm:p-6 hover:bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.16em] font-sans">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{page.eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate mb-1.5 sm:mb-2 group-hover:text-montfortian-blue transition-colors duration-300">
                    {page.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans">
                    {page.desc}
                  </p>
                </div>
                <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-stone-texture/40 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-montfortian-blue font-sans">
                    {page.cta}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-heritage-gold-strong group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Preview — teaching staff teaser */}
      <div className="border-t border-stone-texture/30 pt-6 sm:pt-12">
        <SectionHeading
          eyebrow="Academic Staff Preview"
          title="Teaching &amp; Support Staff"
          description="A preview of our teaching staff. Visit the full Teaching &amp; Support Staff page for the complete directory."
        />
        <div className="mt-5 sm:mt-8">
          <FacultyTeaching activeInst={activeInst} isPreview />
        </div>
        <Reveal className="mt-5 sm:mt-8 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/faculty/teaching" className="inline-flex items-center gap-2">
              View Full Teaching &amp; Support Staff Directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* Closing CTA */}
      <Reveal className="mt-6 sm:mt-14 flex justify-center">
        <Button asChild>
          <Link href="/admissions" className="inline-flex items-center gap-2">
            Begin Admissions Inquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
