import type { MetadataRoute } from "next";
import { getInstitutionData } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  const rootData = getInstitutionData("lfjc");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? rootData.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
