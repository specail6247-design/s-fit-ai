'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style jsx global>{`
        body, a, button, input {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#ecab13] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 2.5 : 1),
          borderColor: isHovering ? 'rgba(236, 171, 19, 0.8)' : 'rgba(236, 171, 19, 0.4)',
          backgroundColor: isClicking ? 'rgba(236, 171, 19, 0.3)' : (isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent'),
          borderWidth: isClicking ? '3px' : (isHovering ? '1px' : '2px'),
        }}
        transition={{
          scale: { duration: 0.15 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderWidth: { duration: 0.2 }
        }}
      >
        {/* Inner dot */}
        <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#ecab13] rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
                opacity: isHovering ? 0 : 1,
                scale: isClicking ? 0 : 1
            }}
        />
      </motion.div>
    </>
  );
}
