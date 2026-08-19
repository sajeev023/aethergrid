import { redirect } from "next/navigation";

// The full college landing lives at the root (/).
// The permanent redirect is handled in next.config.js (edge-level 308).
// This is a fallback safety net in case the request bypasses the edge redirect.
export default function LFJCLegacyPage() {
  redirect("/");
}
