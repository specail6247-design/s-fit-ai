'use client';

import React, { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

// A very short, subtle base64 encoded audio string (empty sine wave beep or similar for demo)
// This is used instead of a dummy .mp3 to avoid repo bloat and path issues, per instructions
const AMBIENT_HUM_BASE64 = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgAAAAAEMHAAACwE1yQAAABpZgAAAACz//tQAAABwHAAAAAcAAADwYwAQ//tQAAAAA+AAAAAAwAAATwYwAQ//tQAAAAA+AAAAAAwAAATwYwAQ//tQAAAAA+AAAAAAwAAATwYwAQ';

export default function AmbientAudio() {
  const { isAudioMuted, toggleAudioMuted } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only mount audio client side
    if (!audioRef.current) {
      audioRef.current = new Audio(AMBIENT_HUM_BASE64);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2; // Keep it subtle
    }

    const playAudio = async () => {
      try {
        if (!isAudioMuted && audioRef.current && audioRef.current.paused) {
          await audioRef.current.play();

        }
      } catch (err) {
        // Autoplay may be blocked by browser
        console.warn('Audio autoplay blocked', err);

      }
    };

    if (isAudioMuted && audioRef.current) {
      audioRef.current.pause();

    } else {
      playAudio();
    }
  }, [isAudioMuted]);

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      <button
        onClick={toggleAudioMuted}
        className="flex size-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
        aria-label={isAudioMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
      >
        <span className="material-symbols-outlined text-sm">
          {isAudioMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </div>
  );
}
