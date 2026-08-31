import { redirect } from "next/navigation";

// Events and student assemblies are unified under the master Campus Life page (/campus).
// Preserve legacy URL redirect so existing links resolve cleanly.
export default function CampusEventsRedirect() {
  redirect("/campus#gallery");
}
