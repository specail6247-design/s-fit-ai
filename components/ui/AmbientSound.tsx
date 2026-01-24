import React, { useEffect, useRef } from 'react';

interface AmbientSoundProps {
  active: boolean;
  muted: boolean;
}

export default function AmbientSound({ active, muted }: AmbientSoundProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Browser policy: AudioContext might start suspended.
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Create oscillator (Low frequency sine for "luxury hum")
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz (Low A)

      // Create another oscillator for texture (slightly detuned)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(57, ctx.currentTime);

      // Create gain node for volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime); // Start silent

      // Connect nodes
      osc.connect(masterGain);
      osc2.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Start oscillators
      osc.start();
      osc2.start();

      oscillatorRef.current = osc; // Store one ref for cleanup, though we should cleanup both really.
      // Ideally we store all nodes but for this simple drone, closing context is enough.
      gainNodeRef.current = masterGain;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current.gain;
    const currentTime = ctx.currentTime;

    if (active && !muted) {
      // Resume if suspended (user interaction usually required before this)
      if (ctx.state === 'suspended') {
        ctx.resume().catch((e) => console.warn('AudioContext resume failed:', e));
      }
      // Fade in
      gain.cancelScheduledValues(currentTime);
      gain.setTargetAtTime(0.03, currentTime, 2); // Very subtle volume
    } else {
      // Fade out
      gain.cancelScheduledValues(currentTime);
      gain.setTargetAtTime(0, currentTime, 0.5);
    }
  }, [active, muted]);

  return null;
}
