'use client';
import React from 'react';

interface ShareToStoryProps {
  resultImage: string;
}

export const ShareToStory: React.FC<ShareToStoryProps> = ({ resultImage }) => {
  const handleShare = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw black background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw result image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = resultImage;
    await new Promise((resolve) => {
      img.onload = () => {
        // Calculate aspect ratio to fit width and center vertically
        const scale = canvas.width / img.width;
        const newWidth = canvas.width;
        const newHeight = img.height * scale;
        const yOffset = (canvas.height - newHeight) / 2;

        ctx.drawImage(img, 0, yOffset, newWidth, newHeight);

        // Draw Branding
        ctx.fillStyle = '#C9B037';
        ctx.font = 'bold 60px monospace';
        ctx.fillText('S_FIT AI', 80, 120);

        ctx.fillStyle = '#ffffff';
        ctx.font = '30px sans-serif';
        ctx.fillText('Virtual Try-On Result', 80, 180);

        resolve(true);
      };
    });

    // Create download link for the composite image
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const link = document.createElement('a');
    link.download = 'sfit-story-share.jpg';
    link.href = dataUrl;
    link.click();
  };

  return (
    <button
      onClick={handleShare}
      className="flex-1 py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)] flex items-center justify-center gap-2"
    >
      <span>📸</span> Share to Story
    </button>
  );
};
