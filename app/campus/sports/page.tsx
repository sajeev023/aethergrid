import { redirect } from "next/navigation";

// Sports and athletics visual archives are unified under the master Campus Life page (/campus).
// Preserve legacy URL redirect so existing links and bookmarks resolve cleanly.
export default function CampusSportsRedirect() {
  redirect("/campus#gallery");
}
