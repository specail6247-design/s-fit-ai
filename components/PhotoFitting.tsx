"use client";

import React, { useState, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { mockClothingItems, brands, ClothingItem } from "@/data/mockData";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Filter luxury brands
const allBrands = brands;

export default function PhotoFitting() {
  // State
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string>("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUpscaled, setIsUpscaled] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter items based on selection
  const filteredItems = mockClothingItems.filter(item => {
    if (selectedBrandId && item.brand.toLowerCase() !== selectedBrandId.toLowerCase()) return false;
    return true;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
        setResultImage(null); // Reset result
        setVideoUrl(null);
        setShowVideo(false);
        setIsUpscaled(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const mapCategory = (category: string) => {
    switch (category) {
      case 'tops': return 'upper_body';
      case 'bottoms': return 'lower_body';
      case 'dresses': return 'dresses';
      case 'outerwear': return 'upper_body';
      default: return 'upper_body';
    }
  };

  const handleTryOn = async () => {
    if (!userPhoto || !selectedGarment) return;

    setIsProcessing(true);
    setProcessStep("Scanning user measurements...");

    try {
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProcessStep("Analyzing garment physics...");
      const category = mapCategory(selectedGarment.category);

      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: selectedGarment.imageUrl,
          category
        })
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setProcessStep("Finalizing render...");
      } else {
        alert("Fitting failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Try-on error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessStep("");
    }
  };

  const handleUpscale = async () => {
    if (!resultImage || isUpscaled) return;

    setIsProcessing(true);
    setProcessStep("Enhancing texture details (Hyper-Zoom)...");

    try {
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setIsUpscaled(true);
      } else {
        alert("Upscaling failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upscale error:", error);
      alert("Failed to enhance image.");
    } finally {
      setIsProcessing(false);
      setProcessStep("");
    }
  };

  const handleMotion = async () => {
    if (!resultImage) return;

    // If video is already generated, just show it
    if (videoUrl) {
      setShowVideo(true);
      return;
    }

    setIsProcessing(true);
    setProcessStep("Generating cinematic motion...");

    try {
      const response = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });

      const data = await response.json();

      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setShowVideo(true);
      } else {
        alert("Motion generation failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Motion error:", error);
      alert("Failed to generate motion.");
    } finally {
      setIsProcessing(false);
      setProcessStep("");
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `S_FIT_Cinematic_${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
      </div>

      {/* Top App Bar */}
      <div className="z-50 flex items-center justify-between p-6 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Masterpiece Fit</h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Cinematic Virtual Try-On</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors">
                Share Studio
            </button>
        </div>
      </div>

      <main className="flex-1 relative z-10 flex flex-col md:flex-row gap-6 p-6 overflow-hidden">

        {/* Left Panel: Configuration */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

            {/* User Photo Upload */}
            <section className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">1. The Muse (You)</h3>
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border-2 border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer group"
                >
                    {userPhoto ? (
                        <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2">
                            <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_a_photo</span>
                            <span className="text-xs uppercase tracking-wider">Upload Portrait</span>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </section>

            {/* Brand & Garment Selector */}
            <section className="bg-white/5 rounded-2xl p-4 border border-white/10 flex-1 flex flex-col min-h-[300px]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">2. The Collection</h3>

                {/* Brand Filters */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    <button
                        onClick={() => setSelectedBrandId(null)}
                        className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${!selectedBrandId ? 'bg-white text-black font-bold' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        All Brands
                    </button>
                    {allBrands.map(brand => (
                        <button
                            key={brand.id}
                            onClick={() => setSelectedBrandId(brand.id)}
                            className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${selectedBrandId === brand.id ? 'bg-white text-black font-bold' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            {brand.name}
                        </button>
                    ))}
                </div>

                {/* Garment Grid */}
                <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1 custom-scrollbar max-h-[400px]">
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedGarment(item)}
                            className={`relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all border ${selectedGarment?.id === item.id ? 'border-white ring-2 ring-white/20' : 'border-white/5 hover:border-white/20'}`}
                        >
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-[10px] font-bold truncate">{item.name}</p>
                                <p className="text-[9px] text-gray-400">{item.brand}</p>
                            </div>
                            {item.isLuxury && (
                                <div className="absolute top-2 right-2 bg-yellow-600/80 text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider backdrop-blur-sm">
                                    Lux
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Right Panel: The Mirror / Result */}
        <div className="w-full md:w-2/3 bg-black rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center">

            {/* Initial State / Prompt */}
            {!resultImage && !isProcessing && (
                <div className="text-center p-10 opacity-50">
                    <span className="material-symbols-outlined text-6xl mb-4">checkroom</span>
                    <p className="text-sm uppercase tracking-widest">Select a Muse and a Masterpiece to begin</p>
                </div>
            )}

            {/* Processing State */}
            {isProcessing && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                   <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
                       <motion.div
                           className="h-full bg-white absolute top-0 left-0"
                           initial={{ width: "0%" }}
                           animate={{ width: "100%" }}
                           transition={{ duration: processStep.includes("Scanning") ? 2 : 15, ease: "linear" }}
                       />
                   </div>
                   <p className="text-xs uppercase tracking-widest animate-pulse mt-4 text-white font-bold">{processStep || "Initializing Digital Atelier..."}</p>
                </div>
            )}

            {/* Result Display */}
            <AnimatePresence>
                {resultImage && !isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-full h-full group"
                    >
                         {/* Image with Zoom */}
                         <div
                            className={`w-full h-full overflow-hidden cursor-zoom-in relative ${isZoomed ? 'cursor-zoom-out' : ''}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                         >
                            <img
                                src={resultImage}
                                alt="Fitting Result"
                                className={`w-full h-full object-contain transition-transform duration-700 ease-in-out ${isZoomed ? 'scale-[2.5] origin-center' : 'scale-100'}`}
                            />

                            {/* Zoom Hint */}
                            {!isZoomed && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <span className="text-xs uppercase tracking-widest">Tap to Inspect Details</span>
                                    </div>
                                </div>
                            )}
                         </div>

                         {/* Action Buttons Overlay */}
                         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30 pointer-events-auto">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleMotion(); }}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                            >
                                <span className="material-symbols-outlined">movie_filter</span>
                                {videoUrl ? 'Play Motion' : 'Cinematic Motion'}
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleUpscale(); }}
                                disabled={isUpscaled}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors shadow-lg border border-white/10 backdrop-blur-md ${isUpscaled ? 'bg-green-500/20 text-green-400' : 'bg-black/50 text-white hover:bg-black/70'}`}
                            >
                                <span className="material-symbols-outlined">{isUpscaled ? 'high_quality' : 'hd'}</span>
                                {isUpscaled ? '4K Enhanced' : 'Enhance Texture'}
                            </button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Overlay */}
            <AnimatePresence>
                {showVideo && videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-8"
                    >
                        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                             <video
                                src={videoUrl}
                                controls
                                autoPlay
                                loop
                                className="w-full h-full object-contain"
                             />
                             <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                             </button>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={downloadVideo}
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">download</span>
                                Download 4K Clip
                            </button>
                            <button
                                onClick={() => {}}
                                className="flex items-center gap-2 px-8 py-3 bg-white/10 text-white border border-white/10 rounded-full font-bold hover:bg-white/20 transition-colors"
                            >
                                <span className="material-symbols-outlined">share</span>
                                Share to Story
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Generate Button (Floating if ready) */}
            {!resultImage && !isProcessing && userPhoto && selectedGarment && (
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={handleTryOn}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] z-30"
                >
                    Ignite Masterpiece Fit
                </motion.button>
            )}

        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
