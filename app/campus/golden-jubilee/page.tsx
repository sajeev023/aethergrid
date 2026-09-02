import type { Metadata } from "next";
import { GoldenJubileeView } from "@/components/sections/campus";

export const metadata: Metadata = {
  title: "Golden Jubilee Celebrations (1974–2024) | Little Flower Junior College",
  description:
    "Commemorating 50 glorious years of Montfortian education, global alumni reunions, retired faculty honors, and cultural presentations at Little Flower Junior College.",
};

export default function GoldenJubileePage() {
  return <GoldenJubileeView />;
}
