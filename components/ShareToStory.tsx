"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareToStoryProps {
  isOpen: boolean;
  onClose: () => void;
  resultImageUrl: string;
}

export default function ShareToStory({ isOpen, onClose, resultImageUrl }: ShareToStoryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isOpen || !resultImageUrl) return;

    let isMounted = true;

    const generate = async () => {
      setIsGenerating(true);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size for Instagram Story (1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // Load Image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = resultImageUrl;

      img.onload = () => {
        if (!isMounted) return;

        // Draw background (black)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Image (Cover fit)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Add Gradient Overlay (Bottom)
        const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add Logo Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 80px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 200);

        // Add Subtitle
        ctx.fillStyle = '#007AFF';
        ctx.font = '50px sans-serif';
        ctx.letterSpacing = '10px';
        ctx.fillText('VIRTUAL FITTING', canvas.width / 2, canvas.height - 120);

        // Add Date/Watermark
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '30px monospace';
        ctx.fillText(new Date().toLocaleDateString().toUpperCase(), canvas.width / 2, canvas.height - 60);

        // Export
        setGeneratedImage(canvas.toDataURL('image/png'));
        setIsGenerating(false);
      };

      img.onerror = () => {
        if (!isMounted) return;
        console.error("Failed to load image for story generation");
        setIsGenerating(false);
      };
    };

    // Small delay to ensure canvas is ready
    const timer = setTimeout(generate, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, resultImageUrl]);

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `s_fit_story_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <div className="relative flex w-full max-w-sm flex-col items-center gap-6">
          <button
            onClick={onClose}
            className="absolute -right-4 -top-12 text-white hover:text-gray-300"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-white">Share to Story</h2>
            <p className="text-sm text-gray-400">Your look is ready to go viral.</p>
          </div>

          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
            {isGenerating ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="size-8 animate-spin rounded-full border-2 border-[#007AFF] border-t-transparent"></span>
              </div>
            ) : generatedImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={generatedImage} alt="Story Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                Failed to generate
              </div>
            )}
          </div>

          <button
            onClick={downloadImage}
            disabled={!generatedImage}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-bold text-white shadow-lg shadow-purple-900/20 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">download</span>
            Save for Instagram
          </button>

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
