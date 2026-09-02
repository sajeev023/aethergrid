import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { getInstitutionData } from "@/lib/site-data";

interface ProgramsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Programs({ activeInst = "lfjc", headingLevel = "h2" }: ProgramsProps) {
  const instData = getInstitutionData(activeInst);

  const Heading = headingLevel;

  return (
    <Section id="programs" variant="default" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Heading className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
            Four Intermediate Streams
          </Heading>
        </Reveal>
      </div>

      <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {instData.programs.map((program) => {
          const Icon = program.icon;
          return (
            <Reveal key={program.title}>
              <div className="h-full rounded-xl border border-stone-texture/60 bg-royal-cream/20 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-montfortian-blue border border-stone-texture/60">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-academic-slate">{program.title}</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{program.subtitle}</p>
                <p className="mt-2 text-xs sm:text-sm text-academic-slate/70 font-sans">{program.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
