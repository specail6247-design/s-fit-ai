'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none; /* Hide default cursor */
        }
        /* Restore cursor on devices without fine pointer control if needed,
           but usually managed by media queries */
        @media (pointer: coarse) {
          body {
            cursor: auto;
          }
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Main Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#ecab13]"
          animate={{
            scale: isClicked ? 0.8 : (isHovering ? 1.5 : 1),
            opacity: isHovering ? 1 : 0.8,
            borderColor: isHovering ? '#ecab13' : '#ffffff', // Gold on hover, white otherwise (or keep gold)
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Inner Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#ecab13] rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 0 : 1, // Hide dot when expanding ring
          }}
        />
      </motion.div>
    </>
  );
}
