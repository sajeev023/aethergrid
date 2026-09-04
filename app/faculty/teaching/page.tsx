import type { Metadata } from "next";
import { FacultyTeaching } from "@/components/sections/faculty-teaching";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Teaching & Support Staff",
  description:
    "Meet the experienced department heads and subject educators of Little Flower Junior College — specialists in Mathematics, Physics, Chemistry, Biology, Commerce, and Languages.",
};

export default function FacultyTeachingPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
        <Breadcrumb items={[{ label: "Faculty", href: "/faculty" }, { label: "Teaching & Support Staff" }]} />
      </div>
      <FacultyTeaching activeInst="lfjc" />
    </div>
  );
}
