"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export default function LuxuryImageDistortion({
  src,
  alt,
  className = '',
  intensity = 15,
}: LuxuryImageDistortionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse position relative to center of element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity]);

  // Calculate subtle scale and displacement
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig);
  const z = useSpring(isHovered ? 20 : 0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Add preload effect for image
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${src}")` }}
          aria-label={alt}
        />

        {/* Subtle glass reflection effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)',
            backgroundSize: '200% 200%',
            opacity: isHovered ? 1 : 0,
            backgroundPosition: useTransform(smoothX, [-0.5, 0.5], ['0% 0%', '100% 100%']),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shadow that moves opposite to light */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-black/40 blur-xl"
          style={{
            x: useTransform(smoothX, [-0.5, 0.5], [-20, 20]),
            y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]),
            opacity: isHovered ? 0.6 : 0,
          }}
        />
      </motion.div>
    </div>
  );
}
