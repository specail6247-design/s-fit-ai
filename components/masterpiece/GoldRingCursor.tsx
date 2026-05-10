"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GoldRingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (pointer: coarse) {
            .gold-ring-cursor {
              display: none !important;
            }
          }
        `
      }} />
      <motion.div
        className="gold-ring-cursor pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        <div
          className="h-10 w-10 rounded-full border-[1.5px] border-[#D4AF37] opacity-80"
          style={{
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.3)",
          }}
        />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
      </motion.div>
    </>
  );
}
