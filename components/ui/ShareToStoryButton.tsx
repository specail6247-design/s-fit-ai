'use client';

import React, { useState } from 'react';

interface ShareToStoryButtonProps {
  resultImage: string;
}

export function ShareToStoryButton({ resultImage }: ShareToStoryButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      // Create canvas for 9:16 aspect ratio (Instagram Story size)
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      // Draw background (Night City Vibe gradient)
      const gradient = ctx.createRadialGradient(540, 960, 0, 540, 960, 1000);
      gradient.addColorStop(0, '#1e3a8a'); // from-blue-900/20 equivalent
      gradient.addColorStop(0.5, '#000000'); // via-black
      gradient.addColorStop(1, '#000000'); // to-black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add branding text top
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Geist Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', 540, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = '30px "Geist Mono", monospace';
      ctx.fillText('VIRTUAL FITTING', 540, 200);

      // Load and draw result image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for external images

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = resultImage;
      });

      // Calculate aspect ratio to fit image nicely in center
      const imgRatio = img.width / img.height;
      const targetWidth = 900;
      const targetHeight = targetWidth / imgRatio;
      const x = (canvas.width - targetWidth) / 2;
      const y = (canvas.height - targetHeight) / 2;

      // Draw image with a simple shadow effect (simulated by drawing a slightly larger black rect behind)
      ctx.shadowColor = 'rgba(0, 122, 255, 0.4)';
      ctx.shadowBlur = 40;
      ctx.drawImage(img, x, y, targetWidth, targetHeight);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Add footer branding
      ctx.fillStyle = '#ffffff';
      ctx.font = '40px sans-serif';
      ctx.fillText('My Digital Twin', 540, 1750);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error("Could not generate blob");

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit-story.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (err) {
      console.error("Error generating story:", err);
      alert("Could not generate story image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="absolute bottom-4 right-4 bg-[#007AFF] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      <span>📸</span> {isGenerating ? 'Generating...' : 'Share to Story'}
    </button>
  );
}
