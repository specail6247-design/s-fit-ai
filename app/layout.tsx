import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { validateEnv } from "@/lib/env";
import "./globals.css";
import CursorRing from "@/components/CursorRing";
import SmoothScroll from "@/components/SmoothScroll";

// Validate environment variables on startup
validateEnv();

const cinzelFont = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const spaceGroteskFont = Space_Grotesk({
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
        className={`${cinzelFont.variable} ${spaceGroteskFont.variable} antialiased bg-void-black text-pure-white font-sans`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <CursorRing />
          {/* Grain Overlay for Premium Feel */}
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}