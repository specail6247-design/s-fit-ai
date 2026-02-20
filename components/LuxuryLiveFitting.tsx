"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./masterpiece/GoldRingCursor";
import { mockClothingItems, brands, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize with a luxury item
  useEffect(() => {
    // Filter for luxury items, fallback to all if none found
    const luxuryItems = mockClothingItems.filter(i => i.isLuxury);
    const initialItem = luxuryItems.length > 0 ? luxuryItems[0] : mockClothingItems[0];
    setSelectedItem(initialItem);

    // Simulate initial loading for the "Sophisticated Loading State"
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const selectedBrand = selectedItem ? brands.find(b => b.name === selectedItem.brand) : null;
  const luxuryItems = mockClothingItems.filter(i => i.isLuxury);

  // Currency formatter
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-[#050505] text-[#e0e0e0] ${cinzel.variable} ${playfair.variable} ${spaceGrotesk.variable} font-sans selection:bg-[#ecab13] selection:text-black cursor-none`}>
      <GoldRingCursor />

      {/* Loading State - Gold Line Tracing */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <div className="relative h-32 w-32 flex items-center justify-center">
               <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                 <motion.rect
                   x="10" y="10" width="80" height="80"
                   fill="none"
                   stroke="#ecab13"
                   strokeWidth="0.5"
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 1 }}
                   transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                 />
               </svg>
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="text-xs font-bold tracking-[0.4em] text-[#ecab13] font-cinzel uppercase text-center"
               >
                 Atelier
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex h-full w-full">
        {/* Left: Product Visual (3D Distortion) */}
        <div className="relative flex-1 h-full bg-[#0a0a0a] overflow-hidden">
           {/* Brand Banner Background with Parallax */}
           <AnimatePresence mode="wait">
             {selectedBrand && (
               <motion.div
                 key={selectedBrand.id}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 0.4, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1.5 }}
                 className="absolute inset-0 z-0"
               >
                 <img
                   src={selectedBrand.bannerImage}
                   alt={selectedBrand.name}
                   className="h-full w-full object-cover grayscale opacity-50 mix-blend-overlay"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
               </motion.div>
             )}
           </AnimatePresence>

           {/* Static background pattern for texture */}
           <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

           {selectedItem && (
             <motion.div
               key={selectedItem.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5 }} // Slower transition as requested
               className="relative z-10 h-full w-full"
             >
                <LuxuryImageDistortion
                  imageUrl={selectedItem.imageUrl}
                  alt={selectedItem.name}
                />
             </motion.div>
           )}

           {/* Brand Experience Overlay */}
           <AnimatePresence mode="wait">
             {selectedBrand && !loading && (
               <motion.div
                 key={selectedBrand.id}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                 className="absolute top-20 left-20 max-w-lg z-20 pointer-events-none mix-blend-difference"
               >
                 <h1 className="text-7xl font-cinzel text-white mb-4 tracking-tighter">{selectedBrand.name}</h1>
                 <div className="h-[1px] w-20 bg-[#ecab13] mb-6"></div>
                 <p className="text-lg font-playfair italic text-[#e0e0e0] tracking-wide leading-relaxed">
                   {selectedItem?.description || "Experience the pinnacle of luxury fashion."}
                 </p>
                 {/* Parallax-like floating price */}
                 <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8"
                 >
                    <span className="text-2xl font-space text-[#ecab13] tracking-widest">
                        {selectedItem && formatPrice(selectedItem.price, selectedItem.currency)}
                    </span>
                 </motion.div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Right: Selection Panel (Masonry/Vertical) */}
        <div className="w-[450px] h-full bg-[#050505] border-l border-[#ecab13]/10 flex flex-col z-20 shadow-2xl">
            {/* Header */}
            <div className="p-10 pb-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-cinzel tracking-[0.2em] text-[#ecab13]">Collection</h2>
                        <p className="text-xs text-white/40 font-playfair mt-2 italic tracking-wider">Season 2024 / Fall</p>
                    </div>
                    <div className="text-xs font-space text-white/30">
                        {luxuryItems.length} ITEMS
                    </div>
                </div>
                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-[#ecab13]/50 to-transparent"></div>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-10 pt-0 space-y-12 scrollbar-hide">
                {luxuryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        onClick={() => setSelectedItem(item)}
                        className={`group cursor-pointer relative flex flex-col gap-4 transition-all duration-700 ${selectedItem?.id === item.id ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-80'}`}
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/5 group-hover:border-[#ecab13]/30 transition-colors duration-500">
                            {/* We use a simple img here for the list, the distortion is only for the main view */}
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Selected Indicator Line */}
                            {selectedItem?.id === item.id && (
                                <motion.div
                                    layoutId="active-line"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ecab13]"
                                />
                            )}
                        </div>

                        <div className="text-center group-hover:text-[#ecab13] transition-colors duration-500">
                            <h3 className="font-cinzel text-sm tracking-widest uppercase">{item.brand}</h3>
                            <p className="font-playfair text-xs mt-1 text-white/60 group-hover:text-white/90">{item.name}</p>
                        </div>
                    </motion.div>
                ))}

                {/* Spacer */}
                <div className="h-20"></div>
            </div>

            {/* Action Bar */}
            <div className="p-8 border-t border-[#ecab13]/10 bg-[#050505]">
                <button className="w-full py-5 bg-[#ecab13] text-[#050505] font-cinzel font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-700">
                    Begin Fitting
                </button>
            </div>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-8 right-8 z-50 flex gap-4">
          <button className="group h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#ecab13] transition-all duration-500 bg-black/20 backdrop-blur-md">
             <span className="material-symbols-outlined text-white/60 group-hover:text-[#ecab13] transition-colors">close</span>
          </button>
      </div>

      {/* Decorative Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[60] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}
