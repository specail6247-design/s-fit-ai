'use client';

import React, { useState, useRef } from 'react';

interface HyperZoomProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function HyperZoom({ imageUrl, alt, className = '' }: HyperZoomProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    // DeltaY is usually around 100 for a scroll tick. 100 * 0.001 = 0.1 scale change.
    // Clamp between 1x and 8x
    const newScale = Math.min(Math.max(1, scale - e.deltaY * zoomSpeed), 8);

    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in active:cursor-grabbing select-none bg-black/5 ${className}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          transformOrigin: 'center center'
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-full object-contain pointer-events-none"
          draggable={false}
        />

        {/* Simulate micro-details (fabric weave) with CSS noise overlay at high zoom */}
        {scale > 3 && (
             <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-10"
                  style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                      backgroundSize: '64px 64px'
                  }}
             />
        )}
      </div>

      {/* HUD Controls */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button
            onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
            className="bg-black/40 hover:bg-black/60 text-white px-4 py-1.5 rounded-full text-[10px] backdrop-blur-md border border-white/10 transition-all uppercase tracking-[0.2em] font-bold"
        >
            Reset
        </button>
        <div className="bg-black/40 text-[#d4af37] px-4 py-1.5 rounded-full text-[10px] backdrop-blur-md border border-[#d4af37]/20 font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="material-symbols-outlined text-[12px]">zoom_in</span>
            {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
}
