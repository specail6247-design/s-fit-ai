'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicViewer from '@/components/ui/CinematicViewer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function MasterpieceFitPage() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{imageUrl: string, upscaledUrl: string, videoUrl: string | null} | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload both User Photo and Garment.");

    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 500);

    try {
      const res = await fetch('/api/m-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'upper_body'
        })
      });
      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      if (data.success) {
        setResult(data);
      } else {
        throw new Error(data.error || "M-FIT Try-On Failed");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert("Failed to process M_FIT request.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-['Geist'] overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex justify-between items-center z-10 bg-black/50 backdrop-blur-md sticky top-0">
        <h1 className="text-2xl font-[Cinzel] tracking-widest text-[#F4E4BC]">MASTERPIECE FIT</h1>
        <div className="text-xs tracking-[0.2em] uppercase text-[#C9B037]">Personal Digital Atelier</div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-8 gap-12 max-w-7xl mx-auto w-full">
        {/* Left Panel: Inputs */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/70 font-['Geist']">Your Persona</h2>
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 hover:border-[#C9B037] transition-all duration-700 relative overflow-hidden group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center justify-center min-h-[200px]">
                {userImage ? (
                   // eslint-disable-next-line @next/next/no-img-element
                  <img src={userImage} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000" alt="User" />
                ) : (
                  <div className="text-center space-y-2">
                    <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-[#C9B037] transition-colors">person_add</span>
                    <p className="text-xs uppercase tracking-widest text-white/50">Upload Portrait</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/70 font-['Geist']">The Garment</h2>
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 hover:border-[#C9B037] transition-all duration-700 relative overflow-hidden group">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
              <label htmlFor="garment-upload" className="cursor-pointer flex items-center justify-center min-h-[200px]">
                {garmentImage ? (
                   // eslint-disable-next-line @next/next/no-img-element
                  <img src={garmentImage} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000" alt="Garment" />
                ) : (
                  <div className="text-center space-y-2">
                    <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-[#C9B037] transition-colors">checkroom</span>
                    <p className="text-xs uppercase tracking-widest text-white/50">Select Piece</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            onClick={handleTryOn}
            disabled={isProcessing}
            className={`py-4 px-8 border text-sm tracking-widest uppercase transition-all duration-700 ${isProcessing ? 'border-white/20 text-white/50 cursor-wait' : 'border-[#C9B037] text-[#C9B037] hover:bg-[#C9B037] hover:text-black shadow-[0_0_15px_rgba(201,176,55,0.3)]'}`}
          >
            {isProcessing ? 'Crafting Masterpiece...' : 'Generate 4K Cinematic Fit'}
          </button>
        </div>

        {/* Right Panel: Output */}
        <div className="w-full lg:w-2/3 border border-white/10 rounded-lg bg-black relative flex items-center justify-center overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                {/* Sophisticated SVG tracing animation for luxury feel */}
                <svg className="w-16 h-16 text-[#C9B037] animate-spin" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} className="transition-all duration-500 ease-out" />
                </svg>
                <div className="text-center space-y-2">
                  <p className="font-[Cinzel] text-xl tracking-widest text-[#F4E4BC]">Orchestrating AI Pipeline</p>
                  <p className="text-xs font-['Geist'] tracking-[0.2em] uppercase text-white/50">Rendering Texture & Physics</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full h-full flex flex-col p-6">
                <div className="flex-1 flex gap-6">
                   <div className="flex-1 relative rounded-lg overflow-hidden border border-white/10 group cursor-crosshair">
                     <p className="absolute top-4 left-4 z-10 text-[10px] tracking-widest uppercase bg-black/60 px-2 py-1 rounded">Hyper-Zoom 4K Texture</p>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={result.upscaledUrl} alt="Upscaled Try-On" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-150" style={{ filter: 'saturate(0.9) contrast(1.1)' }} />
                   </div>
                   {result.videoUrl && (
                     <div className="flex-1 relative rounded-lg overflow-hidden border border-[#C9B037]/30 shadow-[0_0_20px_rgba(201,176,55,0.1)]">
                       <p className="absolute top-4 left-4 z-10 text-[10px] tracking-widest uppercase bg-black/60 px-2 py-1 rounded text-[#C9B037]">Cinematic Motion</p>
                       <CinematicViewer videoUrl={result.videoUrl} posterUrl={result.imageUrl} className="w-full h-full object-cover" />
                     </div>
                   )}
                </div>
                <div className="mt-6 flex justify-end">
                   <button className="flex items-center gap-2 text-xs tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-700">
                     <span className="material-symbols-outlined text-sm">ios_share</span> Cinematic Share
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/20 font-[Cinzel] text-3xl tracking-widest opacity-30 text-center">
                AWAITING <br/> THE MASTERPIECE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
