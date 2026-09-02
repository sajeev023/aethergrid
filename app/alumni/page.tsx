import type { Metadata } from "next";

import { Alumni } from "@/components/sections/alumni";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "Distinguished LFJC alumni across civil services, cinema, medicine, engineering, business, and the arts.",
};

export default function LFJCAlumniPage() {
  return <Alumni />;
}
