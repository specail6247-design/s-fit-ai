"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the cursor (32px / 2)
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[var(--luxury-gold)] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: 1,
          borderWidth: isHovering ? "1px" : "2px",
          backgroundColor: isHovering ? "rgba(236, 171, 19, 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[var(--luxury-gold)] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8,
          height: 8,
          translateX: 12, // Center within the 32px ring
          translateY: 12,
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Hide dot when expanded
        }}
      />
    </>
  );
}
