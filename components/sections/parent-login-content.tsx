"use client";

import Link from "next/link";
import { ShieldCheck, ArrowLeft, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ParentLoginContent() {
  return (
    <div className="section-texture overflow-hidden bg-royal-cream/40 py-6 sm:py-10 md:py-14 min-h-[40vh] sm:min-h-[50vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8 w-full">
        <Reveal>
          <div className="bg-white border border-stone-texture shadow-[0_15px_40px_rgba(16,31,44,0.06)] rounded-lg overflow-hidden">
            {/* Header Banner */}
            <div className="bg-academic-slate p-3.5 sm:p-5 text-white border-b border-stone-texture/20 text-center relative">
              <div className="absolute inset-0 opacity-[0.04] stone-pattern pointer-events-none" />
              <span className="inline-block px-2.5 py-0.5 mb-1.5 sm:mb-2 bg-heritage-gold/20 border border-heritage-gold/30 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-heritage-gold-bright rounded-sm">
                Digital Services
              </span>
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                Little Flower Parent Portal
              </h1>
            </div>

            {/* Main Coming Soon Message */}
            <div className="p-4 sm:p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-royal-cream text-heritage-gold-strong flex items-center justify-center mx-auto border border-stone-texture/50 shadow-inner">
                <Clock className="h-6 w-6 text-heritage-gold-strong" />
              </div>

              <div className="space-y-2">
                <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
                  Digital Portal Integration in Progress • Coming Soon
                </span>
                <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-academic-slate leading-snug">
                  Online Student Record Access
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-lg mx-auto">
                  The Little Flower Junior College Parent Portal for real-time attendance, internal examination marks, and fee payment receipts is currently undergoing secure academic systems integration for the upcoming session.
                </p>
              </div>

              {/* Immediate Support Desk for Parents */}
              <div className="border border-stone-texture bg-royal-cream/25 p-4 rounded-lg text-left max-w-lg mx-auto space-y-2.5 font-sans">
                <div className="flex items-center gap-2 text-montfortian-blue font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-heritage-gold-strong" />
                  <span>Immediate Academic &amp; Attendance Records</span>
                </div>
                <p className="text-xs text-academic-slate/80 leading-relaxed">
                  Parents requiring immediate student progress memos, attendance reports, or fee receipts are invited to contact the college administrative office directly:
                </p>
                <div className="pt-1 grid sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="tel:+917673960151"
                    className="flex items-center gap-2 font-semibold text-montfortian-blue hover:underline bg-white p-2 rounded border border-stone-texture/60"
                  >
                    <Phone className="h-3.5 w-3.5 text-heritage-gold-strong" />
                    <span>+91 7673960151</span>
                  </a>
                  <a
                    href="mailto:info@lfjc.co.in"
                    className="flex items-center gap-2 font-semibold text-montfortian-blue hover:underline bg-white p-2 rounded border border-stone-texture/60"
                  >
                    <Mail className="h-3.5 w-3.5 text-heritage-gold-strong" />
                    <span>info@lfjc.co.in</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center">
                <Button asChild size="lg" className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase h-10 px-6 rounded-sm shadow-sm">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Contact Administration Office
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase h-10 px-6 rounded-sm border-stone-texture/80 hover:bg-royal-cream/5 transition-all">
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
