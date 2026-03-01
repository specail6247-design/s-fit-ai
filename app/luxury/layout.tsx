import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

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
    <SmoothScroll>
      <div className={`${cinzel.variable} ${spaceGrotesk.variable} font-sans`}>
        <CustomCursor />
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
          /* Apply serif font to headings */
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-cinzel), serif;
          }
          /* Set sans font as default */
          body, p, span, div, button, a {
            font-family: var(--font-space-grotesk), sans-serif;
          }
        `}} />
        {children}
      </div>
    </SmoothScroll>
  )
}
