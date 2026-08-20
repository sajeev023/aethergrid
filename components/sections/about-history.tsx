"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface AboutHistoryProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

// Authentic LFJC institutional milestones — matching the reference design
const HISTORICAL_MILESTONES = [
  {
    year: "1974",
    title: "LFJC Inception",
    description: "Established as an upgrade to the historic high school of Abids with 200 initial students.",
  },
  {
    year: "1982",
    title: "Move to Uppal",
    description: "Relocates to the expansive Uppal campus under the direction of Rev. Bro. James Pannivelil to build permanent laboratories.",
  },
  {
    year: "1999",
    title: "Silver Jubilee Celebration",
    description: "Marks 25 years of intermediate academic excellence, board rank distinctions, and character formation.",
  },
  {
    year: "2024",
    title: "Golden Jubilee Celebration",
    description: "Marks 50 years of shaping outstanding board ranks and professional leaders in Hyderabad.",
  },
];

export function AboutHistory({ activeInst = "lfjc" }: AboutHistoryProps) {
  void activeInst;

  return (
    <section id="history" className="section-texture bg-white py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-3 sm:pt-4">
        <Breadcrumb items={[{ label: "About", href: "/about" }, { label: "Heritage & History" }]} />
      </div>

      {/* Page Hero Header */}
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-5 mb-5 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-academic-slate tracking-tight">
          A History of Distinction
        </h1>
        <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-academic-slate/75 font-sans max-w-xl mx-auto">
          From a humble beginning in Abids to the Golden Jubilee milestone — five decades of Montfortian educational tradition, board excellence, and character formation.
        </p>
        <span className="gold-rule gold-rule-center !mt-2 sm:!mt-3" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Campus Drone Image with 50+ Years Badge */}
          <Reveal className="lg:col-span-6">
            <div className="relative rounded-lg border border-stone-texture/40 bg-white p-1.5 shadow-xs overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded">
                <Image
                  src="/images/campus-drone.jpg"
                  alt="LFJC Uppal Campus Aerial View"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                
                {/* 50+ Years Badge Overlay on Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-montfortian-blue text-white p-2.5 sm:p-3 shadow-lg border border-heritage-gold/30 rounded-lg flex flex-col justify-center">
                  <span className="font-serif text-lg sm:text-xl font-bold leading-none mb-0.5 text-white">
                    50+
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-royal-cream/90 font-sans">
                    Years of Academic Journey
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Timeline Chronology */}
          <div className="lg:col-span-6 pt-1">
            <div className="mb-3 sm:mb-4">
              <span className="font-sans text-xs font-bold text-heritage-gold-strong uppercase tracking-wider block mb-0.5">
                Chronology (1974–Present)
              </span>
              <h2 className="font-serif text-base sm:text-lg font-bold text-academic-slate">
                Milestones That Shaped Us
              </h2>
            </div>

            <div className="relative space-y-2.5 sm:space-y-3.5 pl-7 sm:pl-9 before:absolute before:top-3 before:bottom-3 before:left-3.5 sm:before:left-4 before:-translate-x-px before:w-[1.5px] before:bg-heritage-gold/40">
              {HISTORICAL_MILESTONES.map((milestone, idx) => (
                <Reveal key={milestone.year} delay={idx * 0.04}>
                  <div className="relative group">
                    {/* Node Year Pill on the Line */}
                    <div className="absolute -left-7 sm:-left-9 top-3 sm:top-3.5 -translate-x-1/2 w-8 h-[20px] sm:w-9 sm:h-[22px] rounded-full border border-heritage-gold bg-white text-montfortian-blue text-[10px] sm:text-[11px] font-bold font-sans flex items-center justify-center shadow-2xs group-hover:bg-heritage-gold group-hover:text-white transition-colors duration-200">
                      {milestone.year}
                    </div>

                    {/* Timeline Milestone Card */}
                    <div className="border border-stone-texture/50 bg-royal-cream/15 p-3 sm:p-3.5 rounded-xl hover:bg-white hover:border-heritage-gold/50 hover:shadow-xs transition-all duration-200">
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-montfortian-blue mb-0.5 sm:mb-1">
                        {milestone.title}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-academic-slate/75">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Navigation Buttons */}
        <Reveal className="mt-5 sm:mt-8 pt-3 sm:pt-4 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Link
            href="/about/mission"
            className="inline-flex items-center gap-1.5 border border-heritage-gold/50 bg-white px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-heritage-gold-strong hover:bg-heritage-gold hover:text-white transition-all duration-200 rounded-sm font-sans shadow-2xs min-h-[44px]"
          >
            Our Mission &amp; Values
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 border border-heritage-gold/50 bg-white px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-heritage-gold-strong hover:bg-heritage-gold hover:text-white transition-all duration-200 rounded-sm font-sans shadow-2xs min-h-[44px]"
          >
            Begin Admissions Inquiry
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
