import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface HyperZoomImageProps {
  src: string;
  alt: string;
}

export const HyperZoomImage: React.FC<HyperZoomImageProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    // Using direct DOM manipulation for performance as per memory rules
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    imageRef.current.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
    if (imageRef.current) {
        imageRef.current.style.transform = 'scale(2.5)';
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    if (imageRef.current) {
        imageRef.current.style.transform = 'scale(1)';
        imageRef.current.style.transformOrigin = 'center center';
    }
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      if(!isZooming) return;
      // Prevent default scrolling when zooming
      e.preventDefault();
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div className="absolute inset-0 transition-transform duration-300 ease-out" ref={imageRef}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Zoom indicator overlay */}
      <div
        className={`absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 transition-opacity duration-300 ${isZooming ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="material-symbols-outlined text-white text-sm">macro_auto</span>
        <span className="text-white text-[10px] font-bold tracking-widest uppercase">Micro-Fiber Reveal</span>
      </div>
    </div>
  );
};
