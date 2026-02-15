'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Cinzel } from 'next/font/google';
import { mockClothingItems, ClothingItem, brands } from '@/data/mockData';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const cinzel = Cinzel({ subsets: ['latin'] });

export default function MasterpieceFitting() {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    // Simulate high-fidelity rendering/export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSharing(false);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);

    // In a real implementation, this would trigger a download or social share intent
    console.log("Cinematic clip exported to local device.");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = selectedBrandId === 'all'
    ? mockClothingItems
    : mockClothingItems.filter(item => item.brand.toLowerCase() === selectedBrandId.toLowerCase() || brands.find(b => b.id === selectedBrandId)?.name === item.brand);

  // Filter mainly Luxury and K-Fashion items for Masterpiece mode
  const displayItems = filteredItems.filter(item => item.isLuxury);

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white ${spaceGrotesk.className} selection:bg-[#ecab13] selection:text-black`}>
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-xl font-bold tracking-widest text-white ${cinzel.className}`}>S_FIT AI</span>
            <span className="rounded bg-[#ecab13] px-1.5 py-0.5 text-[10px] font-bold text-black">MASTERPIECE</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Atelier</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Collections</button>
            <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Vault</button>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">

          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

            {/* 1. Upload Section */}
            <section>
              <h2 className={`text-lg font-bold uppercase tracking-widest text-[#ecab13] mb-4 ${cinzel.className}`}>01. Subject</h2>
              <div className="relative group aspect-[3/4] w-full overflow-hidden rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:border-[#ecab13] hover:bg-zinc-900 transition-all">
                {userPhoto ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={userPhoto} alt="Subject" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-zinc-500 mb-2 group-hover:text-[#ecab13] transition-colors">add_a_photo</span>
                    <p className="text-sm text-zinc-400 group-hover:text-white transition-colors">Upload Portrait</p>
                    <p className="text-[10px] text-zinc-600 mt-2">Recommended: Full body, neutral background</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  disabled={!!userPhoto}
                />
              </div>
            </section>

            {/* 2. Collection Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold uppercase tracking-widest text-[#ecab13] ${cinzel.className}`}>02. Collection</h2>
                <select
                  value={selectedBrandId}
                  onChange={(e) => setSelectedBrandId(e.target.value)}
                  className="bg-zinc-900 text-xs text-white border border-zinc-700 rounded px-2 py-1 outline-none focus:border-[#ecab13]"
                >
                  <option value="all">All Brands</option>
                  {brands.filter(b => b.isLuxury).map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {displayItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGarment(item)}
                    className={`relative aspect-[3/4] overflow-hidden rounded-lg border transition-all group text-left ${
                      selectedGarment?.id === item.id
                        ? 'border-[#ecab13] ring-1 ring-[#ecab13]'
                        : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <p className="text-[10px] font-bold text-[#ecab13] uppercase">{item.brand}</p>
                      <p className="text-xs font-medium text-white truncate">{item.name}</p>
                    </div>
                    {selectedGarment?.id === item.id && (
                      <div className="absolute top-2 right-2 size-5 bg-[#ecab13] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-black text-[14px] font-bold">check</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Panel: Studio / Result */}
          <div className="lg:col-span-8 bg-[#111] rounded-2xl border border-white/5 overflow-hidden relative flex flex-col items-center justify-center">

            {/* Empty State */}
            {!resultImage && !isProcessing && (
              <div className="text-center p-8 max-w-md">
                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">diamond</span>
                <h3 className={`text-2xl font-bold text-white mb-2 ${cinzel.className}`}>The Atelier is Ready</h3>
                <p className="text-zinc-400 text-sm mb-8">Select a subject and a masterpiece from the collection to begin the fitting process.</p>

                <button
                  disabled={!userPhoto || !selectedGarment}
                  onClick={async () => {
                    setIsProcessing(true);
                    try {
                      const response = await fetch('/api/try-on', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          userPhotoUrl: userPhoto,
                          garmentImageUrl: selectedGarment?.imageUrl,
                          category: selectedGarment?.category || 'upper_body',
                          upscale: true,
                          video: true
                        })
                      });
                      const data = await response.json();
                      if (data.success) {
                        setResultImage(data.imageUrl);
                        setResultVideo(data.videoUrl);
                      } else {
                        alert('Fitting failed: ' + data.error);
                      }
                    } catch (error) {
                      console.error(error);
                      alert('An error occurred');
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  className={`
                    w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all
                    ${userPhoto && selectedGarment
                      ? 'bg-[#ecab13] text-black hover:bg-[#ffc124] shadow-[0_0_20px_rgba(236,171,19,0.3)]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
                  `}
                >
                  Initialize Masterpiece Fit
                </button>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                <div className="size-24 rounded-full border-2 border-zinc-800 border-t-[#ecab13] animate-spin mb-8"></div>
                <h3 className={`text-xl font-bold text-white mb-2 ${cinzel.className}`}>Constructing Masterpiece</h3>
                <div className="flex flex-col gap-2 w-64">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                    <span>Analysis</span>
                    <span className="text-[#ecab13]">Done</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                    <span>Draping</span>
                    <span className="animate-pulse text-white">Processing...</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                    <span>Rendering</span>
                    <span>Waiting</span>
                  </div>
                </div>
              </div>
            )}

            {/* Result View (Hyper-Zoom) */}
            {resultImage && !isProcessing && (
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#050505] group">
                <motion.div
                  className="relative w-full h-full cursor-move"
                  style={{
                    backgroundImage: `url(${resultImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  whileHover={{ scale: 2.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onMouseMove={(e) => {
                    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - left) / width * 100;
                    const y = (e.clientY - top) / height * 100;
                    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                  }}
                >
                  {/* Overlay hints hidden on zoom */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">Hover to Hyper-Zoom</span>
                    </div>
                  </div>
                </motion.div>

                {/* HUD Overlay */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none z-10">
                  <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-right">
                    <p className="text-[10px] text-[#ecab13] uppercase font-bold tracking-widest">Resolution</p>
                    <p className="text-sm font-bold text-white">4K UHD</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-right">
                    <p className="text-[10px] text-[#ecab13] uppercase font-bold tracking-widest">Texture</p>
                    <p className="text-sm font-bold text-white">Micro-Fiber</p>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-8 w-full flex justify-center gap-4 z-10 px-8">
                   {resultVideo && (
                    <button
                      onClick={() => window.open(resultVideo, '_blank')}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs border border-white/20 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">play_circle</span>
                      Play Motion Clip
                    </button>
                   )}

                   <button
                      onClick={handleShare}
                      disabled={isSharing}
                      className={`
                        px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(236,171,19,0.3)] transition-all flex items-center gap-2
                        ${isSharing ? 'bg-zinc-800 text-zinc-400 cursor-wait' : 'bg-[#ecab13] hover:bg-[#ffc124] text-black'}
                      `}
                    >
                      {isSharing ? (
                        <>
                          <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                          Exporting 4K Clip...
                        </>
                      ) : shareSuccess ? (
                         <>
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          Saved to Device
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">ios_share</span>
                          Cinematic Share
                        </>
                      )}
                    </button>
                </div>

                {/* Reset / New Try Button */}
                <button
                  onClick={() => { setResultImage(null); setResultVideo(null); }}
                  className="absolute top-6 left-6 p-3 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/10 transition-colors z-10"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}
