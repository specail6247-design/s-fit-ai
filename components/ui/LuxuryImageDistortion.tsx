import React from 'react';

export function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string, alt: string }) {
  return (
    <div className="w-full h-full relative group overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
    </div>
  );
}

export default LuxuryImageDistortion;
