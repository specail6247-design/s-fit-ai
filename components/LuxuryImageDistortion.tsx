"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function LuxuryImageDistortion({ src, alt, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          transform: isHovered
            ? `scale(1.05) translate(${position.x * 20}px, ${position.y * 20}px)`
            : 'scale(1) translate(0px, 0px)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Luxury overlay effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${(position.x + 0.5) * 100}% ${(position.y + 0.5) * 100}%, rgba(236,171,19,0.15) 0%, transparent 60%)`
            : 'transparent'
        }}
      />
    </div>
  );
}
