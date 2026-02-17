"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { StudioStage } from './StudioStage';
import { FabricMaterial } from './FabricMaterial';
import { mockClothingItems, ClothingItem } from '@/data/mockData';
import { generateVirtualTryOn, upscaleImage, generateCinematicVideo } from '@/lib/virtualTryOn';

// Helper for fabric rendering in 2.5D
function ClothingMesh({ item }: { item: ClothingItem }) {
  // We use a simple plane that aspect-matches the image roughly.
  // In a real app, we'd calculate aspect ratio.
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[4, 5, 64, 64]} />
      <FabricMaterial
        textureUrl={item.textureUrl}
        fabricType={item.fabricType || 'cotton'}
      />
    </mesh>
  );
}

export default function MasterpieceFitting() {
  // State
  const [selectedCategory, setSelectedCategory] = useState<'luxury' | 'k-fashion' | 'accessories'>('luxury');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isUpscaling, setIsUpscaling] = useState(false);

  // Filter items
  const displayItems = React.useMemo(() => {
    if (selectedCategory === 'luxury') {
      return mockClothingItems.filter(i => i.isLuxury && i.category !== 'accessories');
    } else if (selectedCategory === 'accessories') {
      return mockClothingItems.filter(i => i.category === 'accessories');
    } else {
      // K-Fashion / Mass Market
      return mockClothingItems.filter(i => !i.isLuxury && i.category !== 'accessories');
    }
  }, [selectedCategory]);

  // Handlers
  const handleSelectItem = (item: ClothingItem) => {
    setSelectedItem(item);
    setTryOnResult(null); // Reset result when changing item
    setVideoResult(null);
    setIsZoomed(false);
  };

  const handleTryOn = async () => {
    if (!selectedItem) return;
    setIsProcessing(true);

    // Mock User Photo (In a real app, this comes from upload or camera)
    const userPhoto = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g";

    try {
      const result = await generateVirtualTryOn({
        userPhoto: userPhoto,
        garmentImage: selectedItem.imageUrl,
        category: selectedItem.category === 'dresses' ? 'dresses' :
                  selectedItem.category === 'bottoms' ? 'lower_body' :
                  selectedItem.category === 'tops' ? 'upper_body' : 'upper_body', // Default fallback
        garmentDescription: selectedItem.description
      });

      if (result.success && result.imageUrl) {
        setTryOnResult(result.imageUrl);
      } else {
        alert("Try-On Failed: " + result.error);
      }
    } catch (e) {
      console.error(e);
      alert("Try-On Error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCinematicShare = async () => {
    if (!tryOnResult) return;
    setIsProcessing(true);
    try {
      const result = await generateCinematicVideo(tryOnResult);
      if (result.success && result.videoUrl) {
        setVideoResult(result.videoUrl);
      } else {
        alert("Video Generation Failed: " + result.error);
      }
    } catch (e) {
      console.error(e);
      alert("Video Generation Error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleZoomInteraction = async () => {
    if (!tryOnResult || isUpscaling) return;

    // Toggle zoom
    const nextZoomState = !isZoomed;
    setIsZoomed(nextZoomState);

    // If zooming in, check if we need upscale (Hyper-Zoom)
    if (nextZoomState) {
        setIsUpscaling(true);
        try {
            // Check if we already have a high-res version?
            // For now, we just call upscale every time or we could cache it.
            const highResUrl = await upscaleImage(tryOnResult);
            if (highResUrl) {
                setTryOnResult(highResUrl);
            }
        } catch (e) {
            console.error("Upscale failed", e);
        } finally {
            setIsUpscaling(false);
        }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#101622] text-white overflow-hidden font-sans">

      {/* LEFT PANEL: Digital Atelier */}
      <div className="w-[400px] flex flex-col border-r border-[#222f49] bg-[#151c2d] z-10 shadow-2xl">
        <div className="p-6 border-b border-[#222f49]">
          <h1 className="text-2xl font-serif tracking-widest text-[#D4AF37]">M_FIT</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#90a4cb] mt-1">Masterpiece Fitting Engine</p>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-[#222f49]">
          <button
            onClick={() => setSelectedCategory('luxury')}
            className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${selectedCategory === 'luxury' ? 'text-white bg-[#256af4]/10 border-b-2 border-[#256af4]' : 'text-[#90a4cb] hover:text-white'}`}
          >
            Luxury
          </button>
          <button
            onClick={() => setSelectedCategory('k-fashion')}
            className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${selectedCategory === 'k-fashion' ? 'text-white bg-[#256af4]/10 border-b-2 border-[#256af4]' : 'text-[#90a4cb] hover:text-white'}`}
          >
            K-Fashion
          </button>
          <button
            onClick={() => setSelectedCategory('accessories')}
            className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${selectedCategory === 'accessories' ? 'text-white bg-[#256af4]/10 border-b-2 border-[#256af4]' : 'text-[#90a4cb] hover:text-white'}`}
          >
            Accessories
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            {displayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`group relative aspect-[3/4] cursor-pointer rounded-lg overflow-hidden border transition-all ${selectedItem?.id === item.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-transparent hover:border-[#90a4cb]/50'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-[10px] font-bold uppercase text-white truncate">{item.brand}</p>
                  <p className="text-[9px] text-gray-300 truncate">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Item Detail */}
        {selectedItem && (
          <div className="p-6 bg-[#0f1420] border-t border-[#222f49]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{selectedItem.brand}</p>
                <h3 className="text-sm font-medium text-white">{selectedItem.name}</h3>
              </div>
              <p className="text-sm font-bold text-white">${selectedItem.price}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded bg-[#222f49] text-[9px] uppercase text-[#90a4cb]">{selectedItem.fabricType || 'Unknown Fabric'}</span>
              <span className="px-2 py-0.5 rounded bg-[#222f49] text-[9px] uppercase text-[#90a4cb]">{selectedItem.category}</span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: The Stage */}
      <div className="flex-1 relative bg-[#0a0e17]">

        {/* Viewport */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* STATE 1: 3D Preview (Before Try-On) */}
          {!tryOnResult && !isProcessing && (
            <div className="w-full h-full relative">
               {selectedItem ? (
                 <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                   <Suspense fallback={<Html center><div className="text-white text-xs uppercase tracking-widest">Loading Texture...</div></Html>}>
                     <StudioStage fabricType={selectedItem.fabricType || 'cotton'} />
                     <Center>
                       <ClothingMesh item={selectedItem} />
                     </Center>
                     <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                   </Suspense>
                 </Canvas>
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-[#314368]">
                   <span className="material-symbols-outlined text-6xl mb-4 opacity-50">checkroom</span>
                   <p className="text-sm uppercase tracking-widest">Select an item to begin fitting</p>
                 </div>
               )}

               {/* Overlay Hint */}
               {selectedItem && (
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                   <p className="text-[10px] uppercase tracking-[0.2em] text-[#90a4cb] mb-2">2.5D Displacement Preview</p>
                   <div className="flex gap-2">
                     <span className="size-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                     <span className="text-[10px] font-bold text-[#D4AF37]">Physics Engine Active</span>
                   </div>
                 </div>
               )}
            </div>
          )}

          {/* STATE 2: Processing */}
          {isProcessing && (
            <div className="flex flex-col items-center gap-4 z-50">
              <div className="size-16 rounded-full border-2 border-[#256af4] border-t-transparent animate-spin"></div>
              <p className="text-sm font-bold text-white tracking-widest uppercase animate-pulse">
                Constructing Masterpiece...
              </p>
              <p className="text-xs text-[#90a4cb]">Synthesizing micro-fiber details</p>
            </div>
          )}

          {/* STATE 3: Try-On Result (Image) */}
          {tryOnResult && !videoResult && !isProcessing && (
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
               <motion.div
                 className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
                 animate={{ scale: isZoomed ? 2.5 : 1 }}
                 transition={{ type: "spring", stiffness: 100, damping: 20 }}
                 onClick={handleZoomInteraction}
                 drag={isZoomed}
                 dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
               >
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src={tryOnResult}
                   alt="Try-On Result"
                   className="max-h-full max-w-full object-contain shadow-2xl"
                 />
               </motion.div>

               {/* Hyper-Zoom Indicator */}
               {isZoomed && (
                 <div className="absolute top-8 right-8 glass-panel p-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <span className="material-symbols-outlined text-[#D4AF37]">loupe</span>
                    <div>
                      <p className="text-xs font-bold text-white">HYPER-ZOOM ACTIVE</p>
                      <p className="text-[10px] text-[#90a4cb]">{isUpscaling ? 'Upscaling Texture...' : '4K Texture Resolved'}</p>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* STATE 4: Video Result */}
          {videoResult && !isProcessing && (
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <video
                src={videoResult}
                autoPlay
                loop
                muted
                playsInline
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute top-8 left-8">
                 <p className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase bg-black/50 px-3 py-1 rounded border border-[#D4AF37]/30">
                    Cinematic Mode
                 </p>
              </div>
            </div>
          )}

        </div>

        {/* Action Bar */}
        <div className="absolute bottom-0 inset-x-0 p-8 flex justify-between items-end pointer-events-none">
          <div className="pointer-events-auto">
            {tryOnResult && (
              <button
                onClick={() => { setTryOnResult(null); setVideoResult(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#101622]/80 backdrop-blur text-white rounded-full border border-[#222f49] hover:bg-[#222f49] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span className="text-xs font-bold uppercase tracking-wider">Back to Preview</span>
              </button>
            )}
          </div>

          <div className="flex gap-4 pointer-events-auto">
            {/* Try On Button */}
            {!tryOnResult && !isProcessing && selectedItem && (
               <button
                 onClick={handleTryOn}
                 className="h-14 px-8 bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold text-sm tracking-widest uppercase rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
               >
                 <span className="material-symbols-outlined">apparel</span>
                 Generate Masterpiece
               </button>
            )}

            {/* Cinematic Share Button */}
            {tryOnResult && !videoResult && !isProcessing && (
               <button
                 onClick={handleCinematicShare}
                 className="h-14 px-8 bg-[#256af4] hover:bg-[#1b4fc2] text-white font-bold text-sm tracking-widest uppercase rounded-sm shadow-[0_0_20px_rgba(37,106,244,0.3)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
               >
                 <span className="material-symbols-outlined">movie_filter</span>
                 Cinematic Share (4K)
               </button>
            )}

            {/* Download/Share (When Video Ready) */}
            {videoResult && (
               <button
                 className="h-14 px-8 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
               >
                 <span className="material-symbols-outlined">share</span>
                 Share to Instagram
               </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
