import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string | null;
}

export default function StoryShareModal({ isOpen, onClose, resultImage }: StoryShareModalProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    if (!resultImage) return;

    // In a real app with html2canvas or similar, we'd render the full DOM node.
    // For this implementation, we'll download the source image directly.
    // To make it "branded", in a full implementation we'd composite the image onto a canvas with the logo.

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'sfit-story-share.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !resultImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative flex flex-col items-center max-w-sm w-full"
          >
            {/* Story Preview Container (9:16 aspect ratio roughly) */}
            <div className="relative w-full aspect-[9/16] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={resultImage}
                alt="Story Preview"
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay for better text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

              {/* Branded Elements Overlay */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <h1 className="text-2xl font-black tracking-tighter italic text-white drop-shadow-md">
                  S_FIT <span className="text-[#007AFF]">NEO</span>
                </h1>
              </div>

              <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                <div className="inline-block bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white text-sm font-bold tracking-widest">@SFIT_AI</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 w-full space-y-3">
              <button
                onClick={handleDownload}
                className="w-full py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <span>📸</span> Save for Instagram Story
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
