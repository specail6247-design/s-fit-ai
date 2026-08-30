"use client";

import React from 'react';

interface ShareToStoryProps {
  imageUrl: string;
}

export function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const handleShare = async () => {
    try {
      // 1. Create a canvas to composite the image with branding
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Vertical story dimensions (9:16 aspect ratio)
      canvas.width = 1080;
      canvas.height = 1920;

      // Background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load main image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for external URLs

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Calculate scaling to fit within a specific area while maintaining aspect ratio
      // Target area: centered, with margins
      const margin = 100;
      const targetWidth = canvas.width - (margin * 2);
      const targetHeight = canvas.height - 400; // Leave room for header/footer

      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2 - 50; // slightly shifted up

      // Draw image
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Draw Branding (Header)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT NEO', canvas.width / 2, 180);

      ctx.fillStyle = '#007AFF';
      ctx.font = '30px sans-serif';
      // Basic approach since ctx.letterSpacing is relatively new/not fully supported everywhere
      ctx.fillText('VIRTUAL FITTING RESULT', canvas.width / 2, 240);

      // Draw Footer
      ctx.fillStyle = '#888888';
      ctx.font = '24px sans-serif';
      ctx.fillText('Powered by S_FIT AI', canvas.width / 2, canvas.height - 120);

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));

      if (!blob) throw new Error("Failed to create image blob");

      // Use Web Share API if available (works on mobile)
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'sfit-result.jpg', { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My S_FIT Virtual Try-On',
            text: 'Check out my virtual fitting result from S_FIT AI!',
            files: [file]
          });
          return;
        }
      }

      // Fallback: trigger download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = 'sfit-story.jpg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error('Error sharing image:', err);
      alert('Failed to generate sharing image. Please try again.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:scale-105"
    >
      <span className="text-lg">📸</span> Share to Story
    </button>
  );
}
