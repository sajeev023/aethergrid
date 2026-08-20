"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "917673960151";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to know more about admissions at Little Flower Junior College.")}`;
const DISMISS_KEY = "lfjc-whatsapp-dismissed";

/**
 * Floating WhatsApp button — bottom-right, visible on all public pages.
 * A calm, institutional prompt (no pulsing): a one-time tooltip that the
 * visitor can dismiss, and the dismissal is remembered across sessions.
 */
export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only show the prompt if the visitor hasn't previously dismissed it.
  // Reads happen client-side after mount to avoid SSR/CSR markup mismatch.
  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY);
      if (!dismissed) setShowTooltip(true);
    } catch {
      // localStorage may be unavailable (private mode) — default to showing.
      setShowTooltip(true);
    }
  }, []);

  const dismiss = () => {
    setShowTooltip(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore write failures (private mode / storage full).
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-1.5 sm:gap-2">
      {/* Tooltip prompt */}
      {mounted && showTooltip && (
        <div className="relative bg-white border border-stone-texture/60 rounded-lg shadow-panel-hover pl-2.5 pr-7 py-1.5 sm:pl-4 sm:pr-9 sm:py-3 max-w-[170px] sm:max-w-[220px] animate-fade-in">
          <button
            onClick={dismiss}
            className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-stone-texture/80 text-white hover:bg-academic-slate transition-colors cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
          <p className="text-[10px] sm:text-xs font-sans text-academic-slate/80 leading-3.5 sm:leading-5 pr-1">
            Have a question? <span className="font-bold text-montfortian-blue">Chat with us</span>
          </p>
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Little Flower Junior College on WhatsApp"
        className="group relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-panel-hover hover:shadow-float hover:scale-105 transition-all duration-300"
      >
        <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </a>
    </div>
  );
}