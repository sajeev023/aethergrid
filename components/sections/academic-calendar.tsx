"use client";

import { Calendar, Download, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

const CALENDAR_MILESTONES = [
  { event: "College Reopens for Academic Year 2024–25", dates: "01-06-2024", type: "academic" },
  { event: "Unit Test – I", dates: "08-07-2024 to 13-07-2024", type: "exam" },
  { event: "Parent–Teacher Meeting (PTM)", dates: "20-07-2024", type: "meeting" },
  { event: "Unit Test – II", dates: "17-08-2024 to 24-08-2024", type: "exam" },
  { event: "Quarterly Examinations", dates: "28-09-2024 to 05-10-2024", type: "exam" },
  { event: "Dasara Vacation", dates: "06-10-2024 to 13-10-2024", type: "holiday" },
  { event: "Half Yearly Examinations", dates: "18-11-2024 to 23-11-2024", type: "exam" },
  { event: "Golden Jubilee Celebrations (1974–2024)", dates: "07-12-2024", type: "celebration" },
  { event: "Sankranti Holidays", dates: "11-01-2025 to 16-01-2025", type: "holiday" },
  { event: "Pre-Final Examinations — Phase I", dates: "20-01-2025 to 25-01-2025", type: "exam" },
  { event: "Pre-Final Examinations — Phase II", dates: "10-02-2025 to 15-02-2025", type: "exam" },
  { event: "Intermediate Public Examinations (IPE)", dates: "Last Week of February 2025", type: "board-exam" },
];

export function AcademicCalendarSection() {
  return (
    <Section id="calendar" variant="default" className="bg-royal-cream/25 border-t border-stone-texture/30 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-gold-strong font-sans">
              Archival Schedule Reference
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-academic-slate mt-1">
              Archive — Academic Calendar 2024–2025
            </h2>
            <p className="text-xs sm:text-sm text-academic-slate/75 font-sans mt-1">
              Archived instructional milestones for reference. The official 2026–2027 academic session schedule will be published following State Board notifications.
            </p>
          </div>

          <Button asChild size="sm" className="shrink-0 bg-montfortian-blue hover:bg-montfortian-blue/90 text-white font-sans text-xs font-bold uppercase tracking-wider">
            <a href="/docs/academic-calendar-2024-25.pdf" download="LFJC-Academic-Calendar-2024-25.pdf" className="inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Archive Calendar (PDF)
            </a>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CALENDAR_MILESTONES.map((item, idx) => {
            const isExam = item.type === "exam" || item.type === "board-exam";
            const isHoliday = item.type === "holiday";
            const isCelebration = item.type === "celebration";

            return (
              <Reveal key={item.event} delay={idx * 0.03}>
                <div className="bg-white p-4 rounded-xl border border-stone-texture/50 shadow-xs h-full flex flex-col justify-between hover:border-heritage-gold/60 transition-colors">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-sans ${
                        isExam
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : isHoliday
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : isCelebration
                          ? "bg-purple-100 text-purple-900 border border-purple-300"
                          : "bg-blue-100 text-blue-900 border border-blue-300"
                      }`}>
                        {item.type.replace("-", " ")}
                      </span>
                      <Calendar className="w-3.5 h-3.5 text-academic-slate/40" />
                    </div>
                    <h3 className="font-sans font-bold text-xs sm:text-sm text-academic-slate leading-snug">
                      {item.event}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-texture/20 flex items-center gap-1.5 text-xs font-semibold text-montfortian-blue font-sans">
                    <Clock className="w-3.5 h-3.5 text-heritage-gold-strong shrink-0" />
                    <span>{item.dates}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
