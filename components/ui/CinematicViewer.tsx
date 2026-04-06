import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CinematicViewerProps {
  videoUrl: string;
  posterUrl?: string;
  className?: string;
}

export default function CinematicViewer({ videoUrl, posterUrl, className = "" }: CinematicViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Auto-play prevented:', err));
    }
  }, [videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`relative w-full h-full overflow-hidden bg-black flex items-center justify-center rounded-lg ${className}`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover saturate-[0.9] contrast-[1.1]"
      />

      {/* Cinematic letterboxing effect overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
        <div className="h-12 bg-black/40 backdrop-blur-sm" />
        <div className="h-12 bg-black/40 backdrop-blur-sm" />
      </div>
    </motion.div>
  );
}