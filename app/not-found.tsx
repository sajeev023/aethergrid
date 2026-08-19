import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface px-5">
      <div className="max-w-lg w-full text-center">
        {/* Large 404 with gold accent */}
        <div className="relative mb-8">
          <span
            aria-hidden="true"
            className="block font-serif text-[7rem] md:text-[9rem] font-bold leading-none text-montfortian-blue/10 select-none"
          >
            404
          </span>
          <h1 className="absolute inset-0 flex items-center justify-center font-serif text-3xl md:text-4xl font-bold text-academic-slate tracking-tight">
            Page Not Found
          </h1>
        </div>

        <span className="gold-rule gold-rule-center mb-6" />

        <p className="text-sm md:text-base leading-7 text-academic-slate/70 font-sans max-w-md mx-auto">
          The page you are looking for has moved, been removed, or does not exist.
          Let&apos;s get you back to the Little Flower Junior College website.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-montfortian-blue px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-montfortian-blue-light transition-colors duration-300 rounded-sm font-sans shadow-panel hover:shadow-panel-hover"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Homepage
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center gap-2 border border-heritage-gold/40 bg-heritage-gold/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-heritage-gold-strong hover:bg-heritage-gold hover:text-white hover:border-heritage-gold transition-all duration-300 rounded-sm font-sans"
          >
            Admissions Inquiry
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.16em] text-academic-slate/40 font-sans">
          Error Code 404 — Little Flower Junior College
        </p>
      </div>
    </div>
  );
}
