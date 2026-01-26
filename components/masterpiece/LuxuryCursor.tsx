'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function LuxuryCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center offset for w-8 (32px)
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('hover-target');

      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Hide cursor on touch devices to prevent artifacts
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsVisible(matchMedia('(pointer:fine)').matches);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border border-[#ecab13]"
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
          borderWidth: isHovering ? '1px' : '1.5px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-[#ecab13] rounded-full" />
      </div>
    </motion.div>
  );
}
