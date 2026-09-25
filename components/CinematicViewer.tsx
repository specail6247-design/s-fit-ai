import React, { useState, useRef } from 'react';

interface Props {
  imageUrl: string;
  onClose: () => void;
}

export default function CinematicViewer({ imageUrl, onClose }: Props) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGenerate = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setVideoUrl(data.videoUrl);
      } else {
        alert(data.error || 'Failed to generate cinematic video');
      }
    } catch (e) {
      console.error(e);
      alert('Error generating video');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
      >
        ✕ Close
      </button>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-[0.2em] uppercase text-white mb-8">Cinematic Mode</h2>

        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,122,255,0.15)] flex items-center justify-center group">
          {!videoUrl && !isProcessing && (
            <div className="flex flex-col items-center gap-6">
              <img src={imageUrl} alt="Source" className="h-64 object-contain rounded-lg opacity-50" />
              <button
                onClick={handleGenerate}
                className="px-8 py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] tracking-widest flex items-center gap-3"
              >
                <span className="material-symbols-outlined">movie</span>
                GENERATE FASHION FILM
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center gap-4 text-[#007AFF]">
              <div className="w-16 h-16 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-sm tracking-widest uppercase">Synthesizing Motion & Physics...</p>
            </div>
          )}

          {videoUrl && (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="bg-black/60 backdrop-blur-md text-white p-3 rounded-xl border border-white/20 hover:bg-[#007AFF] hover:border-[#007AFF] transition-all"
                >
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
