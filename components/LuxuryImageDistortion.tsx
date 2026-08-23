"use client";

import React, { useRef, useEffect } from 'react';

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add distortion/glitch overlay effect
    if (!containerRef.current) return;
  }, [imageUrl]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
    </div>
  );
}
