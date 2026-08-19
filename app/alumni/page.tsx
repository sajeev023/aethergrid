import type { Metadata } from "next";

import { Alumni } from "@/components/sections/alumni";
// Future-ready import — kept commented until alumniVideos is populated.
// import { AlumniVideos } from "@/components/sections/alumni-videos";

export const metadata: Metadata = {
  title: "Distinguished Alumni",
  description:
    "Discover the notable alumni of Little Flower Junior College, Hyderabad. Our alumni network includes film personalities like Vijay Deverakonda, civil servants (IAS/IPS), judges, and business leaders who represent intermediate excellence and values.",
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
