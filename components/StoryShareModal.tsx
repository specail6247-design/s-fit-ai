import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string | null;
}

export default function StoryShareModal({ isOpen, onClose, resultImage }: StoryShareModalProps) {
  const [storyImageUrl, setStoryImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !resultImage) return;

    let isMounted = true;

    const timer = setTimeout(() => {
      setIsGenerating(true);
    }, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Instagram Story Dimensions (9:16)
    canvas.width = 1080;
    canvas.height = 1920;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // 1. Draw Background (Dark Gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#111111');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Image (Contain & Center)
      const padding = 100;
      const availableWidth = canvas.width - (padding * 2);
      const availableHeight = canvas.height - 400; // Leave room for branding

      const scale = Math.min(availableWidth / img.width, availableHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (canvas.width - drawWidth) / 2;
      const dy = (canvas.height - drawHeight) / 2 - 50; // Shift up slightly

      // Add shadow
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Draw image with rounded corners effect using clipping
      ctx.save();
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(dx + radius, dy);
      ctx.lineTo(dx + drawWidth - radius, dy);
      ctx.quadraticCurveTo(dx + drawWidth, dy, dx + drawWidth, dy + radius);
      ctx.lineTo(dx + drawWidth, dy + drawHeight - radius);
      ctx.quadraticCurveTo(dx + drawWidth, dy + drawHeight, dx + drawWidth - radius, dy + drawHeight);
      ctx.lineTo(dx + radius, dy + drawHeight);
      ctx.quadraticCurveTo(dx, dy + drawHeight, dx, dy + drawHeight - radius);
      ctx.lineTo(dx, dy + radius);
      ctx.quadraticCurveTo(dx, dy, dx + radius, dy);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      ctx.restore();

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // 3. Draw Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      // S_FIT Logo
      ctx.font = 'bold italic 80px "Space Grotesk", sans-serif';
      ctx.fillText('S_FIT', canvas.width / 2 - 70, canvas.height - 150);

      ctx.fillStyle = '#007AFF';
      ctx.fillText('NEO', canvas.width / 2 + 100, canvas.height - 150);

      // Subtitle
      ctx.fillStyle = '#888888';
      ctx.font = '30px monospace';
      ctx.letterSpacing = '10px';
      ctx.fillText('VIRTUAL ATELIER', canvas.width / 2, canvas.height - 80);

      if (isMounted) {
        setStoryImageUrl(canvas.toDataURL('image/jpeg', 0.9));
        setIsGenerating(false);
      }
    };

    img.src = resultImage;

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, resultImage]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#111] border border-white/10 rounded-3xl p-6 max-w-sm w-full flex flex-col items-center shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-white font-bold mb-4 text-center">Share to Story</h2>

            {/* Hidden canvas for generation */}
            <canvas ref={canvasRef} className="hidden" />

            <div className="w-full aspect-[9/16] bg-black/50 rounded-2xl border border-white/10 overflow-hidden relative mb-6">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#007AFF]">
                  <span className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
                  <span className="text-xs font-mono">GENERATING...</span>
                </div>
              ) : storyImageUrl ? (
                <img src={storyImageUrl} alt="Story Preview" className="w-full h-full object-contain" />
              ) : null}
            </div>

            <div className="w-full space-y-3">
              <a
                href={storyImageUrl || '#'}
                download="sfit-story.jpg"
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  storyImageUrl ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e: React.MouseEvent) => {
                  if (!storyImageUrl) e.preventDefault();
                }}
              >
                📸 Save Story Image
              </a>
              <p className="text-[10px] text-gray-500 text-center">
                Download and share directly to Instagram
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
