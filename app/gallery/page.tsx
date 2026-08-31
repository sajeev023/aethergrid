import { redirect } from "next/navigation";

// The public gallery now lives under /campus#gallery.
// Preserve the legacy URL so existing links and bookmarks resolve.
export default function LFJCGalleryPage() {
  redirect("/campus#gallery");
}