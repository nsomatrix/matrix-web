import Link from "next/link";
import {
  ArrowRight,
  Download,
  Gamepad2,
  Users,
  Shield,
  Zap,
  MonitorSmartphone,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlackHole } from "@/components/black-hole";

const features = [
  {
    icon: Download,
    title: "Game Mods",
    description:
      "Browse and download community-curated mods for your favourite games.",
  },
  {
    icon: MonitorSmartphone,
    title: "Emulators",
    description:
      "Access trusted emulators for retro and modern platforms, all in one place.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with fellow gamers, share discoveries, and contribute to the hub.",
  },
  {
    icon: Shield,
    title: "Verified & Safe",
    description:
      "Every file is reviewed by the community to ensure safety and quality.",
  },
  {
    icon: Zap,
    title: "Fast Downloads",
    description:
      "Direct download links with no redirects, pop-ups, or hidden fees.",
  },
  {
    icon: BookOpen,
    title: "Guides & Tutorials",
    description:
      "Step-by-step setup guides so you're up and running in minutes.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: "#010103" }}>
        {/* Three.js Black Hole background */}
        <BlackHole />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center pb-16 pt-20 text-center sm:pb-24 sm:pt-32 lg:pt-40">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-sm text-brand font-medium backdrop-blur-sm">
              <Gamepad2 className="size-3.5" />
              <span>Gaming Community Hub</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-lg">
              Your home for{" "}
              <span className="gradient-text">mods & emulators</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg drop-shadow-md">
              NsoMatrix is a community-driven platform where gamers discover,
              download, and share the best mods and emulators — all in one
              clean, safe hub.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 h-11 px-6 text-sm font-semibold shadow-md">
                <Link href="/mods">
                  Browse Mods
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 px-6 text-sm border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link href="/emulators">Get Emulators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features bento grid ─────────────────────────── */}
      <section className="border-t bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-4 text-muted-foreground">
              A clean, no-nonsense platform built around the tools gamers
              actually use.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden transition-all duration-300 hover:border-brand/40 hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border bg-card p-8 sm:p-12 lg:p-16">
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand/10 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to join the community?
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                NsoMatrix is free and open to all gamers. Start exploring mods
                and emulators today.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 h-11 px-6 text-sm font-semibold shadow-md">
                  <Link href="/mods">
                    Get Started
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-11 px-6 text-sm">
                  <Link href="/community">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
