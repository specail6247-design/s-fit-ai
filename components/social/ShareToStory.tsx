import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareToStoryProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
}

export function ShareToStory({ isOpen, onClose, resultImage }: ShareToStoryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setDownloadUrl(null);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // IG Story resolution
    canvas.width = 1080;
    canvas.height = 1920;

    try {
      // 1. Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
      gradient.addColorStop(0, '#0f172a'); // slate-900
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Load and draw the result image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for external images
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = resultImage;
      });

      // Calculate scaling to fit nicely with padding
      const padding = 100;
      const targetWidth = 1080 - (padding * 2);
      const scale = targetWidth / img.width;
      const targetHeight = img.height * scale;

      const x = padding;
      const y = (1920 - targetHeight) / 2;

      // Draw shadow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.4)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Draw image
      ctx.drawImage(img, x, y, targetWidth, targetHeight);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 3. Draw Branding (S_FIT AI Logo)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', 540, 150);

      // Subtitle
      ctx.fillStyle = '#007AFF';
      ctx.font = 'italic 30px sans-serif';
      ctx.fillText('Professional Virtual Fitting', 540, 210);

      // Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '24px sans-serif';
      ctx.fillText('Try it yourself at sfit.ai', 540, 1820);

      // Generate data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setDownloadUrl(dataUrl);

    } catch (err) {
      console.error('Failed to generate story image:', err);
      alert('Failed to generate story image.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate on open
  React.useEffect(() => {
    if (isOpen) {
      generateImage();
    }
  }, [isOpen]);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'sfit_story.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm flex flex-col items-center"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-50 bg-black/50 rounded-full p-2">✕ Close</button>

            <h2 className="text-xl font-bold text-white mb-2 text-center">Ready for Instagram</h2>
            <p className="text-xs text-gray-400 mb-6 text-center">Download this image and share it to your story!</p>

            {/* Hidden canvas for drawing */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Preview Area */}
            <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden border border-white/20 shadow-2xl mb-6">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="animate-spin text-[#007AFF] text-4xl mb-4">⚙️</div>
                  <p className="text-xs text-[#007AFF] font-mono animate-pulse">GENERATING BRANDED IMAGE...</p>
                </div>
              ) : downloadUrl ? (
                <img src={downloadUrl} alt="Story Preview" className="w-full h-full object-cover" />
              ) : null}
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleDownload}
              disabled={isGenerating || !downloadUrl}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            >
              <span>⬇️</span> Save Image
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
