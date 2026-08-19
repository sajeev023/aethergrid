import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Little Flower Junior College administration office. Find campus address, phone, email, office hours, and submit inquiries.",
};

export default function LFJCContactPage() {
  return <Contact activeInst="lfjc" headingLevel="h1" />;
}
