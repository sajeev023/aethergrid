import type { Metadata } from "next";

import { Admissions } from "@/components/sections/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply to Little Flower Junior College for the 2026-27 academic year. Explore eligibility, admission process, and submit your inquiry for MPC, BiPC, MEC, or CEC streams.",
};

export default function LFJCAdmissionsPage() {
  return <Admissions activeInst="lfjc" headingLevel="h1" />;
}
