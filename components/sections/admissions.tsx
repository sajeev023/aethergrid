import { CheckCircle2, FileText, HelpCircle, ExternalLink } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { admissionsSteps, admissionsDocuments, PORTAL_LINKS } from "@/lib/site-data";

interface AdmissionsProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
  headingLevel?: "h1" | "h2";
}

export function Admissions({ activeInst = "lfjc", headingLevel = "h2" }: AdmissionsProps) {
  const Heading = headingLevel;

  return (
    <div id="admissions" className="bg-white">
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <Section variant="default" className="bg-gradient-to-b from-deep-navy to-montfortian-blue text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold-bright text-xs font-bold uppercase tracking-widest font-sans mb-3">
              Board of Intermediate Education, Telangana
            </span>
            <Heading className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
              Intermediate Admissions 2026–2027
            </Heading>
            <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/80 font-sans max-w-2xl mx-auto">
              Admissions open for Class X board graduates in M.P.C, Bi.P.C, M.E.C, and C.E.C intermediate streams at our 8-acre Uppal campus.
            </p>

            {/* Direct Official Online Portals Banner */}
            <div className="mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 text-center shadow-lg">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-heritage-gold-bright font-sans block mb-1">
                Official College Application Portals
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mb-2">
                Apply Directly Online
              </h3>
              <p className="text-xs sm:text-sm text-royal-cream/85 font-sans mb-6 max-w-lg mx-auto leading-relaxed">
                Submit your online registration on the primary LFJC student admissions portal. Inquiries are processed within 24 business hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto">
                <div className="w-full sm:w-auto text-center">
                  <a
                    href={PORTAL_LINKS.studentSignup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 active:scale-[0.99] text-center"
                  >
                    <span>Primary Admissions Portal (MySkoolCom)</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                  <span className="block text-[10px] text-royal-cream/70 font-sans mt-1">
                    Official primary online application route
                  </span>
                </div>

                <div className="w-full sm:w-auto text-center">
                  <a
                    href={PORTAL_LINKS.onlineAdmissionPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-sm border border-white/40 hover:border-white bg-white/5 hover:bg-white hover:text-deep-navy text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.99] text-center"
                  >
                    <span>Secondary / Alternate Registration</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <span className="block text-[10px] text-royal-cream/70 font-sans mt-1">
                    Use if directed by college admissions desk
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── DECISION-MAKING ESSENTIALS FOR PARENTS & APPLICANTS ──────── */}
      <Section variant="default" className="bg-royal-cream/25 border-b border-stone-texture/30 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Parent &amp; Student Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Key Admissions Information
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block">
                1. Application Timeline
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">
                Opening &amp; Processing
              </h3>
              <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
                Online inquiries are open now. Application processing and batch allotment commence immediately upon Class X board result declarations (SSC, CBSE, ICSE).
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block">
                2. Counseling &amp; Hours
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">
                Mon – Sat: 9 AM – 4 PM
              </h3>
              <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
                In-person academic counseling and document verification are held at the Ground Floor Reception Counter. Competitive coaching begins at 8:00 AM.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block">
                3. Fee Structure
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">
                Transparent &amp; Regulated
              </h3>
              <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
                Fees follow Board of Intermediate Education, Telangana norms. Complete fee schedules for all streams are available directly at the college office. Merit concessions apply.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong font-sans block">
                4. Helpdesk &amp; SLA
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate">
                24-Hour Response
              </h3>
              <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
                Call <strong>+91 7673960151</strong> or email <strong>info@lfjc.co.in</strong>. Admissions desk staff respond to all digital inquiries within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 1. HOW TO APPLY ──────────────────────────────────────────── */}
      <Section variant="default" className="bg-white py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mb-2">
          Admission Procedure
        </h2>
        <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mb-8">
          Step-by-step pathway to securing intermediate enrollment at LFJC:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {admissionsSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="rounded-2xl border border-stone-texture/60 bg-royal-cream/20 p-5 h-full flex flex-col justify-between hover:border-heritage-gold/50 transition-colors">
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-montfortian-blue text-white text-xs font-bold font-sans">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-academic-slate">{step.title}</h3>
                  <p className="mt-2 text-xs text-academic-slate/75 leading-relaxed font-sans">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 2. ELIGIBILITY CRITERIA ──────────────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30 py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mb-2">
          Eligibility Criteria
        </h2>
        <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mb-6">
          Mandatory requirements prescribed by the Board of Intermediate Education, Telangana:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
            <CheckCircle2 className="h-5 w-5 text-montfortian-blue" />
            <h4 className="font-serif text-sm font-bold text-academic-slate">Class X Qualifying Exam</h4>
            <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
              Passed Class X from SSC (Telangana / Andhra Pradesh), CBSE, ICSE, or any recognized State or National Board.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
            <CheckCircle2 className="h-5 w-5 text-montfortian-blue" />
            <h4 className="font-serif text-sm font-bold text-academic-slate">Stream Cutoffs</h4>
            <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
              Satisfying minimum percentage / grade points in Mathematics and Science for MPC and BiPC; Social Sciences for MEC and CEC.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-texture/50 shadow-xs space-y-2">
            <CheckCircle2 className="h-5 w-5 text-montfortian-blue" />
            <h4 className="font-serif text-sm font-bold text-academic-slate">Conduct & Verification</h4>
            <p className="text-xs text-academic-slate/75 font-sans leading-relaxed">
              Satisfactory conduct certificate and valid Transfer Certificate (TC) from the previous secondary institution.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── 3. REQUIRED DOCUMENTS CHECKLIST ──────────────────────────── */}
      <Section variant="default" className="bg-white py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mb-2">
          Required Documents Checklist
        </h2>
        <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mb-6">
          Submit the following documents at the college counter during verification:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {admissionsDocuments.map((doc) => (
            <Reveal key={doc}>
              <div className="flex gap-3 items-start rounded-xl border border-stone-texture/60 bg-royal-cream/20 p-3.5">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-strong" />
                <span className="text-xs text-academic-slate/80 font-sans">{doc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 4. ADMISSIONS FAQ ────────────────────────────────────────── */}
      <Section variant="default" className="bg-royal-cream/20 border-y border-stone-texture/30 py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 max-w-3xl mx-auto grid gap-3">
          {[
            {
              q: "Is there a separate entrance examination for admission?",
              a: "Admissions to Little Flower Junior College are conducted based on Class X Board marks merit followed by an academic counseling interaction.",
            },
            {
              q: "What competitive coaching is integrated with intermediate courses?",
              a: "LFJC offers integrated coaching for JEE Mains, EAMCET, and NEET (in specialized biology classrooms starting at 8:00 AM), as well as foundation orientation for CA Foundation and CLAT.",
            },
            {
              q: "What is the policy on campus discipline and anti-ragging?",
              a: "LFJC maintains a strict zero-tolerance anti-ragging policy under UGC and Telangana state regulations, monitored by an active Anti-Ragging Committee.",
            },
            {
              q: "How can non-Telangana state board students apply?",
              a: "Students from CBSE, ICSE, or other state boards must submit their Class X marks memo along with an official Migration Certificate.",
            },
          ].map((item) => (
            <details key={item.q} className="group rounded-xl border border-stone-texture/60 bg-white p-4 hover:border-heritage-gold/40 shadow-xs">
              <summary className="flex cursor-pointer items-start justify-between gap-3 list-none">
                <span className="flex items-start gap-2.5">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-heritage-gold-strong" />
                  <span className="font-serif text-sm font-bold text-academic-slate">{item.q}</span>
                </span>
                <span className="text-heritage-gold-strong font-bold transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <p className="mt-3 pl-6 text-xs text-academic-slate/75 leading-relaxed font-sans">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ─── 5. WEB INQUIRY FORM ──────────────────────────────────────── */}
      <Section id="admissions-form" variant="default" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Have Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Submit an Admissions Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/70 font-sans mt-1">
              Our counseling department will get back to you with syllabus details, optional subjects, and schedule.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-texture/60 bg-white p-6 sm:p-8 shadow-panel">
            <LeadForm activeInst={activeInst} />
          </div>
        </div>
      </Section>
    </div>
  );
}