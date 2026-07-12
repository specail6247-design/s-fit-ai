import React from 'react';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt = 'Luxury Image' }: LuxuryImageDistortionProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
      />
    </div>
  );
}
