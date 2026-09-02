import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level — defaults to h2 (section sub-heading). Pass "h1" for the
   *  top-level heading on standalone routes. Visuals are identical either way. */
  as?: "h1" | "h2";
  className?: string;
  /** Render the eyebrow + gold-rule on a dark surface. */
  onDark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  className,
  onDark = false,
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "mx-0 text-left",
        className,
      )}
    >
      <Badge onDark={onDark}>{eyebrow}</Badge>
      <Heading className={cn(
        "mt-2.5 sm:mt-4 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug sm:leading-tight tracking-tight",
        onDark ? "text-white" : "text-academic-slate",
      )}>
        {title}
      </Heading>
      <span
        className={cn("gold-rule !mt-2 sm:!mt-3.5", align === "center" ? "gold-rule-center" : "gold-rule-left")}
      />
      {description ? (
        <p className={cn(
          "mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7",
          onDark ? "text-royal-cream/80" : "text-academic-slate/75",
        )}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
