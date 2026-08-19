import { getInstitutionData } from "@/lib/site-data";

export function buildStructuredData(activeInst: "root" | "lfs" | "lfjc" | "lfdc" = "lfjc") {
  const instData = getInstitutionData(activeInst);
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
      "@type": "EducationalOrganization",
      name: instData.name,
      alternateName: instData.shortName,
      url: instData.siteUrl,
      foundingDate: instData.established,
      slogan: instData.tagline,
      email: instData.email,
      telephone: instData.phone,
      address,
      founder: {
        "@type": "Organization",
        name: "Montfort Brothers of St. Gabriel",
      },
      sameAs: [instData.siteUrl],
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
          sameAs: instData.siteUrl,
        },
      })),
    },
  ];
}

export function buildBreadcrumbStructuredData(items: { name: string; item: string }[]) {
  const rootData = getInstitutionData("lfjc");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? rootData.siteUrl;

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
