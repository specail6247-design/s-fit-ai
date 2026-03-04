import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const storyRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!storyRef.current || !imageUrl) return;
    setIsGenerating(true);

    try {
      // In a real app, use html2canvas or similar to capture the ref and generate an image.
      // For this implementation, we will mock the process to simulate the viral loop.
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Mock: Story image generated and ready to share to Instagram!');
      onClose();
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story image.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <div className="relative flex flex-col items-center">
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
            >
              ✕ Close
            </button>

            {/* Vertical Story Preview Container */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative w-[300px] h-[533px] bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              ref={storyRef}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-[#007AFF]/20 pointer-events-none" />

              {/* Main Image */}
              {imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageUrl}
                  alt="Fit Result"
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-sm">
                  NO IMAGE
                </div>
              )}

              {/* Story Overlay Elements */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                {/* Header Branding */}
                <div className="flex items-center gap-2 drop-shadow-md">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white text-xs font-black italic">S_</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight drop-shadow-md">S_FIT AI</p>
                    <p className="text-white/80 text-[10px] uppercase tracking-wider drop-shadow-md">Virtual Try-On</p>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg text-center transform rotate-[-2deg]">
                  <p className="text-white font-bold text-sm tracking-wide">
                    Rate my fit 🔥
                  </p>
                  <p className="text-[#007AFF] text-[10px] font-mono mt-1">
                    @sfit_ai #VirtualFashion
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              onClick={handleShare}
              disabled={isGenerating || !imageUrl}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              {isGenerating ? 'GENERATING...' : 'SHARE TO STORY'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
