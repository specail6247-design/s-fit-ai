'use client';

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function AmbientAudio() {
  const { isAudioMuted, setAudioMuted } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented. This is expected in many browsers until user interaction.
            setAudioMuted(true);
          });
        }
      }
    }
  }, [isAudioMuted, setAudioMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        // A tiny silent base64 mp3 to satisfy the requirement without throwing 404s
        src="data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
      />
      <button
        onClick={() => setAudioMuted(!isAudioMuted)}
        className="fixed top-24 right-4 z-40 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg"
        aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
      >
        <span className="material-symbols-outlined text-sm">
          {isAudioMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </>
  );
}
