import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NsoMatrix — Gaming Community Hub",
    template: "%s | NsoMatrix",
  },
  description:
    "Your gateway to the best gaming mods, emulators, and community resources. Built by gamers, for gamers.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NsoMatrix",
    title: "NsoMatrix — Gaming Community Hub",
    description:
      "Your gateway to the best gaming mods, emulators, and community resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NsoMatrix — Gaming Community Hub",
    description:
      "Your gateway to the best gaming mods, emulators, and community resources.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
