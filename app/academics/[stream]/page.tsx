import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, GraduationCap, ShieldCheck, Trophy, Users } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { faculty } from "@/lib/site-data";

const STREAM_DETAILS: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  entranceExam: string;
  subjects: { name: string; desc: string }[];
  careers: string[];
  labs: string[];
  highlights: string[];
}> = {
  mpc: {
    title: "M.P.C Stream",
    subtitle: "Mathematics, Physics, and Chemistry",
    description: "The premier science and quantitative stream designed for students aspiring toward engineering, architecture, computer science, and technological research. LFJC offers intensive conceptual training integrated with IIT-JEE and EAPCET orientation.",
    entranceExam: "IIT-JEE (Main & Advanced), TS EAPCET, BITSAT, VITEEE",
    subjects: [
      { name: "Mathematics (Paper IA & IB, IIA & IIB)", desc: "Algebra, Trigonometry, Coordinate Geometry, Calculus, Probability, and Vector Algebra." },
      { name: "Physics", desc: "Mechanics, Waves, Optics, Thermodynamics, Electromagnetism, and Modern Physics with hands-on lab experiments." },
      { name: "Chemistry", desc: "Physical, Organic, and Inorganic Chemistry along with qualitative and quantitative practical analysis." },
      { name: "English & Second Language", desc: "Grammar, literary appreciation, and communication mastery in English and chosen language." },
    ],
    careers: ["Computer Science & AI Engineering", "Mechanical & Civil Engineering", "Architecture & Planning (B.Arch)", "Data Science & Mathematics", "Defense Services (NDA)"],
    labs: ["Physics Practical Lab", "Chemistry Practical Lab", "Computer Science Lab"],
    highlights: [
      "Dedicated problem-solving sessions for entrance exams",
      "Comprehensive BIE Telangana board exam preparation",
      "Regular mock tests and performance analytics",
    ],
  },
  bipc: {
    title: "Bi.P.C Stream",
    subtitle: "Botany, Zoology, Physics, and Chemistry",
    description: "The core biological science stream tailored for students aiming for medical, dental, veterinary, pharmacy, and biotechnology professional courses. LFJC provides rigorous conceptual mastery integrated with NEET orientation.",
    entranceExam: "NEET-UG, TS EAPCET (Agriculture & Pharmacy), ICAR, AIIMS Nursing",
    subjects: [
      { name: "Botany", desc: "Plant Anatomy, Taxonomy, Physiology, Genetics, Biotechnology, and Economic Botany." },
      { name: "Zoology", desc: "Human Anatomy & Physiology, Animal Diversity, Genetics, Evolution, and Applied Zoology." },
      { name: "Physics", desc: "Mechanics, Electricity, Magnetism, Optics, and Atomic Physics with biological applications." },
      { name: "Chemistry", desc: "Organic synthesis, Bio-chemistry, Electrochemistry, and Chemical Kinetics." },
    ],
    careers: ["Medicine (MBBS & BDS)", "Pharmacy (Pharm.D & B.Pharm)", "Biotechnology & Genetics", "Veterinary Science (B.V.Sc)", "Physiotherapy & Allied Health"],
    labs: ["Botany & Zoology Specimen Lab", "Chemistry Analytical Lab", "Physics Lab"],
    highlights: [
      "Microscopic & dissection demonstration exposure",
      "NCERT & State Board synchronized curriculum",
      "NEET pattern weekly mock examinations",
    ],
  },
  mec: {
    title: "M.E.C Stream",
    subtitle: "Mathematics, Economics, and Commerce",
    description: "A high-powered quantitative commerce stream ideal for students seeking careers in Chartered Accountancy (CA), Actuarial Science, Financial Analysis, and Corporate Management. Blends mathematical rigor with business acumen.",
    entranceExam: "CA Foundation, CMA Foundation, CS Executive Entrance (CSEET), IPMAT",
    subjects: [
      { name: "Mathematics", desc: "Calculus, Commercial Mathematics, Statistics, Matrices, and Probability theory." },
      { name: "Commerce & Accountancy", desc: "Financial Accounting, Partnership Accounts, Company Accounts, and Business Organization." },
      { name: "Economics", desc: "Micro & Macro Economics, National Income, Banking, Money & International Trade." },
      { name: "Languages", desc: "Professional English and Second Language." },
    ],
    careers: ["Chartered Accountancy (CA)", "Cost & Management Accounting (CMA)", "Company Secretary (CS)", "Financial Risk Manager (FRM)", "Business Analytics & Data Science"],
    labs: ["Computer Accounting Lab", "Commerce Seminar Workshop"],
    highlights: [
      "CA Foundation & CPT orientation classes",
      "Tally & Digital Accounting software exposure",
      "Industrial visits & business case studies",
    ],
  },
  cec: {
    title: "C.E.C Stream",
    subtitle: "Civics, Economics, and Commerce",
    description: "The ideal stream for students targeting Corporate Law, Civil Services (UPSC/TSPSC), Public Administration, Business Management, and Entrepreneurship. Focuses on social governance, legal frameworks, and commercial practices.",
    entranceExam: "CLAT, TS LAWCET, IPMAT, CUET-UG, Civil Services Foundation",
    subjects: [
      { name: "Civics & Governance", desc: "Indian Constitution, Political Theory, Public Administration, International Relations, and Local Self-Government." },
      { name: "Commerce & Accountancy", desc: "Bookkeeping, Double Entry System, Business Environment, and Management Principles." },
      { name: "Economics", desc: "Economic Development, Indian Economy, Public Finance, and Agricultural Economics." },
      { name: "Languages", desc: "Advanced English and Second Language." },
    ],
    careers: ["Corporate & Constitutional Law (LL.B)", "Civil Services (IAS, IPS, IFS)", "Business Administration (BBA/MBA)", "Journalism & Mass Communication", "Hotel & Hospitality Management"],
    labs: ["Civics Moot Court & Debate Forum", "Commerce Practical Lab"],
    highlights: [
      "CLAT & Law entrance preparation guidance",
      "Model United Nations (MUN) & Debating Society",
      "Regular guest lectures by Civil Servants & Advocates",
    ],
  },
};

