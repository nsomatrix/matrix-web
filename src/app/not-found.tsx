import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <Ghost className="size-7 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Page not found</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="outline" className="mt-8 gap-2">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
