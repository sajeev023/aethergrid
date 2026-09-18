import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-[44px] w-full rounded-[8px] border bg-[var(--surface)] px-3.5 py-2 text-[14px] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-[var(--error)] focus-visible:ring-[var(--error)]"
              : "border-[var(--border)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[12px] text-[var(--error)] font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
