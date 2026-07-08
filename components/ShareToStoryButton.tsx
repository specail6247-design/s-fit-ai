import React from 'react';

export default function ShareToStoryButton({ imageUrl }: { imageUrl: string }) {
  const handleShare = async () => {
    try {
      // Fetch the image to create a file object
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "sfit-result.png", { type: blob.type });

      if (navigator.share) {
        await navigator.share({
          title: 'My S_FIT Style',
          text: 'Check out my virtual fitting on S_FIT NEO!',
          files: [file],
        });
      } else {
        // Fallback for browsers without Web Share API
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'sfit-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Sharing failed or was cancelled.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 z-30"
    >
      <span>📸</span> Share to Story
    </button>
  );
}
