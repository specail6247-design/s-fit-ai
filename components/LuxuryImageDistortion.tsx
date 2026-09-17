"use client";
import React from 'react';

export default function LuxuryImageDistortion({ src, alt }: { src: string, alt?: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-[1.03] opacity-90 saturate-[0.9] contrast-[1.1]"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* Vignette effect for luxury feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.4)_100%)] mix-blend-multiply" />
      {/* Light sweep effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />
    </div>
  );
}
