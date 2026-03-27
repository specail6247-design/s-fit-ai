'use client';

import { useState, useEffect, useRef } from 'react';

export function useSensoryAmbience() {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // Create oscillator for the hum (low frequency)
    const osc = ctx.createOscillator();
    osc.type = 'sine'; // Smooth, subtle hum
    osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz (low A)

    // Create gain node for volume control
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime); // Start muted

    // Connect nodes
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Start oscillator
    osc.start();

    oscillatorRef.current = osc;
    gainNodeRef.current = gain;

    return () => {
      osc.stop();
      osc.disconnect();
      gain.disconnect();
      if (ctx.state !== 'closed') {
        ctx.close();
      }
    };
  }, []);

  useEffect(() => {
    const gainNode = gainNodeRef.current;
    const ctx = audioContextRef.current;
    if (gainNode && ctx) {
      if (isMuted) {
        // Fade out
        gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      } else {
        // Fade in (subtle volume)
        // Ensure context is resumed if it was suspended (browser policy)
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        gainNode.gain.setTargetAtTime(0.05, ctx.currentTime, 0.5);
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return { isMuted, toggleMute };
}
