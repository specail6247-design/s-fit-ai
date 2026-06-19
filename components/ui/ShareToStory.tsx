import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareToStoryProps {
  resultImageUrl: string;
}

export function ShareToStory({ resultImageUrl }: ShareToStoryProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStoryImage = async () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // 1. Draw Background (Dark Gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Load and Draw Main Result Image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // CRITICAL: Prevent canvas tainting

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = resultImageUrl;
      });

      // Calculate scaling to fit within a specific box while maintaining aspect ratio
      const padding = 100;
      const maxWidth = canvas.width - (padding * 2);
      const maxHeight = canvas.height - 400; // Leave room for branding

      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const drawX = (canvas.width - drawWidth) / 2;
      const drawY = (canvas.height - drawHeight) / 2 - 50;

      // Draw image with rounded corners effect (using clip)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(drawX, drawY, drawWidth, drawHeight, 40);
      ctx.clip();
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // 3. Draw Branding (S_FIT Logo and Text)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 180);

      ctx.fillStyle = '#007AFF';
      ctx.font = '40px monospace';
      ctx.fillText('VIRTUAL FITTING', canvas.width / 2, canvas.height - 120);

      // 4. Export and Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `sfit-story-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error('Failed to generate story image:', error);
      alert('Failed to generate story image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateStoryImage}
      disabled={isGenerating}
      className="absolute bottom-4 right-4 bg-[#007AFF] hover:bg-[#005bb5] disabled:opacity-70 text-white rounded-full p-3 shadow-lg shadow-[#007AFF]/30 transition-all flex items-center justify-center"
      aria-label="Share to Story"
      title="Download Instagram Story"
    >
      <Share2 className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
    </button>
  );
}
