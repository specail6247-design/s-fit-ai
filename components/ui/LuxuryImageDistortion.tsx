"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt = "", className = "" }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl}")` }}
        initial={{ scale: 1, filter: "saturate(0.9) contrast(1.1)" }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "saturate(1.1) contrast(1.2) brightness(1.1)" : "saturate(0.9) contrast(1.1)"
        }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}
