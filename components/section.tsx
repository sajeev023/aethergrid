import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "default" | "dense" | "feature" | "hero";

/**
 * Unified page section wrapper — enforces the spacing system and the
 * shared container, so individual sections never re-declare padding/container
 * boilerplate.
 *
 * Variants (vertical padding only — horizontal is the shared container):
 *   default → py-12 md:py-16   (standard content section)
 *   dense   → py-6 md:py-8     (tight grids, stat rows, nested blocks)
 *   feature → py-14 md:py-20    (hero bands, gallery, testimonials)
 *   hero    → py-16 md:py-24    (page heroes, major CTAs)
 *
 * Container: max-w-7xl px-5 md:px-8.
 */
const variantPadding: Record<SectionVariant, string> = {
  default: "py-12 md:py-16",
  dense: "py-6 md:py-8",
  feature: "py-14 md:py-20",
  hero: "py-16 md:py-24",
};

type SectionProps = {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  /** HTML id for in-page anchors (e.g. "admissions-form"). */
  id?: string;
  /** Render a bare div instead of <section> (for sections nested inside another section). */
  as?: "section" | "div";
  /**
   * When true, children render directly inside the (full-width) section with
   * NO max-w-7xl container wrapper — use this for full-bleed background bands
   * that must span the entire viewport. Pair with <SectionInner> to constrain
   * the inner content width.
   */
  fullBleed?: boolean;
};

export function Section({
  children,
  variant = "default",
  className,
  id,
  as = "section",
  fullBleed = false,
}: SectionProps) {
  const Comp = as;
  return (
    <Comp id={id} className={cn(variantPadding[variant], className)}>
      {fullBleed ? children : <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>}
    </Comp>
  );
}

/**
 * Inner container for sections that need their own <section> element with a
 * full-bleed background but still want the shared inner width/padding.
 */
export function SectionInner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-7xl px-5 md:px-8", className)}>{children}</div>;
}
