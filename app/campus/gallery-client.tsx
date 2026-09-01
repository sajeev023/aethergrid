"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Eye, X, ChevronLeft, ChevronRight, ExternalLink, Play, Sparkles, Award, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  desc: string;
  category?: string;
  badge?: string;
  year?: string;
}

export interface VideoItem {
  title: string;
  embedUrl: string;
  watchUrl: string;
  category?: string;
}

// ─── Fullscreen Archival Lightbox ───────────────────────────────────────────

export function Lightbox({
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
      aria-label={`Archival Photograph: ${img.title}`}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between text-white/90 z-50 py-2 px-2 max-w-6xl">
        <div className="flex items-center gap-2 sm:gap-3 text-xs uppercase tracking-wider font-sans">
          <span className="h-2 w-2 rounded-full bg-heritage-gold animate-pulse" />
          <span className="text-heritage-gold-bright font-bold hidden sm:inline">LFJC Visual Archives</span>
          <span className="text-white/40 hidden sm:inline">•</span>
          {img.badge && (
            <>
              <span className="text-royal-cream/90 bg-white/10 px-2 py-0.5 rounded text-[10px] font-semibold">
                {img.badge}
              </span>
              <span className="text-white/40">•</span>
            </>
          )}
          <span className="text-white/80 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/50 hidden md:inline font-sans">
            Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/80">ESC</kbd> or arrow keys
          </span>
          <button
            onClick={onClose}
            aria-label="Close photo preview"
            className="p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Nav Arrows */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-academic-slate/85 hover:bg-heritage-gold hover:text-deep-navy rounded-full text-white transition-all duration-300 cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20 shadow-2xl"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-academic-slate/85 hover:bg-heritage-gold hover:text-deep-navy rounded-full text-white transition-all duration-300 cursor-pointer z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/20 shadow-2xl"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          className="relative w-full h-[60vh] sm:h-[70vh] max-h-[760px]"
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

      {/* Metadata & Historical Caption Footer */}
      <div
        className="w-full max-w-3xl text-center bg-academic-slate/85 border border-white/15 rounded-xl p-3.5 sm:p-4.5 backdrop-blur-md z-50 mb-1 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
          {img.title}
        </h3>
        {img.desc && (
          <p className="text-xs sm:text-sm text-royal-cream/90 font-sans mt-1.5 max-w-2xl mx-auto leading-relaxed">
            {img.desc}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Section Photo Grid Component ───────────────────────────────────────────

export function PhotoGrid({
  images,
  onImageClick,
  columns = "4",
}: {
  images: GalleryItem[];
  onImageClick?: (item: GalleryItem, indexInSection: number) => void;
  columns?: "2" | "3" | "4";
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleCardClick = (img: GalleryItem, idx: number) => {
    if (onImageClick) {
      onImageClick(img, idx);
    } else {
      setLightboxIndex(idx);
    }
  };

  const gridColsClass = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div>
      <div className={cn("grid gap-3 sm:gap-4 md:gap-5", gridColsClass)}>
        {images.map((img, idx) => (
          <Reveal key={`${img.id}-${img.src}`} delay={Math.min(idx * 0.02, 0.25)}>
            <button
              type="button"
              onClick={() => handleCardClick(img, idx)}
              aria-label={`View photo in high resolution: ${img.title}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-texture/80 bg-white shadow-xs hover:shadow-panel-hover transition-all duration-300 w-full block cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-heritage-gold"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gold Framing Accent on Hover */}
              <div className="absolute inset-1.5 sm:inset-2 border border-white/20 pointer-events-none group-hover:border-heritage-gold transition-colors duration-500 rounded-lg" />

              {/* Eye Indicator Hover Overlay */}
              <div className="absolute inset-0 bg-academic-slate/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2.5 bg-white/95 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300 flex items-center gap-1.5 px-3.5">
                  <Eye className="h-4 w-4 text-montfortian-blue" />
                  <span className="text-[11px] font-bold text-academic-slate font-sans uppercase tracking-wider hidden sm:inline">
                    View Photo
                  </span>
                </div>
              </div>

              {/* Legibility Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate/95 via-academic-slate/30 to-transparent opacity-85 sm:opacity-75 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Card Title & Badge */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex flex-col justify-end">
                {img.badge && (
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-heritage-gold-bright font-sans mb-1 line-clamp-1">
                    {img.badge}
                  </span>
                )}
                <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-heritage-gold-bright transition-colors duration-300">
                  {img.title}
                </h4>
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

// ─── Master Chronological Archive Client Component ──────────────────────────

export function ChronologicalCampusArchive({
  silverJubileeImages,
  goldenJubileeImages,
  assembliesImages,
  sportsImages,
  campusLabsImages,
  alumniImages = [],
  allImages,
}: {
  silverJubileeImages: GalleryItem[];
  goldenJubileeImages: GalleryItem[];
  assembliesImages: GalleryItem[];
  sportsImages: GalleryItem[];
  campusLabsImages: GalleryItem[];
  alumniImages?: GalleryItem[];
  allImages: GalleryItem[];
}) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleOpenGlobalImage = (targetItem: GalleryItem) => {
    const globalIdx = allImages.findIndex((m) => m.id === targetItem.id && m.src === targetItem.src);
    if (globalIdx !== -1) {
      setActiveImageIndex(globalIdx);
    } else {
      setActiveImageIndex(0);
    }
  };

  return (
    <div id="gallery" className="scroll-mt-24">
      {/* ─── 01: SILVER JUBILEE (FIRST) ─────────────────────────────────── */}
      <section id="silver-jubilee" className="scroll-mt-28 mb-14 sm:mb-18 md:mb-20">
        <div className="mb-6 sm:mb-8 border-b border-stone-texture/60 pb-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-heritage-gold-strong mb-1.5 font-sans">
            <Clock className="h-3.5 w-3.5 text-heritage-gold" />
            <span>01 — Historical Foundation Archive • 1999</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate tracking-tight">
            Silver Jubilee
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-3xl">
            In 1999, Little Flower Junior College celebrated 25 glorious years of academic eminence at its expansive Uppal campus. 
            Hon&apos;ble Chief Minister N. Chandrababu Naidu graced the landmark celebrations, honoring founding principals Rev. Bro. Vincent, 
            Dr. Emmanuel, Rev. Bro. Claude, Rev. Bro. John Kallarackal, Rev. Bro. Celestine, and Rev. Bro. M.A. George alongside state rank-holders. 
            Explore the complete 17-item archival collection including congratulatory letters from state leaders, 25-year toppers ledger, and founding leadership portraits.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-montfortian-blue bg-royal-cream/60 px-2.5 py-1 rounded border border-stone-texture/60 font-sans">
              {silverJubileeImages.length} Archival Photographs & Documents
            </span>
          </div>
        </div>

        <PhotoGrid
          images={silverJubileeImages}
          onImageClick={handleOpenGlobalImage}
          columns="4"
        />
      </section>

      {/* ─── 02: GOLDEN JUBILEE (SECOND) ─────────────────────────────────── */}
      <section id="golden-jubilee" className="scroll-mt-28 mb-14 sm:mb-18 md:mb-20">
        <div className="mb-6 sm:mb-8 border-b border-stone-texture/60 pb-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-heritage-gold-strong mb-1.5 font-sans">
            <Sparkles className="h-3.5 w-3.5 text-heritage-gold" />
            <span>02 — Half-Century Milestone • 1974–2024</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate tracking-tight">
            Golden Jubilee
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-3xl">
            Commemorating five decades of transformative Montfortian education, the Golden Jubilee celebrations united thousands of alumni, 
            students, faculty, and provincial dignitaries under the official banner of Truth, Virtue, and Wisdom. Browse all 33 milestone photographs 
            capturing the ceremonial lamp lighting, commemorative souvenir unveiling, distinguished alumni felicitations, grand classical dance tableaus, 
            student choir anthems, and thanksgiving ceremonies.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-montfortian-blue bg-royal-cream/60 px-2.5 py-1 rounded border border-stone-texture/60 font-sans">
              {goldenJubileeImages.length} Complete Milestone Photographs
            </span>
          </div>
        </div>

        <PhotoGrid
          images={goldenJubileeImages}
          onImageClick={handleOpenGlobalImage}
          columns="3"
        />
      </section>

      {/* ─── 03: CAMPUS LIFE (THIRD) ────────────────────────────────────── */}
      <section id="campus-life" className="scroll-mt-28 mb-14 sm:mb-18">
        <div className="mb-8 sm:mb-10 border-b-2 border-heritage-gold/30 pb-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-heritage-gold-strong mb-1.5 font-sans">
            <Award className="h-3.5 w-3.5 text-heritage-gold" />
            <span>03 — Living Campus Experience & Student Moments</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-academic-slate tracking-tight">
            Campus Life & Events
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-3xl">
            The day-to-day pulse of Little Flower Junior College — from inspirational assemblies in St. Montfort Auditorium and high-stakes 
            athletic meets to advanced science laboratories, reference libraries, and lifelong alumni fellowship.
          </p>
        </div>

        {/* 3A. Assemblies & Seminars */}
        <div id="assemblies" className="scroll-mt-28 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 pb-2 border-b border-stone-texture/50 gap-1">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-academic-slate">
              Assemblies & Seminars
            </h3>
            <span className="text-xs font-sans text-academic-slate/70">
              {assembliesImages.length} Photographs • St. Montfort Auditorium & Guest Lectures
            </span>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate/75 font-sans mb-4 max-w-2xl">
            Full-hall student gatherings, leadership keynotes, interactive stage debates, faculty mentorship, speaker felicitations, and career guidance seminars for commerce and science streams.
          </p>
          <PhotoGrid
            images={assembliesImages}
            onImageClick={handleOpenGlobalImage}
            columns="4"
          />
        </div>

        {/* 3B. Sports & Athletics */}
        <div id="sports" className="scroll-mt-28 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 pb-2 border-b border-stone-texture/50 gap-1">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-academic-slate">
              Sports & Athletics
            </h3>
            <span className="text-xs font-sans text-academic-slate/70">
              {sportsImages.length} Photographs • Inter-House Championships & Track Meets
            </span>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate/75 font-sans mb-4 max-w-2xl">
            Spike rallies on the volleyball court, fast-break basketball tournaments, 100m sprint heats, baton relay finishes, and celebratory medal ceremonies with college directors.
          </p>
          <PhotoGrid
            images={sportsImages}
            onImageClick={handleOpenGlobalImage}
            columns="4"
          />
        </div>

        {/* 3C. Campus & Laboratories */}
        <div id="campus-labs" className="scroll-mt-28 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 pb-2 border-b border-stone-texture/50 gap-1">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-academic-slate">
              Campus & Laboratories
            </h3>
            <span className="text-xs font-sans text-academic-slate/70">
              {campusLabsImages.length} Photographs • Academic Infrastructure & Laboratories
            </span>
          </div>
          <p className="text-xs sm:text-sm text-academic-slate/75 font-sans mb-4 max-w-2xl">
            Aerial perspective of our lush eight-acre Uppal estate, collegiate main building, analytical chemistry lab, physics optical benches, networked computing centre, and central library.
          </p>
          <PhotoGrid
            images={campusLabsImages}
            onImageClick={handleOpenGlobalImage}
            columns="4"
          />
        </div>

        {/* 3D. Alumni & Fellowship (if images exist) */}
        {alumniImages.length > 0 && (
          <div id="alumni" className="scroll-mt-28 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 pb-2 border-b border-stone-texture/50 gap-1">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-academic-slate">
                Alumni & Fellowship
              </h3>
              <span className="text-xs font-sans text-academic-slate/70">
                {alumniImages.length} Photographs • Alumni Association & Montfortian Brotherhood
              </span>
            </div>
            <p className="text-xs sm:text-sm text-academic-slate/75 font-sans mb-4 max-w-2xl">
              Generations of LFJC graduates united across industry, academia, and public service in enduring Montfortian fellowship.
            </p>
            <PhotoGrid
              images={alumniImages}
              onImageClick={handleOpenGlobalImage}
              columns="2"
            />
          </div>
        )}
      </section>

      {/* ─── Lightbox Modal across Complete Archive ─────────────────────── */}
      {activeImageIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={activeImageIndex}
          onClose={() => setActiveImageIndex(null)}
          onPrev={() => setActiveImageIndex((activeImageIndex - 1 + allImages.length) % allImages.length)}
          onNext={() => setActiveImageIndex((activeImageIndex + 1) % allImages.length)}
        />
      )}
    </div>
  );
}

// ─── Legacy compatibility export ────────────────────────────────────────────
export const UnifiedCampusGallery = ChronologicalCampusArchive;

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
