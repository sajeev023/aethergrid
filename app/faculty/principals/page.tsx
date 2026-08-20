import type { Metadata } from "next";
import { FacultyPrincipals } from "@/components/sections/faculty-principals";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Former Principals",
  description:
    "The official portrait gallery of the former principals who led Little Flower Junior College through its 50-year institutional history.",
};

export default function FacultyPrincipalsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
        <Breadcrumb items={[{ label: "Faculty", href: "/faculty" }, { label: "Former Principals" }]} />
      </div>
      <FacultyPrincipals activeInst="lfjc" />
    </div>
  );
}
