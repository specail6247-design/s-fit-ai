/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export function LuxuryImageDistortion({ imageUrl, className = "", alt = "" }: LuxuryImageDistortionProps) {
  const [hovered, setHovered] = useState(false);


  // Fallback to CSS filter if WebGL is too complex for this prompt
  // But we can just use Framer Motion for a sophisticated distortion effect

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0 mix-blend-screen"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        animate={{
          scale: hovered ? 1.05 : 1,
          filter: hovered ? 'contrast(1.2) brightness(1.1) saturate(1.2)' : 'contrast(1) brightness(1) saturate(1)'
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Distortion overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%)'
        }}
        animate={{
          opacity: hovered ? 0.1 : 0.4
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
