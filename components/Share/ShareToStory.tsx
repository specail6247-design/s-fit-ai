import React, { useState } from 'react';

interface ShareToStoryProps {
  imageUrl: string | null;
}

export default function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!imageUrl) return;

    setIsGenerating(true);

    try {
      // Create a canvas to compose the story image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");

      // Instagram Story dimensions (9:16 aspect ratio)
      canvas.width = 1080;
      canvas.height = 1920;

      // Draw background (dark theme)
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw the main image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate aspect ratio to fit image nicely
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.width / imgRatio;

      if (drawHeight > canvas.height * 0.8) {
        drawHeight = canvas.height * 0.8;
        drawWidth = drawHeight * imgRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Add Logo / Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 60px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = 'italic 40px Inter, sans-serif';
      ctx.fillText('NEO', canvas.width / 2 + 150, 150);

      // Add bottom text
      ctx.fillStyle = '#888888';
      ctx.font = '30px Inter, sans-serif';
      ctx.fillText('Try it on at s-fit.ai', canvas.width / 2, canvas.height - 100);

      // Convert to blob and download (simulating share for web)
      // In a real mobile app, this would use the Web Share API with files
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit-story.jpg';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.9);

    } catch (error) {
      console.error("Error generating story image:", error);
      alert("Failed to generate story image.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!imageUrl) return null;

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.884 8.214A1.125 1.125 0 0 0 9.07 11.5v2.89a1.125 1.125 0 0 0 1.046 1.036 1.126 1.126 0 0 0 1.046-1.036v-1.742l1.625 1.48a1.124 1.124 0 0 0 1.528 0l2.366-2.155a.75.75 0 1 0-1.014-1.108l-1.859 1.693-1.625-1.48a1.124 1.124 0 0 0-1.528 0l-.534.486v-.664c0-.62-.504-1.125-1.125-1.125Z"
          clipRule="evenodd"
        />
        <path d="M12 6.75a.75.75 0 0 1 .75.75v1.272l1.096-.693a.75.75 0 0 1 .808 1.267l-2.008 1.27c-.206.13-.463.13-.67 0l-2.007-1.27a.75.75 0 1 1 .808-1.267l1.096.693V7.5a.75.75 0 0 1 .75-.75Z" />
      </svg>
      {isGenerating ? 'Generating...' : 'Share to Story'}
    </button>
  );
}
