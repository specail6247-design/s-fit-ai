'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function SensoryAmbience() {
  const { isAmbienceOn } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const AMBIENT_URL = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2995977926.mp3?filename=deep-ambient-11050.mp3';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (isAmbienceOn) {
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          fadeIntervalRef.current = setInterval(() => {
            if (audio.volume < 0.3) {
                audio.volume = Math.min(0.3, audio.volume + 0.02);
            } else {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 50);
        }).catch(error => {
          console.error("Audio playback prevented:", error);
        });
      }
    } else {
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
            audio.pause();
            audio.currentTime = 0;
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 50);
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isAmbienceOn]);

  return (
    <audio
      ref={audioRef}
      src={AMBIENT_URL}
      loop
      crossOrigin="anonymous"
      preload="auto"
    />
  );
}
