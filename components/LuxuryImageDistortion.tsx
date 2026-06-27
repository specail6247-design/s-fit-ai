"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({
  imageUrl,
  alt = "Luxury Item",
  className = "",
}: LuxuryImageDistortionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the motion
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 1 });

  // Transforms for parallax/distortion effect
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);
  const scale = useTransform(smoothX, () => (isHovered ? 1.05 : 1));
  const brightness = useTransform(smoothY, [-1, 1], [1.1, 0.9]);

  // Custom distortion effect (simulated via scale + skew based on mouse position)
  // Real liquid distortion requires WebGL, but we can simulate a premium feel with Framer Motion.

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -1 to 1
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          rotateX,
          rotateY,
          scale,
          filter: isHovered ? `saturate(0.9) contrast(1.1) brightness(1)` : "saturate(0.9) contrast(1.1)",
        }}
        transition={{ duration: 0.7, ease: "easeOut" }} // Base duration, springs override on hover
      >
          {/* Subtle reflection overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 mix-blend-overlay"
            style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                opacity: isHovered ? 1 : 0,
                x: useTransform(smoothX, [-1, 1], ["-50%", "50%"]),
                y: useTransform(smoothY, [-1, 1], ["-50%", "50%"])
            }}
            transition={{ duration: 1 }}
          />
      </motion.div>
    </motion.div>
  );
}
