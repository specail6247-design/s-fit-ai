"use client";

import React from "react";

// A dummy/basic distortion component since it wasn't found in the codebase.
export default function LuxuryImageDistortion({ src, alt }: { src: string, alt?: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || "Luxury Item"} className="w-full h-full object-cover" />
      {/* Overlay to simulate a distortion effect temporarily */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent mix-blend-overlay"></div>
    </div>
  );
}
