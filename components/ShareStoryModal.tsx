'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function ShareStoryModal({ isOpen, onClose, imageUrl }: ShareStoryModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  // Generate the branded story image when opened
  useEffect(() => {
    if (!isOpen || !imageUrl || !canvasRef.current) return;

    /* eslint-disable react-hooks/set-state-in-effect */
    setIsGenerating(true);
    setFinalImage(null);
    /* eslint-enable react-hooks/set-state-in-effect */

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Story dimensions (1080x1920 is standard)
    canvas.width = 1080;
    canvas.height = 1920;

    // Draw background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#111');
    gradient.addColorStop(1, '#050505');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.crossOrigin = "anonymous"; // Important for CORS
    img.onload = () => {
      // Calculate sizing to fit image in center while maintaining aspect ratio
      const padding = 100;
      const availableWidth = canvas.width - (padding * 2);
      const availableHeight = canvas.height * 0.7; // Use 70% of height for image

      const imgRatio = img.width / img.height;
      const canvasRatio = availableWidth / availableHeight;

      let drawWidth, drawHeight;

      if (imgRatio > canvasRatio) {
        drawWidth = availableWidth;
        drawHeight = availableWidth / imgRatio;
      } else {
        drawHeight = availableHeight;
        drawWidth = availableHeight * imgRatio;
      }

      const drawX = (canvas.width - drawWidth) / 2;
      const drawY = (canvas.height - drawHeight) / 2;

      // Draw image border/glow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.4)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      // Draw image
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Reset shadow for text
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Add Brand Text
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';

      // Top header
      ctx.font = 'italic 900 60px "Space Grotesk", sans-serif';
      ctx.fillText('S_FIT', canvas.width / 2, 180);

      ctx.fillStyle = '#007AFF';
      ctx.fillText('NEO', (canvas.width / 2) + 90, 180); // Rough offset

      // Bottom footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '400 36px monospace';
      ctx.fillText('VIRTUAL ATELIER', canvas.width / 2, canvas.height - 150);

      // AI Badge
      ctx.fillStyle = 'rgba(0, 122, 255, 0.1)';
      ctx.strokeStyle = 'rgba(0, 122, 255, 0.5)';
      ctx.lineWidth = 2;

      const badgeWidth = 240;
      const badgeHeight = 60;
      const badgeX = (canvas.width - badgeWidth) / 2;
      const badgeY = canvas.height - 100;

      // Rounded rect
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#007AFF';
      ctx.font = '700 24px monospace';
      ctx.fillText('AI GENERATED', canvas.width / 2, badgeY + 40);

      // Convert to image
      setFinalImage(canvas.toDataURL('image/jpeg', 0.9));
      setIsGenerating(false);
    };

    // Handle error
    img.onerror = () => {
      console.error("Failed to load image for story generation");
      setIsGenerating(false);
    };

    // Need a proxy or to load directly if it's data URL
    img.src = imageUrl;

  }, [isOpen, imageUrl]);

  const handleDownload = () => {
    if (!finalImage) return;
    const a = document.createElement('a');
    a.href = finalImage;
    a.download = 's_fit_story.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-md flex flex-col items-center"
          >
            {/* Hidden canvas for generation */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="w-full flex justify-end mb-4">
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full aspect-[9/16] max-h-[70vh] bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-gray-400 font-mono">GENERATING STORY...</p>
                </div>
              ) : finalImage ? (
                <img src={finalImage} alt="Story Preview" className="w-full h-full object-contain" />
              ) : (
                <p className="text-red-400 text-sm">Failed to generate image</p>
              )}
            </div>

            <div className="w-full mt-6 space-y-3">
              <button
                onClick={handleDownload}
                disabled={isGenerating || !finalImage}
                className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>⬇️</span> Save to Device
              </button>
              <p className="text-xs text-center text-gray-500">
                Save the image to share it directly to your Instagram Story
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
