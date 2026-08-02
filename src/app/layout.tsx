import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Gaming Hub | Mods, Emulators & Texture Packs Vault",
  description: "The ultimate community hub to download verified console emulators (PCSX2, Ryujinx, PPSSPP, Dolphin), 4K HD texture mods, 60FPS game patches, and setup guides.",
  keywords: ["emulators", "game mods", "pcsx2", "ryujinx", "ppsspp", "dolphin", "4k texture packs", "60fps patches", "gaming community"],
  authors: [{ name: "Nexus Gaming Team" }],
  openGraph: {
    title: "Nexus Gaming Hub - Mods & Emulators Vault",
    description: "Download verified emulators, 4K texture packs, and 60FPS mods with high-speed CDN mirrors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
