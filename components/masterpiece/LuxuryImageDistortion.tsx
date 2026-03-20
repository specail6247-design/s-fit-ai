"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt?: string;
  className?: string;
  intensity?: number;
}

export const LuxuryImageDistortion: React.FC<LuxuryImageDistortionProps> = ({
  src,
  alt = "",
  className = "",
  intensity = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => isHovered
                ? `radial-gradient(circle at ${(x as number + 0.5) * 100}% ${(y as number + 0.5) * 100}%, rgba(236,171,19,0.3) 0%, transparent 50%)`
                : 'none'
            )
          }}
        />

        {/* The image */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            backgroundImage: `url(${src})`,
          }}
          data-alt={alt}
        />
      </motion.div>
    </motion.div>
  );
};
