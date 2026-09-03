import React from 'react';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  return (
    <div className={className}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})`, filter: 'contrast(1.1) saturate(1.2)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
    </div>
  );
}
