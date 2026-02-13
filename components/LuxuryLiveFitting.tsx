"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { brands, mockClothingItems, ClothingItem, Brand } from "@/data/mockData";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Helper to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with a default brand (e.g., Gucci for luxury)
  useEffect(() => {
    // Find Gucci or first luxury brand
    const luxuryBrand = brands.find(b => b.name === 'GUCCI') || brands.find(b => b.isLuxury) || brands[0];
    setSelectedBrand(luxuryBrand);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update items when brand changes
  useEffect(() => {
    if (selectedBrand) {
      const brandItems = mockClothingItems.filter(item => item.brand.toLowerCase() === selectedBrand.name.toLowerCase());
      setItems(brandItems);
      if (brandItems.length > 0) {
        setActiveItem(brandItems[0]);
      }
    }
  }, [selectedBrand]);

  return (
    <div className={`relative min-h-screen w-full bg-[#101922] text-[#D4AF37] ${cinzel.className} overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#101922] cursor-none`}>

      {/* Custom Cursor */}
      <GoldRingCursor />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#101922]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative size-32">
              <motion.div
                className="absolute inset-0 border-2 border-[#D4AF37]"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} // Using clip path as border-path animation is tricky on div, better svg
              />
               {/* Use SVG for path tracing animation */}
               <svg className="size-full" viewBox="0 0 100 100">
                  <motion.rect
                    x="2" y="2" width="96" height="96"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs tracking-[0.3em] uppercase">Loading</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex h-screen flex-col md:flex-row">

        {/* Left: Product/Brand Story & List */}
        <div className="flex w-full flex-col overflow-y-auto p-8 md:w-5/12 lg:w-4/12 scrollbar-hide">

            {/* Header */}
            <header className="mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="size-8 border border-[#D4AF37]/30 flex items-center justify-center rounded-full">
                        <span className={`text-lg ${spaceGrotesk.className}`}>S</span>
                    </div>
                    <h1 className="text-2xl tracking-[0.2em] font-bold">LUXE FIT</h1>
                </div>
            </header>

            {/* Brand Story */}
            <motion.div
                className="mb-16 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {selectedBrand && (
                    <>
                        <motion.h2
                            key={selectedBrand.name}
                            className="text-5xl md:text-6xl uppercase tracking-wider text-white mix-blend-overlay"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {selectedBrand.name}
                        </motion.h2>
                        <motion.p
                             key={`${selectedBrand.name}-desc`}
                            className={`text-sm leading-relaxed text-[#D4AF37]/80 ${spaceGrotesk.className} max-w-md`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {selectedBrand.description || "A legacy of style and innovation."}
                        </motion.p>
                    </>
                )}
            </motion.div>

            {/* Product Masonry List */}
            <div className="grid grid-cols-1 gap-12 pb-20">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                        className="group relative cursor-pointer"
                        onClick={() => setActiveItem(item)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#0a1016]">
                           {/* Hover effect overlay */}
                           <div className="absolute inset-0 z-10 bg-black/40 transition-opacity duration-700 group-hover:opacity-0"></div>

                           {/* Using standard img for list, Distortion used for main view */}
                           <motion.img
                             src={item.imageUrl}
                             alt={item.name}
                             className="h-full w-full object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                           />

                           {/* Active Indicator */}
                           {activeItem?.id === item.id && (
                               <motion.div
                                layoutId="activeBorder"
                                className="absolute inset-0 border border-[#D4AF37]"
                               />
                           )}
                        </div>

                        {/* Product Info */}
                        <div className="mt-4 flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="text-lg uppercase tracking-widest text-white">{item.name}</h3>
                                <p className={`text-xs text-[#D4AF37]/60 ${spaceGrotesk.className}`}>
                                    {item.category} &mdash; {item.subCategory || "Collection"}
                                </p>
                            </div>
                            <p className={`text-lg font-light ${spaceGrotesk.className}`}>
                                {formatCurrency(item.price, item.currency)}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Right: Main Visual & Fitting Experience */}
        <div className="relative flex-1 bg-[#05080b] overflow-hidden">
            {/* Brand Banner Background (Parallax-like static for now, or subtle move) */}
            <AnimatePresence mode="wait">
                {selectedBrand?.bannerImage && (
                    <motion.div
                        key={selectedBrand.id}
                        className="absolute inset-0 opacity-20 mix-blend-luminosity"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            backgroundImage: `url(${selectedBrand.bannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Main Product Distortion View */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
                <AnimatePresence mode="wait">
                    {activeItem && (
                        <motion.div
                            key={activeItem.id}
                            className="relative aspect-[4/5] h-[80vh] w-auto shadow-2xl shadow-black/50"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 1 }}
                        >
                            {/* The Distortion Component */}
                            <LuxuryImageDistortion
                                image={activeItem.imageUrl}
                                className="h-full w-full"
                            />

                            {/* Floating Metadata */}
                            <motion.div
                                className="absolute -right-8 bottom-12 flex flex-col items-end gap-2 text-right"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/50">Material</span>
                                <span className={`text-sm text-white ${spaceGrotesk.className}`}>100% Silk Chiffon</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 z-20">
                 <button className="group relative flex items-center gap-4 px-8 py-3 uppercase tracking-[0.2em] text-white transition-all hover:text-[#D4AF37]">
                    <span className="absolute inset-0 border border-white/20 transition-all group-hover:border-[#D4AF37]"></span>
                    <span className="relative z-10 text-xs font-bold">Try On</span>
                 </button>
                 <button className="group relative flex items-center gap-4 px-8 py-3 uppercase tracking-[0.2em] text-white transition-all hover:text-[#D4AF37]">
                    <span className="absolute inset-0 border border-white/20 transition-all group-hover:border-[#D4AF37]"></span>
                    <span className="relative z-10 text-xs font-bold">Details</span>
                 </button>
            </div>

        </div>
      </div>
    </div>
  );
}
