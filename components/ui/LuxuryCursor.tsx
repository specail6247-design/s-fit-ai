"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LuxuryCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest(".clickable")) {
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
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#d4af37]"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 12),
        y: mousePosition.y - (isHovering ? 24 : 12),
        width: isHovering ? 48 : 24,
        height: isHovering ? 48 : 24,
        opacity: 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      style={{
        boxShadow: isHovering ? "0 0 15px rgba(212, 175, 55, 0.4)" : "none",
        backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "transparent",
      }}
    />
  );
}
