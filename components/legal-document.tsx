import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/section";
import { getInstitutionData } from "@/lib/site-data";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Shared layout for institutional legal / compliance pages. Renders a
 * consistent hero, a "last updated" line, a table of contents, and the
 * sectioned body. Used by the anti-ragging, privacy, terms, disclosures,
 * and refund/cancellation pages.
 */
export function LegalDocument({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalDocumentProps) {
  const instData = getInstitutionData("lfjc");

  return (
    <>
      <div className="border-b border-stone-texture/50 bg-royal-cream/30">
        <div className="mx-auto max-w-4xl px-5 md:px-8 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate/60 hover:text-montfortian-blue transition-colors font-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to {instData.shortName}
          </Link>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-heritage-gold-strong font-sans">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl font-bold leading-[1.1] text-deep-navy tracking-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-academic-slate/75 font-sans">
            {description}
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-academic-slate/45 font-sans">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      <Section variant="feature" className="bg-white">
        <div className="mx-auto max-w-4xl">
          {/* Table of contents */}
          <nav aria-label="On this page" className="mb-10 rounded-lg border border-stone-texture/60 bg-royal-cream/20 p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong font-sans mb-3">
              On this page
            </p>
            <ol className="grid gap-1.5 text-sm text-academic-slate/80 font-sans">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${i + 1}`}
                    className="hover:text-montfortian-blue transition-colors"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-10">
            {sections.map((section, i) => (
              <section key={section.heading} id={`section-${i + 1}`} className="scroll-mt-28">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-deep-navy">
                  {section.heading}
                </h2>
                <div className="mt-3 text-sm md:text-base leading-7 text-academic-slate/80 font-sans space-y-3">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-stone-texture/60 bg-royal-cream/20 p-5 text-sm leading-6 text-academic-slate/75 font-sans">
            <p>
              Questions about this document? Contact the {instData.name} office at{" "}
              <a href={`tel:${instData.phone.replace(/\s/g, "")}`} className="font-semibold text-montfortian-blue hover:underline">
                {instData.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${instData.email}`} className="font-semibold text-montfortian-blue hover:underline">
                {instData.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}