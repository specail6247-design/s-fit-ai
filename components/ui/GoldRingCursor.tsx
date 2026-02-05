'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for luxury feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="gold-ring-cursor fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        width: 32,
        height: 32,
      }}
    >
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[var(--color-luxury-gold)]"
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          borderWidth: isHovering ? '1px' : '2px',
          borderColor: isHovering ? '#ecab13' : 'rgba(236, 171, 19, 0.6)',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-[var(--color-luxury-gold)] rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </motion.div>
  );
}
