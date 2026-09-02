import type { Metadata } from "next";
import { Faculty } from "@/components/sections/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Leadership, departments, and former principals of Little Flower Junior College.",
};

export default function LFJCFacultyPage() {
  return <Faculty activeInst="lfjc" headingLevel="h1" />;
}
