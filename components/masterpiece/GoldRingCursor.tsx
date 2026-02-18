'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on non-touch devices ideally, but simpler to just show on md+ screens via CSS
    const timer = setTimeout(() => setIsVisible(true), 100);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parent is interactive
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'LABEL' ||
        target.getAttribute('role') === 'button';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold pointer-events-none z-[9999] hidden md:block mix-blend-exclusion"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        borderWidth: isHovered ? '0.5px' : '1.5px',
        borderColor: isHovered ? '#D4AF37' : '#D4AF37', // Luxury Gold
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {/* Inner dot that disappears on hover */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyber-lime rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1
        }}
      />
    </motion.div>
  );
}
