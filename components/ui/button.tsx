import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "premium-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-sans font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-montfortian-blue text-white shadow-panel hover:bg-deep-navy hover:border-heritage-gold/70 hover:shadow-float active:bg-deep-navy",
        secondary:
          "border border-heritage-gold/50 bg-transparent text-heritage-gold-strong hover:border-montfortian-blue hover:text-montfortian-blue hover:bg-white hover:shadow-panel active:bg-royal-cream/60",
        ghost:
          "border border-transparent bg-transparent text-academic-slate hover:bg-surface-container-low hover:text-montfortian-blue active:bg-surface-container",
        inverse:
          "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-deep-navy hover:border-white active:bg-white/90",
        outline:
          "border border-stone-texture bg-white text-academic-slate hover:border-montfortian-blue hover:text-montfortian-blue hover:shadow-panel active:bg-royal-cream/50",
        gold: "border border-heritage-gold bg-heritage-gold text-white hover:bg-heritage-gold-strong hover:border-heritage-gold-strong shadow-panel active:bg-heritage-gold-strong",
      },
      size: {
        default: "min-h-[44px] h-11 sm:h-12 px-5 sm:px-7 text-xs",
        sm: "min-h-[38px] h-9 sm:h-10 px-3.5 sm:px-5 text-xs sm:text-[11px]",
        lg: "min-h-[48px] h-12 sm:h-14 px-6 sm:px-9 text-xs sm:text-sm",
        icon: "min-h-[44px] min-w-[44px] h-11 w-11",
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
