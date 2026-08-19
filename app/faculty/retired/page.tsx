import type { Metadata } from "next";
import { FacultyRetired } from "@/components/sections/faculty-retired";

export const metadata: Metadata = {
  title: "Retired Faculty",
  description:
    "Honoring the emeritus educators of Little Flower Junior College — the teachers who dedicated their careers to shaping student excellence across five decades.",
};

export default function FacultyRetiredPage() {
  return <FacultyRetired activeInst="lfjc" />;
}
