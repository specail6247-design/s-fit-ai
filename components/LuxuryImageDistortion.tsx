"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  altText?: string;
  className?: string;
}

export default function LuxuryImageDistortion({
  imageUrl,
  altText = "Luxury Image",
  className = "",
}: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for fluid motion
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200, mass: 0.5 });

  // Transforms for parallax and distortion
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);
  const scale = useTransform(smoothX, [0, 0.5, 1], [1.02, 1.05, 1.02]);

  // Vignette shift based on mouse position
  const vignetteX = useTransform(smoothX, [0, 1], ["60%", "40%"]);
  const vignetteY = useTransform(smoothY, [0, 1], ["60%", "40%"]);

  // Create a template string for the radial-gradient background
  const vignetteBackground = useMotionTemplate`radial-gradient(circle at ${vignetteX} ${vignetteY}, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="absolute inset-[-10%] w-[120%] h-[120%] origin-center"
        style={{
          rotateX,
          rotateY,
          scale,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label={altText}
      >
        {/* Subtle chromatic aberration/color shift edges */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/20 mix-blend-overlay"></div>
      </motion.div>

      {/* Interactive Vignette/Lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: vignetteBackground
        }}
      />

      {/* Film Grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
      </div>
    </div>
  );
}
