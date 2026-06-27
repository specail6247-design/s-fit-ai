'use client';
import React, { useRef, useState } from 'react';

interface ShareToStoryProps {
  resultImage: string;
}

export function ShareToStory({ resultImage }: ShareToStoryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStory = async () => {
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Instagram Story dimensions
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background (dark gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // Load and draw result image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = resultImage;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate scaling to fit nicely in the middle
      const scale = Math.min(900 / img.width, 1200 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1080 - w) / 2;
      const y = (1920 - h) / 2 - 100; // slightly up

      // Draw image with rounded corners effect (using clip)
      ctx.save();
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();

      // Add branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT', 540, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 40px monospace';
      ctx.fillText('AI GENERATED FIT', 540, 220);

      // Export
      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], 's_fit_story.png', { type: 'image/png' });

        // Use Web Share API if available
        if (navigator.share && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: 'My S_FIT Look',
            text: 'Check out my virtual fit from S_FIT!',
          }).catch(console.error);
        } else {
          // Fallback download
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 's_fit_story.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');

    } catch (e) {
      console.error("Failed to generate story", e);
      alert("Failed to generate story image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={generateStory}
        disabled={isGenerating}
        className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? "GENERATING..." : "📸 SHARE TO IG STORY"}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
