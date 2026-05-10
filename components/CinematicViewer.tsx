'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicViewerProps {
  videoUrl: string | null;
  imageUrl: string | null;
  onClose: () => void;
}

export default function CinematicViewer({ videoUrl, imageUrl, onClose }: CinematicViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
      >
        <div
          ref={containerRef}
          className={`relative flex flex-col items-center justify-center w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${isFullscreen ? 'h-screen max-w-none rounded-none border-none' : 'aspect-[9/16] max-h-[85vh]'}`}
        >
          {/* Header Controls (Hidden in Fullscreen) */}
          {!isFullscreen && (
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-white text-xs font-mono tracking-widest font-bold">CINEMATIC TRY-ON</span>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}

          {/* Media Content */}
          <div className="relative w-full h-full flex items-center justify-center bg-zinc-900 overflow-hidden group">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                autoPlay
                loop
                muted
                playsInline
                crossOrigin="anonymous"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Try-on Result"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            ) : (
                <div className="text-white/50 font-mono text-sm">No media available</div>
            )}

            {/* Overlay Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {videoUrl && (
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                  >
                    {isPlaying ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    )}
                  </button>
               )}

               <div className="flex gap-3">
                  <button
                     onClick={toggleFullscreen}
                     className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                     {isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}
                  </button>
                  <a
                     href={videoUrl || imageUrl || '#'}
                     download="s-fit-cinematic.mp4"
                     target="_blank"
                     rel="noreferrer"
                     className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                     SAVE
                  </a>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
