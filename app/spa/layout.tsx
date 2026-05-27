import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function SPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={inter.className}>
      {children}
    </section>
  )
}
