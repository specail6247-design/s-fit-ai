"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // 16 is half of 32px width
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parent is interactive
      const interactiveElement = target.closest('a, button, input, textarea, [role="button"], .interactive, label');
      setIsHovering(!!interactiveElement);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#ecab13] bg-transparent"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 32,
        height: 32,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        borderWidth: isHovering ? "2px" : "1.5px",
        borderColor: isHovering ? "#ecab13" : "rgba(236, 171, 19, 0.6)",
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    />
  );
}
