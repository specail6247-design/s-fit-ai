'use client';

import React, { useEffect, useRef } from 'react';

interface AmbienceAudioProps {
  active: boolean;
  muted: boolean;
}

// Deep Space Hum / Soft Ambience
const AMBIENT_URL = "https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3";

export function AmbienceAudio({ active, muted }: AmbienceAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (active && !muted) {
      // Start low and fade in
      audioRef.current.volume = 0;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
          playPromise.catch(error => {
              console.warn("Audio autoplay blocked by browser policy", error);
          });
      }

      // Simple Fade In
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.3) { // Max volume 0.3
          audioRef.current.volume = Math.min(audioRef.current.volume + 0.02, 0.3);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);

      return () => clearInterval(fadeIn);

    } else {
      // Fade Out before pause could be nice, but instant pause is responsive.
      audioRef.current.pause();
    }
  }, [active, muted]);

  return (
    <audio
      ref={audioRef}
      src={AMBIENT_URL}
      loop
      preload="auto"
      className="hidden"
    />
  );
}
