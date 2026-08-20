"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Eye, X, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

type GalleryItem = { id: number; src: string; title: string; desc: string };

// ─── Lightbox ────────────────────────────────────────────────────────────────

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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        className="absolute right-16 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        className="relative w-full max-w-4xl aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={img.src} alt={img.title} fill sizes="90vw" className="object-contain" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
        <p className="font-serif text-sm font-bold">{img.title}</p>
        <p className="text-xs text-white/60 mt-0.5">{currentIndex + 1} / {images.length}</p>
      </div>
    </div>
  );
}

// ─── Gallery Grid ─────────────────────────────────────────────────────────────

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="grid gap-2.5 sm:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img, idx) => (
          <Reveal key={img.id} delay={idx * 0.02}>
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`View ${img.title}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-texture bg-white shadow-xs hover:shadow-panel-hover transition-all duration-300 w-full block cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.035]"
              />
              <div className="absolute inset-1.5 sm:inset-2 border border-white/20 pointer-events-none group-hover:border-heritage-gold/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-deep-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="p-2 sm:p-2.5 bg-white/95 rounded-full shadow-xl scale-75 group-hover:scale-100 transition-all duration-500">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-montfortian-blue" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/30 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
                <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-heritage-gold-bright transition-colors duration-300 text-left">
                  {img.title}
                </h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────

export function VideoCard({ video }: { video: { title: string; embedUrl: string; watchUrl: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = video.embedUrl.split("/embed/")[1] || "";
  const posterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex flex-col h-full bg-white border border-stone-texture rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      <div className="relative aspect-video w-full bg-black">
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
            <div className="absolute inset-0 bg-academic-slate/30 group-hover:bg-academic-slate/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-heritage-gold text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-montfortian-blue transition-all duration-300">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current ml-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <h3 className="font-serif text-xs sm:text-sm font-bold text-academic-slate">{video.title}</h3>
        <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-stone-texture/40">
          <a
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-montfortian-blue hover:text-montfortian-blue/80 transition-colors font-sans"
          >
            Watch on YouTube
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
