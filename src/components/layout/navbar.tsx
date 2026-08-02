"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mods", label: "Mods" },
  { href: "/emulators", label: "Emulators" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Only */}
        <Link
          href="/"
          className="flex items-center shrink-0 transition-opacity hover:opacity-90 active:opacity-80 py-1"
          aria-label="NsoMatrix Home"
        >
          <Image
            src="/logo.png"
            alt="NsoMatrix"
            width={353}
            height={248}
            priority
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex h-full" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center h-full px-3.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 inset-x-1 h-0.5 rounded-full bg-emerald" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="size-10 shrink-0 text-foreground"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 max-w-[85vw] p-0">
              <SheetHeader className="border-b px-5 py-4">
                <SheetTitle asChild>
                  <Link
                    href="/"
                    className="flex items-center transition-opacity hover:opacity-90 active:opacity-80"
                    onClick={() => setOpen(false)}
                    aria-label="NsoMatrix Home"
                  >
                    <Image
                      src="/logo.png"
                      alt="NsoMatrix"
                      width={353}
                      height={248}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile navigation links */}
              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-emerald/10 text-emerald font-semibold"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
