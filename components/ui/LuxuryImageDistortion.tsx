"use client";

import { motion } from "framer-motion";
import React from "react";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
       {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(212, 175, 55, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(212, 175, 55, 0.3) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        initial={{ scale: 1.0, filter: "grayscale(10%) contrast(1.05)" }}
        whileHover={{
            scale: 1.05,
            filter: "grayscale(0%) contrast(1.1)",
            transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] }
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Vignette / Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
            background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.3) 100%)"
        }}
       />

       {/* Border Effect */}
       <div className="absolute inset-0 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-700 pointer-events-none" />
    </div>
  );
}
