import type { Metadata } from "next";
import { AboutMission } from "@/components/sections/about-mission";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description:
    "Discover the Montfortian pillars that guide every lesson and interaction at Little Flower Junior College — Mission, Vision, Core Values, and the meaning behind the institutional crest.",
};

export default function AboutMissionPage() {
  return <AboutMission activeInst="lfjc" />;
}
