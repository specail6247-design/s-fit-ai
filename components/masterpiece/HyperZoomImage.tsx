import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface HyperZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  zoomScale?: number;
  highResSrc?: string;
}

export function HyperZoomImage({
  src,
  alt,
  className = '',
  zoomScale = 2.5,
  highResSrc
}: HyperZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    // Calculate percentage position
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in group ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-transform duration-200 ease-out ${isZoomed && highResSrc ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isZoomed && !highResSrc ? `scale(${zoomScale})` : 'scale(1)',
        }}
        priority // Luxury items should load fast
      />

      {/* High Res Layer (if provided) */}
      {highResSrc && (
        <div
            className="absolute inset-0 bg-no-repeat bg-cover transition-opacity duration-300 pointer-events-none"
            style={{
                backgroundImage: `url('${highResSrc}')`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundSize: `${zoomScale * 100}%`,
                opacity: isZoomed ? 1 : 0
            }}
        />
      )}

      {/* Zoom Indicator Hint */}
      <div className={`absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded opacity-0 transition-opacity duration-300 ${!isZoomed ? 'group-hover:opacity-100' : ''}`}>
        HOVER TO ZOOM
      </div>
    </div>
  );
}
