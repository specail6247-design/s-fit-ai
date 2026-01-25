'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { ClothingItem } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';

export interface VoiceConciergeRef {
  triggerEvent: (action: 'welcome' | 'select_item' | 'complete_look', item?: ClothingItem | null) => void;
}

interface VoiceConciergeProps {
  initialMuted?: boolean;
}

export const VoiceConcierge = forwardRef<VoiceConciergeRef, VoiceConciergeProps>(({ initialMuted = false }, ref) => {
  const { selectedItem, userStats } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const lastItemIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const playAudio = useCallback(async (blob: Blob, text: string) => {
    if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
    }

    const url = URL.createObjectURL(blob);
    if (audioRef.current) {
        audioRef.current.src = url;
        // Show caption immediately to support accessibility/mocking even if audio fails
        setCaption(text);
        setIsPlaying(true);

        try {
            await audioRef.current.play();
        } catch (e) {
            console.warn("Autoplay blocked or failed:", e);
            // If autoplay fails, we still show the caption but might need to auto-hide it
            // if onended never fires. For now, we rely on user interaction or manual dismiss if we had one.
            // Or we could set a fallback timeout.
            setTimeout(() => {
                 // Fallback to hide after reading duration approx
                 setIsPlaying(false);
                 setCaption(null);
            }, Math.max(3000, text.length * 100));
        }
    }
  }, []);

  const triggerEvent = useCallback(async (action: 'welcome' | 'select_item' | 'complete_look', item?: ClothingItem | null) => {
    if (isMuted) return;

    // Abort previous request if loading
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action,
            item: item || null,
            userStats
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error('API request failed');

      const text = response.headers.get('X-Script-Text') || '';
      const blob = await response.blob();

      playAudio(blob, text);
    } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') {
            console.error('Concierge Error:', e);
        }
    } finally {
        setIsLoading(false);
    }
  }, [isMuted, playAudio, userStats]);

  useImperativeHandle(ref, () => ({
    triggerEvent
  }));

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
        setIsPlaying(false);
        setCaption(null);
    };
    audioRef.current.onerror = (e) => {
        console.error('Audio playback error', e);
        setIsPlaying(false);
    };

    // Play welcome message on mount
    // We delay slightly to allow interaction or ensure hydration
    const timer = setTimeout(() => {
        triggerEvent('welcome');
    }, 1500);

    return () => clearTimeout(timer);
  }, [triggerEvent]);

  // Update volume/mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Watch for item selection changes
  useEffect(() => {
    if (!selectedItem) return;
    if (selectedItem.id === lastItemIdRef.current) return;

    lastItemIdRef.current = selectedItem.id;

    // Debounce to prevent spamming while browsing
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
        triggerEvent('select_item', selectedItem);
    }, 1000); // 1 second debounce

    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedItem, triggerEvent]);

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
        {/* Caption Overlay */}
        <AnimatePresence>
            {isPlaying && caption && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-xs shadow-2xl pointer-events-auto"
                >
                    <div className="flex items-center gap-2 mb-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse" />
                         <span className="text-[10px] uppercase tracking-widest text-soft-gray font-bold">Concierge</span>
                    </div>
                    <p className="text-xs font-serif text-white italic leading-relaxed">&quot;{caption}&quot;</p>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Mute Toggle */}
        <div className="pointer-events-auto">
             <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-lg ${isMuted ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-charcoal/80 border-white/20 text-cyber-lime hover:border-cyber-lime'}`}
             >
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <span>{isMuted ? '🔇' : '🎙️'}</span>
                )}
             </button>
        </div>
    </div>
  );
});

VoiceConcierge.displayName = 'VoiceConcierge';
