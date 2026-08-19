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
        "mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl",
        onDark ? "text-white" : "text-academic-slate",
      )}>
        {title}
      </Heading>
      <span
        className={cn("gold-rule", align === "center" ? "gold-rule-center" : "gold-rule-left")}
      />
      {description ? (
        <p className={cn(
          "mt-4 text-sm leading-7 md:text-base md:leading-7",
          onDark ? "text-royal-cream/75" : "text-academic-slate/70",
        )}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
