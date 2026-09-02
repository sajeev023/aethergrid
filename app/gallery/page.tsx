import { redirect } from "next/navigation";

// The standalone gallery is now fully integrated into Campus Life (/campus).
export default function GalleryRedirectPage() {
  redirect("/campus");
}
