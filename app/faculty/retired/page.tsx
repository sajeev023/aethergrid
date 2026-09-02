import type { Metadata } from "next";
import { FacultyRetired } from "@/components/sections/faculty-retired";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Retired Faculty",
  description:
    "Honoring the emeritus educators of Little Flower Junior College — the teachers who dedicated their careers to shaping student excellence across five decades.",
};

export default function FacultyRetiredPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
        <Breadcrumb items={[{ label: "Faculty", href: "/faculty" }, { label: "Retired Faculty" }]} />
      </div>
      <FacultyRetired activeInst="lfjc" />
    </div>
  );
}
