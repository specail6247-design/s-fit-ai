"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface LuxuryImageDistortionProps {
  children: ReactNode;
  imageUrl?: string;
}

export default function LuxuryImageDistortion({ children, imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base content (often the background image) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: imageUrl ? `linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.6)), url('${imageUrl}')` : 'none',
        }}
        initial={{ scale: 1.05, filter: "contrast(1.1) brightness(0.9)" }}
        animate={{
          scale: [1.05, 1.0, 1.05],
          filter: ["contrast(1.1) brightness(0.9)", "contrast(1.0) brightness(1.0)", "contrast(1.1) brightness(0.9)"]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Vignette Overlay for luxury feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(10,10,10,0.8)_100%)] pointer-events-none" />
      {/* Noise/Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
