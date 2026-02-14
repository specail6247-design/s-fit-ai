"use client";

import React, { useState, useEffect } from "react";
import { GoldRingCursor } from "@/components/ui/GoldRingCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import { mockClothingItems, ClothingItem, brands } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const LuxuryLoader = () => (
  <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-black">
    <div className="relative h-24 w-24">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <motion.rect
          x="2"
          y="2"
          width="96"
          height="96"
          fill="none"
          stroke="#ecab13"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
         <span className="font-[family-name:var(--font-cinzel)] text-xl text-[#ecab13]">S</span>
      </div>
    </div>
    <span className="text-[10px] uppercase tracking-[0.3em] text-[#ecab13]/60">Processing Luxury Assets</span>
  </div>
);

export default function LuxuryLiveFitting() {
  const [loading, setLoading] = useState(true);

  // Initialize with the first luxury item found
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(() =>
    mockClothingItems.find(i => i.isLuxury) || mockClothingItems[0]
  );

  // Filter for luxury items only
  const luxuryItems = mockClothingItems.filter(item => item.isLuxury);

  // Derived state for active brand
  const activeBrand = selectedItem
    ? brands.find(b => b.name.toLowerCase() === selectedItem.brand.toLowerCase())
    : undefined;

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) {
      return (
          <div className="relative h-screen w-full bg-black">
               <GoldRingCursor />
               <LuxuryLoader />
          </div>
      )
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#ecab13] selection:bg-[#ecab13] selection:text-black">
      <GoldRingCursor />

      {/* Background / Main Visual */}
      <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000">
        {/* Prioritize item image, fallback to brand banner */}
        {(selectedItem || activeBrand) && (
             <LuxuryImageDistortion imageUrl={selectedItem?.imageUrl || activeBrand?.bannerImage || activeBrand?.logo || ""} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black pointer-events-none" />
      </div>

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between p-8">
         <div className="flex items-center gap-4">
            <button className="text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-500">
               Collection
            </button>
         </div>
         <h1 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold tracking-widest text-white">
            S_FIT <span className="text-[#ecab13]">LUXURY</span>
         </h1>
         <div className="flex items-center gap-4">
            <button className="text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-500">
                Fitting Room
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 w-full h-full overflow-hidden">

        {/* Left: Product Info / Brand Story */}
        <div className="flex flex-col justify-center w-5/12 pl-16 pr-8 h-full pb-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedItem?.id || activeBrand?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-[1px] w-16 bg-[#ecab13]"></span>
                        <span className="text-xs uppercase tracking-[0.3em] text-white/90 font-bold">
                            {activeBrand?.name || selectedItem?.brand}
                        </span>
                    </div>

                    <h2 className="font-[family-name:var(--font-cinzel)] text-6xl text-white leading-[1.1]">
                        {selectedItem?.name || activeBrand?.name}
                    </h2>

                    <p className="text-white/70 font-sans max-w-md leading-relaxed text-sm tracking-wide">
                        {selectedItem?.description || activeBrand?.description || "Experience the pinnacle of luxury fashion."}
                    </p>

                    {selectedItem && (
                        <div className="flex items-baseline gap-4 pt-4">
                            <p className="text-4xl font-[family-name:var(--font-cinzel)] text-[#ecab13]">
                                {formatPrice(selectedItem.price)}
                            </p>
                        </div>
                    )}

                    <div className="pt-8 flex gap-6">
                        <button className="group relative px-10 py-4 border border-[#ecab13] text-[#ecab13] hover:bg-[#ecab13] hover:text-black transition-all duration-700 uppercase tracking-widest text-xs font-bold overflow-hidden">
                            <span className="relative z-10">Virtual Try-On</span>
                            <div className="absolute inset-0 bg-[#ecab13] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                        <button className="px-10 py-4 border border-white/20 text-white hover:border-white transition-all duration-500 uppercase tracking-widest text-xs font-bold">
                            View Details
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Right: Masonry Product List */}
        <div className="w-7/12 h-full overflow-y-auto pr-16 pl-8 pb-32 pt-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="grid grid-cols-2 gap-x-10 gap-y-24 pb-20">
                {luxuryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`group relative cursor-pointer ${index % 2 === 1 ? 'mt-32' : ''}`}
                        onClick={() => setSelectedItem(item)}
                    >
                        <div className={`relative aspect-[3/4] overflow-hidden border transition-all duration-700 ${selectedItem?.id === item.id ? 'border-[#ecab13]' : 'border-white/5 group-hover:border-white/30'}`}>

                            {/* Loading / Placeholder */}
                            <div className="absolute inset-0 bg-[#1a1a1a]" />

                            {/* Image */}
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 ease-out filter grayscale group-hover:grayscale-0"
                                style={{ backgroundImage: `url(${item.imageUrl})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="mt-6 flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase text-white tracking-[0.2em] group-hover:text-[#ecab13] transition-colors duration-500">{item.name}</p>
                                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{item.brand}</p>
                            </div>
                            <p className="text-xs font-[family-name:var(--font-cinzel)] text-white/80">{formatPrice(item.price)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
