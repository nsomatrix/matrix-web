import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, MessageSquare, Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Learn about the NsoMatrix gaming community, how to contribute, and connect with fellow gamers.",
};

const ways = [
  {
    icon: Heart,
    title: "Share Mods",
    description: "Upload and share your favourite game mods with the community.",
  },
  {
    icon: MessageSquare,
    title: "Join Discussions",
    description:
      "Chat with fellow gamers on Discord, share tips, and help others.",
  },
  {
    icon: Code2,
    title: "Contribute Code",
    description:
      "NsoMatrix is community-driven. Help us improve the platform on GitHub.",
  },
];

const socials = [
  { icon: MessageSquare, label: "Discord", href: "#" },
  { icon: Code2, label: "GitHub", href: "#" },
  { icon: Globe, label: "Website", href: "/" },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* About section */}
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-4 text-emerald border-emerald/20 bg-emerald/5">
          Community
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About NsoMatrix
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          NsoMatrix is a community-driven gaming hub. We believe in providing
          gamers with a clean, safe, and ad-free platform to discover, download,
          and share mods and emulators.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Our mission is simple: make gaming resources accessible to everyone
          without the noise. No pop-ups, no fake download buttons, no malware —
          just the tools you need.
        </p>
      </div>

      <Separator className="my-12" />

      {/* How to contribute */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          How to contribute
        </h2>
        <p className="mt-3 text-muted-foreground">
          NsoMatrix is built by gamers for gamers. Here&apos;s how you can help:
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((way) => (
            <Card
              key={way.title}
              className="group transition-all duration-300 hover:border-emerald/30 hover:shadow-md"
            >
              <CardHeader className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald/15">
                  <way.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{way.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {way.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Connect */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Connect with us</h2>
        <p className="mt-3 text-muted-foreground">
          Join the conversation and stay up to date.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((social) => (
            <Button key={social.label} variant="outline" asChild className="h-10 gap-2">
              <Link href={social.href}>
                <social.icon className="size-4" />
                {social.label}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Team section placeholder */}
      <Separator className="my-12" />
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Team</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          The people behind NsoMatrix. Team members will be listed here as the
          community grows.
        </p>

        <div className="mt-8">
          <Button asChild variant="outline" className="gap-2">
            <Link href="#">
              Join the team
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
