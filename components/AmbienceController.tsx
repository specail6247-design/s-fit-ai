'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AmbienceControllerProps {
  active: boolean;
}

export const AmbienceController: React.FC<AmbienceControllerProps> = ({ active }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize audio
    // Using a soft background hum/white noise
    const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e5/White_noise.ogg');
    audio.loop = true;
    audio.volume = 0.03; // Very subtle
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (active && !muted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .catch((error) => {
            console.warn("Auto-play prevented:", error);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [active, muted]);

  const toggleMute = () => {
    setMuted(!muted);
  };

  if (!active) return null;

  return (
    <div className="absolute top-4 left-[100px] z-20">
      <button
        onClick={toggleMute}
        className={`p-2 rounded-xl backdrop-blur-md border transition-all flex items-center gap-2 h-[42px] ${muted ? 'bg-black/40 border-white/10 text-gray-400' : 'bg-cyber-lime/10 border-cyber-lime/30 text-cyber-lime'}`}
        title="Toggle Ambient Sound"
      >
        <span className="text-sm">{muted ? '🔇' : '🔊'}</span>
        <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block w-full">
            {muted ? 'Silent' : 'Ambience'}
        </span>
      </button>
    </div>
  );
};
