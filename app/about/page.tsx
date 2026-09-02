import type { Metadata } from "next";

import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "History, leadership, and values of Little Flower Junior College, Uppal, Hyderabad.",
};

export default function LFJCAboutPage() {
  return <About activeInst="lfjc" />;
}
