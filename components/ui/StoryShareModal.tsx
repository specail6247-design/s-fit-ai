"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const StoryShareModal: React.FC<StoryShareModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      // Attempt native share if supported
      if (navigator.share) {
        await navigator.share({
          title: 'My Virtual Fit - S_FIT AI',
          text: 'Check out my new look on S_FIT AI! 🚀',
          url: window.location.href,
        });
      } else {
        alert("Story format generated! Ready to post to Instagram.");
      }
    } catch (error) {
      console.log('Error sharing', error);
    }
    onClose();
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full max-w-sm flex flex-col items-center" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>

        {/* Instagram Story Preview Container (9:16 aspect ratio) */}
        <div className="relative w-[270px] h-[480px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-1 shadow-2xl mb-6">
          <div className="w-full h-full bg-black rounded-[22px] overflow-hidden relative">
            <img src={imageUrl} alt="Story Preview" className="w-full h-full object-cover opacity-90" />

            {/* Brand Overlay */}
            <div className="absolute bottom-6 left-0 w-full text-center">
              <h2 className="text-white font-black text-2xl tracking-tighter drop-shadow-lg">S_FIT</h2>
              <p className="text-white/80 text-[10px] tracking-widest uppercase font-bold drop-shadow-md">Virtual Try-On</p>
            </div>
          </div>
        </div>

        <button onClick={handleShare} className="w-full py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
          <span>📷</span> Share to Story
        </button>
        <button onClick={onClose} className="mt-4 text-white/50 text-sm hover:text-white transition-colors">
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};
