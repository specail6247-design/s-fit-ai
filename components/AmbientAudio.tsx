'use client';

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function AmbientAudio() {
  const { isAudioMuted, setIsAudioMuted } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt to play on mount, handles browser auto-play policies
    const playAudio = async () => {
      if (audioRef.current && !isAudioMuted) {
        try {
          audioRef.current.volume = 0.3; // Keep it subtle
          await audioRef.current.play();
        } catch (_error) {
          console.log('Autoplay prevented by browser. User interaction needed.');
        }
      }
    };

    playAudio();
  }, [isAudioMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isAudioMuted]);

  const toggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/audio/ambient-hum.mp3" // Ensure this file exists or use a generic data URI if needed, but a standard path is better
        preload="auto"
      />
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleMute}
          className="group flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
        >
          <AnimatePresence mode="wait">
            {isAudioMuted ? (
              <motion.span
                key="muted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                volume_off
              </motion.span>
            ) : (
              <motion.span
                key="unmuted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                volume_up
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
