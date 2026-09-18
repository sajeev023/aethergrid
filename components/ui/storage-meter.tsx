import * as React from "react";
import { cn } from "@/lib/utils";

interface StorageMeterProps {
  usedBytes: number;
  totalBytes: number;
  label?: string;
  showDetails?: boolean;
  className?: string;
}

export function StorageMeter({
  usedBytes,
  totalBytes,
  label = "Storage used",
  showDetails = true,
  className,
}: StorageMeterProps) {
  const safeTotal = totalBytes > 0 ? totalBytes : 1;
  const percent = Math.min(100, Math.max(0, (usedBytes / safeTotal) * 100));

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const isWarning = percent > 80 && percent <= 95;
  const isDanger = percent > 95;

  let barColor = "bg-[var(--primary)]";
  if (isDanger) barColor = "bg-[var(--error)]";
  else if (isWarning) barColor = "bg-[var(--warning)]";

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-medium text-[var(--foreground)]">{label}</span>
        <span className="tabular-nums font-semibold text-[var(--foreground)]">
          {formatBytes(usedBytes)} <span className="text-[var(--foreground-muted)] font-normal">of</span> {formatBytes(totalBytes)}
        </span>
      </div>

      <div
        className="w-full h-2.5 rounded-full bg-[var(--surface-subtle)] border border-[var(--border-subtle)] overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${percent.toFixed(1)}%`}
      >
        <div
          className={cn("h-full transition-all duration-300 rounded-full", barColor)}
          style={{ width: `${percent}%` }}
        />
      </div>

      {showDetails && (
        <div className="flex items-center justify-between text-[12px] text-[var(--foreground-muted)]">
          <span className="tabular-nums">{percent.toFixed(1)}% consumed</span>
          <span>{formatBytes(Math.max(0, totalBytes - usedBytes))} remaining</span>
        </div>
      )}
    </div>
  );
}
