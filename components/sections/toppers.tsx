import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { firstYearToppers, secondYearToppers, type TopperRecord } from "@/lib/toppers-data";

function TopperGrid({ toppers }: { toppers: TopperRecord[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
      {toppers.map((topper, index) => (
        <Reveal key={topper.id} delay={Math.min(index * 0.02, 0.25)}>
          <div className="overflow-hidden rounded-lg border border-stone-texture/60 bg-white">
            <div className="relative aspect-[3/4] w-full bg-royal-cream/50">
              <Image
                src={topper.image}
                alt={topper.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-2.5 sm:p-3">
              <h3 className="font-serif text-xs sm:text-sm font-bold text-academic-slate leading-tight">{topper.name}</h3>
              <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-heritage-gold-strong font-sans">
                {topper.marks} • {topper.group}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Toppers() {
  return (
    <>
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Toppers — Intermediate 1st Year</h2>
        <div className="mt-5 sm:mt-8">
          <TopperGrid toppers={firstYearToppers} />
        </div>
      </Section>
      <Section variant="default" className="bg-white">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">Toppers — Intermediate 2nd Year</h2>
        <div className="mt-5 sm:mt-8">
          <TopperGrid toppers={secondYearToppers} />
        </div>
      </Section>
    </>
  );
}