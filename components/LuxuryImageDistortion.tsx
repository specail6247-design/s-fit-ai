"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt = "Luxury visual", className = "" }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 1, filter: 'saturate(0.9) contrast(1.1) brightness(1)' }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'saturate(1) contrast(1.15) brightness(1.1)' : 'saturate(0.9) contrast(1.1) brightness(1)'
        }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        aria-label={alt}
        role="img"
      />
      {/* Glass reflection overlay */}
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          x: isHovered ? '100%' : '-100%'
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 pointer-events-none"
      />
    </div>
  );
}