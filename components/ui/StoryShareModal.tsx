import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  brandName?: string;
  fitScore: number;
  recommendedSize?: string;
  previewImage?: string | null;
}

export function StoryShareModal({ isOpen, onClose, itemName, brandName, fitScore, recommendedSize, previewImage }: StoryShareModalProps) {
  const [hasPublished, setHasPublished] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    else if (platform === 'instagram') {
      navigator.clipboard.writeText(shareText);
      alert('Text copied for Instagram! 📱');
      return;
    }
    else if (platform === 'kakao') shareUrl = `https://story.kakao.com/share?url=${url}&text=${encodedText}`;

    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareToStory = async () => {
    if (!previewImage || !canvasRef.current) {
        alert('Image not available for story creation.');
        return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set 9:16 aspect ratio
    canvas.width = 1080;
    canvas.height = 1920;

    // Background
    ctx.fillStyle = '#101622';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw image
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, canvas.height - 400, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(16, 22, 35, 0)');
      gradient.addColorStop(1, 'rgba(16, 22, 35, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

      // Branding
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = '40px sans-serif';
      ctx.fillText(`${fitScore}% Match`, canvas.width / 2, canvas.height - 80);

      // Download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `sfit-story-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = previewImage;
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div className="relative glass-card p-6 max-w-sm w-full border border-white/10 bg-[#101622] rounded-2xl shadow-2xl" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
          <h3 className="text-lg font-bold text-center mb-4 text-white font-[family-name:var(--font-display)]">Share Your Fit! 📸</h3>
          <p className="text-gray-400 text-xs mb-6 text-center">{shareText}</p>

          {/* Hidden Canvas for Story Generation */}
          <canvas ref={canvasRef} className="hidden" />

          {previewImage && (
            <button
              onClick={handleShareToStory}
              className="w-full flex items-center justify-center gap-2 p-4 mb-4 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              Share to Story
            </button>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => handleShare('twitter')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#1DA1F2] hover:border-transparent text-white text-xs transition-colors"><span>𝕏</span> Twitter</button>
            <button onClick={() => handleShare('facebook')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#1877F2] hover:border-transparent text-white text-xs transition-colors"><span>📘</span> Facebook</button>
            <button onClick={() => handleShare('instagram')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-[#833AB4] hover:to-[#F77737] hover:border-transparent text-white text-xs transition-colors"><span>📷</span> Instagram</button>
            <button onClick={() => handleShare('kakao')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FEE500] hover:text-black hover:border-transparent text-white text-xs transition-colors"><span>💬</span> Kakao</button>
          </div>

          <div className="pt-4 border-t border-white/10">
            {hasPublished ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center text-[11px] text-green-400 font-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Published to Community!
              </div>
            ) : (
              <button onClick={() => { setHasPublished(true); setTimeout(() => setHasPublished(false), 3000); }} className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10">
                ✨ Publish to Community
              </button>
            )}
          </div>
          <button onClick={onClose} className="w-full mt-4 py-2 text-gray-500 hover:text-white transition-colors text-xs font-medium">Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
