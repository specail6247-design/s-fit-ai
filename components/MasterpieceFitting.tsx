'use client';

import React, { useState } from 'react';
import { HyperZoom } from './ui/HyperZoom';
import { ClothingItem, mockClothingItems } from '@/data/mockData';

type CollectionFilter = 'All' | 'High-End Luxury' | 'K-Fashion Leaders' | 'Classic' | 'Streetwear' | 'Minimalist';

export default function MasterpieceFitting() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionFilter>('High-End Luxury');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [motionVideoUrl, setMotionVideoUrl] = useState<string | null>(null);
  const [isGeneratingMotion, setIsGeneratingMotion] = useState(false);

  const handleShare = async () => {
    const urlToShare = motionVideoUrl || resultImage;
    if (!urlToShare) return;

    const shareData = {
      title: 'M_FIT Masterpiece',
      text: 'Check out my digital atelier creation.',
      url: urlToShare,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(urlToShare);
        alert('Link copied to clipboard');
      } catch (err) {
        console.error('Clipboard failed', err);
        alert('Share not supported on this device');
      }
    }
  };

  const handleGenerateMotion = async () => {
    if (!resultImage) return;
    setIsGeneratingMotion(true);
    try {
      const res = await fetch('/api/runway-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        setMotionVideoUrl(data.videoUrl);
      } else {
        throw new Error(data.error || 'Motion generation failed');
      }
    } catch (e) {
      console.error(e);
      alert('Motion generation failed.');
    } finally {
      setIsGeneratingMotion(false);
    }
  };

  const handleTryOn = async () => {
    if (!userPhoto || !selectedGarment) return;

    setIsProcessing(true);
    // Keep previous result visible or clear it? Better to clear or show loading overlay on top.
    // Let's clear for now to show the "Awaiting/Processing" state if we update the UI logic.
    // Or better, keep it but show a loader.
    // The current UI shows "Awaiting Input" if resultImage is null.
    // I'll keep resultImage until new one arrives, but maybe show a loading indicator overlay.
    // But the button text changes to "Weaving Reality..." which is good.

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: selectedGarment.imageUrl,
          category: selectedGarment.category, // Pass category for better results
        }),
      });

      const data = await res.json();

      if (data.success && data.imageUrl) {
        setResultImage(data.imageUrl);
        setMotionVideoUrl(null); // Reset video on new try-on
      } else {
        throw new Error(data.error || 'Virtual try-on failed');
      }
    } catch (error) {
      console.error('Try-on error:', error);
      alert('Fitting session interrupted. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter items
  const filteredItems = mockClothingItems.filter(item => {
    if (selectedCollection === 'All') return true;
    return item.collection === selectedCollection;
  });

  return (
    <div className="flex h-screen w-full bg-[#030303] text-white overflow-hidden selection:bg-[#d4af37] selection:text-black">

      {/* LEFT SIDEBAR - ATELIER CONTROLS */}
      <div className="w-[420px] h-full flex flex-col border-r border-white/5 bg-[#0a0a0a] relative z-20 shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-black/50 to-transparent">
          <h1 className="text-3xl font-serif tracking-tight text-[#d4af37]">M_FIT <span className="text-white/30 font-light text-lg tracking-widest ml-2">ATELIER</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2 font-mono">Masterpiece Fidelity Engine v4.0</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">

          {/* 1. Client Identity (User Photo) */}
          <section className="space-y-4">
             <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">01. Client Identity</h2>
                {userPhoto && <button onClick={() => setUserPhoto(null)} className="text-[10px] text-red-500 hover:text-red-400 uppercase tracking-wider">Clear</button>}
             </div>

             <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="user-photo-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="user-photo-upload"
                  className={`block w-full aspect-[3/4] rounded-sm border ${userPhoto ? 'border-[#d4af37]/50' : 'border-white/10 border-dashed'} bg-black/20 hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer overflow-hidden relative`}
                >
                  {userPhoto ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={userPhoto} alt="Client" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 gap-3">
                       <span className="material-symbols-outlined text-4xl font-light">person_add</span>
                       <span className="text-[10px] tracking-widest uppercase">Upload Portrait</span>
                    </div>
                  )}
                </label>
             </div>
          </section>

          {/* 2. Collection Selection */}
          <section className="space-y-4">
             <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">02. Curated Collection</h2>

             {/* Collection Tabs */}
             <div className="flex flex-wrap gap-2">
               {['High-End Luxury', 'K-Fashion Leaders', 'Classic', 'Streetwear', 'All'].map((col) => (
                 <button
                   key={col}
                   onClick={() => setSelectedCollection(col as CollectionFilter)}
                   className={`px-3 py-1.5 text-[10px] border transition-all uppercase tracking-wider ${selectedCollection === col ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
                 >
                   {col}
                 </button>
               ))}
             </div>

             {/* Items Grid */}
             <div className="grid grid-cols-2 gap-3 mt-4">
               {filteredItems.slice(0, 6).map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setSelectedGarment(item)}
                   className={`relative aspect-[3/4] group border transition-all ${selectedGarment?.id === item.id ? 'border-[#d4af37] ring-1 ring-[#d4af37]/50' : 'border-white/10 hover:border-white/30'}`}
                 >
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover p-2" />
                   <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-[9px] text-white/70 truncate font-mono uppercase">{item.brand}</p>
                   </div>
                   {selectedGarment?.id === item.id && (
                     <div className="absolute top-2 right-2 size-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
                   )}
                 </button>
               ))}
             </div>
          </section>

          {/* Action Area */}
          <div className="pt-4 sticky bottom-0 bg-[#0a0a0a] pb-8 border-t border-white/5">
             <button
               onClick={handleTryOn}
               disabled={!userPhoto || !selectedGarment || isProcessing}
               className={`w-full py-4 relative overflow-hidden group transition-all ${(!userPhoto || !selectedGarment) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.01]'}`}
             >
               <div className="absolute inset-0 bg-[#d4af37] transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
               <span className="relative z-10 text-black font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2">
                 {isProcessing ? 'Weaving Reality...' : 'Initiate Fitting'}
               </span>
             </button>
          </div>

        </div>
      </div>

      {/* MAIN STAGE - HYPER ZOOM CANVAS */}
      <div className="flex-1 relative bg-[#050505]">
         <div className="absolute inset-0 flex items-center justify-center">
            {motionVideoUrl ? (
               <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={motionVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={() => setMotionVideoUrl(null)}
                    className="absolute top-8 left-8 text-xs uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Return to Still
                  </button>

                  <button
                    onClick={handleShare}
                    className="absolute bottom-8 right-8 px-6 py-3 bg-[#d4af37] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">ios_share</span>
                    Share Clip
                  </button>
               </div>
            ) : resultImage ? (
              <div className="relative w-full h-full">
                  <HyperZoom key={resultImage} imageUrl={resultImage} alt="Masterpiece Result" className="w-full h-full" />

                  {/* Controls Overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
                     <button
                       onClick={handleGenerateMotion}
                       disabled={isGeneratingMotion}
                       className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-[#d4af37] transition-all flex items-center gap-3 group"
                     >
                       {isGeneratingMotion ? (
                         <>
                           <span className="size-2 rounded-full bg-[#d4af37] animate-pulse" />
                           Synthesizing Motion...
                         </>
                       ) : (
                         <>
                           <span className="material-symbols-outlined text-lg group-hover:text-[#d4af37] transition-colors">movie_creation</span>
                           Generate Cinematic Clip
                         </>
                       )}
                     </button>

                     <button
                       onClick={handleShare}
                       className="size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-[#d4af37] transition-all group"
                       title="Share Masterpiece"
                     >
                       <span className="material-symbols-outlined text-white group-hover:text-[#d4af37] transition-colors">ios_share</span>
                     </button>
                  </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-20 select-none pointer-events-none">
                 <div className="size-64 border border-white/10 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-ping duration-[3s]" />
                    <span className="material-symbols-outlined text-6xl font-thin">all_inclusive</span>
                 </div>
                 <p className="text-xs uppercase tracking-[0.4em] font-serif">Awaiting Input</p>
              </div>
            )}
         </div>

         {/* Cinematic Overlays */}
         <div className="absolute top-8 right-8 flex flex-col items-end gap-2 pointer-events-none">
            <div className="flex items-center gap-2">
               <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">System Online</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/20 font-mono">GPU: M3 MAX [OPTIMIZED]</span>
         </div>
      </div>

    </div>
  );
}
