'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const toggleSound = async () => {
    if (isPlaying) {
      // Fade out and stop
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
          }
          if (lfoRef.current) {
             lfoRef.current.stop();
             lfoRef.current.disconnect();
             lfoRef.current = null;
          }
          setIsPlaying(false);
        }, 500);
      }
    } else {
      // Start
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
        }

        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        // 1. Drone Oscillator (Soft Sine/Triangle hybrid feel via Sine)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, ctx.currentTime); // Deep drone (60Hz ~ B1)

        // 2. LFO for subtle pitch modulation (Drift)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 0.1Hz = 10s cycle
        lfoGain.gain.setValueAtTime(2, ctx.currentTime); // +/- 2Hz drift

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        // 3. Connect Graph
        osc.connect(gain);
        gain.connect(ctx.destination);

        // 4. Start
        const now = ctx.currentTime;
        lfo.start(now);
        osc.start(now);

        // 5. Fade In
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 2); // Very subtle (3% volume)

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        lfoRef.current = lfo;
        setIsPlaying(true);
      } catch (e) {
        console.error("Audio init failed:", e);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) oscillatorRef.current.stop();
      if (lfoRef.current) lfoRef.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-full border transition-all flex items-center gap-2 backdrop-blur-md ${
        isPlaying
          ? 'bg-cyber-lime/10 border-cyber-lime text-cyber-lime shadow-[0_0_10px_rgba(204,253,50,0.2)]'
          : 'bg-black/40 border-white/10 text-soft-gray hover:text-white'
      }`}
      title={isPlaying ? "Mute Ambience" : "Enable Immersive Sound"}
    >
      <span>{isPlaying ? '🔊' : '🔇'}</span>
      <span className="text-[10px] uppercase font-bold hidden sm:inline">{isPlaying ? 'Ambience On' : 'Ambience'}</span>
    </button>
  );
}
