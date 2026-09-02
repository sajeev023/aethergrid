import type { Metadata } from "next";

import { Admissions } from "@/components/sections/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Eligibility, process, documents, and inquiry form for LFJC admissions 2026–27 (MPC, BiPC, MEC, CEC).",
};

export default function LFJCAdmissionsPage() {
  return <Admissions activeInst="lfjc" headingLevel="h1" />;
}
