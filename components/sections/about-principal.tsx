import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getInstitutionData } from "@/lib/site-data";

interface AboutPrincipalProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function AboutPrincipal({ activeInst = "lfjc" }: AboutPrincipalProps) {
  const instData = getInstitutionData(activeInst);

  return (
    <section id="principal" className="section-texture bg-white py-6 sm:py-8 md:py-12 overflow-hidden">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2">
        <Breadcrumb items={[{ label: "About", href: "/about" }, { label: "Principal's Message" }]} />
      </div>

      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-8 mb-5 sm:mb-8">
        <span className="font-sans text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block">
          From the Desk of Leadership
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Principal&apos;s Message
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          A message of guidance, welcome, and vision from the Correspondent & Principal of
          Little Flower Junior College.
        </p>
        <span className="gold-rule gold-rule-center !mt-3 sm:!mt-4" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 sm:gap-8 lg:gap-12 items-start">
          {/* Portrait */}
          <Reveal className="text-center lg:text-left">
            <div className="relative mx-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] lg:mx-0">
              <div className="absolute -inset-2 bg-stone-texture/30 rounded-sm z-0" />
              <div className="relative border border-stone-texture bg-white p-1.5 shadow-lg z-10 rounded-sm">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Image
                    src={instData.principalImg || "/images/brother_arun_official.jpg"}
                    alt={instData.principalName}
                    fill
                    sizes="(min-width: 1024px) 280px, 90vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 border border-heritage-gold/25 m-1.5 sm:m-2 rounded-sm pointer-events-none" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 text-center lg:text-left">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">{instData.principalName}</h2>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-heritage-gold-strong mt-0.5 sm:mt-1">
                  {instData.principalRole}
                </p>
                <p className="text-[11px] sm:text-xs text-academic-slate/70 font-sans mt-0.5 sm:mt-1">
                  Little Flower Junior College, Uppal
                </p>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-3.5 sm:space-y-5">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-1.5 sm:mb-2 block font-sans">
                  A Word of Welcome
                </span>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-academic-slate leading-tight">
                  Nurturing Leaders, Serving Humanity
                </h2>
              </div>

              <div className="font-editorial text-sm sm:text-base leading-relaxed text-academic-slate/90 italic space-y-3 sm:space-y-4">
                <p>&ldquo;{instData.principalMessage}&rdquo;</p>
              </div>

              <div className="space-y-2.5 sm:space-y-4 font-sans text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75">
                <p>
                  At Little Flower Junior College, we believe that education extends far beyond the syllabus. Our mission is to cultivate an environment where rigorous academic pursuit is balanced with deep-rooted human values.
                </p>
                <p>
                  As we navigate an increasingly complex world, our Montfortian pedagogy ensures that our students are not just intellectually equipped to secure top ranks, but are also morally fortified to become compassionate leaders and responsible global citizens.
                </p>
                <p>
                  I invite every student, parent, and member of the community to be part of this extraordinary journey of knowledge, virtue, and service.
                </p>
              </div>

              <div className="h-px w-12 sm:w-16 bg-heritage-gold/50" />
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-heritage-gold/30 shrink-0">
                  <Image
                    src={instData.principalImg || "/images/brother_arun_official.jpg"}
                    alt={instData.principalName}
                    width={32}
                    height={32}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-serif text-xs sm:text-sm font-bold text-academic-slate">{instData.principalName}</p>
                  <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-heritage-gold-strong">{instData.principalRole}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-6 sm:mt-10 border-t border-stone-texture/40 pt-5 sm:pt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-stone-texture bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-academic-slate hover:bg-academic-slate hover:text-white hover:border-academic-slate transition-all duration-300 rounded-sm font-sans"
          >
            About the College
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
