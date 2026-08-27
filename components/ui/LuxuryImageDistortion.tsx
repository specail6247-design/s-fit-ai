"use client";
import React, { ReactNode } from "react";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  children?: ReactNode;
}

export default function LuxuryImageDistortion({ imageUrl, children }: LuxuryImageDistortionProps) {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 transition-opacity duration-1000 group-hover:opacity-80"></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-4">
        {children}
      </div>
    </div>
  );
}
