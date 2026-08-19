import type { Metadata } from "next";
import { Faculty } from "@/components/sections/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet the dedicated educators, department heads, and mentors of Little Flower Junior College — committed to excellence across all four intermediate streams.",
};

export default function LFJCFacultyPage() {
  return <Faculty activeInst="lfjc" headingLevel="h1" />;
}
