'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Using spring for smooth movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Check for hover state
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="gold-ring-cursor fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#ecab13]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          opacity: isHovering ? 0.8 : 0.5,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#ecab13]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 8 : 4,
          height: isHovering ? 8 : 4,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
        }}
      />
    </>
  );
}
