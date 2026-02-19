"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset by half the default size (32px / 2 = 16px) to center
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <motion.div
        className="rounded-full border border-[#D4AF37]"
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          x: isHovering ? -16 : 0, // Adjust centering when expanding
          y: isHovering ? -16 : 0,
          borderWidth: isHovering ? 2 : 1.5,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.05)" : "transparent",
          borderColor: isHovering ? "#D4AF37" : "#D4AF37",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />
      {/* Center dot */}
      <div className="absolute top-[16px] left-[16px] w-1.5 h-1.5 bg-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#D4AF37]" />
    </motion.div>
  );
}
