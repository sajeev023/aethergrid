import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  /** Render on a dark surface — uses brighter gold for contrast. */
  onDark?: boolean;
};

function Badge({ className, onDark = false, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em]",
        onDark
          ? "border-heritage-gold/40 bg-white/5 text-heritage-gold-bright backdrop-blur-sm"
          : "border-heritage-gold/50 bg-royal-cream text-heritage-gold-strong",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