export function generateStaticParams() {
  return [{ stream: "mpc" }, { stream: "bipc" }, { stream: "mec" }, { stream: "cec" }];
}

// Core subjects taught in each stream — used to surface the relevant teaching
// faculty on each stream page (previously these pages listed no faculty at all).
const STREAM_SUBJECTS: Record<string, string[]> = {
  mpc: ["Mathematics", "Physics", "Chemistry"],
  bipc: ["Botany", "Zoology", "Physics", "Chemistry"],
  mec: ["Mathematics", "Economics", "Commerce"],
  cec: ["Civics", "Economics", "Commerce", "Political Science"],
};

const ACADEMIC_DEPARTMENTS = new Set([
  "Mathematics Department",
  "Physics Department",
  "Chemistry Department",
  "Biology Department",
  "Humanities Department",
  "Commerce Department",
  "Computer Science Department",
]);

function streamFaculty(streamKey: string) {
  const subjects = STREAM_SUBJECTS[streamKey] ?? [];
  return faculty.filter((f) => {
    if (!ACADEMIC_DEPARTMENTS.has(f.department)) return false;
    return subjects.some((s) => f.subject?.includes(s) ?? false);
  });
}

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = STREAM_DETAILS[resolvedParams.stream.toLowerCase()];
  if (!data) return { title: "Academic Stream | LFJC" };

  return {
    title: `${data.title} — ${data.subtitle}`,
    description: data.description,
  };
}

