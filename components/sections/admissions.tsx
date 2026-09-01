import Image from "next/image";
import { ArrowRight, CheckCircle2, GraduationCap, FileText, HelpCircle } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getInstitutionData, admissionsSteps, admissionsDocuments } from "@/lib/site-data";

interface AdmissionsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Admissions({ activeInst = "lfjc", headingLevel = "h2" }: AdmissionsProps) {
  const instData = getInstitutionData(activeInst);
  const Heading = headingLevel;

  return (
    <div id="admissions" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider mb-2 block">
              {instData.admissionsLabel}
            </span>
            <Heading className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
              Admissions
            </Heading>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-2xl mx-auto">
              Intermediate programmes in MPC, BiPC, MEC, and CEC. Apply for the 2026–27 session.
            </p>
          </Reveal>
        </div>
      </Section>
      <Section variant="dense" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {instData.programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.slug} delay={index * 0.05}>
                <div className="rounded-xl border border-stone-texture/60 bg-white p-3 sm:p-4">
                  <Icon className="h-5 w-5 text-montfortian-blue" aria-hidden="true" />
                  <h3 className="mt-2 font-serif text-base font-bold text-academic-slate">{program.title}</h3>
                  <p className="text-[11px] text-academic-slate/70 font-sans">{program.subtitle}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
      <Section variant="default" className="bg-white">
        <SectionHeading eyebrow="Process" title="Admission Steps" description="How to apply." />
        <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {admissionsSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="rounded-xl border border-stone-texture/60 bg-royal-cream/20 p-4 sm:p-5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-montfortian-blue text-white text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-3 font-serif text-base font-bold text-academic-slate">{step.title}</h3>
                <p className="mt-1 text-xs text-academic-slate/70 font-sans">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Eligibility"
              title="Who Can Apply"
              description="Minimum requirements for admission."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ul className="grid gap-3 text-xs sm:text-sm text-academic-slate/80 font-sans">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-montfortian-blue" />
                <span>Passed Class X from SSC, CBSE, ICSE, or any recognised board.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-montfortian-blue" />
                <span>Minimum marks as required by the Board of Intermediate Education, Telangana.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-montfortian-blue" />
                <span>Good conduct and attendance record from the previous school.</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>
      <Section variant="default" className="bg-white">
        <SectionHeading eyebrow="Documents" title="What to Bring" description="Documents needed at admission." />
        <div className="mt-5 sm:mt-8 grid gap-2 sm:gap-3">
          {admissionsDocuments.map((doc) => (
            <Reveal key={doc}>
              <div className="flex gap-3 items-start rounded-xl border border-stone-texture/60 bg-royal-cream/20 p-3 sm:p-4">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-strong" />
                <span className="text-xs sm:text-sm text-academic-slate/80 font-sans">{doc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <SectionHeading eyebrow="FAQ" title="Common Questions" description="Quick answers." />
        <div className="mt-5 sm:mt-8 max-w-3xl mx-auto grid gap-2.5">
          {[
            { q: "Which streams does LFJC offer?", a: "MPC, BiPC, MEC, and CEC." },
            { q: "When do admissions open?", a: "Immediately after Class X board results are announced." },
            { q: "Is there an entrance test?", a: "Admissions are based on Class X merit and a counseling interaction." },
            { q: "Does LFJC have an anti-ragging policy?", a: "Yes. Zero-tolerance policy with a dedicated committee and helpline." },
          ].map((item) => (
            <details key={item.q} className="group rounded-lg border border-stone-texture/60 bg-white p-3.5 sm:p-4 hover:border-heritage-gold/40">
              <summary className="flex cursor-pointer items-start justify-between gap-3 list-none">
                <span className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-strong" />
                  <span className="font-serif text-sm font-bold text-academic-slate">{item.q}</span>
                </span>
                <span className="text-heritage-gold-strong transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 pl-6 text-xs sm:text-sm text-academic-slate/75 font-sans">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <Section id="admissions-form" variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Apply"
            title="Submit an Inquiry"
            description="Fill in the candidate's details. The admissions office will contact you."
          />
          <div className="mt-5 sm:mt-8 rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-6 shadow-panel">
            <LeadForm
              type="admissions"
              activeInst={activeInst}
              title="Admissions Form"
              description="For 2026–27 admissions."
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
