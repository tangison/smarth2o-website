export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col" role="status" aria-label="Loading page">
      {/* Header skeleton */}
      <div className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-rule">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="h-8 w-40 rounded-full bg-mist animate-pulse" />
          <div className="hidden lg:flex items-center gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3.5 w-16 rounded-full bg-mist animate-pulse" />
            ))}
            <div className="h-9 w-44 rounded-full bg-mist animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <main className="flex-1 bg-paper pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
            <div className="space-y-3">
              <div className="h-10 md:h-14 w-3/4 rounded-xl bg-mist animate-pulse" />
              <div className="h-10 md:h-14 w-1/2 rounded-xl bg-mist animate-pulse [animation-delay:120ms]" />
            </div>
            <div className="h-4 w-full max-w-md rounded-full bg-mist animate-pulse lg:ml-auto [animation-delay:240ms]" />
          </div>
          <div className="mt-10 h-[2px] w-full bg-mist" />
          <div className="mt-12 space-y-5">
            <div className="h-4 w-5/6 rounded-full bg-mist animate-pulse [animation-delay:160ms]" />
            <div className="h-4 w-4/6 rounded-full bg-mist animate-pulse [animation-delay:280ms]" />
          </div>
        </div>
      </main>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
