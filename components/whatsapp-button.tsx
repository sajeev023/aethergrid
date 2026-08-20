"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "917673960151";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to know more about admissions at Little Flower Junior College.")}`;
const DISMISS_KEY = "lfjc-whatsapp-dismissed";

/**
 * Floating WhatsApp button — bottom-right, non-intrusive on all breakpoints.
 * Includes safe area padding and a dismissable tooltip.
 */
export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY);
      if (!dismissed) setShowTooltip(true);
    } catch {
      setShowTooltip(true);
    }
  }, []);

  const dismiss = () => {
    setShowTooltip(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore write failures
    }
  };

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-1.5 sm:gap-2 pointer-events-none"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
      }}
    >
      {/* Tooltip prompt */}
      {mounted && showTooltip && (
        <div className="pointer-events-auto relative bg-white border border-stone-texture/70 rounded-lg shadow-panel-hover pl-3 pr-7 py-2 max-w-[180px] sm:max-w-[210px] animate-fade-in">
          <button
            onClick={dismiss}
            className="absolute top-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full bg-stone-texture/60 hover:bg-academic-slate text-white transition-colors cursor-pointer"
            aria-label="Dismiss WhatsApp chat suggestion"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-[11px] font-sans text-academic-slate leading-tight pr-1">
            Questions on Admissions? <span className="font-bold text-montfortian-blue block mt-0.5">Chat on WhatsApp</span>
          </p>
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Little Flower Junior College admissions office on WhatsApp"
        className="pointer-events-auto group relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-panel-hover hover:shadow-float hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </a>
    </div>
  );
}