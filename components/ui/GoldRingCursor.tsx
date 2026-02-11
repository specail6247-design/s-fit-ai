'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.classList.contains('clickable') ||
          window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    const handleMouseOut = () => {
       setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    // window.addEventListener('mouseout', handleMouseOut); // mouseover handles bubbling well enough usually

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
        <style jsx global>{`
            @media (pointer: fine) {
                body, a, button, input, select, textarea {
                    cursor: none !important;
                }
            }
        `}</style>
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full border border-[#ecab13]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                width: 32,
                height: 32,
                opacity: isVisible ? 1 : 0,
            }}
            animate={{
                scale: isClicked ? 0.8 : isHovering ? 1.5 : 1,
                borderWidth: isHovering ? '2px' : '1px',
                borderColor: isHovering ? '#ecab13' : '#ecab13cc',
                backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 } as any}
        >
            <motion.div
                className="h-1 w-1 rounded-full bg-[#ecab13]"
                animate={{
                    scale: isHovering ? 0 : 1
                }}
            />
        </motion.div>
    </>
  );
}
