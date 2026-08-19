import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select
        data-slot="select"
        className={cn(
          "h-12 w-full appearance-none rounded-sm border border-stone-texture/80 bg-white px-4 py-3 pr-11 text-sm text-academic-slate outline-none transition-all duration-200 focus:border-montfortian-blue focus:ring-2 focus:ring-montfortian-blue/10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-academic-slate/50"
      />
    </span>
  );
}

export { Select };
