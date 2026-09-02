"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917673960151";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to know more about admissions at Little Flower Junior College.")}`;

/**
 * Floating WhatsApp button — bottom-right, non-intrusive on all breakpoints.
 */
export function WhatsAppButton() {
  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-1.5 sm:gap-2 pointer-events-none"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
      }}
    >
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