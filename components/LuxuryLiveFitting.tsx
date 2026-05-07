"use client";

import React, { useState } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./ui/GoldRingCursor";
import { motion, AnimatePresence } from "framer-motion";
import { mockClothingItems, brands } from "@/data/mockData";
import { ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState(brands.find(b => b.isLuxury) || brands[0]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem>(mockClothingItems.find(i => i.isLuxury) || mockClothingItems[0]);
  const [isLoading, setIsLoading] = useState(false);

  const luxuryItems = mockClothingItems.filter(i => i.isLuxury && i.brand === selectedBrand.name);
  const displayItems = luxuryItems.length > 0 ? luxuryItems : mockClothingItems.filter(i => i.isLuxury);

  const handleItemSelect = (item: ClothingItem) => {
    if (item.id === selectedItem.id) return;
    setIsLoading(true);
    setTimeout(() => {
      setSelectedItem(item);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${playfair.className} cursor-none`}>
      {/* Custom Cursor */}
      <GoldRingCursor />

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            imageUrl={selectedItem?.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"}
            alt="Product Visual"
          />
        </div>

        {/* Loading Effect Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <div className="relative w-64 h-80">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                  className="absolute inset-0 border-[1px] border-luxury-gold/0"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.rect
                      x="0" y="0" width="100" height="100"
                      fill="none"
                      stroke="#ecab13"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className={`text-luxury-gold tracking-[0.2em] uppercase text-xs ${cinzel.className}`}>Loading</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className={`text-lg font-bold tracking-[0.2em] uppercase text-luxury-gold ${cinzel.className}`}>Luxury Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Experience Banner */}
                {/* Brand Experience Banner */}
        <div className="z-10 px-8 pt-8 flex flex-col items-center relative overflow-hidden rounded-2xl mx-4 border border-luxury-gold/30 h-48 group">
            {/* Banner Parallax Background */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url("${selectedBrand.name === 'Gucci' ? "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2000" : selectedBrand.name === 'Chanel' ? "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000" : "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=2000"}")` }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className={`text-4xl text-pure-white tracking-widest uppercase ${cinzel.className}`}
              >
                {selectedBrand.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xs tracking-[0.3em] text-luxury-gold uppercase mt-2 mb-4"
              >
                Exclusive Collection
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-sm text-white/80 max-w-md mx-auto"
              >
                {selectedBrand.name === 'Gucci' ? "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion." :
                 selectedBrand.name === 'Chanel' ? "The ultimate house of luxury, defining elegance and style for over a century." :
                 "World&apos;s premier jeweler and America&apos;s house of design since 1837."}
              </motion.p>
            </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 w-full px-8 bg-gradient-to-t from-black via-black/80 to-transparent pt-32">

          <div className="flex justify-between items-end mb-8">
             <div className="flex flex-col gap-2 max-w-[50%]">
                 <motion.h3
                   key={selectedItem.id + '-name'}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.7 }}
                   className={`text-2xl text-pure-white ${cinzel.className}`}
                 >
                    {selectedItem.name}
                 </motion.h3>
                 <motion.p
                   key={selectedItem.id + '-desc'}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.7, delay: 0.1 }}
                   className="text-sm text-white/60 line-clamp-2"
                 >
                    {selectedItem.description}
                 </motion.p>
             </div>

             <motion.div
               key={selectedItem.id + '-price'}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.7 }}
               className={`text-3xl text-luxury-gold ${cinzel.className}`}
             >
                {selectedItem.price.toLocaleString('en-US', { style: 'currency', currency: selectedItem.currency, maximumFractionDigits: 0 })}
             </motion.div>
          </div>

          {/* Garment Carousel - Masonry/Vertical inspired */}
          <div className="flex overflow-x-auto py-6 gap-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <AnimatePresence>
              {displayItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                  onClick={() => handleItemSelect(item)}
                  className={`flex min-w-[160px] flex-col gap-4 cursor-pointer transition-all duration-700 ease-out group ${selectedItem.id === item.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}
                >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-luxury-gold/20">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url("${item.imageUrl}")` }}
                      />
                      {selectedItem.id === item.id && (
                        <div className="absolute inset-0 border border-luxury-gold pointer-events-none" />
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={`truncate text-xs uppercase tracking-widest text-pure-white ${cinzel.className}`}>{item.name}</p>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Capture Controls - Minimalist Gold */}
          <div className="flex items-center justify-center gap-16 pt-8">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors duration-700">
              <span className="material-symbols-outlined text-2xl font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-luxury-gold/50 bg-black/20 backdrop-blur-md hover:bg-luxury-gold/10 transition-all duration-700 group cursor-pointer">
                <div className="flex size-16 items-center justify-center rounded-full border border-luxury-gold/30 group-hover:border-luxury-gold transition-all duration-700">
                  <span className="material-symbols-outlined text-3xl text-luxury-gold font-light">camera</span>
                </div>
              </button>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors duration-700">
              <span className="material-symbols-outlined text-2xl font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
