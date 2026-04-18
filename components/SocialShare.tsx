"use client";

import React, { useRef, useState } from 'react';

export function SocialShare({ resultImage }: { resultImage: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShareToStory = async () => {
    if (!canvasRef.current || !resultImage) return;
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Ensure vertical 9:16 aspect ratio (e.g., 1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background (void black with subtle gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add "Masterpiece Fit" subtle pattern/text in background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.font = 'bold 120px "Space Grotesk", sans-serif';
      ctx.fillText('S_FIT AI', 100, 300);

      // Load and draw the result image in the center
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for external images
      img.src = resultImage;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate scale to fit width while maintaining aspect ratio, or fit height
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawWidth = canvas.width * 0.9; // Leave some margin
      let drawHeight = drawWidth / imgAspect;

      if (drawHeight > canvas.height * 0.7) {
        drawHeight = canvas.height * 0.7;
        drawWidth = drawHeight * imgAspect;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      // Draw image with rounded corners effect (using clip)
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

      // Draw Logo/Branding at the bottom
      ctx.fillStyle = '#C9B037'; // Luxury Gold
      ctx.font = 'bold 60px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillText('MASTERPIECE FIT', canvas.width / 2, canvas.height - 150);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '40px "Inter", sans-serif';
      ctx.fillText('sfit.ai', canvas.width / 2, canvas.height - 80);

      // Export to blob
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas to Blob failed');

        const file = new File([blob], 'sfit-story.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Masterpiece Fit',
            text: 'Check out my virtual try-on with S_FIT AI!',
          });
        } else {
          // Fallback to download
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sfit-story.png';
          a.click();
          URL.revokeObjectURL(url);
          alert('Image downloaded! You can now share it to your story.');
        }
        setIsGenerating(false);
      }, 'image/png');

    } catch (error) {
      console.error('Error sharing to story:', error);
      alert('Failed to generate story image. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShareToStory}
        disabled={isGenerating}
        className="mt-4 w-full bg-gradient-to-r from-[#C9B037] to-[#e0c95c] hover:from-[#e0c95c] hover:to-[#fff1b0] text-[#050505] font-serif font-bold uppercase tracking-widest py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : '📸 Share to Story'}
      </button>
      {/* Hidden canvas for compositing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
