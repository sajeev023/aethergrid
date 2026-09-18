"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ShieldCheck, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("AetherGrid application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-16 text-[var(--foreground)]">
      <div className="max-w-md w-full p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--error-muted)] text-[var(--error)] flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h1 className="type-h2 font-bold mb-2">Something went wrong</h1>
        <p className="text-[14px] text-[var(--foreground-secondary)] mb-6">
          An unexpected interface error occurred while rendering this view.
        </p>

        <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[12px] text-left text-[var(--foreground-secondary)] space-y-1.5 mb-6">
          <div className="flex items-center gap-1.5 font-semibold text-[var(--foreground)]">
            <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
            <span>Is my data safe?</span>
          </div>
          <div>Yes. Your encrypted files and node allocations are held safely on the distributed storage network.</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="default" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          <Button asChild variant="secondary" size="default">
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {error.digest && (
          <div className="mt-6 text-[11px] font-mono text-[var(--foreground-muted)]">
            Event Reference: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
