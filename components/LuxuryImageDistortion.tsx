"use client";
import React from "react";
import { motion } from "framer-motion";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = "" }: LuxuryImageDistortionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
        style={{ filter: "saturate(0.9) contrast(1.1)" }}
      />
    </motion.div>
  );
}
