'use client';

import React, { useEffect, useState } from 'react';

export default function LuxuryCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#ecab13] transition-all duration-150 ease-out"
      style={{
        transform: `translate(${position.x - (isHovering ? 24 : 12)}px, ${position.y - (isHovering ? 24 : 12)}px)`,
        width: isHovering ? '48px' : '24px',
        height: isHovering ? '48px' : '24px',
        opacity: isHovering ? 0.8 : 0.4,
        boxShadow: isHovering ? '0 0 10px rgba(236, 171, 19, 0.5)' : 'none',
        backgroundColor: isHovering ? 'rgba(236, 171, 19, 0.1)' : 'transparent',
      }}
    />
  );
}
