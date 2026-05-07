"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Hide on mobile via JS since we can't easily do it with tailwind on framer-motion components without breaking SSR
    const checkMobile = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsHiddenOnMobile(true);
      } else {
        setIsHiddenOnMobile(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target && (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || window.getComputedStyle(target).cursor === 'pointer' || target.closest('button') || target.closest('a'))) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isHiddenOnMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-luxury-gold mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        width: 24,
        height: 24,
        opacity: isVisible ? 1 : 0,
        scale: isPointer ? 1.5 : 1,
        boxShadow: "0 0 10px rgba(236, 171, 19, 0.5), inset 0 0 5px rgba(236, 171, 19, 0.3)",
      }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } as const }}
    />
  );
}
