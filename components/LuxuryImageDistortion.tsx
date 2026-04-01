"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LuxuryImageDistortion({ src, alt }: { src: string; alt?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 200, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth) - 0.5);
      y.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="perspective-1000 relative h-full w-full overflow-hidden flex items-center justify-center">
      <motion.div
        className="w-full h-full bg-cover bg-center absolute inset-[-5%]"
        style={{
          backgroundImage: `url("${src}")`,
          rotateX,
          rotateY,
        }}
        data-alt={alt}
      />
    </div>
  );
}
