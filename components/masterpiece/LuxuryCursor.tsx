'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './cursor.css'

export default function LuxuryCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Magnetize/Expand on clickable elements or elements with data-luxury-hover
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-luxury-hover')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ecab13] pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center luxury-cursor"
        animate={{
          x: position.x - 16, // Center offset (32px / 2)
          y: position.y - 16,
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <motion.div
          className="w-1 h-1 bg-[#ecab13] rounded-full"
          animate={{
            scale: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
