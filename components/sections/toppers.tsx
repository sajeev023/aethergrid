"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { Section } from "@/components/section";

const POSTERS = [
  { src: "/images/toppers/1st-year-toppers-2026.jpg", title: "Toppers — Intermediate 1st Year" },
  { src: "/images/toppers/2nd-year-toppers-2026.jpg", title: "Toppers — Intermediate 2nd Year" },
];

export function Toppers() {
  const [activePoster, setActivePoster] = useState<string | null>(null);

  return (
    <>
      {POSTERS.map((poster) => (
        <Section key={poster.src} variant="default" className="bg-white">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-academic-slate">{poster.title}</h2>
          <button
            type="button"
            onClick={() => setActivePoster(poster.src)}
            className="mt-5 sm:mt-8 block w-full cursor-zoom-in"
            aria-label={`View ${poster.title} poster in full size`}
          >
            <Image
              src={poster.src}
              alt={poster.title}
              width={1024}
              height={640}
              className="w-full h-auto rounded-xl border border-stone-texture/60 shadow-panel"
            />
          </button>
        </Section>
      ))}

      {activePoster && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy/95 flex items-center justify-center p-4"
          onClick={() => setActivePoster(null)}
        >
          <button
            type="button"
            onClick={() => setActivePoster(null)}
            className="absolute top-4 right-4 text-white hover:text-heritage-gold-bright"
            aria-label="Close poster view"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activePoster}
              alt="Toppers poster"
              width={1024}
              height={640}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}