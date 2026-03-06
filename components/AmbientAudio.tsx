'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

// A subtle "hum" / "white noise" ambient audio track base64 encoded
// This ensures we do not have missing file errors
// generated via a simple web audio API synth logic encoded as wav, but here we'll just use a tiny base64 placeholder mp3.
// We can use a short silent/minimal data URI or simple audio API. Actually, a minimal valid base64 is better.
const minimalAudioBase64 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAB8AAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiJ3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3eIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAA//OEAAQAACcAANgAAAAAAgAAANgAAAAAAAAAAAAAA//OEABQAAyAAANgAAAAAAgAAANgAAAAAAAAAAAAAA//OEACQAA0AAANgAAAAAAgAAANgAAAAAAAAAAAAAA//OEADQAAyAAANgAAAAAAgAAANgAAAAAAAAAAAAAA//OEAOQAAzAAANgAAAAAAgAAANgAAAAAAAAAAAAAA//OEADwAAxAAANgAAAAAAgAAANgAAAAAAAAAAAAAA";

export default function AmbientAudio() {
  const { isAudioMuted, setIsAudioMuted, isAnalyzing, isFitting } = useStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play/pause based on state and flow
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Subtle volume

      const shouldPlay = !isAudioMuted && (isAnalyzing || isFitting);

      if (shouldPlay) {
        audioRef.current.play().catch(e => console.warn('Audio auto-play blocked:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioMuted, isAnalyzing, isFitting]);

  // Only show the UI when in immersive flow (e.g. isAnalyzing or isFitting)
  if (!isAnalyzing && !isFitting) {
    return (
      <audio ref={audioRef} src={minimalAudioBase64} preload="auto" />
    );
  }

  return (
    <>
      <audio ref={audioRef} src={minimalAudioBase64} preload="auto" />
      <div className="fixed top-20 right-4 z-[60]">
        <button
          onClick={() => setIsAudioMuted(!isAudioMuted)}
          className="flex items-center justify-center p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
          aria-label={isAudioMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
        >
          <span className="material-symbols-outlined text-white/80 text-xl" aria-hidden="true">
            {isAudioMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>
    </>
  );
}
