"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Eye, X, ChevronLeft, ChevronRight, Trophy, Flame, Users, Sparkles, Filter } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

export interface SportsPhotoItem {
  id: string | number;
  src: string;
  title: string;
  desc: string;
  category: "basketball" | "volleyball" | "athletics" | "teams" | "coaching";
  categoryLabel?: string;
  aspect?: string;
}

interface SportsGalleryClientProps {
  images: SportsPhotoItem[];
}

const CATEGORIES = [
  { key: "all", label: "All Photos", icon: Filter },
  { key: "basketball", label: "Basketball", icon: Trophy },
  { key: "volleyball", label: "Volleyball", icon: Flame },
  { key: "athletics", label: "Athletics & Track", icon: Sparkles },
  { key: "teams", label: "Teams & Honors", icon: Users },
  { key: "coaching", label: "Coaching Clinics", icon: Trophy },
] as const;

// ─── Lightbox Modal ─────────────────────────────────────────────────────────

function SportsLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: SportsPhotoItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!current) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, current]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${current.title}`}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/10] max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.title}
          fill
          sizes="(max-width: 768px) 100vw, 85vw"
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Bottom Info Bar */}
      <div
        className="absolute bottom-3 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:max-w-2xl text-center text-white bg-academic-slate/90 backdrop-blur-md border border-white/15 px-4 py-3 rounded-xl shadow-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-heritage-gold text-white rounded-full">
            {current.category}
          </span>
          <span className="text-xs text-royal-cream/60 font-sans">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
        <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
          {current.title}
        </h3>
        <p className="text-xs text-royal-cream/80 font-sans mt-1 line-clamp-2 max-w-lg mx-auto">
          {current.desc}
        </p>
      </div>
    </div>
  );
}

// ─── Sports Gallery Client ──────────────────────────────────────────────────

export function SportsGalleryClient({ images }: SportsGalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const currentLightboxList = filteredImages;

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count =
            cat.key === "all"
              ? images.length
              : images.filter((img) => img.category === cat.key).length;

          if (count === 0) return null;

          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCategory(cat.key);
                setLightboxIndex(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-montfortian-blue text-white shadow-md shadow-montfortian-blue/20 scale-[1.02]"
                  : "bg-white border border-stone-texture text-academic-slate/80 hover:bg-royal-cream/40 hover:text-academic-slate hover:border-heritage-gold/40"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-heritage-gold-bright" : "text-academic-slate/60"}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-stone-texture/50 text-academic-slate/70"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid gap-2.5 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((img, idx) => (
          <Reveal key={`${img.src}-${img.id}`} delay={Math.min(idx * 0.02, 0.3)}>
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`View full photo: ${img.title}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-texture bg-white shadow-xs hover:shadow-panel-hover transition-all duration-300 w-full block cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-heritage-gold"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Tag Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-academic-slate/80 backdrop-blur-sm text-heritage-gold-bright rounded-full border border-white/20">
                  {img.category}
                </span>
              </div>

              {/* Inner Decorative Border */}
              <div className="absolute inset-1.5 sm:inset-2 border border-white/10 pointer-events-none group-hover:border-heritage-gold/40 transition-colors duration-300" />

              {/* Hover Zoom Icon Overlay */}
              <div className="absolute inset-0 bg-academic-slate/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2 sm:p-2.5 bg-white/95 rounded-full shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="h-4 w-4 text-montfortian-blue" />
                </div>
              </div>

              {/* Dark Gradient Backdrop for Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/95 via-academic-slate/30 to-transparent opacity-90 sm:opacity-75 sm:group-hover:opacity-100 transition-opacity duration-300" />

              {/* Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 z-10">
                <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-heritage-gold-bright transition-colors duration-300">
                  {img.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-royal-cream/80 font-sans mt-0.5 line-clamp-1 sm:line-clamp-2">
                  {img.desc}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Trigger */}
      {lightboxIndex !== null && (
        <SportsLightbox
          images={currentLightboxList}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length
            )
          }
          onNext={() =>
            setLightboxIndex((lightboxIndex + 1) % currentLightboxList.length)
          }
        />
      )}
    </div>
  );
}
