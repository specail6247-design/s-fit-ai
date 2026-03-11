import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Space_Grotesk } from "next/font/google";
import { validateEnv } from "@/lib/env";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GoldRingCursor from "@/components/GoldRingCursor";
import "./globals.css";

// Validate environment variables on startup
validateEnv();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S_FIT AI | Virtual Try-On Experience",
  description:
    "Snap, Smart, Style. The ultimate virtual fitting room for global fashion. Try before you buy with AI-powered 3D fitting.",
  keywords: [
    "virtual try-on",
    "AI fashion",
    "3D fitting",
    "ZARA",
    "Gucci",
    "Uniqlo",
  ],
  authors: [{ name: "S_FIT AI" }],
  openGraph: {
    title: "S_FIT AI | Virtual Try-On Experience",
    description: "The ultimate virtual fitting room. Try before you buy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${spaceGrotesk.variable} antialiased bg-void-black text-pure-white font-sans`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <GoldRingCursor />
          {/* Grain Overlay for Premium Feel */}
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
