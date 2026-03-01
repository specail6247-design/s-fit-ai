"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LuxuryImageDistortion({ src, alt, className = "", style }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovering) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  // Calculate parallax offset based on mouse position
  const xOffset = (mousePosition.x - 0.5) * 20; // max 20px offset
  const yOffset = (mousePosition.y - 0.5) * 20;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      style={{ perspective: "1000px", ...style }}
    >
      <motion.div
        animate={{
          x: isHovering ? xOffset : 0,
          y: isHovering ? yOffset : 0,
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 15,
          mass: 0.5,
        }}
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${src}")` }}
        role="img"
        aria-label={alt}
      />

      {/* Subtle overlay for luxury feel */}
      <motion.div
        animate={{
          opacity: isHovering ? 0.2 : 0,
        }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay pointer-events-none"
      />
    </div>
  );
}
