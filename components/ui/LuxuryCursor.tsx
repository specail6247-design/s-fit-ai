'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuxuryCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
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
  }, [cursorX, cursorY]);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
        @media (hover: none) {
           body { cursor: auto; }
           .luxury-cursor { display: none; }
        }
      `}</style>
      <motion.div
        className="luxury-cursor fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
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
                width: isHovered ? 48 : 32,
                height: isHovered ? 48 : 32,
                scale: isClicked ? 0.9 : 1,
                borderColor: isHovered ? '#ccff00' : '#ecab13', // cyber-lime : luxury-gold
                opacity: 1
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
        <motion.div
           className="absolute w-1 h-1 bg-[#ecab13] rounded-full"
           animate={{
               scale: isHovered ? 0 : 1,
               backgroundColor: isHovered ? '#ccff00' : '#ecab13'
           }}
        />
      </motion.div>
    </>
  );
}
