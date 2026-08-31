"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Eye, X, ChevronLeft, ChevronRight, ExternalLink, Play, Layers, Sparkles, Trophy, Building2, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  desc: string;
  category: "heritage" | "assemblies" | "sports" | "campus";
  featured?: boolean;
}

export interface VideoItem {
  title: string;
  embedUrl: string;
  watchUrl: string;
  category?: string;
}

// ─── Lightbox Modal ─────────────────────────────────────────────────────────

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!img) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, img]);

  if (!img) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${img.title}`}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between text-white/80 z-50 py-2 px-2 max-w-6xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-sans">
          <span className="h-2 w-2 rounded-full bg-heritage-gold animate-pulse" />
          <span className="text-heritage-gold-bright font-bold">LFJC Visual Archive</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">{currentIndex + 1} of {images.length}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close photo preview"
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image Area with Navigation Buttons */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-academic-slate/80 hover:bg-heritage-gold hover:text-deep-navy rounded-full text-white transition-all duration-300 cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20 shadow-xl"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-academic-slate/80 hover:bg-heritage-gold hover:text-deep-navy rounded-full text-white transition-all duration-300 cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20 shadow-xl"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          className="relative w-full h-[60vh] sm:h-[70vh] max-h-[750px]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={img.src}
            alt={img.title}
            fill
            sizes="95vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Caption & Metadata Footer */}
      <div
        className="w-full max-w-3xl text-center bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm z-50 mb-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
          {img.title}
        </h3>
        {img.desc && (
          <p className="text-xs sm:text-sm text-royal-cream/80 font-sans mt-1 max-w-2xl mx-auto leading-relaxed">
            {img.desc}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Filter Tabs & Unified Gallery Grid ─────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Archive", icon: Layers },
  { id: "heritage", label: "Heritage & Jubilees", icon: Sparkles },
  { id: "assemblies", label: "Assemblies & Seminars", icon: Users },
  { id: "sports", label: "Sports & Athletics", icon: Trophy },
  { id: "campus", label: "Campus & Laboratories", icon: Building2 },
] as const;

export function UnifiedCampusGallery({ images }: { images: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  return (
    <div id="gallery" className="scroll-mt-24">
      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = cat.id === "all" ? images.length : images.filter((m) => m.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans cursor-pointer shadow-xs",
                isActive
                  ? "bg-montfortian-blue text-white shadow-panel border border-montfortian-blue"
                  : "bg-white text-academic-slate/75 hover:bg-royal-cream/60 hover:text-montfortian-blue border border-stone-texture"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", isActive ? "text-heritage-gold-bright" : "text-academic-slate/60")} />
              <span>{cat.label}</span>
              <span
                className={cn(
                  "ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full font-mono",
                  isActive ? "bg-white/20 text-white" : "bg-stone-texture/40 text-academic-slate/70"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((img, idx) => (
          <Reveal key={img.id} delay={Math.min(idx * 0.02, 0.3)}>
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`View full image: ${img.title}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-texture bg-white shadow-xs hover:shadow-panel-hover transition-all duration-500 w-full block cursor-pointer text-left"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gold Border Highlight on Hover */}
              <div className="absolute inset-1.5 sm:inset-2 border border-white/25 pointer-events-none group-hover:border-heritage-gold transition-colors duration-500 rounded-lg" />

              {/* Eye hover indicator */}
              <div className="absolute inset-0 bg-academic-slate/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2.5 bg-white rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="h-4 w-4 text-montfortian-blue" />
                </div>
              </div>

              {/* Permanent Gradient Bottom for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/95 via-academic-slate/35 to-transparent opacity-90 sm:opacity-75 sm:group-hover:opacity-95 transition-opacity duration-300" />

              {/* Title & Tag */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 flex flex-col justify-end">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-heritage-gold-bright transition-colors duration-300">
                  {img.title}
                </h4>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Active Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
        />
      )}
    </div>
  );
}

// ─── Video Card ─────────────────────────────────────────────────────────────

export function VideoCard({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = video.embedUrl.split("/embed/")[1] || "";
  const posterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex flex-col h-full bg-white border border-stone-texture rounded-xl overflow-hidden shadow-xs hover:shadow-panel-hover transition-all duration-300">
      <div className="relative aspect-video w-full bg-academic-slate">
        {isPlaying ? (
          <iframe
            src={`${video.embedUrl}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group relative w-full h-full block text-left overflow-hidden cursor-pointer"
          >
            <Image
              src={posterUrl}
              alt={video.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-academic-slate/35 group-hover:bg-academic-slate/15 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-heritage-gold text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-montfortian-blue transition-all duration-300">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <h4 className="font-serif text-xs sm:text-sm font-bold text-academic-slate leading-snug">
          {video.title}
        </h4>
        <div className="mt-3 pt-2.5 border-t border-stone-texture/40">
          <a
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-montfortian-blue hover:text-heritage-gold-strong transition-colors font-sans"
          >
            Watch on YouTube
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
