'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuxuryCursor() {
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
        document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
      }}
    >
        {/* Gold Ring */}
        <motion.div
            animate={{
                scale: isHovered ? 2 : 1,
                borderColor: isHovered ? '#ccff00' : '#ecab13', // Cyber Lime on hover, Gold normally
                borderWidth: isHovered ? '1px' : '1.5px',
                backgroundColor: isHovered ? 'rgba(204, 255, 0, 0.05)' : 'transparent'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full h-full rounded-full border border-luxury-gold shadow-[0_0_10px_rgba(236,171,19,0.3)]"
        />

        {/* Center Dot */}
        <motion.div
            animate={{
                scale: isHovered ? 0.5 : 1,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
        />
    </motion.div>
  );
}
