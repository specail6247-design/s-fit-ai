import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CinematicViewerProps {
  videoUrl: string;
  onClose: () => void;
}

export default function CinematicViewer({ videoUrl, onClose }: CinematicViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-500
        ${isFullscreen ? 'inset-0' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 shadow-2xl'}`}
    >
      <div className={`relative group flex items-center justify-center ${isFullscreen ? 'w-full h-full' : 'w-auto h-[70vh]'}`}>
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className={`rounded-xl object-contain shadow-2xl ${isFullscreen ? 'w-full h-full' : 'w-auto h-full'}`}
        />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-black/60 text-white rounded-full px-4 py-2 hover:bg-[#007AFF] transition-colors font-bold text-sm border border-white/10"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Cinematic Mode'}
          </button>
          <button
            onClick={onClose}
            className="bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#007AFF] transition-colors border border-white/10"
          >
            ✕
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
          HOLLYWOOD AI_
        </div>
      </div>
    </motion.div>
  );
}
