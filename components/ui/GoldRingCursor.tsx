"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GoldRingCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
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
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full border border-[#ecab13] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderWidth: isHovering ? "1px" : "2px",
          backgroundColor: isHovering ? "rgba(236, 171, 19, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full bg-[#ecab13]"
        style={{
          x: springX,
          y: springY,
          translateX: 14, // Center dot
          translateY: 14,
          width: 4,
          height: 4,
        }}
      />
    </>
  );
}
