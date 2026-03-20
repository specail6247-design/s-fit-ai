'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reqIdRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      reqIdRef.current = requestAnimationFrame(raf)
    }

    reqIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (reqIdRef.current !== null) {
        cancelAnimationFrame(reqIdRef.current)
      }
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
