import type { Metadata } from "next";
import { Search, PackageOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Mods",
  description:
    "Browse and download community-curated game mods. Safe, verified, and always free.",
};

export default function ModsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Page header */}
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-4 text-brand border-brand/25 bg-brand/10">
          Catalog
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Game Mods
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Discover community-curated mods for your favourite games. Every file
          is reviewed for safety and quality.
        </p>
      </div>

      {/* Search / filter bar */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search mods..."
            aria-label="Search mods"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className="cursor-default px-3 py-1.5 text-xs"
          >
            All
          </Badge>
          <Badge
            variant="outline"
            className="cursor-default px-3 py-1.5 text-xs"
          >
            Popular
          </Badge>
          <Badge
            variant="outline"
            className="cursor-default px-3 py-1.5 text-xs"
          >
            Recent
          </Badge>
        </div>
      </div>

      {/* Empty state */}
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <PackageOpen className="size-7 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-lg font-semibold">No mods available yet</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Mods will appear here once they are added. Check back soon or join the
          community to contribute.
        </p>
      </div>
    </div>
  );
}
