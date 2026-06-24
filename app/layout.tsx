import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Space_Grotesk } from "next/font/google";
import { validateEnv } from "@/lib/env";
import { AuthButton } from "@/components/AuthButton";
import SupportHub from "@/components/SupportHub";
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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${spaceGrotesk.variable} antialiased bg-void-black text-pure-white relative min-h-screen`}
        suppressHydrationWarning
      >
        {/* Grain Overlay for Premium Feel */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Global UI Elements */}
        <div className="absolute top-6 right-6 z-40">
          <AuthButton />
        </div>
        <SupportHub />

        {children}
      </body>
    </html>
  );
}
