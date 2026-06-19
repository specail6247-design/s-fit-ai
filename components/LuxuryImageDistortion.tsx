"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = "" }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const scale = useTransform(springX, () => (isHovered ? 1.05 : 1));

  useEffect(() => {
    if (!isHovered) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [isHovered, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates to [-0.5, 0.5]
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${src}')`,
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        data-alt={alt}
      >
        {/* Subtle shadow overlay based on mouse position */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: useTransform(
                    [springX, springY],
                    ([x, y]) => `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)`
                )
            }}
        />
      </motion.div>
    </motion.div>
  );
}
