'use client'

import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import SmoothScroll from '@/components/SmoothScroll'
import GoldRingCursor from '@/components/ui/GoldRingCursor'
import { useStore } from '@/store/useStore'

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '700'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '700'],
})

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAnalyzing = useStore((state) => state.isAnalyzing);
  const isFitting = useStore((state) => state.isFitting);

  const shouldFadeOut = isAnalyzing || isFitting;

  return (
    <div className={`${cinzel.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-[#0a0a0a] cursor-none ${shouldFadeOut ? 'immersive-mode' : ''}`}>
      <SmoothScroll>
        <GoldRingCursor />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
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

            :root {
              --font-cinzel: ${cinzel.style.fontFamily};
              --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
            }
        `}} />

        {children}
      </SmoothScroll>
    </div>
  )
}
