import Link from "next/link";
import { ArrowRight, BookOpen, Heart, ShieldCheck, Sprout, Star, UsersRound } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface AboutMissionProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

// Verified LFJC institutional values
const VALUES = [
  {
    title: "Academic Rigour",
    description: "Disciplined study, comprehensive testing, and deep-rooted intermediate conceptual mastery that prepares students for board examinations and competitive entrance tests.",
    icon: BookOpen,
  },
  {
    title: "Moral Integrity",
    description: "Character formation grounded in ethical values, personal honesty, and social responsibility — the hallmarks of a Montfortian education.",
    icon: ShieldCheck,
  },
  {
    title: "Social Conscience",
    description: "An active call to serve the community with humility and empathy, ensuring our students contribute meaningfully to society beyond professional achievement.",
    icon: UsersRound,
  },
  {
    title: "Holistic Development",
    description: "Education that encompasses the intellectual, physical, artistic, and spiritual dimensions of human growth — producing well-rounded individuals.",
    icon: Star,
  },
  {
    title: "Compassion & Service",
    description: "Inspired by Saint Louis de Montfort's legacy and the patroness St. Therese of Lisieux, we nurture a spirit of generous service and compassionate action.",
    icon: Heart,
  },
  {
    title: "Environmental Stewardship",
    description: "Cultivating awareness and responsibility for the natural environment as part of our broader commitment to the common good.",
    icon: Sprout,
  },
];

// LFJC Crest symbols — verified institutional descriptions
const CREST_SYMBOLS = [
  {
    title: "The Cross",
    description: "The central cross represents the Montfortian Christian heritage and the foundational role of faith in guiding all educational endeavours at LFJC.",
    icon: ShieldCheck,
  },
  {
    title: "The Little Flower (St. Therese)",
    description: "Our patroness, St. Therese of Lisieux, symbolises simple virtue, perseverance, and the extraordinary power found in small, faithful acts of dedication.",
    icon: Star,
  },
  {
    title: "The Torch of Knowledge",
    description: "The torch represents enlightenment through education — the core mission of an institution dedicated to making knowledge accessible to all students.",
    icon: BookOpen,
  },
  {
    title: "Brothers of St. Gabriel",
    description: "The congregation's symbol reflects the international religious educational mission and the vow to serve youth through structured academic and moral formation.",
    icon: UsersRound,
  },
];

export function AboutMission({ activeInst = "lfjc" }: AboutMissionProps) {
  void activeInst; // prop kept for forward compatibility with multi-inst pattern

  return (
    <section id="mission" className="section-texture bg-white py-8 md:py-12 overflow-hidden">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-4 pb-2">
        <Breadcrumb items={[{ label: "About", href: "/about" }, { label: "Mission, Vision & Values" }]} />
      </div>

      {/* Page Hero */}
      <div className="mx-auto max-w-3xl text-center px-5 md:px-8 mb-8">
        <span className="font-sans text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-2 block">
          Philosophical Core
        </span>
        <h1 className="font-serif text-3xl font-bold leading-tight text-academic-slate md:text-4xl tracking-tight">
          Mission, Vision & Values
        </h1>
        <p className="mt-3 text-sm leading-6 text-academic-slate/75 font-sans max-w-2xl mx-auto">
          We carry forward the educational mandate of the Montfort Brothers of St. Gabriel — shaping
          student potential through intellectual rigour, moral integrity, and genuine social conscience.
        </p>
        <span className="gold-rule gold-rule-center" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-10">

        {/* Mission Statement */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center border border-heritage-gold/30 bg-royal-cream/20 rounded-xl p-6 md:p-8">
            <span className="text-[11px] font-bold text-heritage-gold-strong uppercase tracking-[0.2em] mb-2 block font-sans">
              The Montfortian Mission
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-academic-slate leading-tight mb-4">
              Truth, Virtue & Scholarship
            </h2>
            <p className="font-editorial text-base md:text-lg leading-relaxed text-academic-slate/80 italic">
              &ldquo;Knowledge is Truth. Our mission is not merely to educate minds but to form characters — students who are intellectually sharp, morally grounded, and ready to serve society with compassion and integrity.&rdquo;
            </p>
            <div className="h-px w-16 bg-heritage-gold/50 my-4 mx-auto" />
            <p className="text-[11px] font-sans text-academic-slate/70 tracking-wider uppercase">
              Brothers of St. Gabriel Educational Mandate
            </p>
          </div>
        </Reveal>

        {/* Core Values Cards */}
        <div>
          <SectionHeading
            eyebrow="Core Values"
            title="The Pillars of Our Pedagogy"
            description="Every value we teach, every lesson we impart, is rooted in the Montfortian tradition of human development and moral formation."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.05}>
                  <Card className="group h-full overflow-hidden border border-stone-texture/60 bg-white hover:shadow-panel-hover transition-all duration-300 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <CardHeader className="gap-2 p-4 pb-1">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-container-low text-montfortian-blue transition-colors duration-300 group-hover:bg-montfortian-blue group-hover:text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <CardTitle className="mt-1 text-base font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <p className="leading-5 text-academic-slate/70 font-sans text-xs">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Crest Symbols */}
        <div>
          <SectionHeading
            eyebrow="The Institutional Crest"
            title="Symbols of Our Identity"
            description="Every symbol in the Little Flower Junior College crest represents a profound pillar of our educational mission and Montfortian identity."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CREST_SYMBOLS.map((sym, index) => {
              const Icon = sym.icon;
              return (
                <Reveal
                  key={sym.title}
                  delay={index * 0.05}
                  className="bg-white p-5 border border-stone-texture rounded-xl hover:border-heritage-gold/45 hover:shadow-sm transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center mb-3 shadow-sm group-hover:bg-montfortian-blue transition-colors duration-300">
                    <Icon className="h-4 w-4 text-montfortian-blue group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-academic-slate mb-1 group-hover:text-montfortian-blue transition-colors">
                    {sym.title}
                  </h3>
                  <p className="text-xs leading-5 text-academic-slate/70 font-sans">
                    {sym.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal className="flex flex-wrap justify-center gap-4">
          <Link
            href="/about/principal"
            className="inline-flex items-center gap-2 border border-montfortian-blue/30 bg-montfortian-blue/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-montfortian-blue hover:bg-montfortian-blue hover:text-white hover:border-montfortian-blue transition-all duration-300 rounded-sm font-sans"
          >
            Principal&apos;s Message
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
