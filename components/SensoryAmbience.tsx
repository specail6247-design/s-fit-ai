'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

interface SensoryAmbienceProps {
  isMasterpieceMode: boolean;
}

// Extend Window interface to include webkitAudioContext
interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export function SensoryAmbience({ isMasterpieceMode }: SensoryAmbienceProps) {
  const { isAudioEnabled } = useStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const isPlayingRef = useRef(false);

  const startAudio = () => {
    if (isPlayingRef.current) return;

    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as WindowWithWebkitAudio).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        } else {
            console.warn("Web Audio API not supported");
            return;
        }
      }

      const ctx = audioContextRef.current;

      // Create Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime); // Start at 0
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create Drone Oscillator (Low Sine)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz Low Drone

      // Create LFO for subtle modulation
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // Slow modulation

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(20, ctx.currentTime); // Modulate by +/- 20Hz

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(masterGain);

      // Start Oscillators
      osc.start();
      lfo.start();

      oscillatorRef.current = osc;
      lfoRef.current = lfo;
      isPlayingRef.current = true;

    } catch (e) {
      console.error("Audio Context Init Failed", e);
    }
  };

  const fadeIn = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current.gain;

    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Cancel scheduled ramps and ramp up
    gain.cancelScheduledValues(ctx.currentTime);
    gain.setTargetAtTime(0.05, ctx.currentTime, 2); // Target low volume (0.05) over 2s
  };

  const fadeOut = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current.gain;

    // Ramp down to 0
    gain.cancelScheduledValues(ctx.currentTime);
    gain.setTargetAtTime(0, ctx.currentTime, 1); // Fade out over 1s

    // Stop oscillators after fade out (optional optimization, but keeping them running at 0 gain is smoother for toggling)
    // For now we keep them running but silent.
  };

  useEffect(() => {
    // Initialize Audio Context on mount (but don't start until interaction/needed)
    // Note: Browsers require user interaction to start AudioContext.
    // We assume the user has already interacted with the page by the time they reach this component.
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const shouldPlay = isMasterpieceMode && isAudioEnabled;

    if (shouldPlay) {
      startAudio();
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isMasterpieceMode, isAudioEnabled]);

  return null; // No visual UI, just audio logic
}
