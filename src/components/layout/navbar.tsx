"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Gamepad2 } from "lucide-react";
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
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight transition-opacity hover:opacity-80 active:opacity-70"
        >
          <Gamepad2 className="size-5 text-emerald" />
          <span>NsoMatrix</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-1 -bottom-[1.15rem] h-0.5 bg-emerald rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="size-9 touch-manipulation"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-heading text-lg font-bold"
                    onClick={() => setOpen(false)}
                  >
                    <Gamepad2 className="size-5 text-emerald" />
                    <span>NsoMatrix</span>
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
                      "flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors touch-manipulation",
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
