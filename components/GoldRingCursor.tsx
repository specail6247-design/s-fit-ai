"use client";

import React, { useEffect, useState } from 'react';

export default function GoldRingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full border border-[#ecab13] transition-transform duration-75 ease-out"
      style={{
        width: '40px',
        height: '40px',
        left: position.x - 20,
        top: position.y - 20,
        boxShadow: '0 0 10px rgba(236, 171, 19, 0.5)'
      }}
    />
  );
}
