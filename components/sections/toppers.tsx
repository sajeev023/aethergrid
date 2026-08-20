"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, Download, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopperPosterSectionProps {
  title: string;
  subtitle?: string;
  yearLabel: "1st Year" | "2nd Year";
  posterPath: string;
  altText: string;
  accentColor?: "amber" | "blue";
}

export function TopperPosterSection({
  title,
  subtitle,
  yearLabel,
  posterPath,
  altText,
  accentColor = "amber",
}: TopperPosterSectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const isAmber = accentColor === "amber";

  return (
    <div className="space-y-4">
      {/* Section Title Header */}
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between border-l-4 pl-3 sm:pl-4 py-1 sm:py-1.5",
          isAmber ? "border-amber-500" : "border-blue-600"
        )}
      >
        <div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3">
            {title}
            <span
              className={cn(
                "inline-flex items-center text-[10px] sm:text-xs font-extrabold px-2 sm:px-3 py-0.5 rounded-full uppercase tracking-wider",
                isAmber
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              )}
            >
              Official Poster
            </span>
          </h2>
          {subtitle && (
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 font-sans mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* View Full Resolution Action Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className={cn(
            "mt-2 sm:mt-0 inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg transition-all cursor-pointer border shadow-xs hover:shadow-sm self-start sm:self-auto min-h-[38px]",
            isAmber
              ? "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
              : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
          )}
        >
          <ZoomIn className="h-4 w-4" />
          <span>Inspect Full Resolution</span>
        </button>
      </div>

      {/* Complete Poster Visual Container */}
      <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-3 md:p-4 shadow-xs hover:shadow-md transition-shadow">
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-900 cursor-pointer"
        >
          <Image
            src={posterPath}
            alt={altText}
            width={1200}
            height={750}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            priority
            unoptimized
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-xs">
              <Maximize2 className="h-4 w-4 text-amber-400" />
              Click to view full poster
            </span>
          </div>
        </div>

        {/* Poster Descriptor Bar */}
        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 px-1 text-[10px] sm:text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Little Flower Junior College &middot; IPE {yearLabel} Toppers (2026)
          </span>
          <span className="italic text-[10px] sm:text-[11px]">
            Original official publication &middot; High fidelity scan
          </span>
        </div>
      </div>

      {/* Lightbox Modal for Full Screen Inspection */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white mb-3">
            <h3 className="font-serif text-lg font-bold">
              {title} &mdash; Official Poster
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={posterPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download Original
              </a>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Full Screen Image Box */}
          <div className="relative max-w-6xl max-h-[85vh] w-full h-full overflow-auto rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center p-2">
            <Image
              src={posterPath}
              alt={altText}
              width={1600}
              height={1000}
              className="max-w-full max-h-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}