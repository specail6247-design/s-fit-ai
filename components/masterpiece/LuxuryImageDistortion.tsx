"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  imageUrl: string;
  alt?: string;
}

export function LuxuryImageDistortion({ imageUrl, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      role="img"
      aria-label={alt || "Luxury Image"}
    >
      <motion.div
        className="absolute inset-[-5%] size-[110%] bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl}")` }}
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
          scale: 1.05,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
    </div>
  );
}
