import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Trophy } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface ProgramsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Programs({ activeInst = "lfjc", headingLevel = "h2" }: ProgramsProps) {
  const instData = getInstitutionData(activeInst);

  const getEyebrow = () => {
    if (activeInst === "root") return "Campus Overview";
    if (activeInst === "lfs") return "CBSE Academics";
    if (activeInst === "lfdc") return "University Degrees";
    return "Academic Streams";
  };

  const getHeadingDescription = () => {
    if (activeInst === "root") {
      return "An integrated ecosystem enabling seamless education from school level up to postgraduate university degrees inside a single campus environment.";
    }
    if (activeInst === "lfs") {
      return "Focused CBSE curricula designed to nurture academic concepts, language capacity, logical reasoning, and basic coding protocols.";
    }
    if (activeInst === "lfdc") {
      return "Osmania University affiliated degree programs integrated with certifications to ensure industry placement and professional excellence.";
    }
    return "Rigorous, focused intermediate curricula designed to prepare students for competitive examinations and premier professional careers.";
  };

  return (
    <Section id="programs" variant="default" className="bg-royal-cream border-b border-stone-texture/50 section-texture">
      <SectionHeading
        as={headingLevel}
        eyebrow={getEyebrow()}
        title="Pathways to Excellence"
        description={getHeadingDescription()}
      />

      {/* Intro banner card */}
      <Reveal className="mx-auto mt-5 sm:mt-8 grid max-w-5xl gap-3 sm:gap-4 border border-stone-texture/60 bg-white p-3.5 sm:p-5 shadow-panel md:grid-cols-[0.9fr_1.1fr] rounded-lg">
          <div className="border-l-2 border-heritage-gold pl-3 sm:pl-4">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-heritage-gold-strong">
              Academic Advising
            </p>
            <p className="mt-1 font-serif text-lg sm:text-xl font-semibold leading-tight text-academic-slate">
              Choose your stream based on academic interest, aptitude, and future ambitions.
            </p>
          </div>
          <p className="text-xs md:text-sm leading-relaxed sm:leading-6 text-academic-slate/70 font-sans flex items-center">
            {activeInst === "root" 
              ? "LFEI provides cohesive learning across three institutions. Students learn under standard Montfortian pedagogy from early years to graduation."
              : activeInst === "lfs"
              ? "LFS streams focus on active concepts, laboratory experiments, creative expression, and logical sports building to shape early minds."
              : activeInst === "lfdc"
              ? "LFDC degree streams emphasize business management, finance, computer statistics, biotechnology, micro-sciences, and modern literature."
              : "LFJC streams are structured systematically around future milestones: engineering and technology, biological sciences and medicine, quantitative commerce and finance, and business administration or law."
            }
          </p>
        </Reveal>

      {/* Programs Bento Grid */}
      <div className={cn(
        "mt-6 sm:mt-10 flex gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-3 sm:pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0",
        instData.programs.length > 2 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-2"
      )}>
          {instData.programs.map((program, index) => {
            const Icon = program.icon;

            const accentColors = [
              "bg-montfortian-blue",
              "bg-heritage-gold",
              "bg-academic-slate",
              "bg-montfortian-blue"
            ];
            
            const hoverAccents = [
              "group-hover:bg-montfortian-blue",
              "group-hover:bg-heritage-gold",
              "group-hover:bg-academic-slate",
              "group-hover:bg-montfortian-blue"
            ];

            return (
              <Reveal key={program.title} delay={index * 0.07} className="snap-center shrink-0 w-[85%] sm:w-[48%] md:w-auto md:shrink-0">
                <Card className="group relative h-full overflow-hidden border border-stone-texture/60 bg-white hover:shadow-panel-hover hover:border-heritage-gold/50 transition-all duration-300 rounded-lg flex flex-col justify-between">
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${accentColors[index % 4]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
                  
                  <div>
                    <CardHeader className="gap-2 sm:gap-3 p-3.5 sm:p-4 pb-1 sm:pb-2">
                      {/* Icon & Title row */}
                      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                        <div>
                          <CardTitle className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">
                            {program.title}
                          </CardTitle>
                          <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.15em] text-heritage-gold-strong">
                            {program.subtitle}
                          </p>
                        </div>
                        <span className={`grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-surface-container text-montfortian-blue transition-colors duration-300 ${hoverAccents[index % 4]} group-hover:text-white`}>
                          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="px-3.5 sm:px-4 pb-2.5 sm:pb-3">
                      <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/75 font-sans">
                        {program.description}
                      </p>

                      {/* Highlight bullet items */}
                      <ul className="mt-2.5 sm:mt-3 space-y-1.5">
                        {program.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-2 text-[10px] sm:text-[11px] text-academic-slate/70 font-sans font-medium"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0 text-heritage-gold-strong"
                              aria-hidden="true"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>

                  {/* Card bottom details link */}
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1.5 sm:pt-2 space-y-2">
                    {program.slug ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/academics/${program.slug}`}
                          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-montfortian-blue group-hover:translate-x-1 transition-transform"
                        >
                          Explore Stream Details
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          className="w-full h-8 text-[10px] tracking-[0.14em]"
                        >
                          <Link href={`/academics/${program.slug}/toppers`}>
                            <Trophy className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                            View Toppers
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <a
                        href="/admissions"
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-montfortian-blue group-hover:translate-x-1 transition-transform"
                      >
                        View Requirements
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

      <Reveal className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        <Button asChild>
          <Link href="/admissions" className="inline-flex items-center gap-2">
            Begin Admissions Inquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about/mission" className="inline-flex items-center gap-2">
            Our Academic Philosophy
          </Link>
        </Button>
      </Reveal>
    </Section>
  );
}
