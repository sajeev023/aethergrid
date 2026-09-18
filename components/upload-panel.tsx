"use client";

import React from "react";
import { Upload, CheckCircle2, AlertCircle, X, ShieldCheck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadProgressItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "preparing" | "uploading" | "verifying" | "complete" | "failed";
  error?: string;
}

interface UploadPanelProps {
  uploads: UploadProgressItem[];
  onDismiss: (id: string) => void;
  onRetry?: (id: string) => void;
  className?: string;
}

export function UploadPanel({
  uploads,
  onDismiss,
  onRetry,
  className,
}: UploadPanelProps) {
  if (uploads.length === 0) return null;

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 w-80 sm:w-96 rounded-[14px] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-elevated)] z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-200",
        className
      )}
      role="region"
      aria-label="Upload Progress"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[var(--foreground)]">
          <Upload className="w-4 h-4 text-[var(--primary)]" />
          <span>Uploads in progress ({uploads.filter((u) => u.status !== "complete").length})</span>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border-subtle)] p-2 space-y-1">
        {uploads.map((item) => {
          const isComplete = item.status === "complete";
          const isFailed = item.status === "failed";
          const isVerifying = item.status === "verifying";

          return (
            <div key={item.id} className="p-2.5 rounded-[8px] space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[var(--foreground)] truncate max-w-[200px]" title={item.name}>
                  {item.name}
                </span>
                <span className="text-[11px] text-[var(--foreground-muted)] tabular-nums">
                  {formatBytes(item.size)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-subtle)] overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-200 rounded-full",
                    isComplete
                      ? "bg-[var(--success)]"
                      : isFailed
                      ? "bg-[var(--error)]"
                      : "bg-[var(--primary)]"
                  )}
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  {isComplete ? (
                    <span className="text-[var(--success)] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Encrypted & replicated (2x)
                    </span>
                  ) : isFailed ? (
                    <span className="text-[var(--error)] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {item.error || "Upload failed"}
                    </span>
                  ) : isVerifying ? (
                    <span className="text-[var(--info)] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                      Verifying peer replicas...
                    </span>
                  ) : (
                    <span className="text-[var(--foreground-secondary)]">
                      Encrypting & uploading... {item.progress}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {isFailed && onRetry && (
                    <button
                      type="button"
                      onClick={() => onRetry(item.id)}
                      className="p-1 text-[var(--primary)] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <RefreshCw className="w-3 h-3" /> Retry
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDismiss(item.id)}
                    className="p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    aria-label="Dismiss upload"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
