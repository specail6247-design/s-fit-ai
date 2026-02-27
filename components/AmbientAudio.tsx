'use client';

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function AmbientAudio() {
  const { isAudioMuted, toggleAudio } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        // Attempt to play, handling autoplay policies
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Autoplay prevented:', error);
            // If autoplay is prevented, we might want to update the store to reflect muted state
            // but for now, we'll just log it. A user interaction is required to start audio.
          });
        }
      }
    }
  }, [isAudioMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
        src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_07827291a1.mp3?filename=soft-ambient-pad-10878.mp3"
      />
      <button
        onClick={toggleAudio}
        className="fixed top-24 right-4 z-[40] flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all border border-white/10"
        aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
      >
        <span className="material-symbols-outlined text-lg">
          {isAudioMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </>
  );
}
