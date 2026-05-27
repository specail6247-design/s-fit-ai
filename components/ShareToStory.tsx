'use client';

import React, { useRef } from 'react';

interface ShareToStoryProps {
  imageUrl: string;
}

export default function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleShare = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions for IG Story (1080x1920)
    canvas.width = 1080;
    canvas.height = 1920;

    // Load user image
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for CORS
    img.src = imageUrl;

    img.onload = () => {
      // 1. Draw Background (Gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Image (centered, scaled)
      const scale = Math.min(canvas.width / img.width, (canvas.height * 0.7) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2 - 100; // offset slightly up

      ctx.drawImage(img, x, y, w, h);

      // 3. Add Brand Text / Logo
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 300);

      ctx.fillStyle = '#007AFF';
      ctx.font = '40px monospace';
      ctx.fillText('VIRTUAL FITTING', canvas.width / 2, canvas.height - 220);

      // 4. Export and download
      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = 'sfit-story.jpg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error("Error exporting canvas. This might be a CORS issue with the image source.", e);
        alert("Could not generate story image due to security restrictions on the image source.");
      }
    };

    img.onerror = () => {
        alert("Failed to load image for story generation.");
    };
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span>📸</span> SHARE TO STORY
      </button>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
