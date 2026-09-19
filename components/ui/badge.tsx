import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error";
  onDark?: boolean;
};

function Badge({ className, variant = "default", onDark, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors",
        onDark && "border-white/20 bg-white/10 text-white",
        variant === "default" && !onDark && "border-transparent bg-[var(--primary)] text-white",
        variant === "secondary" && !onDark && "border-transparent bg-[var(--primary-muted)] text-[var(--primary)]",
        variant === "outline" && !onDark && "border-[var(--border)] text-[var(--foreground)]",
        variant === "success" && "border-[var(--success)]/30 bg-[var(--success-muted)] text-[var(--success)]",
        variant === "warning" && "border-[var(--warning)]/30 bg-[var(--warning-muted)] text-[var(--warning)]",
        variant === "error" && "border-[var(--error)]/30 bg-[var(--error-muted)] text-[var(--error)]",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
