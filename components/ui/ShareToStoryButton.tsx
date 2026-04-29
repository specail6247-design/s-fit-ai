'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ShareToStoryButton({ imageUrl }: { imageUrl: string }) {
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    // Simulate generating vertical branded image & sharing process
    setTimeout(() => {
      setIsSharing(false);
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }, 1500);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing || shared}
      className={`absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow-lg backdrop-blur-md transition-colors ${
        shared
          ? 'bg-green-500/80 text-white border border-green-400'
          : 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white border border-white/30 hover:border-white'
      }`}
    >
      {isSharing ? (
        <>
          <span className="animate-spin text-sm">↻</span> Preparing Story...
        </>
      ) : shared ? (
        <>
          <span className="text-sm">✓</span> Shared!
        </>
      ) : (
        <>
          <span className="text-sm">📸</span> Share to Story
        </>
      )}
    </motion.button>
  );
}
