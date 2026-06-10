"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export function LuxuryImageDistortion({
  src,
  alt,
  className = "",
  children,
}: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simple parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Hover distortion effect (simulated with scale and filter)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 z-0 h-[120%] w-full"
        style={{ y }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "contrast(1.1) brightness(1.05)" : "contrast(1) brightness(1)",
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${src})` }}
          aria-label={alt}
        />
        {/* Subtle overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
