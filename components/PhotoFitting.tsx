"use client";

import React, { useState, useRef, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { getAllItems, ClothingItem } from "@/data/mockData";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Load luxury items
  const luxuryItems = getAllItems().filter(i => i.isLuxury);

  useEffect(() => {
    // Default selection
    if (luxuryItems.length > 0) {
      setSelectedGarment(luxuryItems[0]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userPhoto || !selectedGarment) return;

    setIsProcessing(true);
    setProcessingStep("Initializing IDM-VTON...");

    try {
        // 1. Try On
        const res = await fetch('/api/try-on', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userPhotoUrl: userPhoto,
                garmentImageUrl: selectedGarment.imageUrl, // Using local path, API handles it
                category: selectedGarment.category
            })
        });

        if (!res.ok) throw new Error("Try-on failed");
        const data = await res.json();

        if (data.imageUrl) {
            setProcessingStep("Enhancing Textures (Upscale)...");
            // 2. Upscale (Hyper-Zoom readiness)
            const upscaleRes = await fetch('/api/upscale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: data.imageUrl })
            });
            const upscaleData = await upscaleRes.json();
            setResultImage(upscaleData.imageUrl || data.imageUrl);
        } else {
            throw new Error(data.error || "No image returned");
        }
    } catch (err) {
        console.error(err);
        alert("Fitting failed. Please try again.");
    } finally {
        setIsProcessing(false);
        setProcessingStep("");
    }
  };

  const handleGenerateVideo = async () => {
      if (!resultImage) return;
      setIsProcessing(true);
      setProcessingStep("Synthesizing Motion (Cinematic SVD)...");
      try {
          const res = await fetch('/api/cinematic-try-on', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageUrl: resultImage })
          });
          const data = await res.json();
          if (data.videoUrl) {
              setVideoUrl(data.videoUrl);
          } else {
              throw new Error("Video generation failed");
          }
      } catch (err) {
          console.error(err);
          alert("Video generation failed.");
      } finally {
          setIsProcessing(false);
          setProcessingStep("");
      }
  };

  const handleZoom = (delta: number) => {
      setZoomLevel(prev => Math.max(1, Math.min(prev + delta, 4))); // Max 4x zoom
  };

  const handleMouseDown = (e: React.MouseEvent) => {
      if (zoomLevel > 1) {
          setIsDragging(true);
          dragStart.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
      }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && zoomLevel > 1) {
          setPanPosition({
              x: e.clientX - dragStart.current.x,
              y: e.clientY - dragStart.current.y
          });
      }
  };

  const handleMouseUp = () => {
      setIsDragging(false);
  };

  const handleShare = () => {
      const url = videoUrl || resultImage;
      if (url) {
          navigator.clipboard.writeText(url);
          alert("Link copied to clipboard! Ready for Cinematic Share.");
      }
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${spaceGrotesk.className}`}>
      {/* Header */}
      <div className="z-50 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
            <button className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors" onClick={() => window.history.back()}>
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
                <h1 className="text-xl font-bold tracking-widest uppercase">Masterpiece Fit</h1>
                <p className="text-[10px] text-[#ecab13] tracking-[0.2em] uppercase">Hyper-Fidelity Engine</p>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden"
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
      >
          {/* Background / Placeholder */}
          {!userPhoto && !resultImage && (
              <div className="text-center space-y-4 opacity-50">
                  <span className="material-symbols-outlined text-6xl">linked_camera</span>
                  <p className="text-sm font-mono tracking-widest">UPLOAD PHOTO TO BEGIN</p>
              </div>
          )}

          {/* User Photo Preview */}
          {userPhoto && !resultImage && !isProcessing && (
              <img src={userPhoto} alt="User" className="max-h-[80vh] object-contain rounded-lg border border-white/10" />
          )}

          {/* Result Image with Zoom */}
          {resultImage && !videoUrl && !isProcessing && (
             <div
                className="relative overflow-hidden rounded-lg shadow-2xl border border-[#ecab13]/30 cursor-move"
                style={{ width: 'auto', height: '80vh' }}
                onMouseDown={handleMouseDown}
             >
                 <img
                    ref={imageRef}
                    src={resultImage}
                    alt="Result"
                    className="h-full w-auto object-contain transition-transform duration-100 ease-linear"
                    style={{
                        transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
                    }}
                    draggable={false}
                 />

                 {/* Zoom Controls Overlay */}
                 <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
                     <button onClick={() => handleZoom(0.5)} className="size-8 flex items-center justify-center hover:bg-white/20 rounded"><span className="material-symbols-outlined">add</span></button>
                     <span className="text-center text-xs font-mono">{zoomLevel.toFixed(1)}x</span>
                     <button onClick={() => handleZoom(-0.5)} className="size-8 flex items-center justify-center hover:bg-white/20 rounded"><span className="material-symbols-outlined">remove</span></button>
                 </div>

                 {/* High Fidelity Badge */}
                 <div className="absolute top-4 left-4 bg-[#ecab13]/20 backdrop-blur-md px-3 py-1 rounded border border-[#ecab13]/50">
                     <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase">4K Micro-Fiber Texture</p>
                 </div>
             </div>
          )}

          {/* Video Player */}
          {videoUrl && (
              <div className="relative z-20 max-h-[80vh] aspect-[9/16] rounded-lg overflow-hidden border border-[#ecab13]/50 shadow-[0_0_50px_rgba(236,171,19,0.2)]">
                  <video src={videoUrl} autoPlay loop controls className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                      <button onClick={handleShare} className="bg-black/60 hover:bg-[#ecab13] hover:text-black text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md transition-all">
                          <span className="material-symbols-outlined text-sm">ios_share</span>
                          <span className="text-xs font-bold uppercase tracking-wider">Cinematic Share</span>
                      </button>
                  </div>
              </div>
          )}

          {/* Processing Overlay */}
          <AnimatePresence>
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                >
                    <div className="text-center space-y-4">
                        <div className="size-16 border-2 border-[#ecab13] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <h2 className="text-xl font-bold tracking-widest uppercase">{processingStep}</h2>
                        <p className="text-xs text-gray-400 font-mono">Running Neural Networks...</p>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
      </div>

      {/* Controls / Footer */}
      <div className="z-40 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10">
          {!resultImage ? (
              <div className="flex gap-4 items-center max-w-4xl mx-auto">
                  {/* Garment Selector */}
                  <div className="flex-1 overflow-x-auto pb-2 no-scrollbar flex gap-3">
                      {luxuryItems.map(item => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedGarment(item)}
                            className={`shrink-0 size-20 rounded-lg overflow-hidden border-2 transition-all ${selectedGarment?.id === item.id ? 'border-[#ecab13] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                          >
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          </button>
                      ))}
                  </div>

                  {/* Upload & Try On */}
                  <div className="flex gap-3">
                      <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl flex items-center gap-2 transition-colors">
                          <span className="material-symbols-outlined">upload</span>
                          <span className="text-xs font-bold uppercase tracking-wider">Upload Photo</span>
                          <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                      </label>
                      <button
                        onClick={handleTryOn}
                        disabled={!userPhoto || !selectedGarment}
                        className="bg-[#ecab13] hover:bg-[#c48a0a] text-black px-8 py-4 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                          <span className="material-symbols-outlined">auto_fix_high</span>
                          <span className="text-xs font-bold uppercase tracking-wider">Masterpiece Try-On</span>
                      </button>
                  </div>
              </div>
          ) : (
              <div className="flex gap-4 justify-center items-center">
                   {!videoUrl && (
                       <button onClick={handleGenerateVideo} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl flex items-center gap-2 border border-white/20 hover:border-[#ecab13] transition-all">
                           <span className="material-symbols-outlined">movie_filter</span>
                           <span className="text-xs font-bold uppercase tracking-wider">Generate Cinematic Motion (5-10s)</span>
                       </button>
                   )}
                   <button onClick={() => { setResultImage(null); setVideoUrl(null); setUserPhoto(null); }} className="text-gray-400 hover:text-white px-6 py-4 text-xs font-bold uppercase tracking-wider">
                       Reset
                   </button>
              </div>
          )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
