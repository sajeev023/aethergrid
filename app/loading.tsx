export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface px-5">
      {/* Institutional crest pulse */}
      <div className="relative mb-8">
        <div className="h-16 w-16 rounded-full border-2 border-heritage-gold/30 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-montfortian-blue/10 animate-pulse flex items-center justify-center">
            <span className="font-serif text-lg font-bold text-montfortian-blue">
              LF
            </span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-heritage-gold animate-spin" />
      </div>

      <span className="font-serif text-xl font-bold text-academic-slate tracking-tight">
        Little Flower Junior College
      </span>
      <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-academic-slate/50 font-sans">
        Loading…
      </span>

      {/* Progress bar */}
      <div className="mt-6 w-48 h-0.5 bg-stone-texture/50 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-montfortian-blue rounded-full animate-[loading_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
