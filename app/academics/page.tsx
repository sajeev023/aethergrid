import type { Metadata } from "next";

import { Toppers } from "@/components/sections/toppers";
import { Programs } from "@/components/sections/programs";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Official 2026 IPE board exam toppers and intermediate streams MPC, BiPC, MEC, and CEC at Little Flower Junior College.",
};

export default function LFJCAcademicsPage() {
  return (
    <>
      <Toppers headingLevel="h1" />
      <Programs activeInst="lfjc" headingLevel="h2" />
    </>
  );
}