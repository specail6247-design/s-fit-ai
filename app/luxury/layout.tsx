import { Cinzel, Space_Grotesk } from 'next/font/google'
import React from 'react'
import SmoothScroll from '@/components/masterpiece/SmoothScroll'
import LuxuryCursor from '@/components/masterpiece/LuxuryCursor'
import './luxury.css'

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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
      <LuxuryCursor />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </div>
  )
}
