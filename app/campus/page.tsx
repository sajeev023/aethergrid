import type { Metadata } from "next";
import { CampusLife } from "@/components/sections/campus";

export const metadata: Metadata = {
  title: "Campus Life",
  description:
    "Explore the LFJC campus, Silver Jubilee, Golden Jubilee, events, sports, and video archive.",
};

export default function CampusPage() {
  return <CampusLife activeInst="lfjc" />;
}
