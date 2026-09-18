import * as React from "react";
import { FolderPlus, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  reassurance?: string;
  estimatedTime?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  checklist?: string[];
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderPlus,
  title,
  description,
  reassurance,
  estimatedTime,
  actionLabel,
  onAction,
  actionHref,
  checklist,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[16px] border border-dashed border-[var(--border)] bg-[var(--surface)] max-w-xl mx-auto my-6",
        className
      )}
    >
      <div className="w-12 h-12 rounded-[12px] bg-[var(--primary-muted)] flex items-center justify-center text-[var(--primary)] mb-4">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="type-h3 text-[var(--foreground)] mb-2 font-semibold">{title}</h3>
      <p className="text-[14px] text-[var(--foreground-secondary)] max-w-md mb-4 leading-relaxed">
        {description}
      </p>

      {reassurance && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[12px] text-[var(--foreground-secondary)] mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" />
          <span>{reassurance}</span>
        </div>
      )}

      {checklist && checklist.length > 0 && (
        <div className="w-full max-w-sm text-left bg-[var(--surface-subtle)] rounded-[10px] p-4 mb-6 border border-[var(--border-subtle)] space-y-2">
          <div className="text-[12px] font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2">
            Readiness Checklist
          </div>
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px] text-[var(--foreground-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {estimatedTime && (
        <p className="text-[12px] text-[var(--foreground-muted)] mb-4">
          Estimated setup time: <span className="font-medium text-[var(--foreground)]">{estimatedTime}</span>
        </p>
      )}

      {actionLabel && (
        <div>
          {actionHref ? (
            <Button asChild size="lg">
              <a href={actionHref}>{actionLabel}</a>
            </Button>
          ) : (
            <Button size="lg" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
