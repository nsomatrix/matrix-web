export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Header skeleton */}
      <div className="max-w-2xl space-y-4">
        <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
        <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-full max-w-md animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-3/4 max-w-md animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Grid skeleton */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border bg-muted/40"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
