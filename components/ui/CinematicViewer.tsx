'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CinematicViewerProps {
  videoUrl: string;
  posterUrl?: string;
  className?: string;
}

export default function CinematicViewer({ videoUrl, posterUrl, className = '' }: CinematicViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const downloadVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `sfit-cinematic-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle Fullscreen Change Events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-play when ready
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn("Autoplay prevented:", e);
          setIsPlaying(false);
        });
    }
  }, [videoUrl]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative group overflow-hidden rounded-xl bg-black shadow-2xl aspect-[9/16] max-w-md mx-auto ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted // Muted needed for autoplay usually
        onClick={togglePlay}
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-60" />

      {/* Controls Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered || !isPlaying ? 1 : 0, y: isHovered || !isPlaying ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={togglePlay}
          className="text-white hover:text-white/80 transition-colors p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            // Pause Icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>
          ) : (
            // Play Icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M5 3.86967C5 2.54013 6.47645 1.74233 7.59253 2.46876L20.0925 10.6031C21.1398 11.2848 21.1398 12.8093 20.0925 13.4909L7.59253 21.6253C6.47645 22.3517 5 21.5539 5 20.2244V3.86967Z"/></svg>
          )}
        </button>

        <div className="flex items-center gap-2">
            <button
              onClick={downloadVideo}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-white border border-white/20 transition-all"
              title="Download 4K Clip"
            >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-bold tracking-wide transition-all shadow-lg transform hover:scale-105"
            >
              {isFullscreen ? (
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
              ) : (
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              )}
              <span>CINEMATIC MODE</span>
            </button>
        </div>
      </motion.div>

      {/* Film Grain / Aesthetic Overlay (Optional) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </motion.div>
  );
}
