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

  useEffect(() => {
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
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentNotice = DEFAULT_NOTICES[activeNoticeIdx];

  if (dismissedId && dismissedId === currentNotice.id) {
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
        "relative z-20 w-full bg-deep-navy border-b border-heritage-gold/30 text-white font-sans transition-colors shadow-xs",
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-12 md:px-16 py-2.5 sm:py-3 flex items-center justify-center min-h-[44px]">
        {/* Centered Announcement Content */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 text-center pr-8 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heritage-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-heritage-gold" />
            </span>
            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-heritage-gold-bright bg-heritage-gold/15 border border-heritage-gold/30 px-2.5 py-0.5 rounded-full shadow-xs">
              <Bell className="h-3 w-3 text-heritage-gold" aria-hidden="true" />
              <span>{currentNotice.badge || "Announcement"}</span>
            </span>
          </div>

          <p className="text-royal-cream text-xs sm:text-sm font-medium leading-tight sm:leading-normal">
            {currentNotice.text}
          </p>

          {currentNotice.linkUrl && (
            <Link
              href={currentNotice.linkUrl}
              className="inline-flex items-center gap-1 font-bold text-xs sm:text-sm text-heritage-gold-bright hover:text-white underline decoration-heritage-gold/60 underline-offset-4 transition-colors shrink-0 whitespace-nowrap"
            >
              <span>{currentNotice.linkText || "Learn More"}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Right-Aligned Close Button with Full Touch Target */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-royal-cream/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
