import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

interface FittingResultProps {
  originalImage: string;
  resultImage: string;
  matchScore: number;
  onShare?: () => void;
  onRetake?: () => void;
}

export const FittingResult: React.FC<FittingResultProps> = ({

  resultImage,
  matchScore,
  onShare,
  onRetake,
}) => {
  const [isGeneratingStory, setIsGeneratingStory] = React.useState(false);
  const handleShareToStory = async () => {
    setIsGeneratingStory(true);
    try {
      const element = document.getElementById('story-canvas-container');
      if (!element) return;

      const brandingElement = document.getElementById('story-branding');
      if (brandingElement) {
        brandingElement.classList.remove('opacity-0', '-z-10');
        brandingElement.classList.add('z-50');
      }

      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: '#0A0A0A',
        scale: 2, // High resolution for stories
      });

      if (brandingElement) {
        brandingElement.classList.add('opacity-0', '-z-10');
        brandingElement.classList.remove('z-50');
      }

      const image = canvas.toDataURL('image/jpeg', 0.9);

      // Check if Web Share API is available and supports sharing files
      if (navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(image)).blob();
          const file = new File([blob], 'sfit-story.jpg', { type: 'image/jpeg' });
          if (navigator.canShare({ files: [file] })) {
             await navigator.share({
               title: 'My S_FIT AI Try-On',
               text: 'Check out my new fit! #SFIT #VirtualTryOn',
               files: [file]
             });
             setIsGeneratingStory(false);
             return;
          }
        } catch (e) {
          console.error("Native share failed", e);
        }
      }

      // Fallback: Download the image
      const link = document.createElement('a');
      link.download = 'sfit-story.jpg';
      link.href = image;
      link.click();
      alert('Story image downloaded! You can now share it to Instagram Stories.');

    } catch (error) {
      console.error('Failed to generate story image:', error);
      alert('Failed to generate story image. Please try again.');
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-color)] bg-[var(--color-secondary)]">
      <div id="story-canvas-container" className="relative w-full">
      {/* AR Overlay UI */}
      <div className="relative aspect-[3/4]">
        <Image
          src={resultImage}
          alt="Virtual Try-On Result"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
          unoptimized
        />

        {/* Scanning Line Animation */}
        <motion.div
          className="absolute inset-x-0 h-px bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
          initial={{ top: "0%" }}
          animate={{ top: "100%", opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* HUD Elements */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-xs font-mono text-white">LIVE_FIT</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
           <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-xs font-mono text-[var(--color-primary)]">
              {matchScore}% MATCH
            </span>
          </div>
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
      </div>

        {/* Story Branding (Hidden by default, shown in canvas or overlaid) */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-0 -z-10" id="story-branding">
          <h1 className="text-4xl font-black text-white drop-shadow-lg">S_FIT AI</h1>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-4 backdrop-blur-xl bg-black/80 absolute bottom-0 inset-x-0">
        <button
          onClick={onRetake}
          className="flex-1 py-3 px-4 rounded-full border border-[var(--border-color)] text-white text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Retake
        </button>
        <div className="flex-1 flex gap-2">
          <button
            onClick={onShare}
            className="flex-1 py-3 px-4 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-semibold hover:brightness-110 transition-all shadow-[var(--shadow-glow)]"
          >
            Share Look
          </button>
          <button
            onClick={handleShareToStory}
            disabled={isGeneratingStory}
            className={`w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#833AB4] to-[#F77737] text-white transition-all ${isGeneratingStory ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
            title="Share to IG Story"
          >
            {isGeneratingStory ? <span className="animate-spin text-lg">⚙️</span> : '📱'}
          </button>
        </div>
      </div>
    </div>
  );
};
