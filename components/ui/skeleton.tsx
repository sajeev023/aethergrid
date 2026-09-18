import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[8px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)]",
        className
      )}
      {...props}
    />
  );
}

export function FileRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-3.5 border-b border-[var(--border-subtle)] animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-[8px]" />
        <div className="space-y-1.5">
          <Skeleton className="w-48 h-4 rounded-[4px]" />
          <Skeleton className="w-24 h-3 rounded-[4px]" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-3 rounded-[4px] hidden sm:block" />
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-[6px]" />
      </div>
    </div>
  );
}

export function NodeCardSkeleton() {
  return (
    <div className="p-5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
        <Skeleton className="w-24 h-6 rounded-full" />
      </div>
      <Skeleton className="w-full h-2 rounded-full" />
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--border-subtle)]">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    </div>
  );
}

export { Skeleton };
