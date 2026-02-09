"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues for performance
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // smooth spring for the cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the cursor (32px / 2)
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are clickable
      const isClickable = target.closest("a") || target.closest("button") || target.closest(".clickable") || target.closest("[data-hover='true']");
      if (isClickable) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-[#ecab13]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        borderWidth: isHovering ? "2px" : "1px",
        backgroundColor: isHovering ? "rgba(236, 171, 19, 0.1)" : "transparent",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
        {/* Inner dot */}
        <motion.div
            className="h-1 w-1 rounded-full bg-[#ecab13]"
            animate={{
                scale: isHovering ? 0 : 1
            }}
        />
    </motion.div>
  );
}
