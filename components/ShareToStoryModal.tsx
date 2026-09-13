import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareToStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
}

export const ShareToStoryModal: React.FC<ShareToStoryModalProps> = ({ isOpen, onClose, resultImage }) => {
  const [downloading, setDownloading] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    setDownloading(true);
    // In a real app we'd use html2canvas or similar to capture the ref and trigger download
    // For this demo, we'll simulate the process
    setTimeout(() => {
      setDownloading(false);
      alert("Story image ready! You can now upload it to Instagram.");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-sm m-4 overflow-hidden shadow-2xl text-white"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-bold font-sans">Share to Story</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* Story Preview Container (9:16 aspect ratio) */}
              <div
                ref={storyRef}
                className="w-48 h-[341px] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden relative shadow-lg mb-6 border border-white/10"
              >
                <Image src={resultImage} alt="Try-on Result" unoptimized width={192} height={341} className="w-full h-full object-cover" />

                {/* Branding Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                  <div className="self-center bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span className="text-[10px] font-black italic tracking-widest text-white">
                      S_FIT <span className="text-[#007AFF]">AI</span>
                    </span>
                  </div>

                  <div className="bg-gradient-to-t from-black/80 to-transparent pt-8 pb-2 px-2 -mx-4 -mb-4 text-center">
                    <p className="text-[10px] font-bold text-white">Virtual Try-On</p>
                    <p className="text-[8px] text-gray-400">Powered by Antigravity</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleShare}
                disabled={downloading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold rounded-xl transition-opacity flex items-center justify-center gap-2"
              >
                {downloading ? (
                  <span className="animate-pulse">Generating...</span>
                ) : (
                  <>
                    <span>📸</span> Save Story Image
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
