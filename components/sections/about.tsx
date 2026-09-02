import Image from "next/image";
import { BookOpen, ShieldCheck, Award } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { getInstitutionData } from "@/lib/site-data";

interface AboutProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function About({ activeInst = "lfjc" }: AboutProps) {
  const instData = getInstitutionData(activeInst);

  return (
    <div id="about" className="bg-white">
      <Section variant="default" className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-academic-slate">
              About LFJC
            </h1>
          </Reveal>
        </div>
      </Section>

      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-texture/50 shadow-elevation">
              <Image
                src="/images/campus-drone.jpg"
                alt="LFJC Campus — Uppal"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-academic-slate">History</h2>
            <div className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans">
              <p>Founded in 1974 in Abids and relocated to the Uppal campus in 1982.</p>
              <p>Governed by the Brothers of St. Gabriel Educational Society and affiliated to the Board of Intermediate Education, Telangana.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section variant="default" className="bg-white">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Principal</h2>

        <div className="mt-5 sm:mt-6 grid gap-5 sm:gap-8 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 overflow-hidden rounded-xl border border-stone-texture/50 shadow-elevation">
              <Image
                src={instData.principalImg}
                alt={instData.principalName}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-xl border border-stone-texture/60 bg-royal-cream/20 p-4 sm:p-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">{instData.principalName}</h3>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{instData.principalRole}</p>
              <p className="mt-2 text-xs sm:text-sm text-academic-slate/75 font-sans">{instData.principalMessage}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Values</h2>
        <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-3">
          {[
            { icon: BookOpen, title: "Academic Rigor" },
            { icon: ShieldCheck, title: "Moral Integrity" },
            { icon: Award, title: "Social Conscience" },
          ].map((value) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title}>
                <div className="rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-5">
                  <Icon className="h-5 w-5 text-montfortian-blue" aria-hidden="true" />
                  <h3 className="mt-3 font-serif text-base font-bold text-academic-slate">{value.title}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  );
}