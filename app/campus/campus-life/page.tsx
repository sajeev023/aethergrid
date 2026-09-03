import type { Metadata } from "next";
import { CampusLifeCombinedView } from "@/components/sections/campus";

export const metadata: Metadata = {
  title: "Campus & Sports | Little Flower Junior College",
  description:
    "Explore the 8-acre Uppal campus infrastructure, state-of-the-art science and computer laboratories, central library, academic seminars, and athletic sports meets at Little Flower Junior College.",
};

export default function CampusLifePage() {
  return <CampusLifeCombinedView />;
}
