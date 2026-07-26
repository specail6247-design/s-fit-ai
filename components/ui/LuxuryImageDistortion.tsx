"use client";
import React from 'react';
export function LuxuryImageDistortion({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-1000 hover:opacity-100"></div>
    </div>
  );
}
