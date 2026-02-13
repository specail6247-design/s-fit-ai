'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({ src, alt, className = '' }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();

    // Calculate percentage position
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      className={`relative overflow-hidden cursor-crosshair group ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-100 ease-out"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
        }}
      />

      {/* Visual Hint Overlay */}
      <AnimatePresence>
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10"
          >
            <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
              Hyper-Zoom Active
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Micro-Texture Detail Overlay (Simulated) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute top-4 left-4 pointer-events-none"
          >
             <div className="bg-black/80 backdrop-blur-xl px-3 py-2 rounded-lg border border-[#007AFF]/30 shadow-lg">
                <div className="flex flex-col">
                   <span className="text-[9px] text-[#007AFF] font-mono mb-1">TEXTURE ANALYSIS</span>
                   <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                      <span className="text-[10px] text-white font-bold">HIGH FIDELITY</span>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
