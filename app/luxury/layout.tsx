import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import LuxuryClientWrapper from '@/components/LuxuryClientWrapper'

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
    <div className={`${cinzel.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-space-grotesk)] bg-black text-white min-h-screen`}>
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

        /* Apply Cinzel to headers within this layout */
        .luxury-layout h1, .luxury-layout h2, .luxury-layout h3, .luxury-layout h4, .luxury-layout h5, .luxury-layout h6 {
            font-family: var(--font-cinzel), serif;
        }
      `}} />
      <div className="luxury-layout">
        <LuxuryClientWrapper>
            {children}
        </LuxuryClientWrapper>
      </div>
    </div>
  )
}
