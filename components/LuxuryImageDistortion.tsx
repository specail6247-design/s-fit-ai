import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt, className = '' }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for distortion effect
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform values for background position (parallax)
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-5%', '5%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-5%', '5%']);

  // Transform values for subtle scale/perspective
  const scale = useTransform(smoothX, [-0.5, 0.5], [1.02, 1.05]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          x: bgX,
          y: bgY,
          scale: scale,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        data-alt={alt}
      />
      {/* Luxury lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}
