import type { Metadata } from "next";
import { FacultyPrincipals } from "@/components/sections/faculty-principals";

export const metadata: Metadata = {
  title: "Former Principals",
  description:
    "The official portrait gallery of the former principals who led Little Flower Junior College through its 50-year institutional history.",
};

export default function FacultyPrincipalsPage() {
  return <FacultyPrincipals activeInst="lfjc" />;
}
