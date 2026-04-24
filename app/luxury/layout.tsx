import { Space_Grotesk, Inter } from 'next/font/google';
import { Cinzel } from 'next/font/google';
import React from 'react';
import LuxuryCursor from '@/components/masterpiece/LuxuryCursor';
import SmoothScroll from '@/components/masterpiece/SmoothScroll';

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className={`${spaceGrotesk.className} ${cinzel.variable} font-sans`}>
        <LuxuryCursor />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
          .font-cinzel {
            font-family: var(--font-cinzel), serif;
          }
        `}} />
        {children}
      </div>
    </SmoothScroll>
  )
}
