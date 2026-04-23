import React, { useRef, useState } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShareToStory = async () => {
    if (!canvasRef.current) return;
    setIsSharing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1080x1920 is standard IG Story size
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw dark background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a subtle gold gradient background effect
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#050505');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load main result image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = resultImage;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Calculate dimensions to maintain aspect ratio and fit beautifully
      const imgAspect = img.width / img.height;
      const drawWidth = 900;
      const drawHeight = drawWidth / imgAspect;

      // Center image
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2 - 100; // Shift up slightly for footer

      // Draw image with rounded corners effect via clipping
      ctx.save();
      ctx.beginPath();
      const radius = 40;
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + drawWidth - radius, y);
      ctx.quadraticCurveTo(x + drawWidth, y, x + drawWidth, y + radius);
      ctx.lineTo(x + drawWidth, y + drawHeight - radius);
      ctx.quadraticCurveTo(x + drawWidth, y + drawHeight, x + drawWidth - radius, y + drawHeight);
      ctx.lineTo(x + radius, y + drawHeight);
      ctx.quadraticCurveTo(x, y + drawHeight, x, y + drawHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.restore();

      // Add gold border around the image
      ctx.strokeStyle = '#C9B037';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Add branding at the bottom
      ctx.fillStyle = '#C9B037';
      ctx.font = 'bold 60px serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, y + drawHeight + 150);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '30px sans-serif';
      ctx.fillText('Virtual Try-On Experience', canvas.width / 2, y + drawHeight + 220);

      // Convert to blob and share
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'sfit-story.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My S_FIT AI Look',
            files: [file],
          });
        } else {
          // Fallback if sharing API not supported (e.g., desktop)
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sfit-story.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error generating story image:', error);
    } finally {
      setIsSharing(false);
      if (onShare) onShare();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--color-secondary)]">
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

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
          disabled={isSharing}
          className="flex-1 py-3 px-4 rounded-full bg-[#C9B037] text-black text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSharing ? 'Preparing...' : 'Share to Story'}
        </button>
      </div>
    </div>
  );
};
