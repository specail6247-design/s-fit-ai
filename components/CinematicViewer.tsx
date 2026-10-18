'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CinematicViewerProps {
  initialImageUrl: string | null;
  onClose: () => void;
}

export default function CinematicViewer({ initialImageUrl, onClose }: CinematicViewerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGenerateVideo = async () => {
    if (!initialImageUrl) return;

    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: initialImageUrl }),
      });

      const data = await res.json();

      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        throw new Error(data.error || 'Failed to generate cinematic video');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');

      // For demo purposes, we might want to set a fallback video here if actual generation fails,
      // but let's stick to showing the error for now as per instructions.
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen change events to update state
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-[#007AFF]/30 shadow-[0_0_50px_rgba(0,122,255,0.2)] w-[90%] max-w-[500px] flex flex-col items-center"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors z-40"
      >
        ✕
      </button>

      <div className="text-center mb-6 w-full">
        <h2 className="text-2xl font-black italic tracking-wider text-white">
          CINEMATIC <span className="text-[#007AFF]">MODE</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
          Hollywood-Grade Video Rendering
        </p>
      </div>

      <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-white/10">
        {!videoUrl && !isGenerating && initialImageUrl && (
          <img src={initialImageUrl} alt="Initial Try-on" className="w-full h-full object-contain opacity-50" />
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
             <div className="w-12 h-12 border-4 border-[#007AFF]/30 border-t-[#007AFF] rounded-full animate-spin mb-4"></div>
             <p className="text-[#007AFF] font-mono text-sm uppercase tracking-widest animate-pulse">Rendering Motion...</p>
             <p className="text-gray-500 text-xs mt-2 font-mono">ESTIMATED TIME: 1-2 MINS</p>
          </div>
        )}

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 p-4 text-center z-20">
            <p className="text-red-200 text-sm font-mono">{error}</p>
          </div>
        )}
      </div>

      {!videoUrl ? (
        <button
          onClick={handleGenerateVideo}
          disabled={isGenerating || !initialImageUrl}
          className="w-full py-4 bg-gradient-to-r from-[#005bb5] to-[#007AFF] hover:from-[#007AFF] hover:to-[#00aaff] text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          🎬 GENERATE CINEMATIC LOOKBOOK
        </button>
      ) : (
        <button
          onClick={toggleFullscreen}
          className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      )}
    </motion.div>
  );
}
