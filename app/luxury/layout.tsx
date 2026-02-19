import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import LuxuryScroller from '@/components/masterpiece/LuxuryScroller'
import GoldRingCursor from '@/components/masterpiece/GoldRingCursor'

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cinzel.variable} ${spaceGrotesk.variable} font-sans`}>
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

        /* Apply fonts */
        h1, h2, h3, h4, h5, h6, .font-serif {
          font-family: var(--font-cinzel), serif;
        }
        body, p, span, div, .font-sans {
          font-family: var(--font-space-grotesk), sans-serif;
        }
      `}} />
      <LuxuryScroller />
      <GoldRingCursor />
      {children}
    </div>
  )
}
