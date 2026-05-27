import { Manrope } from 'next/font/google'
import React from 'react'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={manrope.className}>
      {children}
    </div>
  )
}
