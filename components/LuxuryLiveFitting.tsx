'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { mockClothingItems } from '@/data/mockData';

// --- Luxury Loader Component ---
const LuxuryLoader = ({ stage }: { stage: 'uploading' | 'draping' | 'rendering' | null }) => {
  const getMessage = () => {
    switch (stage) {
      case 'draping': return 'Sculpting Fabric Physics';
      case 'rendering': return 'Rendering Cinematic Motion';
      default: return 'Creating Masterpiece';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative size-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D4AF37]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-r-[#D4AF37]/50"
          animate={{ rotate: -180 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
        {getMessage()}
      </p>
    </div>
  );
};

// --- Main Component ---
export default function LuxuryLiveFitting() {
  // State
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'uploading' | 'draping' | 'rendering' | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAccessory, setShowAccessory] = useState(false);

  // Store
  const { selectedItem } = useStore();

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Default Luxury Item (Fallback)
  const activeItem = selectedItem || mockClothingItems.find(i => i.id === 'gucci-001') || mockClothingItems[0];
  const accessoryItem = mockClothingItems.find(i => i.id === 'chanel-bag-001');

  // Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
        // Reset previous results
        setResultImage(null);
        setResultVideo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userPhoto || !activeItem) return;

    setIsProcessing(true);
    setProcessingStage('draping');

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: activeItem.imageUrl,
          category: activeItem.category,
        }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        console.error('Try-on failed:', data.error);
        alert('Failed to create masterpiece. Please try again.');
      }
    } catch (error) {
      console.error('Error during try-on:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStage(null);
    }
  };

  const handleCinematicMotion = async () => {
    if (!resultImage) return;

    setIsProcessing(true);
    setProcessingStage('rendering');

    try {
      // Use the result image to generate video (with upscale implicitly handled if needed)
      const response = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: resultImage,
          upscale: true, // Request high fidelity
        }),
      });

      const data = await response.json();

      if (data.success && data.videoUrl) {
        setResultVideo(data.videoUrl);
      } else {
        console.error('Motion generation failed:', data.error);
        alert('Failed to generate cinematic motion.');
      }
    } catch (error) {
      console.error('Error during motion generation:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStage(null);
    }
  };

  const handleAddAccessory = async () => {
    if (!resultImage || !accessoryItem) return;

    setIsProcessing(true);
    setProcessingStage('draping'); // Reuse draping stage for accessory

    try {
      // AI Layering: Use the current result (user + garment) as the base, and apply the accessory
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: resultImage, // Layer on top of current result
          garmentImageUrl: accessoryItem.imageUrl,
          category: 'upper_body', // Map accessories to upper_body for IDM-VTON
        }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setShowAccessory(true); // Mark as added
      } else {
        console.error('Accessory layering failed:', data.error);
        alert('Failed to layer accessory. Please try again.');
      }
    } catch (error) {
      console.error('Error during accessory layering:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStage(null);
    }
  };

  const toggleZoom = () => {
    setZoomLevel(prev => (prev === 1 ? 2.5 : 1)); // 2.5x zoom for "Hyper-Zoom"
  };

  const handleShare = async () => {
    const url = resultVideo || resultImage;
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = resultVideo ? 'masterpiece_motion.mp4' : 'masterpiece_fit.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback: Open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden flex flex-col">
      {/* --- Header --- */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-xl font-light tracking-[0.2em] uppercase text-white">
            Masterpiece<span className="font-bold text-[#D4AF37]">Fit</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
           {/* Step Indicator */}
           <div className="flex gap-1">
             <div className={`h-1 w-8 rounded-full ${userPhoto ? 'bg-[#D4AF37]' : 'bg-white/20'}`} />
             <div className={`h-1 w-8 rounded-full ${resultImage ? 'bg-[#D4AF37]' : 'bg-white/20'}`} />
             <div className={`h-1 w-8 rounded-full ${resultVideo ? 'bg-[#D4AF37]' : 'bg-white/20'}`} />
           </div>
        </div>
      </header>

      {/* --- Main Stage --- */}
      <main className="flex-1 relative flex items-center justify-center">
        {/* Background Ambient */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-black opacity-80" />

        <AnimatePresence mode="wait">
          {!userPhoto ? (
            /* --- Upload State --- */
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="z-10 flex flex-col items-center text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md max-w-md w-full mx-4"
            >
              <div className="mb-6 p-6 rounded-full bg-white/5 border border-white/10">
                <span className="material-symbols-outlined text-4xl text-[#D4AF37]">linked_camera</span>
              </div>
              <h2 className="text-2xl font-light mb-2">Upload Your Photo</h2>
              <p className="text-zinc-400 text-sm mb-8">For best results, use a full-body photo with good lighting.</p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold tracking-widest uppercase rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Select from Gallery
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileUpload}
              />
            </motion.div>
          ) : (
            /* --- Fitting / Result State --- */
            <motion.div
              key="fitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-4 pt-24 pb-32"
            >
              <div
                ref={imageContainerRef}
                className="relative w-full max-w-lg aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-transform duration-500 ease-out cursor-zoom-in"
                onClick={resultImage ? toggleZoom : undefined}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              >
                {/* Image/Video Display */}
                {resultVideo ? (
                  <video
                    src={resultVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resultImage || userPhoto}
                    alt="Fitting Result"
                    className="w-full h-full object-cover"
                  />
                )}


                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <LuxuryLoader stage={processingStage} />
                  </div>
                )}

                {/* Hyper-Zoom Indicator (Only when zoomed in) */}
                {zoomLevel > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded border border-[#D4AF37]/30">
                    <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Micro-Fiber Detail</p>
                  </div>
                )}
              </div>

              {/* Status Text (if not processed yet) */}
              {!resultImage && !isProcessing && (
                <div className="absolute bottom-40 bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                   <p className="text-zinc-300 text-xs font-medium">Ready to drape <span className="text-white font-bold">{activeItem.name}</span></p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Controls Footer --- */}
      {userPhoto && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-12"
        >
          <div className="max-w-md mx-auto flex flex-col gap-4">

            {/* Primary Action Button */}
            {!resultImage ? (
              <button
                onClick={handleTryOn}
                disabled={isProcessing}
                className="w-full h-14 bg-white text-black font-bold tracking-widest uppercase rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? 'Analyzing Physics...' : 'Begin Fitting'}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                 {/* Cinematic Motion Button */}
                 <button
                   onClick={handleCinematicMotion}
                   disabled={isProcessing || !!resultVideo}
                   className={`h-14 font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all border ${resultVideo ? 'bg-[#1a1a1a] text-zinc-500 border-transparent' : 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-[#b5952f]'}`}
                 >
                   <span className="material-symbols-outlined text-lg">videocam</span>
                   {resultVideo ? 'Motion Active' : 'Cinematic Motion'}
                 </button>

                 {/* Share Button */}
                 <button
                   onClick={handleShare}
                   className="h-14 bg-white text-black font-bold tracking-wider uppercase rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                 >
                   <span className="material-symbols-outlined text-lg">ios_share</span>
                   Share
                 </button>
              </div>
            )}

            {/* Accessory Toggle (Only after result) */}
            {resultImage && !showAccessory && (
               <div className="flex justify-center">
                  <button
                    onClick={handleAddAccessory}
                    disabled={isProcessing}
                    className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-transparent border-zinc-700 text-zinc-500 hover:text-white hover:border-white`}
                  >
                    <span className="material-symbols-outlined text-sm">handbag</span>
                    Add Accessory Layer (AI)
                  </button>
               </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
