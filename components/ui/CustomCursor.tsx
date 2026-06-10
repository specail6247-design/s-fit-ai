"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const element = document.elementFromPoint(mousePosition.x, mousePosition.y);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        setIsPointer(computedStyle.cursor === "pointer" || element.tagName.toLowerCase() === "button" || element.tagName.toLowerCase() === "a");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousemove", updateCursorType);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousemove", updateCursorType);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-luxury-gold/50 mix-blend-difference"
        animate={{
          x: mousePosition.x - (isPointer ? 24 : 16),
          y: mousePosition.y - (isPointer ? 24 : 16),
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-luxury-gold mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          width: 8,
          height: 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />
    </>
  );
}
