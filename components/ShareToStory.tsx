import React, { useState, useRef } from 'react';

interface ShareToStoryProps {
  imageUrl: string;
}

export default function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const [isSharing, setIsSharing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas context not available");

      // Set canvas to vertical 9:16 aspect ratio (e.g., 1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background (e.g., a dark gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load main image
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate image dimensions to fit nicely within canvas (contain within safe zone)
      const scale = Math.min((canvas.width * 0.9) / img.width, (canvas.height * 0.7) / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      // Draw image
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Draw branding overlay
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, 150);

      ctx.font = '30px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillStyle = '#007AFF';
      ctx.fillText('VIRTUAL FITTING STUDIO', canvas.width / 2, 210);

      // Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '40px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillText('Tap to Try It On', canvas.width / 2, canvas.height - 100);

      // Trigger download or native share
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      // Fallback to downloading the image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 's_fit_story.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Failed to generate story image:", error);
      alert("Failed to generate story image.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white font-bold rounded-lg transition-all disabled:opacity-50 mt-4 shadow-lg"
      >
        <span>📸</span>
        {isSharing ? 'Generating Story...' : 'Share to IG Story'}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
