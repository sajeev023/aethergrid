import * as React from "react";
import { AlertCircle, ShieldCheck, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  whatHappened: string;
  isDataSafe?: string;
  whatCanIDo?: string;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Action could not be completed",
  whatHappened,
  isDataSafe = "Your encrypted files and existing replicas are safe and unaffected.",
  whatCanIDo = "Please try again in a few moments or verify your connection.",
  onRetry,
  onBack,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-[var(--error)]/30 bg-[var(--surface)] p-6 sm:p-8 max-w-xl mx-auto my-6 shadow-[var(--shadow-card)]",
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-[10px] bg-[var(--error-muted)] flex items-center justify-center text-[var(--error)] shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="type-h3 text-[var(--foreground)] font-semibold mb-1">{title}</h3>
          <p className="text-[14px] text-[var(--foreground-secondary)] leading-relaxed">
            {whatHappened}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex items-start gap-2.5 text-[13px] bg-[var(--surface-subtle)] p-3 rounded-[8px]">
          <ShieldCheck className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[var(--foreground)]">Is my data safe? </span>
            <span className="text-[var(--foreground-secondary)]">{isDataSafe}</span>
          </div>
        </div>

        <div className="text-[13px] text-[var(--foreground-secondary)] px-1">
          <span className="font-semibold text-[var(--foreground)]">What you can do: </span>
          <span>{whatCanIDo}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[var(--border-subtle)]">
        {onRetry && (
          <Button onClick={onRetry} size="default" className="gap-1.5">
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
        )}
        {onBack && (
          <Button onClick={onBack} variant="secondary" size="default" className="gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
        )}
      </div>
    </div>
  );
}
