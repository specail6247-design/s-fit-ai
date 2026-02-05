'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SensoryAmbienceProps {
  isActive: boolean;
}

export const SensoryAmbience: React.FC<SensoryAmbienceProps> = ({ isActive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Audio Context and Noise
  useEffect(() => {
    if (!isActive || isMuted) {
      // Cleanup if not active or muted
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // Ignore if already stopped
        }
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      return;
    }

    const initAudio = () => {
      try {
        if (!audioContextRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Generate Pink Noise
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11; // (roughly) compensate for gain
          b6 = white * 0.115926;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.05; // Low volume for subtlety

        noiseSource.connect(gainNode);
        gainNode.connect(ctx.destination);

        noiseSource.start();

        sourceNodeRef.current = noiseSource;
        gainNodeRef.current = gainNode;
      } catch (error) {
        console.error("Audio initialization failed", error);
      }
    };

    // Initialize audio (might require user gesture first in some browsers,
    // but assuming context of existing app interaction, we try)
    if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume().then(initAudio);
    } else {
        initAudio();
    }

    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch { /* ignore */ }
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
    };
  }, [isActive, isMuted]);

  // Clean up context on unmount
  useEffect(() => {
      return () => {
          if (audioContextRef.current) {
              audioContextRef.current.close();
          }
      }
  }, []);

  if (!isActive) return null;

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="absolute bottom-4 right-16 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      )}
    </button>
  );
};
