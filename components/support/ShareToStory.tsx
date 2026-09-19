import React, { useState } from 'react';

interface ShareToStoryProps {
  imageUrl: string | null;
}

export function ShareToStory({ imageUrl }: ShareToStoryProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!imageUrl) return;
    setIsSharing(true);
    // In a real implementation, this would:
    // 1. Create a canvas
    // 2. Draw the image with a 9:16 aspect ratio (Instagram Story size)
    // 3. Add branding/logo overlays
    // 4. Trigger native share API or download the image

    setTimeout(() => {
      alert("Simulated: Branded Story Image Generated! Ready to share to Instagram.");
      setIsSharing(false);
    }, 1500);
  };

  if (!imageUrl) return null;

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="mt-4 w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg"
    >
      <span>📸</span> {isSharing ? 'Generating Story...' : 'Share to Story'}
    </button>
  );
}
