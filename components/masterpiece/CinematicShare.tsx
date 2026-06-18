import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  imageUrl: string;
  onClose: () => void;
}

export function CinematicShare({ imageUrl, onClose }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/cinematic-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      const data = await res.json();

      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        throw new Error(data.error || 'Failed to generate video');
      }
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Cinematic Share</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!videoUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden mb-6 shadow-lg bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Try-On Result" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-sm font-light">Ready for 4K Hollywood-style rendering</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-[#ecab13] to-[#c48a0a] hover:from-[#c48a0a] hover:to-[#a37208] text-black font-bold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Rendering Video...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">movie</span>
                      Generate 4K Video
                    </>
                  )}
                </button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-black shadow-lg mb-6 border border-[#ecab13]/30">
                  <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex gap-4 w-full">
                  <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
                     <span className="material-symbols-outlined text-sm">download</span> Save
                  </button>
                  <button className="flex-1 py-3 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
                     <span className="material-symbols-outlined text-sm">share</span> Share
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
