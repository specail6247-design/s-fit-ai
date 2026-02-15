"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";
import LuxuryImageDistortion from "@/components/LuxuryImageDistortion";
import { getItemsByBrand, brands } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(brands.find(b => b.name === "GUCCI") || brands[1]);
  const [items, setItems] = useState(getItemsByBrand(selectedBrand.id));
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newItems = getItemsByBrand(selectedBrand.id);
    setItems(newItems);
    if (newItems.length > 0) {
      setSelectedItem(newItems[0]);
    }
  }, [selectedBrand]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#ecab13] ${playfair.className} cursor-none`}>
      <GoldRingCursor />

      {/* Main Visual Background */}
      <div className="absolute inset-0 z-0">
         <LuxuryImageDistortion imageUrl={selectedItem?.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"} />
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="relative h-24 w-24">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <motion.rect
                  x="2" y="2" width="96" height="96"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className={`${cinzel.className} text-xs tracking-[0.3em] text-[#ecab13]`}>LOADING</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Content */}
      <div className="relative z-10 flex h-full w-full flex-col p-8 pointer-events-none">
        {/* Header */}
        <header className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-[#ecab13]" />
             <h1 className={`${cinzel.className} text-2xl tracking-[0.2em] text-white`}>S_FIT <span className="text-[#ecab13]">LUXE</span></h1>
          </div>
          <div className="flex gap-8">
            {brands.filter(b => b.isLuxury).map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`text-sm tracking-widest uppercase transition-all duration-700 ${selectedBrand.id === brand.id ? "text-[#ecab13]" : "text-white/50 hover:text-white"}`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-1 mt-12 gap-12 overflow-hidden">
           {/* Left: Brand & Product Info */}
           <div className="w-1/3 flex flex-col justify-center space-y-8 pointer-events-auto pl-12">
              <motion.div
                key={selectedBrand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                 <h2 className={`${cinzel.className} text-6xl text-white`}>{selectedBrand.name}</h2>
                 <p className="text-white/70 italic leading-relaxed max-w-md">
                   {selectedBrand.id === 'gucci' ? "Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail." :
                    selectedBrand.id === 'chanel' ? "A standard of style and elegance that has defined the fashion industry for generations." :
                    "Experience the epitome of luxury and sophisticated design."}
                 </p>
              </motion.div>

              <motion.div
                 key={selectedItem?.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.7, delay: 0.2 }}
                 className="bg-black/40 backdrop-blur-md border border-[#ecab13]/20 p-6 max-w-md"
              >
                 <h3 className={`${cinzel.className} text-2xl text-white mb-2`}>{selectedItem?.name}</h3>
                 <p className="text-[#ecab13] text-xl font-light mb-4">{formatPrice(selectedItem?.price || 0)}</p>
                 <p className="text-sm text-white/60 mb-6">{selectedItem?.description}</p>
                 <button className="w-full py-3 border border-[#ecab13] text-[#ecab13] hover:bg-[#ecab13] hover:text-black transition-all duration-500 uppercase tracking-widest text-xs">
                   Add to Fitting
                 </button>
              </motion.div>
           </div>

           {/* Center: Space for Visual */}
           <div className="flex-1"></div>

           {/* Right: Product Masonry/List */}
           <div className="w-64 flex flex-col pointer-events-auto h-full pr-4">
              <div
                className="flex flex-col gap-6 pb-20 overflow-y-auto scrollbar-hide"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}
              >
                {/* Spacer for mask */}
                <div className="h-4 shrink-0"></div>
                {items.map((item, index) => (
                   <motion.div
                     key={item.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: index * 0.1 }}
                     onClick={() => setSelectedItem(item)}
                     className={`group relative shrink-0 cursor-pointer transition-all duration-700 ${selectedItem?.id === item.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}
                   >
                     <div className="aspect-[3/4] w-full overflow-hidden bg-white/5 border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                     </div>
                     <div className="mt-2 text-center">
                        <p className={`text-[10px] uppercase tracking-widest text-white truncate`}>{item.name}</p>
                     </div>
                     {selectedItem?.id === item.id && (
                       <div className="absolute -left-4 top-1/2 h-[1px] w-3 bg-[#ecab13]" />
                     )}
                   </motion.div>
                ))}
                 <div className="h-20 shrink-0"></div>
              </div>
           </div>
        </div>

        {/* Footer Controls */}
        <footer className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-auto">
           <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-[#ecab13] animate-pulse" />
                 Live Fitting Session
              </div>
              <div className="text-[#ecab13] text-xs">
                 Wait time: <span className="text-white">0s</span>
              </div>
           </div>

           <div className="flex gap-6">
              <button className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#ecab13] hover:text-[#ecab13] transition-all duration-500">
                 <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
              <button className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#ecab13] hover:text-[#ecab13] transition-all duration-500">
                 <span className="material-symbols-outlined text-sm">share</span>
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
}
