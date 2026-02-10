'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export function SensoryAmbience() {
  const { isAudioEnabled } = useStore();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isAudioEnabled) {
      if (audioContextRef.current) {
        // Fade out before closing
        if (audioContextRef.current.state === 'running') {
             audioContextRef.current.close().catch(() => {});
        }
        audioContextRef.current = null;
      }
      return;
    }

    const initAudio = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Resume if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
          ctx.resume().catch((e) => console.warn('AudioContext resume failed:', e));
        }

        // Generate Pink Noise Buffer (5 seconds loop)
        const duration = 5.0;
        const sampleRate = ctx.sampleRate;
        const frames = sampleRate * duration;
        const buffer = ctx.createBuffer(1, frames, sampleRate);
        const data = buffer.getChannelData(0);

        // Pink Noise Algorithm (Paul Kellett's refined method)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < frames; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            data[i] *= 0.11; // Normalize roughly
            b6 = white * 0.115926;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        // Lowpass filter for "Ambience" (darker, softer sound)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200; // Deep rumble

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime); // Start silent
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2); // Fade in over 2s

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start();

      } catch (e) {
        console.error("Audio init failed", e);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, [isAudioEnabled]);

  return null;
}
