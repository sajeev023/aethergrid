import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Institutional breadcrumb navigation for sub-pages.
 * Renders as an inline path: Home / Parent / Current
 * with semantic nav markup and Schema.org structured data.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-sans font-medium">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 text-stone-texture" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-academic-slate/70 hover:text-montfortian-blue transition-colors duration-200"
                  >
                    {index === 0 && <Home className="h-3 w-3" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={`flex items-center gap-1 ${
                      isLast ? "text-academic-slate font-bold" : "text-academic-slate/70"
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {index === 0 && <Home className="h-3 w-3" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
