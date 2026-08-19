import { ExternalLink, PlayCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { alumniVideos } from "@/lib/site-data";

/**
 * Alumni Videos — future-ready scaffold.
 *
 * This component is wired to render a polished video grid the moment
 * `alumniVideos` in `lib/site-data.ts` (or the admin DB) is populated.
 * While that array stays empty it renders nothing, so the alumni page
 * is unchanged.
 *
 * To publish the section:
 *   1. Add entries to `alumniVideos` in `lib/site-data.ts` using the
 *      `AlumniVideo` shape (id, title, embedUrl, watchUrl, …), OR wire
 *      the array to the admin DB via `lib/admin/db.ts`.
 *   2. Mount `<AlumniVideos />` on the alumni page — a documented hook
 *      is left in `app/alumni/page.tsx` for exactly this.
 *
 * No other refactoring is required.
 */
export function AlumniVideos() {
  if (!alumniVideos || alumniVideos.length === 0) {
    return null;
  }

  return (
    <section id="alumni-videos" className="bg-white border-b border-stone-texture/50 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          as="h2"
          eyebrow="Montfortian Legacy"
          title="Alumni in Conversation"
          description="Video reflections, reunion recordings, and milestone talks from the Little Flower Junior College alumni network."
        />

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {alumniVideos.map((video, idx) => (
            <Reveal key={video.id} delay={(idx % 3) * 0.05}>
              <div className="flex flex-col h-full bg-white border border-stone-texture rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                {/* YouTube Embed Video */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-sm font-bold text-academic-slate line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description ? (
                    <p className="mt-1.5 text-[11px] leading-5 text-academic-slate/70 font-sans line-clamp-2">
                      {video.description}
                    </p>
                  ) : null}

                  <div className="mt-3 pt-3 border-t border-stone-texture/40 flex items-center justify-between">
                    <a
                      href={video.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-montfortian-blue hover:text-montfortian-blue/80 transition-colors font-sans"
                    >
                      <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <a
              href="https://www.youtube.com/@lfjc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View Full Alumni Channel
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}