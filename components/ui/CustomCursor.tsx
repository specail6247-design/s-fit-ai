'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement
       const isInteractive =
         target.tagName === 'BUTTON' ||
         target.tagName === 'A' ||
         target.tagName === 'INPUT' ||
         target.tagName === 'SELECT' ||
         target.tagName === 'TEXTAREA' ||
         target.closest('button') ||
         target.closest('a') ||
         target.getAttribute('role') === 'button' ||
         target.classList.contains('cursor-pointer');

       if (isInteractive) {
         setIsHovered(true)
       } else {
         setIsHovered(false)
       }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center mix-blend-exclusion"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
      }}
    >
      {/* Outer Ring */}
      <motion.div
        className="absolute border border-luxury-gold rounded-full box-border"
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          scale: isClicked ? 0.8 : 1,
          borderColor: isHovered ? 'var(--cyber-lime)' : 'var(--luxury-gold)',
          borderWidth: isHovered ? 2 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Center Dot */}
      <motion.div
        className="absolute bg-luxury-gold rounded-full"
        animate={{
          width: isHovered ? 4 : 6,
          height: isHovered ? 4 : 6,
          backgroundColor: isHovered ? 'var(--cyber-lime)' : 'var(--luxury-gold)'
        }}
      />
    </motion.div>
  )
}
