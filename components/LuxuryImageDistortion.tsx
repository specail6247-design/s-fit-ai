'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  imageUrl: string;
}

export default function LuxuryImageDistortion({ imageUrl }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden rounded-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? 'contrast(1.2) saturate(1.2)' : 'contrast(1) saturate(1)'
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Distortion Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          background: isHovered ? 'linear-gradient(45deg, rgba(212,175,55,0.2) 0%, transparent 100%)' : 'transparent'
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
