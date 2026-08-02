import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Mods", href: "/mods" },
      { label: "Emulators", href: "/emulators" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "About", href: "/community" },
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90 active:opacity-80"
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
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your gateway to the best gaming mods and emulators. Built by
              gamers, for gamers.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} NsoMatrix. All rights reserved.</p>
          <p className="text-xs">
            Built with Next.js &amp; deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
