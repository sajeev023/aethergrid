"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Cloud, HardDrive, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceSwitcherProps {
  currentRole: "TAKER" | "GIVER" | "ADMIN";
  userEmail?: string;
  className?: string;
}

export function WorkspaceSwitcher({
  currentRole,
  userEmail,
  className,
}: WorkspaceSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isGiverMode = currentRole === "GIVER" || pathname.startsWith("/giver");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectWorkspace = async (target: "TAKER" | "GIVER") => {
    setOpen(false);
    if ((target === "GIVER" && isGiverMode) || (target === "TAKER" && !isGiverMode)) {
      return;
    }

    setSwitching(true);
    try {
      await fetch("/api/auth/switch-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: target }),
      });
      if (target === "GIVER") {
        router.push("/giver");
      } else {
        router.push("/dashboard");
      }
    } catch {
      // Fallback redirect
      if (target === "GIVER") router.push("/giver");
      else router.push("/dashboard");
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={switching}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2.5 px-3 py-1.5 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-[13px] font-medium shadow-[var(--shadow-subtle)] hover:bg-[var(--surface-subtle)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none cursor-pointer select-none",
          switching ? "opacity-60" : ""
        )}
      >
        <div className="w-5 h-5 rounded-[6px] bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center shrink-0">
          {isGiverMode ? <HardDrive className="w-3.5 h-3.5" /> : <Cloud className="w-3.5 h-3.5" />}
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--foreground-muted)]">
            Workspace
          </span>
          <span className="font-semibold text-[13px] text-[var(--foreground)] mt-0.5">
            {isGiverMode ? "Storage Provider" : "Personal Cloud"}
          </span>
        </div>
        <ChevronsUpDown className="w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0 ml-1" />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 mt-1.5 w-64 rounded-[12px] border border-[var(--border)] bg-[var(--surface-elevated)] p-1.5 shadow-[var(--shadow-elevated)] z-50 animate-in fade-in-50 zoom-in-95 duration-100"
        >
          <div className="px-2.5 py-2 text-[11px] font-semibold text-[var(--foreground-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
            Switch Workspace
          </div>

          <div className="p-1 space-y-1">
            {/* TAKER / PERSONAL CLOUD */}
            <button
              type="button"
              role="option"
              aria-selected={!isGiverMode}
              onClick={() => handleSelectWorkspace("TAKER")}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-[8px] text-[13px] transition-colors text-left cursor-pointer",
                !isGiverMode
                  ? "bg-[var(--primary-muted)] text-[var(--primary)] font-semibold"
                  : "text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                  <Cloud className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-medium">Personal Cloud</div>
                  <div className="text-[11px] text-[var(--foreground-secondary)]">Files, backups & storage</div>
                </div>
              </div>
              {!isGiverMode && <Check className="w-4 h-4 text-[var(--primary)] shrink-0" />}
            </button>

            {/* GIVER / STORAGE PROVIDER */}
            <button
              type="button"
              role="option"
              aria-selected={isGiverMode}
              onClick={() => handleSelectWorkspace("GIVER")}
              className={cn(
                "w-full flex items-center justify-between p-2.5 rounded-[8px] text-[13px] transition-colors text-left cursor-pointer",
                isGiverMode
                  ? "bg-[var(--primary-muted)] text-[var(--primary)] font-semibold"
                  : "text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4 text-[var(--secondary-accent)]" />
                </div>
                <div>
                  <div className="font-medium">Storage Provider</div>
                  <div className="text-[11px] text-[var(--foreground-secondary)]">Nodes, capacity & earnings</div>
                </div>
              </div>
              {isGiverMode && <Check className="w-4 h-4 text-[var(--primary)] shrink-0" />}
            </button>
          </div>

          {userEmail && (
            <div className="px-2.5 py-1.5 mt-1 border-t border-[var(--border-subtle)] text-[11px] text-[var(--foreground-muted)] truncate">
              Signed in as {userEmail}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
