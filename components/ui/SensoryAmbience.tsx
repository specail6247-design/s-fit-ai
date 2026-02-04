'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Extend the Window interface to include webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function SensoryAmbience({ active }: { active: boolean }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);

  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        const ctx = audioContextRef.current;
        // Fade out
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        setTimeout(() => {
             oscillatorRef.current?.stop();
             oscillator2Ref.current?.stop();
             oscillatorRef.current?.disconnect();
             oscillator2Ref.current?.disconnect();
             gainNodeRef.current?.disconnect();

             oscillatorRef.current = null;
             oscillator2Ref.current = null;
             gainNodeRef.current = null;
        }, 550);
      } catch {
        // Ignore cleanup errors
      }
    }
  }, []);

  useEffect(() => {
    if (active && !isMuted) {
      const initAudio = async () => {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;

            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContextClass();
            }

            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            // Master Gain
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2); // Fade in
            gainNode.connect(ctx.destination);
            gainNodeRef.current = gainNode;

            // Oscillator 1 (Drone Base)
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 (Deep drone)
            osc.connect(gainNode);
            osc.start();
            oscillatorRef.current = osc;

            // Oscillator 2 (Texture/Beat)
            const osc2 = ctx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(55.5, ctx.currentTime); // Slight detune for binaural beat effect

            const gain2 = ctx.createGain();
            gain2.gain.value = 0.5; // Mix level relative to master gain
            osc2.connect(gain2);
            gain2.connect(gainNode); // Connect to master gain
            osc2.start();
            oscillator2Ref.current = osc2;

        } catch (e) {
            console.warn("Audio init failed (likely autoplay policy)", e);
        }
      };

      initAudio();
    } else {
      stopAudio();
    }

    return () => {
        // Cleanup on unmount or prop change
        // We don't stop strictly here to allow crossfade, but simple stop for now
        stopAudio();
    };
  }, [active, isMuted, stopAudio]);

  if (!active) return null;

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-4 right-4 z-40 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/40 transition-all w-10 h-10 flex items-center justify-center"
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}
