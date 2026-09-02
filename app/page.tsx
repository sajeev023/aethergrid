import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { buildStructuredData } from "@/lib/structured-data";
import { programs } from "@/lib/site-data";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function LFJCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData("lfjc")),
        }}
      />

      <Hero activeInst="lfjc" />

      <Section variant="default" className="bg-white">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-academic-slate">Four Intermediate Streams</h2>
          <Link href="/academics" className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans">
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.slug}>
                <Link
                  href="/academics"
                  className="group flex flex-col rounded-xl border border-stone-texture/60 bg-white p-4 sm:p-5 hover:border-heritage-gold/40 transition-all"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-cream text-montfortian-blue border border-stone-texture/60">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-serif text-base font-bold text-academic-slate">{program.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">{program.subtitle}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section variant="feature" fullBleed className="!p-0 !py-0">
        <div className="relative overflow-hidden bg-deep-navy text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 relative z-10">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  Campus Life
                </h2>
                <div className="mt-5 sm:mt-7">
                  <Button asChild variant="gold" size="lg">
                    <Link href="/campus" className="inline-flex items-center gap-2">
                      View Campus
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src="/images/campus-hero.jpg"
                    alt="LFJC campus grounds"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}