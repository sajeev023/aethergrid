import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "type-label block text-[var(--foreground)] font-medium mb-1.5",
        className
      )}
      {...props}
    />
  );
}

export { Label };
