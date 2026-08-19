import type { Metadata } from "next";
import { ParentLoginContent } from "@/components/sections/parent-login-content";

export const metadata: Metadata = {
  title: "Parent Portal | Little Flower Junior College",
  description:
    "Secure entry point for the Little Flower Junior College Parent Portal. Parents can access student grades, attendance records, BIE board announcements, and secure payment systems managed by our secure third-party platform.",
};

export default function ParentLoginPage() {
  return <ParentLoginContent />;
}
