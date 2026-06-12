"use client";
import React, { useRef, useEffect } from "react";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic placeholder for luxury distortion effect.
    // In a full implementation, this might use Three.js / WebGL for water-like distortion.
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
}
