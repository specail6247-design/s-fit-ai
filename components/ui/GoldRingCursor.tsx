'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or any parent is interactive
      const isInteractive =
        target.matches('button, a, input, textarea, select, [role="button"]') ||
        target.closest('button, a, input, textarea, select, [role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => {
       setIsClicked(true);
       document.body.classList.add('cursor-clicked');
    };

    const handleMouseUp = () => {
       setIsClicked(false);
       document.body.classList.remove('cursor-clicked');
    };

    window.addEventListener('mousemove', moveCursor);
    // Use capture to ensure we catch hover states properly
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
          body, a, button, input, select, textarea {
            cursor: none !important;
          }
      `;
      document.head.appendChild(style);
      return () => {
          document.head.removeChild(style);
      }
  }, []);

  return (
    <>
      <style jsx global>{`
        .gold-ring-cursor {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          mix-blend-mode: difference;
        }
      `}</style>

      {/* Main Ring */}
      <motion.div
        className="gold-ring-cursor rounded-full border border-[#ecab13] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          borderColor: isHovered ? '#ecab13' : 'rgba(236, 171, 19, 0.6)',
          borderWidth: isHovered ? 2 : 1.5,
          scale: isClicked ? 0.8 : 1, // Substantial feedback
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Inner Dot */}
        <motion.div
            className="bg-[#ecab13] rounded-full"
            animate={{
                width: isHovered ? 4 : 4,
                height: isHovered ? 4 : 4,
                opacity: isHovered ? 0 : 1
            }}
        />
      </motion.div>
    </>
  );
}
