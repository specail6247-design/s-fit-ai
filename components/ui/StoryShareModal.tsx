import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const StoryShareModal: React.FC<StoryShareModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const handleShare = async () => {
    // In a real app, this would use html2canvas to capture the preview div
    // and then use the Web Share API or native share intent for Instagram Stories.
    // For web demo, we'll simulate a download/share action.
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'My S_FIT Style',
                text: 'Check out my new fit! ✨',
                url: window.location.href, // Or a specific share URL
            });
        } else {
            alert('Sharing is not supported on this browser. Image downloaded instead!');
        }
    } catch (err) {
        console.error("Error sharing", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm flex flex-col items-center gap-6"
          >
            {/* Story Preview Card (9:16 aspect ratio roughly) */}
            <div
              className="w-full aspect-[9/16] bg-gradient-to-br from-[#111] to-[#222] rounded-3xl overflow-hidden relative shadow-2xl border border-white/20"
            >
               {/* Background blur of the image for full coverage */}
               <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110"
                  style={{ backgroundImage: `url(${imageUrl})` }}
               />

               <div className="absolute inset-0 flex flex-col p-6 z-10">
                   {/* Brand Header */}
                   <div className="flex justify-between items-center mb-auto">
                       <h2 className="text-xl font-black tracking-tighter italic text-white drop-shadow-md">
                           S_FIT <span className="text-[#007AFF]">NEO</span>
                       </h2>
                   </div>

                   {/* Main Image */}
                   <div className="relative w-full h-[60%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-auto">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={imageUrl} alt="My Fit" className="w-full h-full object-cover" />
                       <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white border border-white/20">
                           AI_GENERATED
                       </div>
                   </div>

                   {/* Footer */}
                   <div className="mt-auto pt-6 text-center">
                       <p className="text-white font-bold text-lg drop-shadow-md">Try it on at S_FIT AI</p>
                   </div>
               </div>
            </div>

            {/* Actions */}
            <div className="w-full space-y-3">
               <button
                  onClick={handleShare}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
               >
                  <span aria-hidden="true">📸</span> Share to IG Story
               </button>
               <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
               >
                  Cancel
               </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
