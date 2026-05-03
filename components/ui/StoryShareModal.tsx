import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const StoryShareModal = ({
  isOpen,
  onClose,
  resultImage
}: {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
}) => {
  const generateStoryImage = () => {
    alert('Generating story image... (In production, this would open the native share sheet or save to camera roll)');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-sm flex flex-col items-center">
            <div className="flex w-full justify-between items-center mb-4">
              <h3 className="text-white font-bold">Share to Story</h3>
              <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
            </div>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-[270px] h-[480px] bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl mb-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Story Preview" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className="text-white font-black text-xl italic tracking-tighter">S_FIT</span>
                  <div className="bg-[#007AFF] text-white text-[10px] px-2 py-1 rounded-full font-bold">AI FITTING</div>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-bold drop-shadow-md">My Virtual Try-On</p>
                  <p className="text-white/70 text-xs drop-shadow-md">Try it yourself at sfit.ai</p>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={generateStoryImage}
                className="w-full py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>📷</span> Share to Instagram
              </button>
              <button
                onClick={generateStoryImage}
                className="w-full py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <span>⬇️</span> Save to Camera Roll
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
