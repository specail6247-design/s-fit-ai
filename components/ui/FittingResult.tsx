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
      <div className="p-4 flex gap-4 backdrop-blur-xl bg-black/80 absolute bottom-0 inset-x-0 flex-col sm:flex-row">
        <div className="flex gap-4 w-full">
          <button
            onClick={onRetake}
            className="flex-1 py-3 px-4 rounded-full border border-[var(--border-color)] text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Retake
          </button>
          <button
            onClick={onShare}
            className="flex-1 py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)]"
          >
            Share Look
          </button>
        </div>

        {/* Share to Story Button */}
        <button
          onClick={async () => {
            try {
              // Create a canvas to composite the image and a watermark
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              if (!ctx) return;

              const img = new window.Image();
              img.crossOrigin = 'anonymous'; // Important for external images
              img.src = resultImage;

              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });

              // Set target dimensions for Instagram Story (9:16 aspect ratio, e.g., 1080x1920)
              const storyWidth = 1080;
              const storyHeight = 1920;
              canvas.width = storyWidth;
              canvas.height = storyHeight;

              // Draw black background
              ctx.fillStyle = '#050505';
              ctx.fillRect(0, 0, storyWidth, storyHeight);

              // Calculate scale to fit image within story while maintaining aspect ratio
              const scale = Math.min(storyWidth / img.width, (storyHeight - 400) / img.height); // Leave space for branding
              const scaledWidth = img.width * scale;
              const scaledHeight = img.height * scale;

              // Center the image
              const x = (storyWidth - scaledWidth) / 2;
              const y = (storyHeight - scaledHeight) / 2 - 100; // Shift up slightly

              ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

              // Add Branding
              ctx.fillStyle = '#FFFFFF';
              ctx.font = 'bold 80px "Geist Mono", monospace';
              ctx.textAlign = 'center';
              ctx.fillText('S_FIT NEO', storyWidth / 2, storyHeight - 200);

              ctx.font = '40px sans-serif';
              ctx.fillStyle = '#007AFF';
              ctx.fillText('Virtual Try-On Experience', storyWidth / 2, storyHeight - 120);

              // Generate Data URL
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

              // Trigger download
              const link = document.createElement('a');
              link.download = 'sfit_story_share.jpg';
              link.href = dataUrl;
              link.click();

            } catch (err) {
              console.error("Failed to generate story image:", err);
              alert("Failed to generate image for sharing. The image might have cross-origin restrictions.");
            }
          }}
          className="w-full py-3 px-4 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-sm font-semibold hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Share to Story
        </button>
      </div>
    </div>
  );
};
