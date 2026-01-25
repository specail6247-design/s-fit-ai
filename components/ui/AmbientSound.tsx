'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AmbientSoundProps {
  isPlaying: boolean;
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function AmbientSound({ isPlaying }: AmbientSoundProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContextClass();

            // Soft Drone
            oscRef.current = audioContextRef.current.createOscillator();
            oscRef.current.type = 'sine';
            oscRef.current.frequency.setValueAtTime(110, audioContextRef.current.currentTime); // Low A2

            gainRef.current = audioContextRef.current.createGain();
            gainRef.current.gain.value = 0.03; // Very quiet

            oscRef.current.connect(gainRef.current);
            gainRef.current.connect(audioContextRef.current.destination);
            oscRef.current.start();
        }
    };

    if (isPlaying && !isMuted) {
        initAudio();
        if(audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume();
        }
        if(gainRef.current && audioContextRef.current) {
            gainRef.current.gain.linearRampToValueAtTime(0.03, audioContextRef.current.currentTime + 1);
        }
    } else {
        if (audioContextRef.current && gainRef.current) {
             gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
             setTimeout(() => {
                if(audioContextRef.current?.state === 'running') {
                    audioContextRef.current.suspend();
                }
             }, 500);
        }
    }

    return () => {
        // Cleanup on unmount
        if (oscRef.current) {
            oscRef.current.stop();
            oscRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };
  }, [isPlaying, isMuted]);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="absolute bottom-4 right-16 z-20 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/50 hover:text-white transition-colors border border-white/10"
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      )}
    </button>
  );
}
