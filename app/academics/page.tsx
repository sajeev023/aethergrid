import type { Metadata } from "next";

import { Programs } from "@/components/sections/programs";
import { Toppers } from "@/components/sections/toppers";
import { AcademicCalendarSection } from "@/components/sections/academic-calendar";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Intermediate streams MPC, BiPC, MEC, and CEC at Little Flower Junior College, with 2024 IPE board exam toppers, centum counts, and official academic calendar.",
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