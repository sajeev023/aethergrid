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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {/* Tooltip prompt */}
      {mounted && showTooltip && (
        <div className="relative bg-white border border-stone-texture/60 rounded-lg shadow-panel-hover pl-4 pr-9 py-3 max-w-[220px] animate-fade-in">
          <button
            onClick={dismiss}
            className="absolute top-1.5 right-1.5 grid h-9 w-9 place-items-center rounded-full bg-stone-texture/80 text-white hover:bg-academic-slate transition-colors"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-sans text-academic-slate/80 leading-5">
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
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-panel-hover hover:shadow-float hover:scale-105 transition-all duration-300"
      >
        <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}