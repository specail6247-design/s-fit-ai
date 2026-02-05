"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./ui/GoldRingCursor";
import { brands, mockClothingItems, ClothingItem, Brand } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(brands.find(b => b.name === 'Gucci') || brands[1]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(mockClothingItems.find(i => i.brand === 'Gucci') || mockClothingItems[0]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter items by selected brand or just show luxury items
  const displayItems = mockClothingItems.filter(item => item.isLuxury || (selectedBrand && item.brand === selectedBrand.name));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleItemSelect = (item: ClothingItem) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsLoading(true);
    setSelectedItem(item);
    const brand = brands.find(b => b.name === item.brand);
    if (brand) setSelectedBrand(brand);

    // Simulate loading delay for the "sophisticated" feel
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <GoldRingCursor />

      {/* Background/Base Layer */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0"></div>

      {/* Brand Banner Parallax Background */}
      <AnimatePresence mode="wait">
        {selectedBrand?.bannerImage && (
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          >
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

             {/* Parallax Image */}
             <motion.img
               src={selectedBrand.bannerImage}
               alt="Brand Banner"
               className="w-full h-full object-cover"
               initial={{ scale: 1.05 }}
               animate={{ scale: 1.15, x: "-2%" }}
               transition={{
                 duration: 20,
                 ease: "linear",
                 repeat: Infinity,
                 repeatType: "reverse"
               }}
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full flex-col">

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-6 pt-8 z-50">
          <button className="interactive flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:border-[#ecab13]/50 hover:bg-black/60">
            <span className="material-symbols-outlined text-white">close</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className={`${cinzel.className} text-xl font-bold tracking-[0.2em] text-[#ecab13]`}>S_FIT LUXE</h2>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#ecab13] to-transparent mt-2"></div>
          </div>

          <button className="interactive flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:border-[#ecab13]/50 hover:bg-black/60">
            <span className="material-symbols-outlined text-white">shopping_bag</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* Left Sidebar: Brand & Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-1/4 hidden md:flex flex-col justify-center p-12 space-y-12 z-20 pointer-events-none"
          >
             {/* Brand Info */}
             <div className="space-y-6 pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBrand?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h3 className={`${cinzel.className} text-5xl text-white mb-4 leading-tight`}>{selectedBrand?.name}</h3>
                    <div className="w-12 h-1 bg-[#ecab13] mb-6" />
                    <p className="text-white/80 text-sm leading-relaxed font-light tracking-wide max-w-xs">
                       {selectedBrand?.description || "A legacy of timeless luxury."}
                    </p>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Price & Details */}
             <div className="space-y-2 pointer-events-auto mt-8">
                <p className="text-[#ecab13] text-[10px] font-bold tracking-[0.2em] uppercase">Current Piece</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem?.id}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.7 }}
                  >
                     <p className={`${cinzel.className} text-5xl text-white`}>
                        {selectedItem ? formatPrice(selectedItem.price) : '---'}
                     </p>
                     <p className="text-white/50 text-xs mt-2 uppercase tracking-wider">{selectedItem?.name}</p>
                  </motion.div>
                </AnimatePresence>
             </div>
          </motion.div>

          {/* Center: Main Visual */}
          <div className="flex-1 relative flex items-center justify-center z-10">
             <div className="relative w-full h-full max-w-xl max-h-[80vh] border-x border-t border-white/5 rounded-t-full overflow-hidden bg-[#0f0f0f]/80 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                 {/* Loading State Overlay */}
                 <AnimatePresence>
                   {isLoading && (
                     <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5 }}
                       className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex items-center justify-center"
                     >
                       {/* Gold Line Tracing Box Animation */}
                       <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <motion.path
                              d="M10,10 L90,10 L90,90 L10,90 Z"
                              fill="none"
                              stroke="#ecab13"
                              strokeWidth="1"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                            />
                          </svg>
                          <p className="absolute inset-0 flex items-center justify-center text-[#ecab13] text-[10px] uppercase tracking-[0.3em] font-bold animate-pulse">
                            Fitting
                          </p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* Luxury Distortion Component */}
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={selectedItem?.imageUrl}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1 }}
                     className="w-full h-full"
                   >
                     {selectedItem && (
                       <LuxuryImageDistortion
                          imageUrl={selectedItem.imageUrl}
                          className="w-full h-full"
                       />
                     )}
                   </motion.div>
                 </AnimatePresence>

                 {/* Scanning Line (Gold) - Always active for ambience or only when processing?
                     Let's make it subtle always, intense when loading. */}
                 <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13]/30 to-transparent z-20 pointer-events-none"
                 />

                 {/* Vignette */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10"></div>
             </div>
          </div>

          {/* Right Sidebar: Products */}
          <div className="w-1/4 h-full p-8 overflow-y-auto no-scrollbar z-20 bg-gradient-to-l from-black/80 to-transparent backdrop-blur-sm">
             <div className="flex flex-col gap-10 pb-32 pt-10">
                {displayItems.map((item, i) => (
                   <motion.div
                     key={item.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                     whileHover={{ scale: 1.02 }}
                     onClick={() => handleItemSelect(item)}
                     className={`interactive group flex flex-col gap-4 cursor-pointer ${selectedItem?.id === item.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'} transition-opacity duration-500`}
                   >
                      <div className={`aspect-[3/4] w-full rounded-sm overflow-hidden relative border ${selectedItem?.id === item.id ? 'border-[#ecab13]' : 'border-transparent'}`}>
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img
                           src={item.imageUrl}
                           alt={item.name}
                           className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.9] contrast-[1.1]"
                         />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                      </div>
                      <div className="space-y-2">
                         <p className={`${cinzel.className} text-xl text-white group-hover:text-[#ecab13] transition-colors duration-500 leading-none`}>{item.name}</p>
                         <p className="text-xs text-white/50 font-bold tracking-wider">{formatPrice(item.price)}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="fixed bottom-0 left-0 w-full p-8 flex justify-center z-30 pointer-events-none">
           <div className="pointer-events-auto flex items-center gap-12 bg-black/80 backdrop-blur-xl px-12 py-6 rounded-full border border-white/5 shadow-2xl shadow-black">
              <button className="interactive flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-500 group">
                 <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">grid_view</span>
                 <span className="text-[9px] uppercase tracking-[0.2em]">Collection</span>
              </button>

              <button className="interactive flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ecab13] to-[#b3800e] text-black shadow-[0_0_40px_rgba(236,171,19,0.3)] hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_60px_rgba(236,171,19,0.5)]">
                 <span className="material-symbols-outlined text-4xl">photo_camera</span>
              </button>

              <button className="interactive flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-500 group">
                 <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">share</span>
                 <span className="text-[9px] uppercase tracking-[0.2em]">Share</span>
              </button>
           </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
