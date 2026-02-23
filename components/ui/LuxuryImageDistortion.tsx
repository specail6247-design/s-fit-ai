"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = "" }: LuxuryImageDistortionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
        animate={isLoaded ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="size-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Subtle overlay for atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
    </div>
  );
}
