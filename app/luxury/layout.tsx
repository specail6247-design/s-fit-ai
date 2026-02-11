'use client';

import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import { useStore } from '@/store/useStore';
import SmoothScroll from '@/components/SmoothScroll';
import GoldRingCursor from '@/components/ui/GoldRingCursor';
import { motion } from 'framer-motion';

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
  const isAnalyzing = useStore((state) => state.isAnalyzing);
  const isFitting = useStore((state) => state.isFitting);

  const shouldFadeOut = isAnalyzing || isFitting;

  return (
    <div
      className={`${cinzel.variable} ${spaceGrotesk.variable} font-sans selection:bg-[#ecab13] selection:text-black`}
      style={{
        '--font-sans': 'var(--font-space-grotesk)',
        '--font-serif': 'var(--font-cinzel)',
      } as React.CSSProperties}
    >
      <SmoothScroll />
      <GoldRingCursor />

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
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

      <motion.div
        animate={{ opacity: shouldFadeOut ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  )
}
