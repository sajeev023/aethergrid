"use client";

import Image from "next/image";
import { ArrowDown, CheckCircle2, FileText, GraduationCap, HelpCircle, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstitutionData, admissionsCalendar, admissionsDocuments, admissionsFaq } from "@/lib/site-data";

interface AdmissionsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Admissions({ activeInst = "lfjc", headingLevel = "h2" }: AdmissionsProps) {
  const instData = getInstitutionData(activeInst);
  // "Admissions Portal" is the page heading on the standalone route (h1) and a
  // sub-heading on the /lfjc landing (h2 — About holds the page h1 there).
  const PortalHeading = headingLevel === "h1" ? motion.h1 : motion.h2;
  const prefersReducedMotion = useReducedMotion();

  const getEligibilityDescription = () => {
    return "LFJC follows a merit-conscious and inclusive admission process aligned with Board of Intermediate Education, Telangana norms.";
  };

  const getAcademicRequirements = () => {
    return [
      "Successful completion of Class X from SSC, CBSE, ICSE, or another recognized national/state board.",
      "Minimum required GPA or percentage as stipulated by the Board of Intermediate Education, Telangana.",
      "Satisfactory conduct, academic integrity, and attendance record from the previous school."
    ];
  };

  return (
    <div id="admissions" className="bg-royal-cream/10">
      {/* Admissions Hero Section */}
      <div className="relative isolate overflow-hidden border-y border-stone-texture py-6 sm:py-10 md:py-14">
        <Image
          src="/images/admissions-hero.jpg"
          alt="Academic campus building for admissions"
          fill
          sizes="100vw"
          priority
          className="-z-20 object-cover object-center scale-105"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-royal-cream/85 via-royal-cream/60 to-royal-cream/85" />
        
        {/* Soft Stone Grid Texture */}
        <div className="absolute inset-0 -z-10 opacity-30 stone-pattern" />

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 md:px-8">
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <motion.p variants={itemVariants} className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong">
              {instData.admissionsLabel}
            </motion.p>
            <PortalHeading variants={itemVariants} className="mt-2 sm:mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-deep-navy tracking-tight">
              Admissions Portal
            </PortalHeading>
            <motion.p variants={itemVariants} className="mx-auto mt-2 sm:mt-3 max-w-3xl font-editorial text-base sm:text-lg md:text-xl leading-relaxed text-academic-slate/85 italic">
              A clear entry pathway for families seeking academic excellence, moral integrity, and disciplined character formation.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-4 sm:mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-lg text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[48px]">
                <a href="#admissions-form">Begin Admissions Inquiry</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="shadow-xs whitespace-normal min-h-[48px] py-2.5 sm:py-3 text-center text-xs sm:text-sm font-bold uppercase tracking-wider">
                <a href="#fee-structure">
                  View Fee & Scholarships
                  <ArrowDown className="ml-2 h-4 w-4 text-heritage-gold-strong" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Eligibility Section */}
      <div id="eligibility" className="mx-auto grid max-w-7xl scroll-mt-28 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14 lg:grid-cols-[0.8fr_1.2fr] items-start border-b border-stone-texture/40">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              align="left"
              eyebrow="Eligibility"
              title="Eligibility & Admission Mandate"
              description={getEligibilityDescription()}
            />
            <blockquote className="mt-3.5 sm:mt-5 border-l-2 border-heritage-gold pl-3.5 sm:pl-4 font-editorial text-base sm:text-lg italic leading-relaxed sm:leading-7 text-academic-slate/75">
              &quot;The end of education is character. At Little Flower, academic credentials and moral formation go hand in hand.&quot;
            </blockquote>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:gap-4">
          <Reveal>
            <Card className="bg-white hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300 border border-stone-texture/60">
              <CardHeader className="p-4 pb-0 sm:p-5 sm:pb-0">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal-cream text-heritage-gold-strong border border-stone-texture/60">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-serif font-bold text-academic-slate">Academic Requirements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-2.5 sm:pt-3">
                <ul className="grid gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/80 font-sans">
                  {getAcademicRequirements().map((item) => (
                    <li key={item} className="flex gap-2.5 sm:gap-3 items-start">
                      <CheckCircle2 className="mt-0.5 sm:mt-1 h-4 w-4 shrink-0 text-montfortian-blue" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="bg-white hover:shadow-panel-hover hover:border-heritage-gold/40 transition-all duration-300 border border-stone-texture/60">
              <CardHeader className="p-4 pb-0 sm:p-5 sm:pb-0">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal-cream text-montfortian-blue border border-stone-texture/60">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-serif font-bold text-academic-slate">The Open-Door Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-2.5 sm:pt-3">
                <p className="leading-relaxed sm:leading-6 text-xs sm:text-sm text-academic-slate/85 font-sans">
                  As a minority educational institution governed by the Montfortian Brothers of St. Gabriel, {instData.shortName} works to provide quality instruction in a disciplined, inclusive environment, while fully aligning with standard academic regulations and institutional ethical values.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Admission Roadmap Steps */}
      <div id="admission-roadmap" className="section-texture scroll-mt-28 border-b border-stone-texture bg-white py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Admissions Process"
            title="Admission Roadmap"
            description="The enrollment workflow is optimized to help families navigate stream selection and confirm admissions with absolute clarity."
          />
          <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-4 relative">
            {instData.admissionsSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="relative h-full border border-stone-texture/60 bg-royal-cream/35 p-4 sm:p-5 hover:bg-white hover:border-heritage-gold/50 hover:shadow-panel-hover transition-all duration-300 rounded-xl group flex flex-col justify-between">
                  <div>
                    {/* Watermarked step index */}
                    <span className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 font-serif text-3xl sm:text-4xl font-bold italic text-heritage-gold/15 select-none pointer-events-none group-hover:text-heritage-gold/30 group-hover:opacity-100 transition-all duration-500">
                      0{index + 1}
                    </span>
                    
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-montfortian-blue text-white text-xs font-bold shadow-md">
                      {index + 1}
                    </div>
                    
                    <h3 className="mt-2.5 sm:mt-3 font-serif text-sm sm:text-base font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                      {step.title}
                    </h3>

                    <p className="mt-1 sm:mt-1.5 text-xs leading-relaxed sm:leading-5 text-academic-slate/75 font-sans">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Transparent Fee Structure & Scholarship Guidance Section */}
      <div id="fee-structure" className="scroll-mt-28 border-b border-stone-texture bg-royal-cream/20 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Financial Transparency"
            title="Fee Structure & Merit Scholarships"
            description="LFJC maintains transparent fee policies with merit concessions for top-performing Class X board students."
          />

          <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* Stream Fee Table Card */}
            <Reveal className="border border-stone-texture bg-white p-4 sm:p-5 rounded-xl shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block mb-1">
                Annual Institutional Fee Overview
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-2.5 sm:mb-3">
                Fee Components (2026–27 Session)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-stone-texture/60 text-heritage-gold-strong font-bold uppercase text-[10px] sm:text-[11px]">
                      <th className="py-2 px-1.5">Component</th>
                      <th className="py-2 px-1.5">Applicability</th>
                      <th className="py-2 px-1.5 text-right">Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-texture/30 text-academic-slate">
                    {[
                      { component: "Tuition (Annual)", applicability: "All streams", basis: "BIE norms" },
                      { component: "Laboratory Fee", applicability: "M.P.C & Bi.P.C", basis: "Per practicals" },
                      { component: "Library & Reading Room", applicability: "All streams", basis: "Annual" },
                      { component: "Board Examination Fee", applicability: "All streams", basis: "Remitted to BIE" },
                      { component: "Sports & Cultural", applicability: "All streams", basis: "Annual" },
                      { component: "Identity Card & Misc.", applicability: "All streams", basis: "One-time" },
                    ].map((row) => (
                      <tr key={row.component}>
                        <td className="py-2 px-1.5 font-bold text-montfortian-blue">{row.component}</td>
                        <td className="py-2 px-1.5">{row.applicability}</td>
                        <td className="py-2 px-1.5 text-right text-academic-slate/70">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-academic-slate/70 font-sans italic">
                * Exact per-stream figures are prescribed as per Board of Intermediate Education, Telangana norms and are
                published on our{" "}
                <a href="/legal/disclosures" className="font-semibold text-montfortian-blue hover:underline not-italic">Public Disclosures</a>{" "}
                page and at the admissions office. Fees are payable in installments.
              </p>
            </Reveal>

            {/* Scholarships & Merit Policy Card */}
            <Reveal delay={0.1} className="border border-stone-texture bg-white p-4 sm:p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block mb-1">
                  Merit Concessions
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate mb-2.5 sm:mb-3">
                  Scholarships & Excellence Awards
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-academic-slate/80 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-heritage-gold-strong shrink-0 mt-0.5" />
                    <span><strong>10/10 GPA / 95%+ Board Scorers:</strong> Special merit fee concessions offered at admission time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-heritage-gold-strong shrink-0 mt-0.5" />
                    <span><strong>BIE Board Topper Concession:</strong> Top rankers in Intermediate I year receive full academic honors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-heritage-gold-strong shrink-0 mt-0.5" />
                    <span><strong>Sports & Co-curricular Excellence:</strong> National and State level sports achievers are eligible for fee waivers.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-texture/40">
                <a
                  href="#admissions-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-montfortian-blue uppercase tracking-wider hover:text-montfortian-blue/80 transition-colors"
                >
                  Inquire for Merit Scholarship
                  <ArrowDown className="h-4 w-4 text-heritage-gold-strong" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Admissions Calendar & Documents Required */}
      <div id="admissions-calendar" className="scroll-mt-28 border-b border-stone-texture bg-white py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Key Dates & Checklist"
            title="Admissions Calendar & Documents"
            description="Plan your application with the key dates and the documents to bring for verification."
          />
          <div className="mt-5 sm:mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Calendar */}
            <Reveal className="border border-stone-texture bg-royal-cream/30 p-3.5 sm:p-5 rounded-xl">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-montfortian-blue text-white">
                  <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 rotate-[-90deg]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate">Admissions Calendar</h3>
              </div>
              <ol className="relative grid gap-3 sm:gap-4">
                {admissionsCalendar.map((item, index) => (
                  <li key={item.phase} className="flex gap-3 sm:gap-4">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-heritage-gold/40 bg-white font-serif text-[11px] sm:text-xs font-bold text-montfortian-blue">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-serif text-xs sm:text-sm font-bold text-academic-slate">{item.phase}</p>
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-heritage-gold-strong font-sans">
                        {item.date}
                      </p>
                      <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] leading-relaxed text-academic-slate/60 font-sans italic">
                Dates are published once confirmed by the Board of Intermediate Education, Telangana. Confirm with the
                admissions office before planning travel.
              </p>
            </Reveal>

            {/* Documents */}
            <Reveal delay={0.1} className="border border-stone-texture bg-white p-3.5 sm:p-5 rounded-xl">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-royal-cream text-heritage-gold-strong border border-stone-texture/60">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-academic-slate">Documents Required</h3>
              </div>
              <ul className="grid gap-2 sm:gap-2.5 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/80 font-sans">
                {admissionsDocuments.map((doc) => (
                  <li key={doc} className="flex gap-2.5 sm:gap-3 items-start">
                    <CheckCircle2 className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-montfortian-blue" aria-hidden="true" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Admissions FAQ */}
      <div id="admissions-faq" className="scroll-mt-28 border-b border-stone-texture bg-royal-cream/15 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Admissions FAQ"
            description="Quick answers to the questions families ask most. For anything else, call the admissions office."
          />
          <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-3">
            {admissionsFaq.map((item) => (
              <details key={item.q} className="group rounded-lg border border-stone-texture/60 bg-white p-3.5 sm:p-4 md:p-5 hover:border-heritage-gold/40 transition-colors">
                <summary className="flex cursor-pointer items-start justify-between gap-3 sm:gap-4 list-none">
                  <span className="flex items-start gap-2.5 sm:gap-3">
                    <HelpCircle className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-heritage-gold-strong" aria-hidden="true" />
                    <span className="font-serif text-xs sm:text-sm md:text-base font-bold text-academic-slate">{item.q}</span>
                  </span>
                  <span className="mt-0.5 text-heritage-gold-strong transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2.5 sm:mt-3 pl-6 sm:pl-7 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Admissions Inquiry Form */}
      <div id="admissions-form" className="mx-auto grid max-w-7xl scroll-mt-28 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              align="left"
              eyebrow="Apply Now"
              title="Start your admissions inquiry."
              description={`Please share the candidate's details and your preferred stream. Our administrative office will review your inquiry and contact you with further instructions.`}
            />
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <LeadForm
            type="admissions"
            activeInst={activeInst}
            title="Admissions Form"
            description={`For candidates seeking entry into the 2026-27 ${instData.shortName} programs.`}
          />
        </Reveal>
      </div>
    </div>
  );
}
