import React, { useEffect, useRef } from 'react';

// A soft white noise base64 snippet to represent the "hum"
// Since we don't have a real audio file, this is a tiny valid WAV header with silence
// In a real app, this would be a proper background loop file URL
const silentHumBase64 = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

interface SensoryAmbienceProps {
  isPlaying: boolean;
  volume?: number;
}

export function SensoryAmbience({ isPlaying, volume = 0.2 }: SensoryAmbienceProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Audio play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  return (
    <audio
      ref={audioRef}
      src={silentHumBase64}
      loop
      preload="auto"
    />
  );
}
