"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LuxuryImageDistortion({ imageUrl, alt = "Luxury visual" }: { imageUrl: string, alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const scale = useSpring(1, { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 20; // -10 to 10
    const yPct = (mouseY / height - 0.5) * 20;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnter() {
    scale.set(1.05);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden rounded-sm cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          x: springX,
          y: springY,
          scale: scale,
          filter: "contrast(1.1) saturate(0.9)",
        }}
      />
      {/* Distortion overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}
