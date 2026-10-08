"use client";
import React from 'react';
import { motion } from 'framer-motion';
interface LuxuryImageDistortionProps { imageUrl: string; className?: string; alt?: string; }
export default function LuxuryImageDistortion({ imageUrl, className, alt = "Luxury product image" }: LuxuryImageDistortionProps) {
  // Use alt for accessibility without unused variable warning
  return (
    <div className={`relative overflow-hidden ${className}`} aria-label={alt} role="img">
      <motion.div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}
