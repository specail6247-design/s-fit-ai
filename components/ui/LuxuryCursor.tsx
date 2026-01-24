"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LuxuryCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
        {/* Main Cursor Ring */}
        <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#D4AF37]"
        animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
        }}
        transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
        }}
        style={{
            width: 40,
            height: 40,
            backgroundColor: "transparent",
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.1)"
        }}
        />
        {/* Center Dot */}
        <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#D4AF37]"
        animate={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
        }}
        transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5
        }}
        style={{
            width: 6,
            height: 6,
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)"
        }}
        />
    </>
  );
}
