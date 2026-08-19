import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "premium-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-sans font-bold tracking-[0.14em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-montfortian-blue text-white shadow-panel hover:bg-deep-navy hover:border-heritage-gold/70 hover:shadow-float",
        secondary:
          "border border-heritage-gold/50 bg-transparent text-heritage-gold-strong hover:border-montfortian-blue hover:text-montfortian-blue hover:bg-white hover:shadow-panel",
        ghost:
          "border border-transparent bg-transparent text-academic-slate hover:bg-surface-container-low hover:text-montfortian-blue",
        inverse:
          "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-deep-navy hover:border-white",
        outline:
          "border border-stone-texture bg-white text-academic-slate hover:border-montfortian-blue hover:text-montfortian-blue hover:shadow-panel",
        gold: "border border-heritage-gold bg-heritage-gold text-white hover:bg-heritage-gold-strong hover:border-heritage-gold-strong shadow-panel",
      },
      size: {
        default: "h-12 px-7 text-xs",
        sm: "h-10 px-5 text-[11px]",
        lg: "h-14 px-9 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
