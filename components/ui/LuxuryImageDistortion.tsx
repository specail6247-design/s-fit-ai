"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = "" }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={{ scale: 1.1, filter: "blur(4px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          exit={{ scale: 1.1, filter: "blur(4px)" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: 'saturate(0.9) contrast(1.1)' // Editorial color grading based on memory
          }}
        />
      </AnimatePresence>

      {/* Subtle overlay gradient to add luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
