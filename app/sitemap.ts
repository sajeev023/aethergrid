import type { MetadataRoute } from "next";
import { getInstitutionData } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootData = getInstitutionData("lfjc");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? rootData.siteUrl;

  // Last content review date (update when pages materially change). Using a
  // fixed date instead of `new Date()` so crawlers don't learn to ignore the
  // sitemap as "everything changed today, every day".
  const reviewed = new Date("2026-08-16");

  type Route = { path: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly" };

  const routes: Route[] = [
    // Core
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/admissions", priority: 0.95, changeFrequency: "monthly" },
    { path: "/academics", priority: 0.9, changeFrequency: "monthly" },
    // About
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about/history", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about/mission", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about/principal", priority: 0.8, changeFrequency: "monthly" },
    // Faculty
    { path: "/faculty", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faculty/teaching", priority: 0.75, changeFrequency: "monthly" },
    { path: "/faculty/retired", priority: 0.7, changeFrequency: "yearly" },
    { path: "/faculty/principals", priority: 0.7, changeFrequency: "yearly" },
    // Campus
    { path: "/campus", priority: 0.8, changeFrequency: "monthly" },
    { path: "/campus/facilities", priority: 0.75, changeFrequency: "yearly" },
    { path: "/campus/sports", priority: 0.75, changeFrequency: "monthly" },
    { path: "/campus/gallery", priority: 0.75, changeFrequency: "monthly" },
    { path: "/campus/events", priority: 0.75, changeFrequency: "monthly" },
    // Alumni & Contact
    { path: "/alumni", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.75, changeFrequency: "yearly" },
    // Academics — stream parent pages (previously missing) + toppers subpages
    { path: "/academics/mpc", priority: 0.85, changeFrequency: "monthly" },
    { path: "/academics/bipc", priority: 0.85, changeFrequency: "monthly" },
    { path: "/academics/mec", priority: 0.85, changeFrequency: "monthly" },
    { path: "/academics/cec", priority: 0.85, changeFrequency: "monthly" },
    { path: "/academics/mpc/toppers", priority: 0.7, changeFrequency: "yearly" },
    { path: "/academics/bipc/toppers", priority: 0.7, changeFrequency: "yearly" },
    { path: "/academics/mec/toppers", priority: 0.7, changeFrequency: "yearly" },
    { path: "/academics/cec/toppers", priority: 0.7, changeFrequency: "yearly" },
    // Parent portal
    { path: "/parent-login", priority: 0.5, changeFrequency: "yearly" },
    // Legal / compliance
    { path: "/legal/anti-ragging", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/disclosures", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal/refund-cancellation", priority: 0.4, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: reviewed,
    changeFrequency,
    priority,
  }));
}