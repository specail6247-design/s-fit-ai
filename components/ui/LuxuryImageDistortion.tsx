"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = "" }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-label={alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "contrast(1.1) saturate(1.2)" : "contrast(1) saturate(1)",
        }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Luxury lighting overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay"
        animate={{
            opacity: isHovered ? 0.8 : 0.4
        }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
