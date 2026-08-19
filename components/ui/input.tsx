import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-sm border border-stone-texture/80 bg-white px-4 py-3 text-sm text-academic-slate outline-none transition-all duration-200 placeholder:text-academic-slate/40 focus:border-montfortian-blue focus:ring-2 focus:ring-montfortian-blue/10 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
