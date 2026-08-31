import { redirect } from "next/navigation";

// The photo gallery is unified under the master Campus Life & Visual Archive page (/campus).
// Preserve the legacy URL so existing bookmarks and search engines redirect cleanly.
export default function CampusGalleryRedirect() {
  redirect("/campus#gallery");
}
