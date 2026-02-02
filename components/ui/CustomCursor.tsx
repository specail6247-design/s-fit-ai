"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        body, a, button, input, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-exclusion"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
          mass: 0.1,
        }}
      >
        <motion.div
            animate={{
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{ duration: 0.2 }}
            className={`rounded-full border border-[#ecab13] transition-colors duration-300 ${
                isHovering ? "h-12 w-12 bg-[#ecab13]/10" : "h-8 w-8 bg-transparent"
            }`}
        >
            {/* Inner Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-[#ecab13]" />
        </motion.div>
      </motion.div>
    </>
  );
}
