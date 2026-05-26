import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FittingResultProps {
  originalImage: string;
  resultImage: string;
  matchScore: number;
  onShare?: () => void;
  onRetake?: () => void;
}

export const FittingResult: React.FC<FittingResultProps> = ({
  resultImage,
  matchScore,
  onShare,
  onRetake,
}) => {
  const handleShareToStory = async () => {
    if (onShare) {
      onShare();
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = resultImage;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate dimensions to fit vertically while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const targetAspect = 1080 / 1920;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > targetAspect) {
        // Image is wider, scale based on height
        drawHeight = 1920;
        drawWidth = 1920 * imgAspect;
        offsetX = (1080 - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller, scale based on width
        drawWidth = 1080;
        drawHeight = 1080 / imgAspect;
        offsetX = 0;
        offsetY = (1920 - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Add Gradient overlay
      const gradient = ctx.createLinearGradient(0, 1920 - 600, 0, 1920);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 1920 - 600, 1080, 600);

      // Add branding
      ctx.font = 'bold 80px "Geist Mono", monospace, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', 1080 / 2, 1920 - 200);

      ctx.font = '40px sans-serif';
      ctx.fillStyle = '#CCFF00'; // Cyber lime
      ctx.fillText('VIRTUAL FITTING', 1080 / 2, 1920 - 120);

      // Export
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      // Trigger download
      const link = document.createElement('a');
      link.download = `sfit-story-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate story image:', error);
      alert('Failed to generate shareable image.');
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--color-secondary)]">
      {/* AR Overlay UI */}
      <div className="relative aspect-[3/4]">
        <Image
          src={resultImage}
          alt="Virtual Try-On Result"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
          unoptimized
        />

        {/* Scanning Line Animation */}
        <motion.div
          className="absolute inset-x-0 h-px bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
          initial={{ top: "0%" }}
          animate={{ top: "100%", opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* HUD Elements */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-xs font-mono text-white">LIVE_FIT</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
           <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-xs font-mono text-[var(--color-primary)]">
              {matchScore}% MATCH
            </span>
          </div>
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-4 backdrop-blur-xl bg-black/80 absolute bottom-0 inset-x-0">
        <button
          onClick={onRetake}
          className="flex-1 py-3 px-4 rounded-full border border-[var(--border-color)] text-white text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Retake
        </button>
        <button
          onClick={handleShareToStory}
          className="flex-1 py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)]"
        >
          Share to Story
        </button>
      </div>
    </div>
  );
};
