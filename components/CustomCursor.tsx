"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        window.getComputedStyle(target).cursor === "pointer"
      );

      setIsHovered(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C9B037] pointer-events-none z-[9999]"
        style={{
          x: position.x,
          y: position.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(201, 176, 55, 0.1)" : "transparent",
          borderColor: isHovered ? "#C9B037" : "rgba(201, 176, 55, 0.5)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-[#C9B037] pointer-events-none z-[9999]"
        style={{
          x: position.x,
          y: position.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
