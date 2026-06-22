import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = '' }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover origin-center"
        initial={{ scale: 1, filter: 'saturate(0.9) contrast(1.1)' }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'saturate(1) contrast(1.2)' : 'saturate(0.9) contrast(1.1)',
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // duration-1000 equivalent
      />

      {/* Subtle overlay for luxury feel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 mix-blend-overlay"></div>
    </div>
  );
}
