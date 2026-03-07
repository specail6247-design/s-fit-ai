'use client';

import React, { useEffect, useRef } from 'react';

export default function GoldRingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    frameId = requestAnimationFrame(render);

    document.documentElement.style.cursor = 'none';
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
      document.documentElement.style.cursor = 'auto';
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-amber-500/80"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-amber-500"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
