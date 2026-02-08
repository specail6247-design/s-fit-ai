"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Use springs for smooth movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isClicked ? 0.8 : isHovering ? 1.5 : 1,
        borderColor: isClicked ? "#D4AF37" : "rgba(212, 175, 55, 0.8)",
        borderWidth: isHovering ? "2px" : "1px",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <motion.div
        className="h-1 w-1 rounded-full bg-[#D4AF37]"
        animate={{
            scale: isHovering ? 0 : 1
        }}
      />
    </motion.div>
  );
}
