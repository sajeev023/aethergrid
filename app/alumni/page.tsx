import type { Metadata } from "next";

import { Alumni } from "@/components/sections/alumni";
// Future-ready import — kept commented until alumniVideos is populated.
// import { AlumniVideos } from "@/components/sections/alumni-videos";

export const metadata: Metadata = {
  title: "Alumni Association & Directory",
  description:
    "Little Flower Junior College Alumni Association — explore distinguished alumni, our global network of 15,000+ graduates across 18+ countries, and the official alumni registry.",
};

export default function LFJCAlumniPage() {
  return (
    <>
      <Alumni headingLevel="h1" />
      {/*
        ─── Alumni Videos — mount point ────────────────────────────────────
        When `alumniVideos` in `lib/site-data.ts` is populated, uncomment
        the import above and render `<AlumniVideos />` here. The component
        renders nothing while the array stays empty, so mounting it ahead
        of time is also safe.
        <AlumniVideos />
      */}
    </>
  );
}
