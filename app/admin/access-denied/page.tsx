import Link from "next/link";
import { ShieldAlert, ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAccessDeniedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
        <div className="w-14 h-14 rounded-full bg-[var(--warning-muted)] border border-[var(--warning)]/30 flex items-center justify-center text-[var(--warning)] mx-auto mb-5">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-subtle)] text-[11px] font-mono text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
          HTTP 403 • Restricted Surface
        </div>

        <h1 className="type-h2 text-[var(--foreground)] font-bold mb-2">
          Administrator Access Required
        </h1>

        <p className="text-[14px] text-[var(--foreground-secondary)] mb-6 leading-relaxed">
          The route you requested is restricted strictly to platform infrastructure operators. Ordinary consumer and provider accounts do not have administrative telemetry clearance.
        </p>

        <div className="p-3.5 rounded-[10px] bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[12px] text-[var(--foreground-secondary)] text-left mb-6">
          <div className="font-semibold text-[var(--foreground)] mb-0.5">Is my personal data affected?</div>
          <div>No. Your files, storage allocations, and provider earnings remain healthy and unaffected.</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="primary" className="w-full sm:w-auto">
            <Link href="/dashboard" className="gap-2">
              <Cloud className="w-4 h-4" />
              Return to Personal Cloud
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href="/" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
