"use client";

import { Cinzel, Space_Grotesk } from 'next/font/google';
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import LuxuryCursor from '@/components/masterpiece/LuxuryCursor';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${cinzel.variable} ${spaceGrotesk.variable}`}>
       <style dangerouslySetInnerHTML={{__html: `
        :root {
          --font-serif: var(--font-cinzel);
          --font-sans: var(--font-space-grotesk);
        }
        .font-serif {
          font-family: var(--font-cinzel), serif !important;
        }
        .font-sans {
          font-family: var(--font-space-grotesk), sans-serif !important;
        }
        body, html {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"] {
          cursor: none !important;
        }
      `}} />
       <LuxuryCursor />
       {/* eslint-disable-next-line @next/next/no-page-custom-font */}
       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
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
      {children}
    </div>
  )
}
