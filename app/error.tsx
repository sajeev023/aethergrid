"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for debugging; in production, send to a logging service.
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface px-5">
      <div className="max-w-lg w-full text-center">
        {/* Warning icon */}
        <div className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-heritage-gold/30 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-heritage-gold-strong" aria-hidden="true" />
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-academic-slate tracking-tight">
          Something Went Wrong
        </h1>

        <span className="gold-rule gold-rule-center mt-5 mb-6" />

        <p className="text-sm md:text-base leading-7 text-academic-slate/70 font-sans max-w-md mx-auto">
          We encountered an unexpected issue. Please try again, or return to
          the homepage. If the problem persists, contact the college office.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-montfortian-blue px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-montfortian-blue-light transition-colors duration-300 rounded-sm font-sans shadow-panel hover:shadow-panel-hover cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-stone-texture/60 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-academic-slate hover:border-heritage-gold/40 hover:bg-royal-cream/20 transition-all duration-300 rounded-sm font-sans"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Homepage
          </Link>
        </div>

        {error.digest && (
          <p className="mt-10 text-[10px] font-mono uppercase tracking-wider text-academic-slate/30 font-sans">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
