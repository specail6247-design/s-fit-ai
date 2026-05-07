"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt, className = '' }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
    >
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          title={alt}
        />
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
      </motion.div>
    </div>
  );
}
