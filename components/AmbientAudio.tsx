'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function AmbientAudio() {
  const { isAudioMuted, toggleAudio } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        // Play might fail if user hasn't interacted with document yet
        audioRef.current.play().catch((err) => {
          console.log('Audio playback prevented by browser:', err);
          toggleAudio(); // Fallback to muted if browser blocks
        });
      }
    }
  }, [isAudioMuted, toggleAudio]);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/ambiences/humming_and_buzzing.ogg" // Placeholder subtle hum
        loop
        preload="auto"
      />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleAudio}
        className="fixed top-24 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors shadow-lg group"
        aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
      >
        <span className="material-symbols-outlined text-[18px]">
          {isAudioMuted ? 'volume_off' : 'volume_up'}
        </span>

        {/* Tooltip */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-[10px] font-bold tracking-widest uppercase text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {isAudioMuted ? 'Enable Ambience' : 'Mute Ambience'}
        </div>
      </motion.button>
    </>
  );
}
