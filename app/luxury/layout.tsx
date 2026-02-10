import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import GoldRingCursor from '@/components/ui/GoldRingCursor'

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  adjustFontFallback: false,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: false,
})

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cinzel.variable} ${spaceGrotesk.variable} font-sans selection:bg-[var(--luxury-gold)] selection:text-black`}>
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
        /* Hide default cursor to allow GoldRingCursor to shine */
        body {
          cursor: none;
        }
        a, button, [role="button"], input, select, textarea {
          cursor: none;
        }
      `}} />
      <SmoothScroll>
        <GoldRingCursor />
        {children}
      </SmoothScroll>
    </div>
  )
}
