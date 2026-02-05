'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive');

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
  }, [cursorX, cursorY]);

  return (
    <>
      <style jsx global>{`
        body, a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="gold-ring-cursor fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#ecab13] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
          borderWidth: isHovering ? '2px' : '1px',
          backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
         className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#ecab13]"
         style={{
            x: cursorX,
            y: cursorY,
            translateX: 14,
            translateY: 14,
            width: 4,
            height: 4
         }}
      />
    </>
  );
}
