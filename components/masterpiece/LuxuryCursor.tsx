"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LuxuryCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the ring
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is clickable or interactive
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "LABEL" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally
    document.documentElement.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style jsx global>{`
        .cursor-none, .cursor-none * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-exclusion"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* The Gold Ring */}
        <motion.div
          className="rounded-full border border-[#D4AF37]"
          animate={{
            scale: isHovered ? 1.8 : 1,
            borderWidth: isHovered ? "1px" : "1.5px",
            backgroundColor: isHovered ? "rgba(212, 175, 55, 0.1)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            width: 32,
            height: 32,
          }}
        />

        {/* The Center Dot - disappears on hover for a "focus" effect */}
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-[#D4AF37]"
          animate={{
            scale: isHovered ? 0.5 : 1,
            opacity: isHovered ? 0.5 : 1
          }}
        />
      </motion.div>
    </>
  );
}
