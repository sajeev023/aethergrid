import type { Metadata } from "next";
import { AboutPrincipal } from "@/components/sections/about-principal";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "A personal message of welcome and vision from Rev. Bro. Arun Prakash Lawrance, Correspondent & Principal of Little Flower Junior College, Uppal, Hyderabad.",
};

export default function AboutPrincipalPage() {
  return <AboutPrincipal activeInst="lfjc" />;
}
