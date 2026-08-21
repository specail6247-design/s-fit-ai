"use client";

import React, { useRef, useEffect } from 'react';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = "", alt = "" }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (x / rect.width) * 15; // Max rotation degrees
      targetY = (y / rect.height) * 15;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      image.style.transform = `perspective(1000px) rotateX(${-currentY}deg) rotateY(${currentX}deg) scale3d(1.05, 1.05, 1.05)`;

      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    animate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={imageRef}
        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out will-change-transform"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transformStyle: 'preserve-3d'
        }}
        aria-label={alt}
        role="img"
      >
        {/* Subtle overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </div>
  );
}
