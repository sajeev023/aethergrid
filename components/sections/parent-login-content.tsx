"use client";

import Link from "next/link";
import { ShieldCheck, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ParentLoginContent() {
  return (
    <div className="section-texture overflow-hidden bg-royal-cream/40 py-6 sm:py-10 md:py-14 min-h-[35vh] sm:min-h-[40vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="bg-white border border-stone-texture shadow-[0_15px_40px_rgba(16,31,44,0.06)] rounded-lg overflow-hidden">
            {/* Header Banner */}
            <div className="bg-academic-slate p-3.5 sm:p-5 text-white border-b border-stone-texture/20 text-center relative">
              <div className="absolute inset-0 opacity-[0.04] stone-pattern pointer-events-none" />
              <span className="inline-block px-2.5 py-0.5 mb-1.5 sm:mb-2 bg-heritage-gold/20 border border-heritage-gold/30 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright rounded-sm">
                Parent Portal Access
              </span>
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                Little Flower Parent Portal
              </h1>
            </div>

            {/* Main Redirection Message */}
            <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-royal-cream text-heritage-gold-strong flex items-center justify-center mx-auto border border-stone-texture/50 shadow-inner">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-academic-slate leading-snug">
                  Access grades, attendance &amp; fees
                </h2>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/75 font-sans max-w-lg mx-auto">
                  Little Flower Junior College hosts parent records, term grades, attendance tracking, and fee payments on a dedicated institutional platform for verified families.
                </p>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-sans text-academic-slate/70 max-w-lg mx-auto">
                  You will be directed to <span className="font-semibold text-montfortian-blue">parentportal.lfjc.co.in</span> — please confirm the address in your browser before signing in.
                </p>
              </div>

              {/* Guidelines panel */}
              <div className="border border-stone-texture bg-royal-cream/25 p-3 sm:p-4 rounded text-left max-w-lg mx-auto space-y-2 font-sans">
                <h3 className="font-bold text-[10px] sm:text-[11px] uppercase tracking-widest text-heritage-gold-strong">Portal Access Guidelines</h3>
                <ul className="list-disc list-inside text-[10px] sm:text-[11px] text-academic-slate/70 space-y-1 sm:space-y-1.5 leading-relaxed">
                  <li>Please prepare the parent login credentials provided by the college administration desk during admission.</li>
                  <li>Verify you are using a secure network connection before inputting credentials.</li>
                  <li>For credential resets, locked profiles, or new registration details, contact the administrative office helpdesk directly.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center">
                <Button asChild size="lg" className="w-full sm:w-auto text-[10px] tracking-wider uppercase font-semibold h-9 sm:h-10 px-6 sm:px-8 rounded-sm shadow-sm">
                  <a
                    href="https://parentportal.lfjc.co.in" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Proceed to Portal
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-[10px] tracking-wider uppercase font-semibold h-9 sm:h-10 px-6 sm:px-8 rounded-sm border-stone-texture/80 hover:border-academic-slate hover:bg-royal-cream/5 transition-all">
                  <Link href="/" className="inline-flex items-center gap-1.5">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
