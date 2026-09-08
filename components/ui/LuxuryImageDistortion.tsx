'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt, className = '' }: LuxuryImageDistortionProps) {
  // A simplified placeholder for LuxuryImageDistortion
  // In a real implementation this would use WebGL/Three.js or complex CSS filters
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={alt}
      />
      {/* Subtle luxury glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent mix-blend-overlay pointer-events-none" />
    </motion.div>
  );
}
