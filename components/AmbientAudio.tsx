"use client";

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function AmbientAudio() {
  const isAudioMuted = useStore((state) => state.isAudioMuted);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Placeholder URL for ambient luxury sound (Soft Synth Drone)
  const AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio autoplay prevented:", error);
          });
        }
      }
    }
  }, [isAudioMuted]);

  useEffect(() => {
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low volume for background
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src={AUDIO_URL}
      loop
      preload="auto"
    />
  );
}
