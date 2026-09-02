import type { Metadata } from "next";
import { ParentLoginContent } from "@/components/sections/parent-login-content";

export const metadata: Metadata = {
  title: "Parent Portal",
  description: "Parent portal for student records at Little Flower Junior College.",
};

export default function ParentLoginPage() {
  return <ParentLoginContent />;
}
