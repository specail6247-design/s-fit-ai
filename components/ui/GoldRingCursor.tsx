'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GoldRingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-[#C9B037] mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 16),
        y: mousePosition.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}