import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ShareStoryModalProps {
  resultImage: string;
  onClose: () => void;
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({ resultImage, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-sm flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-white/10 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          ✕
        </button>

        <div className="w-full text-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Share to Story</h2>
          <p className="text-sm text-gray-400 mt-1">Ready for Instagram</p>
        </div>

        {/* 9:16 Story Container */}
        <div id="story-container" className="relative w-full aspect-[9/16] bg-[#0a0a0a] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
          {/* Main Image */}
          <Image
            src={resultImage}
            alt="My Virtual Try-On"
            fill
            className="object-cover"
            unoptimized
          />

          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Branding Header */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
             <h1 className="text-2xl font-black tracking-tighter italic text-white drop-shadow-md">
              S_FIT <span className="text-[#007AFF]">NEO</span>
            </h1>
            <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[10px] font-bold text-white uppercase tracking-widest shadow-sm">
              AI Try-On
            </div>
          </div>

          {/* User/Date Footer Info */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-lg shadow-sm">
                👤
              </div>
              <div>
                <div className="text-sm font-bold text-white shadow-sm">Virtual Look</div>
                <div className="text-xs text-white/70 font-mono shadow-sm">{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
               <p className="text-[10px] text-white/60 tracking-widest uppercase text-center font-mono">
                 Styled by S_FIT.AI
               </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full mt-8 space-y-3">
          <button
            onClick={() => {
              // In a real app, this would use html2canvas or a backend service to render the DOM node to an image
              alert("In production, this downloads the 9:16 image for Instagram Stories!");
            }}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>📸</span> Save Story Image
          </button>
        </div>
      </motion.div>
    </div>
  );
};
