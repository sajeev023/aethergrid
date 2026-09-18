import { Layers } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      {/* Brand logo pulse */}
      <div className="relative mb-6">
        <div className="w-12 h-12 rounded-[12px] bg-[var(--primary)] flex items-center justify-center text-white shadow-sm">
          <Layers className="w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute -inset-1.5 rounded-[16px] border-2 border-transparent border-t-[var(--primary)] animate-spin" />
      </div>

      <div className="type-h3 font-bold text-[var(--foreground)]">
        AetherGrid
      </div>
      <div className="mt-1 text-[12px] text-[var(--foreground-muted)]">
        Connecting to distributed private cloud...
      </div>

      {/* Progress line */}
      <div className="mt-5 w-44 h-1 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
        <div className="h-full w-1/3 bg-[var(--primary)] rounded-full animate-pulse" />
      </div>
    </div>
  );
}
