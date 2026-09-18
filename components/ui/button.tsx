import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm font-semibold",
        secondary:
          "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-subtle)] hover:border-[var(--border-subtle)]",
        tertiary:
          "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]",
        destructive:
          "bg-[var(--error)] text-white hover:opacity-90 shadow-sm",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-subtle)]",
        subtle:
          "bg-[var(--primary-muted)] text-[var(--primary)] hover:opacity-90",
        inverse:
          "bg-white text-[var(--foreground)] hover:bg-white/90 shadow-sm font-semibold",
      },
      size: {
        default: "h-[40px] px-4 text-[14px]",
        sm: "h-[36px] px-3 text-[13px] rounded-[6px]",
        lg: "h-[48px] px-6 text-[15px] font-semibold",
        touch: "min-h-[44px] min-w-[44px] px-4 text-[14px]",
        icon: "h-[40px] w-[40px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
