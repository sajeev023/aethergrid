import { getInstitutionData } from "@/lib/site-data";

export function buildStructuredData(activeInst: "root" | "lfs" | "lfjc" | "lfdc" = "lfjc") {
  const instData = getInstitutionData(activeInst);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : instData.siteUrl);

  const address = {
    "@type": "PostalAddress",
    streetAddress: instData.addressLine,
    addressLocality: instData.locality,
    addressRegion: instData.region,
    postalCode: instData.postalCode,
    addressCountry: instData.country,
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": ["CollegeOrUniversity", "EducationalOrganization"],
      name: instData.name,
      alternateName: [instData.shortName, "LFJC Uppal", "Little Flower Uppal"],
      url: siteUrl,
      logo: `${siteUrl}/images/lfjc-logo.jpg`,
      image: `${siteUrl}/images/campus-hero.jpg`,
      description: "Little Flower Junior College (LFJC), Uppal, Hyderabad is a premier Catholic co-educational intermediate college established in 1974 by the Montfort Brothers of St. Gabriel, offering BIE Telangana approved M.P.C, Bi.P.C, M.E.C, and C.E.C programs.",
      foundingDate: instData.established,
      slogan: instData.tagline,
      email: instData.email,
      telephone: instData.phone,
      address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.4042,
        longitude: 78.5583,
      },
      hasMap: "https://maps.google.com/?q=Little+Flower+Junior+College+Uppal+Hyderabad",
      founder: {
        "@type": "Organization",
        name: "Montfort Brothers of St. Gabriel",
      },
      sameAs: [siteUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Programs at ${instData.name}`,
      itemListElement: instData.programs.map((program, index) => ({
        "@type": "Course",
        position: index + 1,
        name: `${program.title} - ${program.subtitle}`,
        description: program.description,
        provider: {
          "@type": "EducationalOrganization",
          name: instData.name,
          sameAs: siteUrl,
        },
      })),
    },
  ];
}

export function buildBreadcrumbStructuredData(items: { name: string; item: string }[]) {
  const rootData = getInstitutionData("lfjc");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : rootData.siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...items.map((it, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: it.name,
        item: it.item.startsWith("http") ? it.item : `${siteUrl}${it.item}`,
      })),
    ],
  };
}
