'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LuxuryCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if we are on a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Find nearest interactive element for magnetism
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"], input, select, textarea');

      if (interactive) {
        setIsHovering(true);
        const rect = interactive.getBoundingClientRect();

        // Magnetize to center of interactive element
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setIsHovering(false);
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Don't render on server
  if (typeof window === 'undefined') return null;

  // Don't render on touch devices
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ecab13] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1
        }}
      />

      {/* Outer Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#ecab13] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(236,171,19,0.5)' : 'rgba(236,171,19,1)'
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.2
        }}
      />
    </>
  );
}
