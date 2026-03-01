'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Consider an element clickable if it's an a, button, input, or has cursor-pointer
      const isClickable = target.closest('a') || target.closest('button') || target.closest('input') || window.getComputedStyle(target).cursor === 'pointer'
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ecab13] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#ecab13] rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent'
        }}
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.2
        }}
      />
    </>
  )
}
