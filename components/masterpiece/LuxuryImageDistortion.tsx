"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function LuxuryImageDistortion({ imageUrl, alt, className = "" }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full rounded-lg overflow-hidden cursor-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-110"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: "translateZ(30px)",
        }}
        title={alt}
      />
      {/* Glint effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 25%, transparent 30%)",
          transform: "translateZ(40px)",
        }}
      />
    </motion.div>
  );
}
