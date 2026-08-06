import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

export default function ShareToStory({ targetId }: { targetId: string }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    setIsSharing(true);
    try {
      const canvas = await html2canvas(targetElement, {
        useCORS: true,
        backgroundColor: '#050505',
        scale: 2, // High resolution
        ignoreElements: (element) => element.getAttribute('data-html2canvas-ignore') === 'true',
      });

      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);

      // In a real mobile app, this would use the Web Share API or native bridge
      // For web, we'll download it with instructions

      // Attempt Web Share API first
      if (navigator.share) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'sfit-result.jpg', { type: 'image/jpeg' });

        await navigator.share({
          title: 'My S_FIT Try-On',
          text: 'Check out my new fit! 🔥 #SFITAI',
          files: [file]
        }).catch(err => {
          console.log("Share cancelled or failed:", err);
          fallbackDownload(imageUrl);
        });
      } else {
        fallbackDownload(imageUrl);
      }
    } catch (error) {
      console.error("Error generating share image:", error);
      alert("Failed to generate share image.");
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackDownload = (dataUrl: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'sfit-story.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Image downloaded! You can now share it to your Instagram Story.");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 z-50 disabled:opacity-50"
      data-html2canvas-ignore="true"
    >
      <span>📸</span> {isSharing ? 'Generating...' : 'Share to Story'}
    </motion.button>
  );
}
