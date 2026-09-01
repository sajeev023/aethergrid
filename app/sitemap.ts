import type { MetadataRoute } from "next";
import { getInstitutionData } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootData = getInstitutionData("lfjc");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? rootData.siteUrl;

  const reviewed = new Date("2026-08-16");

  type Route = { path: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly" };

  const routes: Route[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/academics", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faculty", priority: 0.85, changeFrequency: "monthly" },
    { path: "/campus", priority: 0.85, changeFrequency: "monthly" },
    { path: "/admissions", priority: 0.95, changeFrequency: "monthly" },
    { path: "/alumni", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.75, changeFrequency: "yearly" },
    { path: "/parent-login", priority: 0.5, changeFrequency: "yearly" },
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
