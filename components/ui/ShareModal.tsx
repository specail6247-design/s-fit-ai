import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  brandName?: string;
  fitScore: number;
  recommendedSize?: string;
  storyImage?: string | null;
}

export function ShareModal({ isOpen, onClose, itemName, brandName, fitScore, recommendedSize, storyImage }: ShareModalProps) {
  const [hasPublished, setHasPublished] = useState(false);
  if (!isOpen) return null;

  const safeItemName = itemName ?? 'this fit';
  const safeBrandName = brandName ?? 'S_FIT AI';
  const shareText = `I just tried on ${safeItemName} from ${safeBrandName} using S_FIT AI! Fit score ${fitScore}% ${recommendedSize ? `(Size ${recommendedSize})` : ''} #SFIT #VirtualTryOn #Fashion`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent('https://s-fit.ai');
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
    else if (platform === 'instagram') { navigator.clipboard.writeText(shareText); alert('Text copied for Instagram! 📱'); return; }
    else if (platform === 'kakao') shareUrl = `https://story.kakao.com/share?url=${url}&text=${encodedText}`;

    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative glass-card p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-xl border border-white/10" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
        <h3 className="text-lg font-bold text-center mb-4 text-white">{storyImage ? 'Your Story is Ready! 📸' : 'Share Your Fit! 📸'}</h3>

        {storyImage && (
          <div className="mb-6 relative aspect-[9/16] w-full rounded-xl overflow-hidden border border-white/20 shadow-lg group">
             <img src={storyImage} alt="Story Preview" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={storyImage}
                  download="sfit-story.png"
                  className="bg-[#007AFF] text-white font-bold py-3 px-6 rounded-full text-xs shadow-lg hover:scale-105 transition-transform whitespace-nowrap"
                >
                  ⬇️ Download for Story
                </a>
             </div>
          </div>
        )}

        <p className="text-gray-400 text-xs mb-6 text-center">{shareText}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => handleShare('twitter')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] text-xs text-white"><span>𝕏</span> Twitter</button>
          <button onClick={() => handleShare('facebook')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1877F2] text-xs text-white"><span>📘</span> Facebook</button>
          <button onClick={() => handleShare('instagram')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#F77737] text-xs text-white"><span>📷</span> Instagram</button>
          <button onClick={() => handleShare('kakao')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#FEE500] text-black text-xs"><span>💬</span> KakaoStory</button>
        </div>
        <div className="pt-4 border-t border-white/10">
          {hasPublished ? (
            <div className="bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-lg p-2 text-center text-[10px] text-[#007AFF] font-bold">✨ Published to Community Runway!</div>
          ) : (
            <button onClick={() => { setHasPublished(true); setTimeout(() => setHasPublished(false), 3000); }} className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all text-xs">✨ Publish to Community</button>
          )}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2 text-gray-500 hover:text-white transition-colors text-xs">Close</button>
      </motion.div>
    </motion.div>
  );
}
