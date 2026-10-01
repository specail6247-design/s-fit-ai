import React, { useRef } from 'react';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = "" }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Luxury Garment"
        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
      />
    </div>
  );
}
