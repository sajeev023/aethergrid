"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NoticeItem {
  id: string;
  text: string;
  badge?: string;
  linkUrl?: string;
  linkText?: string;
  isUrgent?: boolean;
}

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "adm-2026",
    text: "Admissions for Intermediate 2026–27 Session opening shortly upon Class X results.",
    badge: "Admissions Notice",
    linkUrl: "/admissions#admissions-form",
    linkText: "Submit Inquiry",
    isUrgent: false,
  },
  {
    id: "golden-jubilee",
    text: "Little Flower Junior College celebrates 50 Years of Montfortian Educational Excellence (1974–2024).",
    badge: "Golden Jubilee",
    linkUrl: "/about/history",
    linkText: "View Heritage",
    isUrgent: false,
  },
];

const DISMISS_KEY = "lfjc-ticker-dismissed-id";

export function NoticesTicker({ className }: { className?: string }) {
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.sessionStorage.getItem(DISMISS_KEY);
      if (stored) setDismissedId(stored);
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    if (isPaused || DEFAULT_NOTICES.length <= 1) return;
    const interval = setInterval(() => {
      setActiveNoticeIdx((prev) => (prev + 1) % DEFAULT_NOTICES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentNotice = DEFAULT_NOTICES[activeNoticeIdx];

  if (!mounted || (dismissedId && dismissedId === currentNotice.id)) {
    return null;
  }

  const handleDismiss = () => {
    setDismissedId(currentNotice.id);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, currentNotice.id);
    } catch {
      // Ignore
    }
  };

  return (
    <aside
      aria-label="Campus Notices & Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative z-30 bg-deep-navy border-b border-heritage-gold/30 text-white font-sans text-xs py-2 px-3 sm:px-6 shadow-xs transition-colors",
        className
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heritage-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-heritage-gold" />
            </span>
            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-heritage-gold-bright bg-heritage-gold/15 border border-heritage-gold/30 px-2 py-0.5 rounded">
              <Bell className="h-3 w-3" />
              {currentNotice.badge || "Announcement"}
            </span>
          </div>

          <p className="truncate text-royal-cream/95 text-[11px] sm:text-xs">
            {currentNotice.text}
          </p>

          {currentNotice.linkUrl && (
            <Link
              href={currentNotice.linkUrl}
              className="shrink-0 inline-flex items-center gap-1 font-bold text-[11px] sm:text-xs text-heritage-gold-bright hover:text-white underline decoration-heritage-gold/50 underline-offset-2 transition-colors ml-1"
            >
              <span>{currentNotice.linkText || "Learn More"}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement banner"
          className="shrink-0 text-royal-cream/60 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
