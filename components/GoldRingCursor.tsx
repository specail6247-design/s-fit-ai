'use client';

import React, { useEffect, useRef } from 'react';

export default function GoldRingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isHovering = false;

    // Fast follow speed
    const speed = 0.25;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        isHovering = true;
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let animationFrameId: number;

    const updateCursor = () => {
      // Linear interpolation for smooth movement
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      if (cursor) {
        // Apply transform
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;

        // Magnetize / Opacity effect on hover
        if (isHovering) {
          cursor.style.backgroundColor = 'rgba(236, 171, 19, 0.1)';
          cursor.style.border = '2px solid rgba(236, 171, 19, 0.8)';
        } else {
          cursor.style.backgroundColor = 'transparent';
          cursor.style.border = '1px solid rgba(236, 171, 19, 0.4)';
        }
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-colors duration-300 hidden md:block"
      style={{
        width: '32px',
        height: '32px',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(236, 171, 19, 0.4)',
        willChange: 'transform',
      }}
    />
  );
}
