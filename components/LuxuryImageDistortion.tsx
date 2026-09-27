"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = '', alt = '' }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center"
        initial={{ scale: 1 }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'contrast(1.1) saturate(1.2)' : 'contrast(1) saturate(1)'
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ backgroundImage: `url("${imageUrl}")` }}
        role="img"
        aria-label={alt}
      />

      {/* Luxury shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        initial={{ left: '-100%' }}
        animate={{ left: isHovered ? '200%' : '-100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
}
