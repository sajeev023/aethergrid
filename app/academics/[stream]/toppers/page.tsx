import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TopperPosterSection } from "@/components/sections/toppers";
import { lfjcData } from "@/lib/site-data";

interface StreamToppersPageProps {
  params: Promise<{ stream: string }>;
}

export function generateStaticParams() {
  return lfjcData.programs
    .filter((p) => !!p.slug)
    .map((p) => ({ stream: p.slug }));
}

export async function generateMetadata({
  params,
}: StreamToppersPageProps): Promise<Metadata> {
  const { stream } = await params;
  const program = lfjcData.programs.find((p) => p.slug === stream);
  if (!program) {
    return { title: "Toppers | Little Flower Junior College" };
  }
  return {
    title: `${program.title} Board Toppers | Little Flower Junior College`,
    description: `First and second year official board examination topper posters for ${program.title} (${program.subtitle}) stream at Little Flower Junior College.`,
  };
}

export default async function StreamToppersPage({ params }: StreamToppersPageProps) {
  const { stream } = await params;
  const program = lfjcData.programs.find((p) => p.slug === stream);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-slate-50/60 pb-10 pt-4 sm:pb-14 sm:pt-6 md:pb-20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Academics", href: "/academics" },
            { label: program.title, href: `/academics/${stream}` },
            { label: "Toppers" },
          ]}
        />

        {/* Page header */}
        <Reveal delay={0.05}>
          <div className="border-b border-slate-200/80 pb-4 sm:pb-5">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {program.title} ({program.subtitle}) Board Toppers
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 font-sans max-w-3xl">
              Official 1st Year and 2nd Year Intermediate Examination Topper Posters for Little Flower Junior College.
            </p>
          </div>
        </Reveal>

        {/* ================================================================= */}
        {/* MAIN SECTION 1: 1ST YEAR TOPPERS */}
        {/* ================================================================= */}
        <div className="mt-6 sm:mt-10 space-y-8 sm:space-y-12 md:space-y-16">
          <Reveal delay={0.05}>
            <TopperPosterSection
              title="1ST YEAR TOPPERS"
              subtitle={`Complete official 1st Year Intermediate Board Toppers Poster including ${program.subtitle}`}
              yearLabel="1st Year"
              posterPath="/images/toppers/1st-year-toppers-2026.jpg"
              altText={`Little Flower Junior College 1st Year Toppers Poster (${program.title})`}
              accentColor="amber"
            />
          </Reveal>

          {/* ================================================================= */}
          {/* MAIN SECTION 2: 2ND YEAR TOPPERS */}
          {/* ================================================================= */}
          <Reveal delay={0.08}>
            <TopperPosterSection
              title="2ND YEAR TOPPERS"
              subtitle={`Complete official 2nd Year Intermediate Board Toppers Poster including ${program.subtitle}`}
              yearLabel="2nd Year"
              posterPath="/images/toppers/2nd-year-toppers-2026.jpg"
              altText={`Little Flower Junior College 2nd Year Toppers Poster (${program.title})`}
              accentColor="blue"
            />
          </Reveal>
        </div>

        {/* Footnote */}
        <Reveal delay={0.05}>
          <p className="mt-8 sm:mt-14 text-[11px] sm:text-xs font-sans text-slate-500 italic text-center max-w-2xl mx-auto">
            Official publication scan of Little Flower Junior College, Uppal, Hyderabad. Board of Intermediate Education, Telangana results.
          </p>
        </Reveal>
      </div>
    </div>
  );
}