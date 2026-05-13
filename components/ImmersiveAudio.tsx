'use client';

import React, { useEffect, useRef, useState } from 'react';

export const ImmersiveAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(console.error);
    } else if (audioRef.current && isMuted) {
      audioRef.current.pause();
    }
  }, [isMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_c1e2d4090f.mp3?filename=ambient-space-noise-126294.mp3"
        loop
        className="hidden"
      />
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-20 z-50 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 shadow-lg"
        title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
      >
        <span className="material-symbols-outlined text-sm">
          {isMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </>
  );
};
