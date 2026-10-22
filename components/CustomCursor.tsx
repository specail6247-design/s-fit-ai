'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-transform duration-75"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37] transition-all duration-300 ease-out ${
          isPointer ? 'size-12 bg-[#d4af37]/20' : 'size-8'
        }`}
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 size-1 rounded-full bg-[#d4af37]" />
    </div>
  );
}
