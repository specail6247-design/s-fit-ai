import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateStoryImage } from '@/lib/storyGenerator';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string | null;
}

export default function ShareModal({ isOpen, onClose, resultImage }: ShareModalProps) {
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && resultImage) {
      let mounted = true;
      const generate = async () => {
        if (!mounted) return;
        setIsGenerating(true);
        try {
          const url = await generateStoryImage(resultImage);
          if (mounted) {
            setStoryImage(url);
            setIsGenerating(false);
          }
        } catch (err) {
          console.error("Failed to generate story image", err);
          if (mounted) setIsGenerating(false);
        }
      };
      generate();
      return () => { mounted = false; };
    } else {
        const t = setTimeout(() => {
             setStoryImage(null);
             setIsGenerating(false);
        }, 0);
        return () => clearTimeout(t);
    }
  }, [isOpen, resultImage]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!storyImage) return;
    const a = document.createElement('a');
    a.href = storyImage;
    a.download = `sfit-story-${Date.now()}.png`;
    a.click();
  };

  const handleShare = (platform: string) => {
    // Simple mock sharing or real links
    const text = encodeURIComponent("Check out my fit on S_FIT NEO! ⚡️ #SFIT #AI");
    const url = encodeURIComponent("https://s-fit.ai");

    let shareUrl = "";
    if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    } else if (platform === 'instagram') {
        alert("Downloaded! Open Instagram to share to your Story. 📸");
        handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative flex flex-col md:flex-row gap-8 max-w-4xl w-full h-[85vh] md:h-auto items-center justify-center pointer-events-none"
      >
        {/* Story Preview */}
        <div className="pointer-events-auto relative h-full md:h-[70vh] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
             {isGenerating ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-[#007AFF] space-y-4">
                     <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
                     <span className="text-xs font-mono animate-pulse">GENERATING STORY...</span>
                 </div>
             ) : storyImage ? (
                 <img src={storyImage} alt="Story Preview" className="w-full h-full object-contain" />
             ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-red-500 text-xs">
                     FAILED TO LOAD
                 </div>
             )}
        </div>

        {/* Controls */}
        <div className="pointer-events-auto flex flex-col gap-4 min-w-[300px] bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
                <h3 className="text-xl font-bold text-white">Share Your Look</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-sm text-gray-400 mb-4">
                Share this exclusive AI fitting result with your network.
            </p>

            <button
                onClick={() => handleShare('instagram')}
                disabled={!storyImage}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>📸</span> Share to Instagram
            </button>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleShare('twitter')}
                    className="py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <span>𝕏</span> Twitter
                </button>
                <button
                    onClick={() => handleShare('facebook')}
                    className="py-3 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 hover:bg-[#1877F2]/20 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <span>f</span> Facebook
                </button>
            </div>

            <div className="border-t border-white/10 pt-4 mt-2">
                 <button
                    onClick={handleDownload}
                    disabled={!storyImage}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                    <span>⬇️</span> Download Image
                </button>
            </div>
        </div>

      </motion.div>
    </div>
  );
}
