'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export default function SensoryAmbience() {
  const { isAudioEnabled } = useStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        audioContextRef.current = new AudioContextClass();
        const ctx = audioContextRef.current;

        // Generate Brown Noise Buffer
        const bufferSize = ctx.sampleRate * 2; // 2 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          data[i] = lastOut * 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Lowpass Filter for "muffled/ambient" sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400; // Low rumble

        const gain = ctx.createGain();
        gain.gain.value = 0; // Start muted

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();

        sourceNodeRef.current = noise;
        gainNodeRef.current = gain;
      }
    };

    if (isAudioEnabled) {
      initAudio();
      if (audioContextRef.current && gainNodeRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume().catch(() => {
            // Context might still be suspended if no user interaction
          });
        }
        // Fade in
        gainNodeRef.current.gain.setTargetAtTime(0.03, audioContextRef.current.currentTime, 1);
      }
    } else {
      // Fade out
      if (audioContextRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
      }
    }

    return () => {
      // Cleanup audio context when component unmounts to prevent sound leak
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
    };
  }, [isAudioEnabled]);

  return null;
}
