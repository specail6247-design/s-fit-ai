"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { brands, getItemsByBrand, ClothingItem, Brand } from "@/data/mockData";
import LuxuryImageDistortion from "@/components/ui/LuxuryImageDistortion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brands.find(b => b.name === 'Gucci') || brands[0]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const items = useMemo(() => getItemsByBrand(selectedBrand.name), [selectedBrand]);
  const currentItem = selectedItem || items[0] || null;

  // Simulate loading delay for "sophisticated" feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedBrand]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.variable} ${cinzel.variable} font-serif`}>
      <GoldRingCursor />

      {/* Background / Live Feed Simulation */}
      <div className="absolute inset-0 z-0">
         {/* In a real app, this would be the camera feed. Here we use a high-quality fashion bg. */}
         <div
           className="absolute inset-0 opacity-40 bg-cover bg-center grayscale"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=2000')" }} // Dark luxury room
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
           {/* Brand Selector / Display */}
           <div className="flex flex-col">
              <h1 className="font-cinzel text-4xl text-[#D4AF37] tracking-widest">{selectedBrand.name}</h1>
              <span className="text-xs tracking-[0.3em] text-white/60 uppercase">Collection 2025</span>
           </div>
        </div>

        {/* Navigation / Mode Switch */}
        <div className="flex gap-8">
            {['Fitting', 'Runway', 'Atelier'].map((item) => (
                <button key={item} className="text-sm uppercase tracking-widest text-white/50 hover:text-[#D4AF37] transition-colors duration-500">
                    {item}
                </button>
            ))}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 w-full overflow-hidden">

        {/* Left: Brand Story & Details */}
        <div className="w-1/4 p-8 flex flex-col justify-center space-y-8 hidden md:flex">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedBrand.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 1 }}
                    className="space-y-6"
                >
                    <div className="h-[1px] w-20 bg-[#D4AF37]" />
                    <p className="font-playfair text-lg leading-relaxed text-white/80">
                        {selectedBrand.description || "Defining modern luxury with timeless elegance and innovative design."}
                    </p>
                    {/* Brand Banner Parallax (Small Preview) */}
                    {selectedBrand.bannerImage && (
                        <div className="relative h-40 w-full overflow-hidden rounded-sm border border-white/10">
                            <motion.img
                                src={selectedBrand.bannerImage}
                                alt={selectedBrand.name}
                                className="h-full w-full object-cover opacity-60"
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Center: Main Visual (Product + Distortion) */}
        <div className="flex-1 relative flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative size-64 flex items-center justify-center"
                    >
                        {/* Gold Line Tracing Box Animation */}
                        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                            <motion.path
                                d="M10,10 L90,10 L90,90 L10,90 Z"
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                        <span className="font-cinzel text-xs text-[#D4AF37] tracking-[0.5em] animate-pulse">LOADING</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentItem?.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1 }}
                        className="relative h-[60vh] md:h-[70vh] w-full max-w-2xl"
                    >
                        {/* The Luxury Image Distortion Component */}
                        {currentItem && (
                            <div className="relative w-full h-full border border-white/5 bg-black/20 backdrop-blur-sm shadow-2xl shadow-black/50">
                                <LuxuryImageDistortion imageUrl={currentItem.imageUrl} />

                                {/* Item Details Overlay */}
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <h2 className="font-cinzel text-3xl text-white mb-2">{currentItem.name}</h2>
                                        <p className="font-playfair text-[#D4AF37] text-xl italic">{formatPrice(currentItem.price)}</p>
                                    </div>
                                    <button className="pointer-events-auto px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold">
                                        Try On
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Right: Vertical Product List */}
        <div className="w-1/4 md:w-1/5 h-full overflow-y-auto p-4 scrollbar-hide border-l border-white/5 bg-black/40 backdrop-blur-md">
             <div className="flex flex-col gap-8 py-10 pb-32">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative cursor-pointer transition-all duration-700 ${currentItem?.id === item.id ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                    >
                        <div className="aspect-[3/4] w-full overflow-hidden mb-3 border border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-500">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                             />
                        </div>
                        <div className="text-center">
                            <p className="font-cinzel text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1">{item.category}</p>
                            <p className="font-playfair text-xs text-white truncate px-2">{item.name}</p>
                        </div>

                        {currentItem?.id === item.id && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute -left-4 top-1/2 h-8 w-[2px] bg-[#D4AF37]"
                            />
                        )}
                    </motion.div>
                ))}
             </div>
        </div>

      </div>

      {/* Footer Controls */}
      <footer className="relative z-10 flex flex-col md:flex-row justify-between items-center p-6 border-t border-white/5 bg-black/60 backdrop-blur-xl gap-4">
          <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#D4AF37] opacity-60">mic</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">Voice Command Active</span>
          </div>

          <div className="flex gap-4 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
             {/* Brand Quick Switch */}
             {brands.slice(0, 5).map(brand => (
                 <button
                    key={brand.id}
                    onClick={() => {
                        setIsLoading(true);
                        setSelectedBrand(brand);
                        setSelectedItem(null);
                    }}
                    className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest transition-colors duration-500 ${selectedBrand.id === brand.id ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'text-white/40 hover:text-white'}`}
                 >
                     {brand.name}
                 </button>
             ))}
          </div>
      </footer>
    </div>
  );
}
