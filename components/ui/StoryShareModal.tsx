import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
}

export const StoryShareModal: React.FC<StoryShareModalProps> = ({ isOpen, onClose, resultImage }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBrandedImage = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not supported'));

      // 1080x1920 for IG Story
      canvas.width = 1080;
      canvas.height = 1920;

      const img = new window.Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        // Draw background image (cover)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Draw top gradient
        const topGrad = ctx.createLinearGradient(0, 0, 0, 400);
        topGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
        topGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw bottom gradient
        const bottomGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 800);
        bottomGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
        bottomGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Top Text "S_FIT AI"
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 72px sans-serif';
        ctx.fillText('S_FIT AI', 80, 160);

        // Draw Subtext "Virtual Fit"
        ctx.fillStyle = '#256af4';
        ctx.font = '36px monospace';
        ctx.fillText('V I R T U A L  F I T', 80, 220);

        // Draw Bottom Pill "Try it yourself @ sfit.ai"
        const pillWidth = 560;
        const pillHeight = 100;
        const pillX = (canvas.width - pillWidth) / 2;
        const pillY = canvas.height - 300;

        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 50);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TRY IT YOURSELF @ SFIT.AI', canvas.width / 2, pillY + 62);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate image blob'));
          }
        }, 'image/png');
      };

      img.onerror = () => reject(new Error('Failed to load original image'));
      img.src = resultImage;
    });
  };

  const handleDownloadAndShare = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateBrandedImage();
      const file = new File([blob], 'sfit-story.png', { type: blob.type });

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My S_FIT Look',
            text: 'Check out my virtual fit from S_FIT AI!',
            files: [file],
          });
        } catch (err) {
          console.error('Share failed', err);
          downloadImage(blob);
        }
      } else {
        downloadImage(blob);
      }
    } catch (err) {
      console.error('Canvas generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (blob: Blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sfit-story.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[360px] aspect-[9/16] rounded-[32px] overflow-hidden bg-[#101622] shadow-2xl border border-white/20 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 size-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:text-white border border-white/20"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Branded Story Canvas Preview */}
            <div className="relative flex-1 bg-gradient-to-b from-black/80 to-black/20">
              {/* Actual Result Image */}
              {resultImage && (
                <Image
                  src={resultImage}
                  alt="Fit Result"
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}

              {/* Story Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              <div className="absolute top-8 left-6 z-10">
                <h2 className="text-xl font-bold tracking-tighter text-white drop-shadow-md">S_FIT AI</h2>
                <p className="text-[10px] font-mono tracking-widest text-[#256af4] uppercase drop-shadow-md">Virtual Fit</p>
              </div>

              <div className="absolute bottom-12 inset-x-6 z-10 flex flex-col items-center">
                 <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                    <span className="text-xs font-bold text-white tracking-widest">Try it yourself @ sfit.ai</span>
                 </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-20">
              <button
                onClick={handleDownloadAndShare}
                disabled={isGenerating}
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <span className="animate-spin size-5 border-2 border-white/20 border-t-white rounded-full" />
                ) : (
                  <span className="material-symbols-outlined text-[20px]">share</span>
                )}
                {isGenerating ? 'Generating...' : 'Share to IG Story'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
