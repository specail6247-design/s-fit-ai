"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { getAllItems, ClothingItem } from "@/data/mockData";
import Link from "next/link";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function MasterpieceFitting() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Visual Features State
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showShareToast, setShowShareToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const allItems = getAllItems();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setResultImage(null);
        setVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !selectedItem) return;

    setIsProcessing(true);
    setStatusMessage("Initializing Atelier AI...");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatusMessage("Analyzing Fabric Physics...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatusMessage("Draping " + selectedItem.material + "...");

      const response = await fetch("http://localhost:8000/api/try-on", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setResultImage(data.result_url);
        setStatusMessage("Fitting Complete");
      } else {
        setStatusMessage("Error: AI Service Unavailable");
      }
    } catch (error) {
      console.error("Try-on error:", error);
      setStatusMessage("Connection Failed. Is Backend Running?");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCinematic = async () => {
    if (!resultImage) return;

    setIsProcessing(true);
    setStatusMessage("Synthesizing Motion (Runway Gen-3)...");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch("http://localhost:8000/api/cinematic", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setVideoUrl(data.video_url);
        setStatusMessage("Cinematic Render Complete");
      }
    } catch (error) {
      console.error("Cinematic error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 left-1/2 z-[60] -translate-x-1/2 transform rounded-lg border border-[#ecab13] bg-black/80 px-6 py-3 backdrop-blur-md"
          >
             <div className="flex items-center gap-3">
               <span className="material-symbols-outlined text-[#ecab13]">movie_filter</span>
               <div>
                 <p className="text-sm font-bold uppercase text-white">Cinematic Export Ready</p>
                 <p className="text-[10px] text-white/70">Shared to Story (4K ProRes)</p>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="z-50 flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-lg font-bold tracking-widest uppercase text-white">Masterpiece Fit</h1>
        </div>
        <div className="flex items-center gap-4">
           {resultImage && (
             <button
               onClick={handleShare}
               className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase hover:bg-white/10"
             >
                <span className="material-symbols-outlined text-sm">ios_share</span>
                Share
             </button>
           )}
           <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5">
              <div className={`size-2 rounded-full ${isProcessing ? 'bg-yellow-500 animate-bounce' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                {isProcessing ? 'Processing' : 'System Online'}
              </span>
           </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar - Item Selector */}
        <aside className="w-80 flex-shrink-0 overflow-y-auto border-r border-white/10 bg-black/20 p-4 backdrop-blur-sm custom-scrollbar">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">Wardrobe Collection</h2>
          <div className="grid grid-cols-2 gap-3">
            {allItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border transition-all ${
                  selectedItem?.id === item.id ? "border-[#ecab13] ring-1 ring-[#ecab13]" : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized={item.imageUrl.startsWith('http') || item.imageUrl.startsWith('data:')}
                />
                <div className="absolute bottom-2 left-2 right-2 z-20">
                  <p className="truncate text-[10px] font-bold uppercase text-white">{item.brand}</p>
                  <p className="truncate text-[9px] text-white/70">{item.name}</p>
                </div>
                {item.material && (
                   <div className="absolute top-2 right-2 z-20 rounded bg-black/60 px-1.5 py-0.5 backdrop-blur-md">
                      <p className="text-[8px] font-bold uppercase text-[#ecab13]">{item.material}</p>
                   </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Viewport */}
        <div className="relative flex-1 bg-[#151515] flex items-center justify-center overflow-hidden">
            {/* Background Grid/Effect */}
            <div className="absolute inset-0 opacity-20"
                 style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

            {/* Image/Video Display */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomMode(!isZoomMode)}
              className={`relative z-10 h-[80%] w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl border border-white/5 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-cursor ${resultImage ? (isZoomMode ? 'cursor-zoom-out' : 'cursor-zoom-in') : 'cursor-default'}`}
            >
                {videoUrl ? (
                   <video
                     src={videoUrl}
                     autoPlay
                     loop
                     controls
                     className="h-full w-full object-contain"
                   />
                ) : resultImage ? (
                   <div className="relative h-full w-full overflow-hidden">
                     <Image
                       src={resultImage}
                       alt="Result"
                       fill
                       className="object-contain transition-transform duration-100 ease-out"
                       style={{
                         transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                         transform: isZoomMode ? 'scale(2.5)' : 'scale(1)'
                       }}
                       unoptimized
                     />
                     {isZoomMode && (
                       <div className="absolute bottom-4 left-4 rounded bg-black/60 px-2 py-1 backdrop-blur-md">
                         <p className="text-[10px] font-bold uppercase text-[#ecab13]">Hyper-Zoom Active</p>
                       </div>
                     )}
                   </div>
                ) : userImage ? (
                   <div className="relative h-full w-full">
                     <Image
                       src={userImage}
                       alt="User"
                       fill
                       className="object-contain opacity-80"
                       unoptimized
                     />
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center p-8 text-center text-white/30">
                      <span className="material-symbols-outlined text-6xl mb-4">accessibility_new</span>
                      <p className="text-sm font-medium uppercase tracking-widest">Select a model or upload photo</p>
                   </div>
                )}

                {/* Processing Overlay */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                      <div className="size-16 rounded-full border-2 border-white/10 border-t-[#ecab13] animate-spin mb-4"></div>
                      <p className="text-sm font-bold uppercase tracking-widest text-[#ecab13] animate-pulse">{statusMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Zoom Hint */}
            {resultImage && !videoUrl && !isZoomMode && (
               <div className="absolute bottom-8 z-10 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                 <span className="material-symbols-outlined text-xs text-white/70">search</span>
                 <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">Click to Zoom</p>
               </div>
            )}

            {/* Context Stats Overlay */}
            {selectedItem && (
               <div className="absolute bottom-8 right-8 z-20 rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur-md">
                  <h3 className="mb-2 text-xs font-bold uppercase text-white/50">Material Physics</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                     <span className="text-white/70">Fabric</span>
                     <span className="text-right font-bold text-white">{selectedItem.material || 'Standard'}</span>
                     <span className="text-white/70">Weight</span>
                     <span className="text-right font-bold text-white">240 GSM</span>
                     <span className="text-white/70">Drape</span>
                     <span className="text-right font-bold text-white">Fluid</span>
                  </div>
               </div>
            )}
        </div>

        {/* Right Panel - Controls */}
        <aside className="w-72 flex-shrink-0 border-l border-white/10 bg-black/20 p-6 backdrop-blur-sm flex flex-col">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/50">Atelier Controls</h2>

            <div className="space-y-6 flex-1">
                {/* Upload Section */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition-colors hover:border-[#ecab13]/50 hover:bg-white/10"
                >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <span className="material-symbols-outlined mb-2 text-3xl text-white/50 group-hover:text-[#ecab13]">upload_file</span>
                    <p className="text-xs font-bold uppercase group-hover:text-white">
                      {userImage ? 'Change Source' : 'Upload Source'}
                    </p>
                </div>

                {/* Selected Item Info */}
                {selectedItem && (
                   <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase text-[#ecab13] mb-1">{selectedItem.brand}</p>
                      <p className="text-sm font-medium leading-tight text-white mb-2">{selectedItem.name}</p>
                      <p className="text-xs text-white/60">{selectedItem.price} {selectedItem.currency}</p>
                   </div>
                )}

                {/* Actions */}
                <div className="space-y-3 mt-auto">
                    <button
                      onClick={handleTryOn}
                      disabled={!userImage || !selectedItem || isProcessing}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ecab13] py-4 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(236,171,19,0.2)]"
                    >
                        <span className="material-symbols-outlined text-lg">magic_button</span>
                        {resultImage ? 'Regenerate Fit' : 'Generate Fit'}
                    </button>

                    {resultImage && (
                       <button
                         onClick={handleCinematic}
                         disabled={isProcessing}
                         className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/5"
                       >
                           <span className="material-symbols-outlined text-lg">videocam</span>
                           Cinematic Motion
                       </button>
                    )}
                </div>
            </div>
        </aside>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}
