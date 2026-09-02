import type { Metadata } from "next";

import { Programs } from "@/components/sections/programs";
import { Toppers } from "@/components/sections/toppers";
import { AcademicCalendarSection } from "@/components/sections/academic-calendar";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Intermediate streams MPC, BiPC, MEC, and CEC at Little Flower Junior College, with official 2026 IPE board exam toppers and academic calendar.",
};

export default function LFJCAcademicsPage() {
  return (
    <>
      <Programs activeInst="lfjc" headingLevel="h1" />
      <Toppers />
      <AcademicCalendarSection />
    </>
  );
}