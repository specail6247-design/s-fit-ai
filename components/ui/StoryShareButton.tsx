import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface StoryShareButtonProps {
  targetId: string;
  className?: string;
}

export const StoryShareButton: React.FC<StoryShareButtonProps> = ({ targetId, className }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: '#0a0a0a',
        scale: 2 // High resolution for stories
      });

      const image = canvas.toDataURL('image/jpeg', 0.9);

      // Attempt native share if available (Mobile)
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], 'sfit-result.jpg', { type: 'image/jpeg' });

        await navigator.share({
          title: 'My S_FIT AI Look',
          text: 'Check out my virtual fitting result!',
          files: [file]
        });
      } else {
        // Fallback: Download image
        const link = document.createElement('a');
        link.download = 'sfit-story.jpg';
        link.href = image;
        link.click();
        alert('Image downloaded! You can now share it to your Instagram Story.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate share image.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <span className="text-lg">📸</span>
      {isGenerating ? 'Generating...' : 'Share to Story'}
    </button>
  );
};
