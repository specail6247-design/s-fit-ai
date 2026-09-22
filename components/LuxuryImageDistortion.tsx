import React from 'react';

export default function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string, alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden group rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 saturate-[0.9] contrast-[1.1]"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
    </div>
  );
}
