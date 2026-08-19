import type { Metadata } from "next";
import { AboutHistory } from "@/components/sections/about-history";

export const metadata: Metadata = {
  title: "Heritage & History",
  description:
    "Trace the milestones of Little Flower Junior College's 50-year journey — from its founding in Abids in 1974 to the Golden Jubilee celebrations at the Uppal campus.",
};

export default function AboutHistoryPage() {
  return <AboutHistory activeInst="lfjc" />;
}
