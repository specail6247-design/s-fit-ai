'use client';

import { useEffect, useRef, useState } from 'react';

export default function SensoryAmbience({ active }: { active: boolean }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAudio = () => {
    if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch {}
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
    }
    if (noiseNodeRef.current) {
        try { noiseNodeRef.current.stop(); } catch {}
        noiseNodeRef.current.disconnect();
        noiseNodeRef.current = null;
    }
    if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  };

  const startAudio = () => {
    if (audioContextRef.current) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextCtor) return;

      const ctx = new AudioContextCtor();
      audioContextRef.current = ctx;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.03; // Very subtle volume
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // 1. Low Frequency Drone (Sine wave)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A note
      osc.connect(gainNode);
      osc.start();
      oscillatorRef.current = osc;

      // 2. Filtered Noise (Atmosphere)
      const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Simple white noise generation
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300; // Low pass filter for "muffled" room tone

      noise.connect(filter);
      filter.connect(gainNode);
      noise.start();
      noiseNodeRef.current = noise;

    } catch (e) {
      console.error("Sensory Ambience init failed", e);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (active && !isMuted) {
      startAudio();
    } else {
      stopAudio();
    }
  }, [active, isMuted]);

  if (!active) return null;

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-24 right-4 z-40 p-2.5 rounded-full bg-void-black/60 border border-white/10 backdrop-blur-md text-white/70 hover:text-cyber-lime hover:border-cyber-lime/50 transition-all shadow-lg"
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
      aria-label="Toggle Sensory Ambience"
    >
      <span className="text-lg flex items-center justify-center w-5 h-5">
        {isMuted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}
