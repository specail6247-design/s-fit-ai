import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { validateEnv } from "@/lib/env";
import { AuthButton } from "@/components/AuthButton";
import { SupportHub } from "@/components/SupportHub";
import "./globals.css";

// Validate environment variables on startup
validateEnv();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <style dangerouslySetInnerHTML={{__html: `
          .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-smoothing: antialiased;
          }
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-void-black text-pure-white`}
        suppressHydrationWarning
      >
        {/* Grain Overlay for Premium Feel */}
        <div className="grain-overlay" aria-hidden="true" />
        <div className="fixed top-6 right-8 z-[100]">
          <AuthButton />
        </div>
        {children}
        <SupportHub />
      </body>
    </html>
  );
}
