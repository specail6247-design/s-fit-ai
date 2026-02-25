"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LuxuryCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide cursor on touch devices or until moved
  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] flex size-8 items-center justify-center rounded-full border border-[#D4AF37] mix-blend-difference"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    >
      <div className="size-1 rounded-full bg-[#D4AF37]" />
    </motion.div>
  );
}
