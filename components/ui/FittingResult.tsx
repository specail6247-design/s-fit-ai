import React, { useRef } from 'react';
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
    if (onShare) onShare();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = resultImage;
      });

      // Calculate aspect ratio to cover or fit
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      // Draw image
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Apply gradient overlay
      const gradient = ctx.createLinearGradient(0, canvas.height - 600, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - 600, canvas.width, 600);

      // Add Branding
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 150);

      ctx.font = '40px monospace';
      ctx.fillStyle = '#ecab13';
      ctx.fillText(`${matchScore}% MATCH`, canvas.width / 2, canvas.height - 80);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit-story.jpg';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.9);

    } catch (err) {
      console.error('Failed to generate story image:', err);
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
          className="flex-1 py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)] flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          Share to Story
        </button>
      </div>
    </div>
  );
};
