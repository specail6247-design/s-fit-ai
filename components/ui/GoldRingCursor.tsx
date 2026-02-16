'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parent is interactive
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices (approximate check)
  // We'll rely on CSS media queries for the actual cursor hiding to be safe
  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, input, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`rounded-full border-2 border-[#ecab13] transition-colors duration-200 ${isHovering ? 'bg-[#ecab13]/20' : 'bg-transparent'}`}
          animate={{
            width: isHovering ? 48 : 20,
            height: isHovering ? 48 : 20,
            scale: isHovering ? 1.1 : 1,
            borderWidth: isHovering ? '1px' : '2px',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
          }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#ecab13] rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{
                scale: isHovering ? 0 : 1
            }}
        />
      </motion.div>
    </>
  );
}
