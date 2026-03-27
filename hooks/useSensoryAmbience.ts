import { useState, useEffect, useRef } from 'react';

export function useSensoryAmbience() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Only initialize and play if NOT muted
    if (!isMuted) {
      if (!audioCtxRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(55, ctx.currentTime); // Low frequency hum

        gainNode.gain.setValueAtTime(0, ctx.currentTime); // Start silent

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();

        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;
      }

      // Resume context if suspended
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Fade in
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 0.5);
      }
    } else {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return { isMuted, toggleMute };
}
