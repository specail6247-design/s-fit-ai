import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ShareToStoryModal({ isOpen, onClose, imageUrl, resultText = "S_FIT AI Try-On" }: { isOpen: boolean; onClose: () => void; imageUrl: string | null; resultText?: string; }) {
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const generateStoryImage = async () => {
    if (!imageUrl || !canvasRef.current) return;
    setDownloading(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1920;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#111111');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // Load Image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate Image Dimensions to fit
      const imgAspect = img.width / img.height;
      let drawWidth = 900;
      let drawHeight = 900 / imgAspect;

      if (drawHeight > 1400) {
        drawHeight = 1400;
        drawWidth = 1400 * imgAspect;
      }

      const x = (1080 - drawWidth) / 2;
      const y = (1920 - drawHeight) / 2;

      // Draw Image with shadow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.5)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Rounded corners clipping
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, drawWidth, drawHeight, 40);
      ctx.clip();
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Reset clip and shadow
      ctx.restore();
      ctx.shadowColor = 'transparent';

      // Header Brand
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px "Geist Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT NEO', 540, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 40px "Geist Mono", monospace';
      ctx.fillText('VIRTUAL FITTING ROOM', 540, 220);

      // Footer
      ctx.fillStyle = '#AAAAAA';
      ctx.font = '40px "Geist Sans", sans-serif';
      ctx.fillText(resultText, 540, 1800);
      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 30px "Geist Mono", monospace';
      ctx.fillText('@sfit.ai', 540, 1860);

      // Download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = 'sfit_story.jpg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err);
      alert('Failed to generate story image. Please try again.');
    } finally {
      setDownloading(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
        <motion.div
          className="relative flex flex-col items-center z-10 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Share to Story <span className="text-[#F77737]">📸</span></h3>

          {/* Preview Container */}
          <div className="relative w-48 h-80 rounded-2xl bg-gradient-to-b from-[#050505] to-[#111111] border-4 border-[#007AFF] shadow-[0_0_30px_rgba(0,122,255,0.4)] overflow-hidden flex flex-col items-center justify-center p-2 mb-8 pointer-events-none">
             <div className="text-white font-bold text-sm tracking-widest mt-2">S_FIT NEO</div>
             <div className="flex-1 w-full relative mt-2 rounded-lg overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {imageUrl && <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />}
             </div>
             <div className="text-[#007AFF] font-mono text-[10px] mt-2 mb-2">@sfit.ai</div>
          </div>

          {/* Hidden Canvas for Generation */}
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex flex-col gap-3 w-full">
             <button
               onClick={generateStoryImage}
               disabled={downloading || !imageUrl}
               className="w-full py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {downloading ? 'Preparing Image...' : 'Save Story Image'}
             </button>
             <button onClick={onClose} className="w-full py-3 border border-white/20 text-gray-300 font-bold rounded-xl hover:bg-white/5 transition-colors text-sm">
               Cancel
             </button>
             <p className="text-[10px] text-gray-500 text-center mt-2 px-4">
                Saves a 1080x1920 image to your device, ready to upload to Instagram or Snapchat Stories.
             </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
