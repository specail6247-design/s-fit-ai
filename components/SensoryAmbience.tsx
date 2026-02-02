'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function SensoryAmbience() {
  const { selectedMode } = useStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.05; // Low volume for subtlety
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Generate and Play Brown Noise
  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (selectedMode && !isMuted && !isPlaying) {
      // Create Brown Noise Buffer
      const bufferSize = 2 * audioContextRef.current.sampleRate;
      const noiseBuffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Compensate for gain
      }

      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = noiseBuffer;
      sourceNodeRef.current.loop = true;
      sourceNodeRef.current.connect(gainNodeRef.current);
      sourceNodeRef.current.start();
      setIsPlaying(true);
    } else if ((!selectedMode || isMuted) && isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
    }
  }, [selectedMode, isMuted, isPlaying]);

  // Adjust volume based on mute state
  useEffect(() => {
    if (gainNodeRef.current) {
      const targetVolume = isMuted || !selectedMode ? 0 : 0.05;
      gainNodeRef.current.gain.setTargetAtTime(targetVolume, audioContextRef.current!.currentTime, 0.5);
    }
  }, [isMuted, selectedMode]);

  // Only show controls if in a fitting mode
  if (!selectedMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-4 left-4 z-40"
    >
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors group"
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isMuted ? (
             <span className="text-gray-400 text-xs">🔇</span>
          ) : (
            <>
              <span className="text-cyber-lime text-xs">🔊</span>
              <span className="absolute inset-0 rounded-full bg-cyber-lime/30 animate-ping opacity-75" />
            </>
          )}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
          Ambience {isMuted ? 'Off' : 'On'}
        </span>
      </button>
    </motion.div>
  );
}
