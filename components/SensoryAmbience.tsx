'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export function SensoryAmbience() {
  const { isImmersiveMode } = useStore();
  const audioCtx = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const sourceNode = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Only init on client side
    if (typeof window === 'undefined') return;

    // Create Context if it doesn't exist
    if (!audioCtx.current) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
       if (AudioContextClass) {
          audioCtx.current = new AudioContextClass();
       }
    }

    const ctx = audioCtx.current;
    if (!ctx) return;

    // Create Gain Node if not exists
    if (!gainNode.current) {
        gainNode.current = ctx.createGain();
        gainNode.current.connect(ctx.destination);
        gainNode.current.gain.value = 0; // Start muted
    }

    // Create Source if not exists
    if (!sourceNode.current) {
        const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // Brown Noise Generation (approximate)
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5; // Gain compensation
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        // Lowpass Filter for softer "hum" sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200; // Low frequency hum

        source.connect(filter);
        filter.connect(gainNode.current);
        source.start();
        sourceNode.current = source;
    }

    // Handle State Change (Fade In / Fade Out)
    const gain = gainNode.current.gain;
    const now = ctx.currentTime;

    if (isImmersiveMode) {
        // Resume context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume().catch((err) => console.warn('Audio resume failed', err));
        }

        // Fade In
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(gain.value, now);
        gain.linearRampToValueAtTime(0.08, now + 2); // Target volume 0.08 (subtle)
    } else {
        // Fade Out
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(gain.value, now);
        gain.linearRampToValueAtTime(0, now + 1.5);
    }

    return () => {
       // Cleanup: Mute on unmount, but don't close context to avoid recreating overhead if remounted quickly
       // Unless we want to fully stop.
       if (gainNode.current) {
           gainNode.current.gain.cancelScheduledValues(ctx.currentTime);
           gainNode.current.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
       }
    };
  }, [isImmersiveMode]);

  return null; // This component has no visual output
}
