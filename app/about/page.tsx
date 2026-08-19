import type { Metadata } from "next";

import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Little Flower Junior College's 50-year legacy of academic excellence, Montfortian values, and character formation in Uppal, Hyderabad.",
};

export default function LFJCAboutPage() {
  return <About activeInst="lfjc" />;
}
