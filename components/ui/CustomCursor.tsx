"use client";
import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] rounded-full border border-[#C9B037]/50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          width: '40px',
          height: '40px',
          left: `${cursorPos.x - 20}px`,
          top: `${cursorPos.y - 20}px`,
          boxShadow: '0 0 10px rgba(201, 176, 55, 0.2)',
          willChange: 'transform'
        }}
      />
      <div
        className="pointer-events-none fixed z-[9999] rounded-full bg-[#C9B037] transition-transform duration-75 ease-out"
        style={{
          width: '4px',
          height: '4px',
          left: `${cursorPos.x - 2}px`,
          top: `${cursorPos.y - 2}px`,
          willChange: 'transform'
        }}
      />
    </>
  );
}
