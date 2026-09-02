import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { getInstitutionData } from "@/lib/site-data";
import { Monitor, CheckCircle2 } from "lucide-react";

interface ProgramsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Programs({ activeInst = "lfjc", headingLevel = "h2" }: ProgramsProps) {
  const instData = getInstitutionData(activeInst);
  const Heading = headingLevel;

  return (
    <Section id="programs" variant="default" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl text-center mb-10">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
            Board-Recognized Curriculum
          </span>
          <Heading className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-academic-slate mt-1">
            Four Intermediate Streams
          </Heading>
          <p className="mt-2 text-xs sm:text-sm text-academic-slate/75 max-w-2xl mx-auto font-sans">
            Affiliated to the Board of Intermediate Education, Telangana (BIE Telangana). Designed for rigorous foundational mastery and competitive entrance success.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {instData.programs.map((program) => {
          const Icon = program.icon;
          return (
            <Reveal key={program.title}>
              <div className="h-full rounded-2xl border border-stone-texture/60 bg-royal-cream/20 p-5 sm:p-6 flex flex-col justify-between hover:border-heritage-gold/60 transition-all hover:shadow-elevation">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-montfortian-blue border border-stone-texture/60 shadow-xs">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-academic-slate">{program.title}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{program.subtitle}</p>
                  <p className="mt-2.5 text-xs leading-relaxed text-academic-slate/75 font-sans">{program.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-texture/30 space-y-1.5">
                  {program.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-academic-slate/80 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-heritage-gold-strong shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Official Diploma Course for Humanities Feature (Verbatim from dept.php) */}
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border border-heritage-gold/40 bg-gradient-to-r from-royal-cream/60 via-white to-royal-cream/40 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-montfortian-blue text-heritage-gold-bright flex items-center justify-center shrink-0 shadow-sm">
              <Monitor className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-heritage-gold/20 text-montfortian-blue border border-heritage-gold/40 font-sans">
                  Exclusive Academic Feature
                </span>
                <span className="text-xs font-semibold text-academic-slate/60 font-sans">Humanities Department</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">
                Comprehensive Computer Diploma Course for Humanities Students
              </h3>
              <p className="text-xs sm:text-sm text-academic-slate/80 leading-relaxed font-sans max-w-4xl">
                Humanities students (M.E.C and C.E.C) at Little Flower Junior College are offered a unique opportunity to upgrade their technical expertise through our comprehensive Diploma Course. Each student has access to a dedicated workstation equipped with essential software, receiving hands-on training and real-world project experience to bridge commerce and technology.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
