import type { Metadata } from "next";
import { FacultyRetired } from "@/components/sections/faculty-retired";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Retired Staff",
  description:
    "Honoring the 39 emeritus educators and staff members of Little Flower Junior College — the teachers and staff who dedicated their careers to shaping student excellence across five decades.",
};

export default function FacultyRetiredPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
        <Breadcrumb items={[{ label: "Faculty", href: "/faculty" }, { label: "Retired Staff" }]} />
      </div>
      <FacultyRetired activeInst="lfjc" />
    </div>
  );
}
