"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LuxuryCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for "magnetic" feel
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24); // Center the 48px cursor
      cursorY.set(e.clientY - 24);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-[#ecab13] opacity-80 mix-blend-difference shadow-[0_0_15px_rgba(236,171,19,0.3)]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-[#ecab13] shadow-[0_0_10px_#ecab13]" />
    </motion.div>
  );
}
