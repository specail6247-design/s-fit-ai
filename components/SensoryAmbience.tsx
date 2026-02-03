'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SensoryAmbienceProps {
  active: boolean;
  volume?: number;
}

export function SensoryAmbience({ active, volume = 0.15 }: SensoryAmbienceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef(false);

  // Initialize Audio Context and Nodes
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0; // Start silent
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      return () => {
        if (noiseNodeRef.current) {
          noiseNodeRef.current.stop();
        }
        ctx.close();
      };
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }, []);

  // Handle Play/Stop based on active state and mute state
  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    const targetVolume = isMuted ? 0 : volume;

    if (active && !isMuted) {
      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!isPlayingRef.current) {
        // Create Brown Noise Buffer
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Compensate for gain loss
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noise.connect(gainNode);
        noise.start(0);
        noiseNodeRef.current = noise;
        isPlayingRef.current = true;
      }

      // Fade in
      gainNode.gain.setTargetAtTime(targetVolume, ctx.currentTime, 2);
    } else {
      // Fade out
      gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.5);

      // Stop logic is handled by fade out effectively, but we can stop the node to save CPU if inactive for long
      // For now, keeping it running but silent is smoother for toggling
      if (!active && isPlayingRef.current) {
          setTimeout(() => {
              if (!active && isPlayingRef.current && noiseNodeRef.current) {
                  noiseNodeRef.current.stop();
                  noiseNodeRef.current = null;
                  isPlayingRef.current = false;
              }
          }, 600); // Stop after fade out
      }
    }
  }, [active, isMuted, volume]);

  if (!active) return null;

  return (
    <div className="absolute top-4 right-16 z-50">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => setIsMuted(!isMuted)}
        className={`p-2 rounded-full backdrop-blur-md border transition-all ${
          isMuted
            ? 'bg-black/30 text-gray-400 border-gray-600'
            : 'bg-cyber-lime/10 text-cyber-lime border-cyber-lime/50 shadow-[0_0_10px_rgba(204,255,0,0.2)]'
        }`}
        title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0a7 7 0 0 1 0 2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        ) : (
          <div className="flex items-center gap-1 h-4">
             <span className="sr-only">Playing</span>
             <motion.div animate={{ height: [4, 12, 6, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-cyber-lime rounded-full" />
             <motion.div animate={{ height: [8, 4, 16, 6, 10] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-0.5 bg-cyber-lime rounded-full" />
             <motion.div animate={{ height: [6, 14, 4, 10, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-cyber-lime rounded-full" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
