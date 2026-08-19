import type { Metadata } from "next";

import { Programs } from "@/components/sections/programs";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore LFJC's intermediate academic streams — MPC, BiPC, MEC, and CEC — designed for engineering, medical, commerce, and humanities career pathways.",
};

export default function LFJCAcademicsPage() {
  return <Programs activeInst="lfjc" headingLevel="h1" />;
}
