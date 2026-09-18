import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <span className="relative block w-full">
      <select
        data-slot="select"
        className={cn(
          "h-[44px] w-full appearance-none rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 pr-10 text-[14px] text-[var(--foreground)] outline-none transition-all duration-150 focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)]"
      />
    </span>
  );
}

export { Select };
