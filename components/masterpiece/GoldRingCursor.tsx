'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      // expanded selector for better coverage
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"], label, .clickable');
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on touch devices to prevent double cursor issues
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, select, textarea, [role="button"] {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-[#ecab13]"
          animate={{
            height: isHovering ? 56 : 24, // Expanded size
            width: isHovering ? 56 : 24,
            scale: isClicking ? 0.8 : 1,
            backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.05)' : 'transparent',
            borderWidth: isHovering ? '1.5px' : '2px',
            borderColor: isHovering ? '#ecab13' : '#ecab13',
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 400,
            mass: 0.5
          }}
        />
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-[#ecab13]"
          animate={{
              scale: isHovering ? 0 : 1
          }}
        />
      </motion.div>
    </>
  );
}
