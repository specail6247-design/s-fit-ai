'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Start off-screen
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parents are interactive
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.getAttribute('role') === 'button';

      setIsHovering(isInteractive);
    };

    // Use separate listeners for move and hover detection
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices (simple check)
  // We'll use CSS media queries to hide it, but logic still runs.
  // Or we can check navigator, but hydration issues.
  // CSS `html, body { cursor: none; }` handles the hiding of default.
  // We should hide this custom cursor on touch via CSS class on the div.

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-[var(--luxury-gold)] rounded-full pointer-events-none z-[9999] hidden sm:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
}
