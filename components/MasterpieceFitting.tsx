'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Cinzel } from 'next/font/google';
import CinematicViewer from '@/components/ui/CinematicViewer';
import { brands, getItemsByBrand, ClothingItem, Brand, getAllItems } from '@/data/mockData';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const cinzel = Cinzel({ subsets: ['latin'] });

// --- UTILS ---
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

// --- COMPONENTS ---

const BrandTab = ({ brand, isSelected, onClick }: { brand: Brand; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all whitespace-nowrap border ${
      isSelected
        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
        : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
    }`}
  >
    {brand.name}
  </button>
);

const ItemCard = ({ item, isSelected, onSelect }: { item: ClothingItem; isSelected: boolean; onSelect: () => void }) => (
  <motion.div
    layoutId={`item-${item.id}`}
    onClick={onSelect}
    className={`group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border transition-all ${
      isSelected ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-white/10 hover:border-white/30'
    }`}
  >
    <div className="absolute inset-0 bg-gray-900">
      <Image
        src={item.imageUrl}
        alt={item.name}
        fill
        className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
        sizes="200px"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <p className="truncate text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{item.brand}</p>
      <p className="truncate text-xs font-medium text-white">{item.name}</p>
      <p className="mt-1 text-[10px] text-gray-400">{formatCurrency(item.price, item.currency)}</p>
    </div>
    {item.isLuxury && (
      <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-lg">
        <span className="material-symbols-outlined text-[10px] font-bold">star</span>
      </div>
    )}
  </motion.div>
);

export default function MasterpieceFitting() {
  // --- STATE ---
  const [activeBrandId, setActiveBrandId] = useState<string>(brands[0].id);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cinematic Video State
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- DATA ---
  const activeItems = getItemsByBrand(activeBrandId);

  // --- HANDLERS ---

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateTryOn = async () => {
    if (!userPhoto || !selectedItem) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResultImage(null); // Clear previous result
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });

    // Simulate progress for UX
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + 5));
    }, 200);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhoto,
          garmentImageUrl: selectedItem.imageUrl,
          category: selectedItem.category,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Try-On failed');
      }

      clearInterval(interval);
      setProgress(100);
      setResultImage(data.imageUrl);

    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!resultImage) return;
    setIsVideoGenerating(true);
    try {
      const response = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: resultImage }),
      });
      const data = await response.json();
      if (data.success) {
        setVideoUrl(data.videoUrl);
        setShowVideoModal(true);
      } else {
        alert('Failed to generate video: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Error generating video');
    } finally {
      setIsVideoGenerating(false);
    }
  };

  // --- ZOOM & PAN HANDLERS ---

  const handleWheel = (e: React.WheelEvent) => {
    if (!resultImage) return;
    // Prevent default scroll behavior if zooming
    // Note: React synthetic events can't strictly preventDefault for wheel in passive listeners, but standard ones can.
    // e.preventDefault();

    const scaleFactor = 0.1;
    const newZoom = Math.min(Math.max(1, zoomLevel + (e.deltaY > 0 ? -scaleFactor : scaleFactor)), 4); // Max 4x zoom
    setZoomLevel(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Boundary checks (simplified)
    // Ideally we calculate based on container size and zoom level
    setPanPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // --- RENDER ---

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black ${spaceGrotesk.className}`}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#050505]/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className={`text-xl font-bold tracking-widest text-white ${cinzel.className}`}>
            S_FIT <span className="text-[#D4AF37]">MASTERPIECE</span>
          </div>
          <div className="hidden rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] md:block">
            High-Fidelity Virtual Atelier
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="text-xs text-gray-400 hover:text-white transition-colors">SPA Line</button>
           <button className="text-xs text-[#D4AF37] font-bold">Luxury Line</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex h-screen pt-[72px]">

        {/* LEFT PANEL: CONTROLS (35%) */}
        <div className="flex w-full flex-col border-r border-white/10 bg-[#0A0A0A] lg:w-[35%] lg:min-w-[400px]">

          {/* USER PHOTO SECTION */}
          <div className="border-b border-white/10 p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">01. Client Identity</h2>
            <div
              className="group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 transition-all hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5"
              onClick={() => fileInputRef.current?.click()}
            >
              {userPhoto ? (
                <Image src={userPhoto} alt="User" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-500 group-hover:text-[#D4AF37]">
                  <span className="material-symbols-outlined text-4xl mb-2">add_a_photo</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Upload Full Body Portrait</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
            </div>
          </div>

          {/* ITEM SELECTOR */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="p-6 pb-2">
               <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">02. Select Masterpiece</h2>
               {/* Brand Tabs */}
               <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                 {brands.map(b => (
                   <BrandTab key={b.id} brand={b} isSelected={activeBrandId === b.id} onClick={() => setActiveBrandId(b.id)} />
                 ))}
               </div>
            </div>

            {/* Item Grid */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="grid grid-cols-2 gap-4">
                {activeItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    onSelect={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="border-t border-white/10 bg-[#050505] p-6">
            <button
              onClick={handleGenerateTryOn}
              disabled={!userPhoto || !selectedItem || isProcessing}
              className="group relative w-full overflow-hidden rounded-xl bg-[#D4AF37] py-4 text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest">
                {isProcessing ? 'Weaving Reality...' : 'Generate Masterpiece Fit'}
                {!isProcessing && <span className="material-symbols-outlined text-base">auto_fix_high</span>}
              </div>
              {isProcessing && (
                <div
                  className="absolute bottom-0 left-0 top-0 bg-white/30 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: STAGE (65%) */}
        <div className="relative flex flex-1 flex-col items-center justify-center bg-[#050505] p-0 overflow-hidden">

          {/* Background Ambience */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] opacity-50" />

          {/* STAGE CONTENT */}
          <div
             ref={imageContainerRef}
             className="relative z-10 h-full w-full overflow-hidden flex items-center justify-center cursor-move"
             onWheel={handleWheel}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
          >
            {resultImage ? (
              <motion.div
                style={{
                  scale: zoomLevel,
                  x: panPosition.x,
                  y: panPosition.y
                }}
                className="relative h-[85vh] w-auto max-w-full aspect-[3/4] shadow-2xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={resultImage}
                  alt="Masterpiece Result"
                  className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />

                {/* 4K Detail Badge */}
                {zoomLevel > 1.5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-black/60 px-3 py-1 backdrop-blur-md"
                  >
                    <div className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Hyper-Zoom Active</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center text-white/20">
                <span className="material-symbols-outlined text-6xl mb-4">checkroom</span>
                <p className={`text-xl uppercase tracking-[0.5em] ${cinzel.className}`}>Awaiting Selection</p>
              </div>
            )}
          </div>

          {/* OVERLAY CONTROLS (Floating) */}
          {resultImage && (
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4">

              {/* Reset Zoom */}
              {zoomLevel > 1 && (
                <button
                  onClick={resetZoom}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all border border-white/20"
                >
                  <span className="material-symbols-outlined">zoom_out_map</span>
                </button>
              )}

              {/* Generate Video */}
              <button
                onClick={handleGenerateVideo}
                disabled={isVideoGenerating}
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] px-6 py-3 text-black shadow-lg shadow-[#D4AF37]/20 transition-transform hover:scale-105"
              >
                {isVideoGenerating ? (
                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                ) : (
                   <span className="material-symbols-outlined">movie_creation</span>
                )}
                <span className="text-xs font-bold uppercase tracking-widest">Cinematic Reveal</span>
              </button>

              {/* Share */}
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all border border-white/20">
                <span className="material-symbols-outlined">ios_share</span>
              </button>
            </div>
          )}

          {/* ZOOM INSTRUCTION */}
          {resultImage && zoomLevel === 1 && (
             <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
                Scroll to Hyper-Zoom
             </div>
          )}

        </div>
      </main>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          >
            <div className="relative w-full max-w-lg">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
                 <CinematicViewer videoUrl={videoUrl} posterUrl={resultImage || undefined} className="aspect-[9/16] w-full" />
              </div>
              <div className="mt-6 text-center">
                 <h3 className={`text-2xl text-[#D4AF37] ${cinzel.className}`}>Cinematic Reveal</h3>
                 <p className="mt-2 text-xs text-gray-400">Share your masterpiece with the world.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR TOAST */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 rounded-lg border border-red-500/50 bg-black/80 px-4 py-3 text-red-400 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              <span className="text-xs font-bold">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
