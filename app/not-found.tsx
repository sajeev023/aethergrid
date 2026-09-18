import Link from "next/link";
import { Home, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 — Page Not Found | AetherGrid",
  description: "The page you are looking for does not exist on AetherGrid.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-16 text-[var(--foreground)]">
      <div className="max-w-md w-full text-center p-8 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
        <div className="text-[64px] font-bold text-[var(--primary)] leading-none mb-2">
          404
        </div>

        <h1 className="type-h2 font-bold mb-2">Page Not Found</h1>
        <p className="text-[14px] text-[var(--foreground-secondary)] mb-6 leading-relaxed">
          The destination you requested does not exist or has been moved to another location on the grid.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="default">
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button asChild variant="secondary" size="default">
            <Link href="/dashboard" className="gap-2">
              <Cloud className="w-4 h-4" />
              <span>Go to Cloud Drive</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
