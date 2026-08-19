import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getInstitutionData } from "@/lib/site-data";

interface GalleryProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Gallery({ activeInst = "lfjc" }: GalleryProps) {
  const instData = getInstitutionData(activeInst);
  const { gallery } = instData;

  // Safe checks if images are missing or empty
  const primaryItem = gallery[0] || { title: "Campus", caption: "Campus views", src: "/images/campus-hero.jpg", alt: "Campus" };
  const secondItem = gallery[1] || primaryItem;
  const thirdItem = gallery[2] || primaryItem;
  const fourthItem = gallery[3] || primaryItem;

  return (
    <div id="gallery" className="relative overflow-hidden bg-academic-slate py-16 text-white md:py-20">
      {/* Visual stone texture background details */}
      <div className="absolute inset-0 opacity-5 stone-pattern pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-4">
          <SectionHeading
            align="left"
            onDark
            eyebrow="Campus Infrastructure"
            title="Spaces Designed for Focused Study & Physical Growth."
            description={`The Uppal campus blends traditional collegiate architecture with state-of-the-art resources for ${instData.shortName}.`}
          />
          <Button asChild variant="inverse" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white shrink-0">
            <a href="/contact" className="inline-flex items-center gap-2">
              <Eye className="h-4 w-4 text-heritage-gold" />
              Schedule a Visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        {/* Asymmetric Bento Grid Layout */}
        <div className="relative mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Large Feature Card (Heritage Campus) */}
          <Reveal
            delay={0.05}
            className="lg:col-span-7 relative overflow-hidden border border-white/10 rounded-lg shadow-2xl group aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
          >
            {/* Visual tint overlay */}
            <div className="absolute inset-0 bg-montfortian-blue/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src={primaryItem.src}
              alt={primaryItem.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              priority
            />
            {/* Gradient Dark Veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-academic-slate/60 to-transparent z-20" />
            
            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-30">
              <span className="inline-block px-2.5 py-1 mb-2 bg-white/10 backdrop-blur-md border border-white/10 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold-bright rounded-sm">
                Collegiate Legacy
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight text-white mb-1.5">
                {primaryItem.title}
              </h3>
              <p className="text-xs leading-relaxed text-royal-cream/85 font-sans max-w-lg">
                {primaryItem.caption}
              </p>
            </div>
          </Reveal>

          {/* Secondary Bento Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Second Card (Junior Science Labs) */}
            <Reveal
              delay={0.1}
              className="relative overflow-hidden border border-white/10 rounded-lg shadow-xl group aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-montfortian-blue/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src={secondItem.src}
                alt={secondItem.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-academic-slate/50 to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 p-4 z-30">
                <span className="inline-block px-2.5 py-0.5 mb-2 bg-white/10 backdrop-blur-sm border border-white/10 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold rounded-sm">
                  Science Labs
                </span>
                <h3 className="font-serif text-xl font-bold leading-tight text-white">
                  {secondItem.title}
                </h3>
              </div>
            </Reveal>

            {/* Third Card (Sports Culture) */}
            <Reveal
              delay={0.12}
              className="relative overflow-hidden border border-white/10 rounded-lg shadow-xl group aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-academic-slate/30 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src={thirdItem.src}
                alt={thirdItem.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-academic-slate/50 to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 p-4 z-30">
                <span className="inline-block px-2.5 py-0.5 mb-2 bg-white/10 backdrop-blur-sm border border-white/10 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold rounded-sm">
                  Physical Education
                </span>
                <h3 className="font-serif text-xl font-bold leading-tight text-white">
                  {thirdItem.title}
                </h3>
              </div>
            </Reveal>

            {/* Fourth Card (LFJC Library) */}
            <Reveal
              delay={0.15}
              className="sm:col-span-2 relative overflow-hidden border border-white/10 rounded-lg shadow-xl group aspect-[16/10]"
            >
              <div className="absolute inset-0 bg-heritage-gold/15 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <Image
                src={fourthItem.src}
                alt={fourthItem.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-academic-slate via-academic-slate/50 to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 p-4 z-30">
                <span className="inline-block px-2.5 py-0.5 mb-2 bg-white/10 backdrop-blur-sm border border-white/10 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-heritage-gold rounded-sm">
                  Knowledge Hub
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight text-white">
                  {fourthItem.title}
                </h3>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