export default async function StreamDetailPage({ params }: { params: Promise<{ stream: string }> }) {
  const resolvedParams = await params;
  const streamKey = resolvedParams.stream.toLowerCase();
  const data = STREAM_DETAILS[streamKey];

  if (!data) {
    notFound();
  }

  const teachers = streamFaculty(streamKey);

  return (
    <div className="section-texture bg-white py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Academics", href: "/academics" }, { label: data.title }]} />

        {/* Page Header */}
        <div className="mb-5 sm:mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-heritage-gold-strong mb-1.5 sm:mb-2 font-sans">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Intermediate Academic Stream</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-academic-slate tracking-tight">
            {data.title}
          </h1>
          <p className="mt-1 font-editorial text-base sm:text-lg md:text-xl text-heritage-gold-strong italic">
            {data.subtitle}
          </p>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-6 text-academic-slate/75 font-sans">
            {data.description}
          </p>
          <span className="gold-rule gold-rule-center !mt-3 sm:!mt-5" />
        </div>

        {/* Overview Banner */}
        <Reveal className="mb-6 sm:mb-10 grid gap-4 sm:gap-6 rounded-xl border border-stone-texture bg-royal-cream/20 p-4 sm:p-6 md:grid-cols-2">
          <div>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong font-sans block mb-1">
              Competitive Entrance Target
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate mb-1.5 sm:mb-2">
              Competitive Entrance Orientation
            </h2>
            <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/75 font-sans mb-2.5 sm:mb-3">
              {data.entranceExam}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-montfortian-blue">
              <ShieldCheck className="h-4 w-4 text-heritage-gold-strong" />
              <span>Integrated BIE Board + Entrance Exam Coaching</span>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-stone-texture/50 pt-3.5 md:pt-0 md:pl-6">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-heritage-gold-strong font-sans block mb-1">
              Stream Highlights
            </span>
            <ul className="space-y-1.5 sm:space-y-2">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-academic-slate/80 font-sans font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-heritage-gold-strong shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Subjects Grid */}
        <div className="mb-6 sm:mb-12">
          <SectionHeading
            eyebrow="Curriculum Structure"
            title="Subjects Covered"
            description="A balanced academic curriculum prescribed by the Board of Intermediate Education, Telangana (BIETS)."
          />

          <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
            {data.subjects.map((sub, idx) => (
              <Reveal key={sub.name} delay={idx * 0.05}>
                <div className="group h-full rounded-lg border border-stone-texture bg-white p-3.5 sm:p-5 hover:border-heritage-gold/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <BookOpen className="h-4 w-4 text-montfortian-blue group-hover:text-heritage-gold-strong transition-colors" />
                    <h3 className="font-serif text-sm sm:text-base font-bold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                      {sub.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed sm:leading-5 text-academic-slate/70 font-sans">
                    {sub.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Careers & Practical Labs */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-6 sm:mb-12">
          {/* Career Pathways */}
          <Reveal className="rounded-xl border border-stone-texture bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <GraduationCap className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-heritage-gold-strong" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">
                Career Pathways
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {data.careers.map((career) => (
                <li key={career} className="flex items-center gap-2 sm:gap-2.5 text-xs text-academic-slate/80 font-sans">
                  <span className="h-1.5 w-1.5 rounded-full bg-heritage-gold-strong shrink-0" />
                  <span>{career}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Practical Labs */}
          <Reveal delay={0.1} className="rounded-xl border border-stone-texture bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FlaskConical className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-montfortian-blue" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">
                Laboratory & Practical Facilities
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-2.5">
              {data.labs.map((lab) => (
                <li key={lab} className="flex items-center gap-2 sm:gap-2.5 text-xs text-academic-slate/80 font-sans">
                  <CheckCircle2 className="h-3.5 w-3.5 text-montfortian-blue shrink-0" />
                  <span>{lab}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Stream Faculty — the teachers behind this stream */}
        {teachers.length > 0 && (
          <div className="mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Meet Your Mentors"
              title="Faculty for This Stream"
              description="The department heads and subject teachers who lead classroom and laboratory instruction for this programme."
            />
            <div className="mt-5 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {teachers.map((teacher, idx) => (
                <Reveal key={`${teacher.name}-${idx}`} delay={(idx % 4) * 0.05}>
                  <div className="group h-full rounded-lg border border-stone-texture bg-white p-3 sm:p-4 text-center hover:border-heritage-gold/50 hover:shadow-md transition-all duration-300">
                    <div className="relative mx-auto h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border border-stone-texture/60 bg-royal-cream/30">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2.5 sm:mt-3 font-serif text-xs sm:text-sm font-bold text-academic-slate leading-tight line-clamp-1">
                      {teacher.name}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-heritage-gold-strong font-sans line-clamp-1">
                      {teacher.subject}
                    </p>
                    <p className="mt-0.5 text-[9px] sm:text-[10px] text-academic-slate/60 font-sans line-clamp-1">
                      {teacher.designation}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-4 sm:mt-5 text-center">
              <Link
                href="/faculty/teaching"
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
              >
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                View full teaching &amp; support staff
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <Reveal className="border-t border-stone-texture/40 pt-6 sm:pt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          <Button asChild size="lg" className="text-xs uppercase tracking-[0.14em]">
            <Link href={`/academics/${streamKey}/toppers`}>
              <Trophy className="h-4 w-4 mr-2" />
              View {data.title} Toppers
            </Link>
          </Button>

          <Button asChild variant="secondary" size="lg" className="text-xs uppercase tracking-[0.14em]">
            <Link href="/admissions">
              Begin Admissions Inquiry
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </Reveal>

      </div>
    </div>
  );
}
