import type { Metadata } from "next";
import { MonitorSmartphone, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Emulators",
  description:
    "Download trusted emulators for retro and modern gaming platforms. Safe, verified, and always free.",
};

export default function EmulatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Page header */}
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-4 text-emerald border-emerald/20 bg-emerald/5">
          Catalog
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Emulators
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Access trusted emulators for retro and modern platforms. Each one is
          community-reviewed and verified for safety.
        </p>
      </div>

      {/* Platform filter */}
      <div className="mt-10 flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          All Platforms
        </Badge>
        <Badge
          variant="outline"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          Nintendo
        </Badge>
        <Badge
          variant="outline"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          PlayStation
        </Badge>
        <Badge
          variant="outline"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          Sega
        </Badge>
        <Badge
          variant="outline"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          Arcade
        </Badge>
        <Badge
          variant="outline"
          className="cursor-default px-3 py-1.5 text-xs"
        >
          Other
        </Badge>
      </div>

      {/* Empty state */}
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <HardDrive className="size-7 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-lg font-semibold">
          No emulators available yet
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Emulators will appear here once they are added. Check back soon or
          join the community to contribute.
        </p>
      </div>
    </div>
  );
}
