import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SocialShareButtonProps {
  imageUrl: string;
}

export default function SocialShareButton({ imageUrl }: SocialShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    setIsGenerating(true);

    try {
      // 1. Create a canvas to compose the branded image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      // Set dimensions for Instagram Story (1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load main image
      const img = new window.Image();
      img.crossOrigin = 'anonymous'; // Important for external images

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Calculate scaling to fit image nicely in center
      const scale = Math.min((canvas.width - 100) / img.width, (canvas.height - 400) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      // Draw image
      ctx.drawImage(img, x, y, w, h);

      // Add Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT NEO', canvas.width / 2, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = '40px monospace';
      ctx.fillText('AI VIRTUAL FITTING', canvas.width / 2, 220);

      // Add watermark/footer
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '30px sans-serif';
      ctx.fillText('Try it at s-fit.neo', canvas.width / 2, canvas.height - 100);

      // 2. Convert to Blob
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Failed to create blob");

        // 3. Try to use Web Share API
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], 'sfit-neo-tryon.png', { type: 'image/png' });

          if (navigator.canShare({ files: [file] })) {
             try {
                await navigator.share({
                  title: 'My Virtual Try-On',
                  text: 'Check out my AI fitting result from S_FIT NEO! 🚀',
                  files: [file]
                });
             } catch (shareErr) {
                console.log("Share cancelled or failed", shareErr);
                fallbackDownload(blob);
             }
          } else {
             fallbackDownload(blob);
          }
        } else {
          fallbackDownload(blob);
        }
        setIsGenerating(false);
      }, 'image/png');

    } catch (error) {
      console.error("Error generating share image:", error);
      alert("Failed to generate share image.");
      setIsGenerating(false);
    }
  };

  const fallbackDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sfit-neo-story.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Image downloaded! You can now share it to your story.");
  };

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {isGenerating ? (
        <span className="animate-pulse">GENERATING...</span>
      ) : (
        <>
          <span>📸</span> SHARE TO STORY
        </>
      )}
    </button>
  );
}
