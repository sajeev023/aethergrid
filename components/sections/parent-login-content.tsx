"use client";

import Link from "next/link";
import { Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ParentLoginContent() {
  return (
    <div className="section-texture overflow-hidden bg-royal-cream/40 py-6 sm:py-10 md:py-14 min-h-[40vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8 w-full">
        <Reveal>
          <div className="bg-white border border-stone-texture shadow-[0_15px_40px_rgba(16,31,44,0.06)] rounded-lg overflow-hidden">
            {/* Header Banner */}
            <div className="bg-academic-slate p-3.5 sm:p-5 text-white border-b border-stone-texture/20 text-center">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                Parent Portal
              </h1>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-royal-cream text-heritage-gold-strong flex items-center justify-center mx-auto border border-stone-texture/50 shadow-inner">
                <Clock className="h-6 w-6" />
              </div>

              <div className="space-y-2">
                <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
                  Coming Soon
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-lg mx-auto">
                  Attendance, examination marks, and fee receipts will be available online. Until then, contact the college office for records.
                </p>
              </div>

              <div className="pt-1 grid sm:grid-cols-2 gap-2 text-xs max-w-md mx-auto">
                <a
                  href="tel:+917673960151"
                  className="flex items-center gap-2 font-semibold text-montfortian-blue hover:underline bg-white p-2 rounded border border-stone-texture/60"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>+91 7673960151</span>
                </a>
                <a
                  href="mailto:info@lfjc.co.in"
                  className="flex items-center gap-2 font-semibold text-montfortian-blue hover:underline bg-white p-2 rounded border border-stone-texture/60"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>info@lfjc.co.in</span>
                </a>
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