"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LuxuryImageDistortion({ imageUrl, alt = "Luxury Item", className = "" }: { imageUrl: string, alt?: string, className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        aria-label={alt}
      />
    </div>
  );
}
