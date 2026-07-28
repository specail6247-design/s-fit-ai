"use client";
import React, { useEffect, useState } from 'react';

export function GoldRingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a') || target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference hidden md:block"
    >
      <div
        className={`absolute rounded-full border border-[#ecab13] transition-all duration-300 ease-out flex items-center justify-center`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovering ? 'rgba(236,171,19,0.1)' : 'transparent',
        }}
      >
        <div className={`w-1 h-1 bg-[#ecab13] rounded-full transition-all duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </div>
  );
}
