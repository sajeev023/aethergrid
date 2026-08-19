import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getInstitutionData } from "@/lib/site-data";

interface TestimonialsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Testimonials({ activeInst = "lfjc" }: TestimonialsProps) {
  const instData = getInstitutionData(activeInst);
  const { testimonials } = instData;
  const hasVerified = testimonials.length > 0;

  return (
    <Section id="testimonials" variant="feature" className="bg-royal-cream/25 border-b border-stone-texture/50 section-texture">
      <SectionHeading
        eyebrow={hasVerified ? "Community Voice" : "Institutional Voice"}
        title="Formation that stays with students beyond campus."
        description={
          hasVerified
            ? `Hear from our alumni, parent community, and student representatives on the lasting impact of an education at ${instData.shortName}.`
            : `The character of ${instData.shortName} is best expressed by those who shape it. A word from our ${instData.principalRole}, and an open invitation to our alumni.`
        }
      />

      {hasVerified ? (
        <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((testimonial, index) => {
            const initials = testimonial.person.slice(0, 2).toUpperCase();

            return (
              <Reveal key={testimonial.person} delay={index * 0.08} className="snap-center shrink-0 w-[82%] sm:w-[48%] md:w-auto md:shrink-0">
                <Card className="relative h-full overflow-hidden bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <CardContent className="relative flex h-full flex-col p-5">

                    {/* Large Quote Mark */}
                    <span className="absolute -top-2 left-5 select-none font-editorial text-7xl leading-none text-heritage-gold/10 pointer-events-none">
                      &ldquo;
                    </span>

                    <div className="relative z-10 flex-1">
                      <Quote className="h-5 w-5 text-heritage-gold-strong/70 mb-3" aria-hidden="true" />
                      <p className="font-editorial text-xl leading-7 text-academic-slate/90 italic">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 border-t border-stone-texture/50 pt-4 flex items-center gap-3">
                      {/* Avatar Initials */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-montfortian-blue/10 border border-montfortian-blue/20 font-serif text-sm font-bold text-montfortian-blue">
                        {initials}
                      </div>

                      <div>
                        <p className="font-serif text-base font-bold text-academic-slate">
                          {testimonial.person}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-montfortian-blue">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* Honest fallback: the Principal's real, data-sourced voice — not a fabricated persona. */}
          <Reveal className="md:col-span-2">
            <Card className="relative h-full overflow-hidden bg-white border-heritage-gold/30 rounded-lg">
              <CardContent className="relative flex h-full flex-col p-6 md:p-8">
                <span className="absolute -top-2 left-5 select-none font-editorial text-7xl leading-none text-heritage-gold/10 pointer-events-none">
                  &ldquo;
                </span>
                <Quote className="h-5 w-5 text-heritage-gold-strong/70 mb-3" aria-hidden="true" />
                <p className="relative z-10 font-editorial text-lg md:text-xl leading-7 md:leading-8 text-academic-slate/90 italic">
                  {instData.principalMessage}
                </p>
                <div className="relative z-10 mt-6 border-t border-stone-texture/50 pt-4">
                  <p className="font-serif text-base font-bold text-academic-slate">
                    {instData.principalName}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-montfortian-blue">
                    {instData.principalRole}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full overflow-hidden bg-deep-navy text-royal-cream border-heritage-gold/20 rounded-lg flex flex-col justify-between">
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="font-serif text-lg font-bold text-heritage-gold-bright">
                  Are you an LFJC alumnus?
                </h3>
                <p className="mt-3 text-sm leading-6 text-royal-cream/75 font-sans">
                  Share your journey and join the official {instData.shortName} alumni registry. Verified stories from our graduates are published here with consent.
                </p>
                <Link
                  href="/alumni#register"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-sm bg-heritage-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-deep-navy hover:bg-heritage-gold-bright transition-colors"
                >
                  Submit your story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      )}
    </Section>
  );
}