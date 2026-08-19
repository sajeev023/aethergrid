import React from "react";
import type { Metadata } from "next";
import { Trophy, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TopperPosterSection } from "@/components/sections/toppers";

export const metadata: Metadata = {
  title: "Board Exam Toppers | Little Flower Junior College",
  description:
    "Official 1st Year and 2nd Year Intermediate Board Examination Topper Posters for Little Flower Junior College, Uppal, Hyderabad.",
};

export default function ToppersPage() {
  return (
    <div className="bg-slate-50/60 pb-16 pt-6 md:pb-20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Academics", href: "/academics" },
            { label: "Board Toppers" },
          ]}
        />

        {/* Hero Header */}
        <Reveal delay={0.05}>
          <div className="mt-4 border-b border-slate-200/80 pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-200/70 mb-3">
                  <Trophy className="h-3.5 w-3.5 text-amber-600" />
                  <span>Official Intermediate Board Examination Results (2026)</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Intermediate Board Toppers
                </h1>
                <p className="mt-2 text-sm md:text-base text-slate-600 max-w-3xl font-sans leading-relaxed">
                  Official roll of honour for Little Flower Junior College, Uppal, Hyderabad. Displaying the original 1st Year and 2nd Year Intermediate Examination Topper Posters in full composition.
                </p>
              </div>

              {/* Institution Seal Badge */}
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Official Publication Scan</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 space-y-16">
          {/* ================================================================= */}
          {/* MAIN SECTION 1: 1ST YEAR TOPPERS */}
          {/* ================================================================= */}
          <Reveal delay={0.05}>
            <TopperPosterSection
              title="1ST YEAR TOPPERS"
              subtitle="Complete official 1st Year Intermediate Board Toppers Poster (MPC, BiPC, MEC, CEC)"
              yearLabel="1st Year"
              posterPath="/images/toppers/1st-year-toppers-2026.jpg"
              altText="Little Flower Junior College IPE 1st Year Toppers 2026 Poster"
              accentColor="amber"
            />
          </Reveal>

          {/* ================================================================= */}
          {/* MAIN SECTION 2: 2ND YEAR TOPPERS */}
          {/* ================================================================= */}
          <Reveal delay={0.08}>
            <TopperPosterSection
              title="2ND YEAR TOPPERS"
              subtitle="Complete official 2nd Year Intermediate Board Toppers Poster (MPC, BiPC, MEC, CEC)"
              yearLabel="2nd Year"
              posterPath="/images/toppers/2nd-year-toppers-2026.jpg"
              altText="Little Flower Junior College IPE 2nd Year Toppers 2026 Poster"
              accentColor="blue"
            />
          </Reveal>
        </div>

        {/* Verification Footnote */}
        <Reveal delay={0.05}>
          <div className="mt-16 p-4 rounded-xl bg-white border border-slate-200/80 text-center max-w-3xl mx-auto shadow-xs">
            <p className="text-xs text-slate-500 italic">
              Official posters published by Little Flower Junior College, Uppal, Hyderabad-500039. Verification of Board of Intermediate Education, Telangana (BIE TS) results.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
