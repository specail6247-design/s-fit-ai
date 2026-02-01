'use client';

import React, { useEffect, useRef, useState } from 'react';

export function SensoryAmbience() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const initAudio = () => {
        if (audioContextRef.current) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Generate Brown Noise
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.03; // Subtle background hum
        gainNodeRef.current = gainNode;

        noise.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(0);
    };

    // Initialize on first click if not already
    const handleInteraction = () => {
        setHasInteracted(true);
        if (!audioContextRef.current) {
            initAudio();
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    window.addEventListener('click', handleInteraction, { once: true });

    // Attempt auto-start (will likely fail until interaction, but worth trying for non-strict browsers)
    // initAudio();

    return () => {
        window.removeEventListener('click', handleInteraction);
        audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
        // Smooth fade
        gainNodeRef.current.gain.setTargetAtTime(isMuted ? 0 : 0.03, audioContextRef.current.currentTime, 0.5);
    }
  }, [isMuted]);

  if (!hasInteracted && !audioContextRef.current) return null;

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-20 left-4 z-40 p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/50 hover:text-white backdrop-blur-md border border-white/5 transition-all flex items-center justify-center group"
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
    >
       <span className="material-symbols-outlined text-sm">
         {isMuted ? 'volume_off' : 'graphic_eq'}
       </span>
       {!isMuted && (
         <span className="absolute left-full ml-2 text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white/50">
           Sensory Ambience
         </span>
       )}
    </button>
  );
}
