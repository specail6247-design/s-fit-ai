import React, { useState } from 'react';

interface ShareToStoryProps {
  imageUrl: string;
}

export function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      // Create an off-screen canvas to generate the branded vertical image
      const canvas = document.createElement('canvas');
      // Standard Instagram Story dimensions (1080x1920)
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill background (a subtle gradient or solid color)
      ctx.fillStyle = '#0f172a'; // tailwind slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load the user's fitting image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important if image is from external URL

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Calculate how to draw the image centered and cover/contain
      // We will "contain" it with some padding or "cover" it. Let's do cover
      const scale = Math.max(canvas.width / img.width, (canvas.height * 0.8) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      // Add a dark overlay gradient at the bottom and top to make text readable
      const gradientTop = ctx.createLinearGradient(0, 0, 0, 300);
      gradientTop.addColorStop(0, 'rgba(0,0,0,0.7)');
      gradientTop.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradientTop;
      ctx.fillRect(0, 0, canvas.width, 300);

      const gradientBottom = ctx.createLinearGradient(0, canvas.height - 400, 0, canvas.height);
      gradientBottom.addColorStop(0, 'rgba(0,0,0,0)');
      gradientBottom.addColorStop(1, 'rgba(0,0,0,0.8)');
      ctx.fillStyle = gradientBottom;
      ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

      // Draw the S_FIT AI Logo text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, 150);

      // Draw a subtitle or branding tag at the bottom
      ctx.font = '40px sans-serif';
      ctx.fillText('My new virtual fit!', canvas.width / 2, canvas.height - 150);

      // Convert canvas to blob for sharing/downloading
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 's_fit_story.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'My S_FIT Style',
              text: 'Check out my new virtual fit on S_FIT AI!',
              files: [file],
            });
          } catch (err) {
            console.error('Error sharing:', err);
          }
        } else {
          // Fallback to download if web share API isn't supported for files
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 's_fit_story.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsGenerating(false);
      }, 'image/png');

    } catch (err) {
      console.error('Error generating image:', err);
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {isGenerating ? 'Generating...' : 'Share to Story'}
    </button>
  );
}
