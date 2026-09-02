import type { Metadata } from "next";
import { SilverJubileeView } from "@/components/sections/campus";

export const metadata: Metadata = {
  title: "Silver Jubilee Retrospective (1999) | Little Flower Junior College",
  description:
    "Archival captures from the 25th anniversary celebrations, state honors by the Chief Minister, and IIT/State rank holders recognition at Little Flower Junior College.",
};

export default function SilverJubileePage() {
  return <SilverJubileeView />;
}
