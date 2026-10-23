"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export function LuxuryImageDistortion({ src, alt, className = '' }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered
            ? 'saturate(1) contrast(1.2)'
            : 'saturate(0.9) contrast(1.1)',
        }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label={alt}
        role="img"
      />

      {/* Luxury glow effect overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* Distortion "scanline" or shine effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '200%', opacity: 0.3 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent h-1/3 mix-blend-soft-light"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
