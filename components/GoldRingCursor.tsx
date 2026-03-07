'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function GoldRingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      const { clientX, clientY } = e;

      // We use requestAnimationFrame for smoother following
      frameId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          // Adjust position so the center of the ring is at the cursor
          // The ring is 32px wide normally, and 48px wide when hovering.
          // We translate based on top/left 0, using transform.
          cursorRef.current.style.transform = `translate3d(${clientX - 16}px, ${clientY - 16}px, 0)`;
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // If we're hovering over a clickable element (button, a, input, etc)
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          cursor: none !important;
        }
      ` }} />
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#ecab13] transition-all duration-300 ease-out ${
          isHovering
            ? 'h-12 w-12 bg-[#ecab13]/10 scale-125'
            : 'h-8 w-8 scale-100'
        }`}
        style={{
          boxShadow: isHovering ? '0 0 15px rgba(236, 171, 19, 0.5)' : 'none'
        }}
      />
      {/* Optional center dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 rounded-full bg-[#ecab13] transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0 : 1,
          transform: 'translate3d(0, 0, 0)',
        }}
        ref={(el) => {
          if (el) {
            const handleMove = (e: MouseEvent) => {
              requestAnimationFrame(() => {
                if(el) {
                   el.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
                }
              });
            };
            window.addEventListener('mousemove', handleMove);
            return () => window.removeEventListener('mousemove', handleMove);
          }
        }}
      />
    </>
  );
}
