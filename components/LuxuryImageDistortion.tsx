'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
}

export default function LuxuryImageDistortion({ src, alt }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'contrast(1.1) brightness(1.05)' : 'contrast(1) brightness(1)'
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}
