import type { Metadata } from "next";
import { FacultyPrincipals } from "@/components/sections/faculty-principals";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Heritage | Former Correspondents & Principals",
  description:
    "Explore the 50-year heritage of Little Flower Junior College and the former correspondents and principals who guided the institution.",
};

export default function HeritagePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
        <Breadcrumb items={[{ label: "About", href: "/about" }, { label: "Heritage" }]} />
      </div>
      <FacultyPrincipals activeInst="lfjc" />
    </div>
  );
}
