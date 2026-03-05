"use client";

import React, { useEffect, useRef } from "react";

export default function GoldRingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        // Direct manipulation for dot (no delay)
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    let animationFrame: number;

    const animateRing = () => {
      // Lerp for smooth trailing ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Outer Gold Ring (Trailing) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] size-10 rounded-full border border-[#ecab13]/60 mix-blend-screen transition-transform duration-0 ease-linear will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Inner Dot (Instant) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1 rounded-full bg-[#ecab13] mix-blend-screen transition-transform duration-0 ease-linear will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Global style to hide default cursor on this route */}
      <style dangerouslySetInnerHTML={{__html: `
        body {
          cursor: none;
        }
        button, a, [role="button"] {
          cursor: none;
        }
      `}} />
    </>
  );
}
