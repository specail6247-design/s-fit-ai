'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface HyperZoomProps {
  imageUrl: string;
  altText?: string;
  className?: string;
}

export default function HyperZoom({ imageUrl, altText = 'Product Image', className = '' }: HyperZoomProps) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair group ${className}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
        animate={{
          scale: zoom ? 2.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />

        {/* Micro-fiber texture overlay (simulated) only when zoomed */}
        {zoom && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
        )}
      </motion.div>

      {/* Zoom Indicator */}
      <div
        className={`absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono border border-white/20 transition-opacity duration-300 pointer-events-none ${zoom ? 'opacity-100' : 'opacity-0'}`}
      >
        HYPER-ZOOM ACTIVE [2.5x]
      </div>

      {!zoom && (
         <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white pointer-events-none">
            <span className="material-symbols-outlined text-sm">zoom_in</span>
         </div>
      )}
    </div>
  );
}
