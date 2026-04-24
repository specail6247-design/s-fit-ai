'use client';

import React, { useEffect, useState } from 'react';

export default function LuxuryCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (not a touch device)
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = target.closest('button') ||
                          target.closest('a') ||
                          target.closest('.mode-card') ||
                          target.closest('.group');

      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full border-2 border-[#ecab13] transition-all duration-300 ease-out mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isClicking ? 0.8 : (isHovering ? 1.5 : 1)})`,
          width: isHovering ? '40px' : '20px',
          height: isHovering ? '40px' : '20px',
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full bg-[#ecab13] transition-all duration-100 ease-out mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: '4px',
          height: '4px',
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
