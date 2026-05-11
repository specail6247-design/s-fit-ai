"use client";

import React, { useRef, useEffect } from 'react';

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Basic implementation for now to prevent breaking,
      // a full WebGL or sophisticated canvas distortion can be added later
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add a luxury gold overlay/glow effect
      ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={600}
      className="w-full h-full object-cover rounded-xl duration-1000 ease-in-out transition-all hover:scale-105"
      style={{ boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)' }}
    />
  );
}
