'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parent is interactive
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'LABEL' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.hasAttribute('data-hover');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div
          className="rounded-full border border-[#ecab13]"
          animate={{
            width: isHovered ? 48 : 20,
            height: isHovered ? 48 : 20,
            backgroundColor: isHovered ? 'rgba(236, 171, 19, 0.05)' : 'transparent',
            borderWidth: isHovered ? '1px' : '1.5px',
            borderColor: '#ecab13',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
        />
        <motion.div
            className="absolute bg-[#ecab13] rounded-full"
            animate={{
                width: isHovered ? 4 : 4,
                height: isHovered ? 4 : 4,
                opacity: isHovered ? 0 : 1
            }}
        />
      </motion.div>
    </motion.div>
  );
}
