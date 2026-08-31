import { redirect } from "next/navigation";

// Campus facilities and laboratories are unified under the master Campus Life page (/campus).
// Preserve legacy URL redirect so existing links and bookmarks resolve cleanly.
export default function CampusFacilitiesRedirect() {
  redirect("/campus#gallery");
}
