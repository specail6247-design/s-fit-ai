'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store/useStore';

export default function AmbientAudio() {
  const isAudioMuted = useStore((state) => state.isAudioMuted);
  const toggleAudio = useStore((state) => state.toggleAudio);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Subtle background volume

      if (isAudioMuted) {
        audioRef.current.pause();
      } else {
        // Only try to play if not muted
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playing successfully
            })
            .catch((error) => {
              console.log("Audio autoplay prevented. Waiting for user interaction.", error);
              // If autoplay is blocked, we might want to ensure the UI reflects muted state initially
              // or just let the user toggle it manually.
            });
        }
      }
    }
  }, [isAudioMuted]);

  // Handle initial user interaction to unlock audio context if needed
  useEffect(() => {
    const unlockAudio = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // If unmuted by default, try playing on first click anywhere
        if (!isAudioMuted && audioRef.current) {
             audioRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, [hasInteracted, isAudioMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        // Placeholder: Soft Ambient Synth (Public Domain/CC0)
        src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_1067e63b6a.mp3"
        className="hidden"
      />

      {/* Floating Audio Control */}
      <button
        onClick={toggleAudio}
        className="fixed top-24 right-4 z-[40] flex items-center justify-center w-8 h-8 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 group"
        aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
      >
        {isAudioMuted ? (
          <span className="material-symbols-outlined text-[20px] opacity-70 group-hover:opacity-100">volume_off</span>
        ) : (
          <span className="material-symbols-outlined text-[20px] opacity-70 group-hover:opacity-100 animate-pulse">volume_up</span>
        )}
      </button>
    </>
  );
}
