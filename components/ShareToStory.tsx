'use client';

import React, { useState } from 'react';

export function ShareToStory({ imageUrl }: { imageUrl: string }) {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    setSharing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Set canvas size for Instagram Story (1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      const scale = Math.min(canvas.width / img.width, (canvas.height - 400) / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2 - 100; // Shift up slightly

      // Add a subtle glow/shadow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.3)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Draw the image with rounded corners effect using clipping
      ctx.save();
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + scaledWidth - radius, y);
      ctx.quadraticCurveTo(x + scaledWidth, y, x + scaledWidth, y + radius);
      ctx.lineTo(x + scaledWidth, y + scaledHeight - radius);
      ctx.quadraticCurveTo(x + scaledWidth, y + scaledHeight, x + scaledWidth - radius, y + scaledHeight);
      ctx.lineTo(x + radius, y + scaledHeight);
      ctx.quadraticCurveTo(x, y + scaledHeight, x, y + scaledHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      ctx.restore();

      // Reset shadow for text
      ctx.shadowColor = 'transparent';

      // Draw Logo / Branding
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, y + scaledHeight + 100);

      ctx.fillStyle = '#007AFF';
      ctx.font = '30px monospace';
      ctx.fillText('VIRTUAL FITTING RESULT', canvas.width / 2, y + scaledHeight + 160);

      // Convert to blob
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));

      if (!blob) throw new Error('Failed to create image blob');

      const file = new File([blob], 'sfit-story.jpg', { type: 'image/jpeg' });

      // Try Web Share API if supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My S_FIT AI Try-On',
          text: 'Check out my virtual fitting result on S_FIT AI!',
        });
      } else {
        // Fallback to download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit-story.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('Failed to generate story image. Please try again.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="absolute bottom-4 right-4 bg-gradient-to-r from-[#007AFF] to-[#005bb5] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-[0_0_15px_rgba(0,122,255,0.6)] transition-all flex items-center gap-2 disabled:opacity-50"
    >
      <span className="text-lg">📱</span>
      {sharing ? 'GENERATING...' : 'SHARE TO STORY'}
    </button>
  );
}
