"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brands, getItemsByBrand, ClothingItem, Brand } from "@/data/mockData";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";
import Image from "next/image";

// Helper for currency formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function LuxuryLiveFitting() {
  // Default to Gucci or first luxury brand
  const [selectedBrand, setSelectedBrand] = useState<Brand>(
    brands.find(b => b.name === 'GUCCI') || brands.find(b => b.isLuxury) || brands[0]
  );
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load items for the selected brand
    const brandItems = getItemsByBrand(selectedBrand.id);
    setItems(brandItems);
    if (brandItems.length > 0) {
      setSelectedItem(brandItems[0]);
    } else {
      setSelectedItem(null);
    }
  }, [selectedBrand]);

  // Simulate loading when item changes
  useEffect(() => {
    if (selectedItem) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s sophisticated loading
      return () => clearTimeout(timer);
    }
  }, [selectedItem]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#ecab13] font-sans selection:bg-[#ecab13] selection:text-black">
      <GoldRingCursor />

      {/* Background / Main Visual */}
      <div className="absolute inset-0 z-0">
        {selectedItem ? (
          <LuxuryImageDistortion imageUrl={selectedItem.imageUrl} />
        ) : (
             <div className="h-full w-full bg-neutral-900" />
        )}
        {/* Vignette & Gradient Overlay for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 pointer-events-none" />

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* Brand Header / Banner */}
      <div className="relative z-10 flex flex-col items-center pt-12 text-center pointer-events-none">
        <motion.h1
          key={selectedBrand.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-[0.2em] uppercase text-[#ecab13] drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          {selectedBrand.name}
        </motion.h1>
        {selectedBrand.description && (
          <motion.p
            key={selectedBrand.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 max-w-lg text-sm tracking-widest text-white/60 font-serif italic"
          >
            {selectedBrand.description}
          </motion.p>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-1 items-end justify-between px-12 pb-12 w-full max-w-[1920px] mx-auto">

        {/* Left: Brand Selection / Navigation */}
        <div className="hidden md:flex flex-col gap-12 w-64 mb-12">
           {/* Brand List */}
           <div className="flex flex-col gap-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">Maison Selection</h3>
              <div className="flex flex-col gap-4">
                {brands.filter(b => b.isLuxury).map(brand => (
                    <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand)}
                        className={`text-left text-sm uppercase tracking-[0.2em] transition-all duration-700 group flex items-center gap-4 ${
                            selectedBrand.id === brand.id
                            ? 'text-[#ecab13] pl-4 border-l-2 border-[#ecab13]'
                            : 'text-white/40 hover:text-white/80 pl-0 border-l-2 border-transparent'
                        }`}
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                        {brand.name}
                    </button>
                ))}
              </div>
           </div>
        </div>

        {/* Center: Loading State Overlay */}
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                    <div className="relative h-48 w-48 md:h-64 md:w-64">
                        {/* Gold Line Tracing Box Animation */}
                        <svg className="absolute inset-0 h-full w-full overflow-visible">
                            <motion.rect
                                width="100%"
                                height="100%"
                                fill="none"
                                stroke="#ecab13"
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <div className="h-px w-12 bg-[#ecab13]/50" />
                            <span className="text-[10px] tracking-[0.4em] text-[#ecab13] animate-pulse font-bold">ANALYZING</span>
                            <div className="h-px w-12 bg-[#ecab13]/50" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Right: Product Selector (Vertical Masonry-ish) */}
        <div className="h-[60vh] w-full md:w-96 overflow-y-auto pr-4 scrollbar-hide pb-20">
             <div className="flex flex-col gap-12">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative cursor-pointer transition-all duration-700 ${
                            selectedItem?.id === item.id ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                        }`}
                    >
                        {/* Image Container */}
                        <div className={`relative w-full overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-700 ${
                            selectedItem?.id === item.id ? 'aspect-[3/4] border-[#ecab13]/50 shadow-[0_0_30px_rgba(236,171,19,0.1)]' : 'aspect-[3/5] grayscale'
                        }`}>
                             <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 400px"
                             />
                             {/* Active Indicator */}
                             {selectedItem?.id === item.id && (
                                 <motion.div
                                    layoutId="activeBorder"
                                    className="absolute inset-0 border border-[#ecab13]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                 />
                             )}
                        </div>

                        {/* Details */}
                        <div className="mt-6 flex flex-col gap-2 pl-2 border-l border-white/10 group-hover:border-[#ecab13] transition-colors duration-500">
                            <h3 className="text-xl font-normal uppercase leading-none text-white tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
                                {item.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[#ecab13] tracking-wider">
                                    {formatPrice(item.price)}
                                </p>
                                <span className="text-[10px] text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                                    View Item
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
             </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex w-full justify-between px-12 pb-8 text-[9px] uppercase tracking-[0.3em] text-white/20">
         <span>S_FIT NEO LUXURY ENGINE v2.0</span>
         <span className="hidden md:inline">High Fidelity Visualization</span>
         <span>SECURE VAULT ACCESS</span>
      </div>
    </div>
  );
}
