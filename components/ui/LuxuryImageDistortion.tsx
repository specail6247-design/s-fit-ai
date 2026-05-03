import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ src, alt, className = '' }: LuxuryImageDistortionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Base Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:brightness-110"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Glare/Reflection Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}
