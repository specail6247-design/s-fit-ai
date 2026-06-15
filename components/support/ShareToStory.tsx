import React, { useState } from 'react';

interface ShareToStoryProps {
  imageUrl: string;
}

export function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleShare = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      // Draw background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for CORS

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        // In a real app, you'd proxy the image URL to avoid canvas tainting
        // For now, we'll try to use the raw URL
        img.src = imageUrl;
      });

      // Calculate scale to fit width (or height depending on ratio)
      const scale = Math.min(canvas.width / img.width, (canvas.height * 0.8) / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      // Draw image
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Draw Logo/Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 60px "Geist Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, canvas.height - 100);

      // Export
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      // Trigger download
      const link = document.createElement('a');
      link.download = `s_fit_story_${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();

    } catch (err) {
      console.error('Failed to export story', err);
      alert('Failed to generate story image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isExporting}
      className="w-full mt-3 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
      {isExporting ? 'GENERATING STORY...' : 'SHARE TO STORY (9:16)'}
    </button>
  );
}
