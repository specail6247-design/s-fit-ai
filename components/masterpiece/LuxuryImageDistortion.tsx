'use client';
import React from 'react';

export function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string, alt: string }) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border-[0.5px] border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        title={alt}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
    </div>
  );
}
