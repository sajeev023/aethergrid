"use client";

import Link from "next/link";
import { ExternalLink, Phone, Mail, ShieldCheck, UserCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PORTAL_LINKS, lfjcData } from "@/lib/site-data";

export function ParentLoginContent() {
  return (
    <div className="section-texture overflow-hidden bg-royal-cream/40 py-10 sm:py-16 min-h-[50vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-8 w-full">
        <Reveal>
          <div className="bg-white border border-stone-texture shadow-float rounded-2xl overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-deep-navy to-montfortian-blue p-6 text-white text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-gold-bright font-sans">
                Official College ERP Gateway
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Parent & Student Login
              </h1>
              <p className="text-xs text-royal-cream/80 font-sans mt-1">
                Powered by MySkoolCom for Little Flower Junior College, Uppal
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-royal-cream text-montfortian-blue flex items-center justify-center mx-auto border border-stone-texture/60 shadow-inner">
                <ShieldCheck className="h-7 w-7 text-heritage-gold-strong" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-academic-slate">
                  Access Academic Records, Attendance & Fee Receipts
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-academic-slate/75 font-sans max-w-lg mx-auto">
                  Students and parents can access real-time attendance, internal examination marks, terminal evaluation reports, and official fee transaction receipts via the active MySkoolCom college ERP system.
                </p>
              </div>

              {/* Login Credentials Instructions */}
              <div className="text-left bg-royal-cream/30 p-4 rounded-xl border border-stone-texture/50 text-xs font-sans space-y-2">
                <div className="flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-montfortian-blue shrink-0 mt-0.5" />
                  <span><strong>Username:</strong> Registered Student Admission Number or Mobile Number provided during enrollment.</span>
                </div>
                <div className="flex items-start gap-2">
                  <KeyRound className="w-4 h-4 text-montfortian-blue shrink-0 mt-0.5" />
                  <span><strong>Password:</strong> Assigned during admission. If forgotten, contact the administrative fee counter.</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button asChild size="lg" className="w-full sm:w-auto bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy font-bold text-xs uppercase tracking-wider h-11 px-8 rounded-md shadow-md">
                  <a
                    href={PORTAL_LINKS.parentStudentLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    Proceed to MySkoolCom Portal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider h-11 px-6">
                  <Link href="/contact">
                    Office Support
                  </Link>
                </Button>
              </div>

              {/* Contact Assistance */}
              <div className="pt-4 border-t border-stone-texture/20 text-xs text-academic-slate/70 font-sans">
                <p>Need assistance with student login credentials?</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-montfortian-blue">
                  <a href={`tel:${lfjcData.phone.replace(/\s/g, "")}`} className="hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{lfjcData.phone}</span>
                  </a>
                  <a href={`mailto:${lfjcData.email}`} className="hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lfjcData.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}