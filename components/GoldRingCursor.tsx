'use client';

import React, { useEffect, useRef } from 'react';

export default function GoldRingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const updateCursor = () => {
      // Lerp for smooth follow
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

        if (isHovering.current) {
          cursorRef.current.style.width = '40px';
          cursorRef.current.style.height = '40px';
          cursorRef.current.style.backgroundColor = 'rgba(236, 171, 19, 0.1)';
          cursorRef.current.style.border = '1px solid rgba(236, 171, 19, 0.8)';
          cursorRef.current.style.marginLeft = '-20px';
          cursorRef.current.style.marginTop = '-20px';
        } else {
          cursorRef.current.style.width = '16px';
          cursorRef.current.style.height = '16px';
          cursorRef.current.style.backgroundColor = 'transparent';
          cursorRef.current.style.border = '2px solid rgba(236, 171, 19, 0.5)';
          cursorRef.current.style.marginLeft = '-8px';
          cursorRef.current.style.marginTop = '-8px';
        }
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(updateCursor);

    // Initial position fix to avoid cursor animating from top left on first entry
    const setInitialPos = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      window.removeEventListener('mousemove', setInitialPos);
    };
    window.addEventListener('mousemove', setInitialPos);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousemove', setInitialPos);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference"
      style={{
        width: '16px',
        height: '16px',
        border: '2px solid rgba(236, 171, 19, 0.5)',
        marginLeft: '-8px',
        marginTop: '-8px',
        willChange: 'transform, width, height, border, background-color'
      }}
    />
  );
}
