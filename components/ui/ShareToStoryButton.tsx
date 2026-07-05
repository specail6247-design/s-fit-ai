import React from 'react';

interface ShareToStoryButtonProps {
  resultImage: string;
}

export const ShareToStoryButton: React.FC<ShareToStoryButtonProps> = ({ resultImage }) => {
  const handleShare = async () => {
    try {
      // 1. Create a canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // IG Story aspect ratio (9:16), 1080x1920 is standard
      canvas.width = 1080;
      canvas.height = 1920;

      // 2. Load the image
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for CORS if image is hosted elsewhere

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = resultImage;
      });

      // 3. Draw background (gradient or dark)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Draw image (centered, scaled to fit width or height)
      // For this example, let's scale to fit height and center horizontally
      const scale = Math.min(canvas.width / img.width, (canvas.height - 400) / img.height); // Leave room for branding
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // 5. Add Branding
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', canvas.width / 2, 150);

      ctx.fillStyle = '#007AFF';
      ctx.font = '40px monospace';
      ctx.fillText('AI GENERATED FITTING', canvas.width / 2, 220);

      // 6. Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        // Try native share first
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], 'sfit-story.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
             try {
                await navigator.share({
                  title: 'My S_FIT AI Fitting',
                  text: 'Check out my virtual fitting from S_FIT AI!',
                  files: [file],
                });
                return;
             } catch (shareError) {
                 console.log("User cancelled share or share failed", shareError);
                 // Fall through to download
             }
          }
        }

        // Fallback: Download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit-story.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (error) {
      console.error('Error sharing to story:', error);
      alert('Could not generate story image. Please try again.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
    >
      <span>📸</span> Share to Story
    </button>
  );
};
