import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { BottomSheet } from './ui/BottomSheet';
// import { motion } from 'framer-motion';

interface SocialShareProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ isOpen, onClose, resultImage }) => {
  const storyRef = useRef<HTMLDivElement>(null);

  const handleShareToStory = async () => {
    if (!storyRef.current) return;
    try {
      const dataUrl = await toPng(storyRef.current, { quality: 1.0, pixelRatio: 2 });

      // In a real app, you would use Web Share API for mobile devices:
      // if (navigator.share) {
      //   const blob = await (await fetch(dataUrl)).blob();
      //   const file = new File([blob], 'sfit-story.png', { type: 'image/png' });
      //   navigator.share({ files: [file] });
      // } else {
      // fallback to download
      const link = document.createElement('a');
      link.download = 'sfit-story.png';
      link.href = dataUrl;
      link.click();
      // }

      onClose();
    } catch (err) {
      console.error('Failed to generate story image', err);
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Share to Story">
      <div className="flex flex-col items-center gap-6">

        {/* Story Preview Container */}
        <div className="relative w-64 h-[455px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">

          {/* This ref is what gets converted to an image */}
          <div ref={storyRef} className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111] flex flex-col items-center justify-center p-4">

            {/* Branded Elements */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
               <h1 className="text-xl font-black tracking-tighter italic text-white drop-shadow-md">
                 S_FIT <span className="text-[#007AFF]">NEO</span>
               </h1>
            </div>

            {/* Main Result Image */}
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-white/10 shadow-lg mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Try-On Result" className="w-full h-full object-cover" />

              {/* Overlay elements */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-[#007AFF] px-2 py-1 rounded text-[10px] font-bold font-mono backdrop-blur-sm">
                AI GENERATED
              </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <div className="text-xs text-white/80 font-bold uppercase tracking-widest mb-1">
                Virtual Try-On
              </div>
              <div className="text-[10px] text-white/50">
                try it at s-fit.ai
              </div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShareToStory}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <span>📸</span> Share to Instagram Story
        </button>
      </div>
    </BottomSheet>
  );
};
