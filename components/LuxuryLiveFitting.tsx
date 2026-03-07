"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import GoldRingCursor from "./GoldRingCursor";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock data matching the styling required
const BRANDS = {
  aura: {
    id: 'aura',
    name: 'AURA',
    description: 'The epitome of modern elegance and timeless luxury.',
    bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000'
  }
};

const ITEMS = [
  { id: 1, name: "Aura Blazer", price: 2400, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000", brand: 'aura' },
  { id: 2, name: "Silk Gown", price: 3100, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000", brand: 'aura' },
  { id: 3, name: "Moto Jacket", price: 1800, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000", brand: 'aura' },
  { id: 4, name: "Tech Coat", price: 4500, img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=1000", brand: 'aura' },
];

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading for luxury effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentBrand = BRANDS[selectedItem.brand as keyof typeof BRANDS];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#050505] text-[#f4f4f4] ${playfair.className}`}>
      <GoldRingCursor />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative size-32">
              <motion.div
                className="absolute inset-0 border border-amber-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Thin gold line tracing a box */}
              <motion.svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                <motion.rect
                  x="0" y="0" width="100" height="100"
                  fill="none"
                  stroke="#d97706" // amber-600 equivalent
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>
            <motion.h2
              className={`mt-8 text-xl tracking-[0.3em] uppercase text-amber-500/80 ${cinzel.className}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Masterpiece
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="relative flex h-screen w-full flex-col saturate-[0.9] contrast-[1.1]"
        style={{
            backgroundImage: "linear-gradient(rgba(5,5,5,0.4), rgba(5,5,5,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
      >
        {/* Brand Parallax Banner (Top Area) */}
        <div className="absolute top-0 w-full h-[40vh] overflow-hidden opacity-30 pointer-events-none mix-blend-screen"
             style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}>
          <motion.div
             className="w-full h-[120%] bg-cover bg-center"
             style={{
               backgroundImage: `url('${currentBrand?.bannerImage}')`,
               y: scrollY * 0.5
             }}
          />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-12">
          <button className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-amber-500/50 hover:bg-black/60">
            <span className="material-symbols-outlined font-light text-white/80">close</span>
          </button>

          <div className="flex flex-col items-center gap-1">
            <h2 className={`text-xl font-medium tracking-[0.25em] uppercase text-amber-500 ${cinzel.className}`}>
              {currentBrand?.name || 'Luxury Fit'}
            </h2>
            <p className="text-[10px] tracking-widest text-white/50 uppercase">Live Fitting</p>
          </div>

          <button className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-amber-500/50 hover:bg-black/60">
            <span className="material-symbols-outlined font-light text-white/80">tune</span>
          </button>
        </div>

        {/* Right Sidebar - Vertical Product Cards */}
        <div className="absolute right-8 top-1/4 z-10 flex flex-col gap-6 h-[50vh] overflow-y-auto scrollbar-hide pb-20 pr-4"
             style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
          {ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedItem(item)}
                className={`group relative flex w-32 flex-col gap-3 rounded-none transition-all duration-1000 ${selectedItem.id === item.id ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-80'}`}
              >
                <div className={`aspect-[3/4] w-full overflow-hidden border transition-all duration-700 ${selectedItem.id === item.id ? 'border-amber-500/50 shadow-[0_0_30px_rgba(217,119,6,0.15)]' : 'border-white/10'}`}>
                  <div className="size-full">
                    <LuxuryImageDistortion imageUrl={item.img} alt={item.name} />
                  </div>
                </div>
              </button>
              <div className="text-center">
                <p className={`text-xs uppercase tracking-widest transition-colors duration-700 ${selectedItem.id === item.id ? 'text-amber-500' : 'text-white/80'} ${cinzel.className}`}>
                  {item.name}
                </p>
                <p className="mt-1 text-xs italic text-white/50">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto flex flex-col items-center pb-16 z-10">

          {/* Brand Description */}
          <div className="mb-12 max-w-md text-center">
            <p className="text-sm font-light italic leading-relaxed text-white/60">
              &quot;{currentBrand?.description}&quot;
            </p>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16">
            <button className="flex size-14 shrink-0 items-center justify-center text-white/50 transition-all duration-700 hover:text-amber-500">
              <span className="material-symbols-outlined font-light text-3xl">photo_library</span>
            </button>

            <div className="relative flex items-center justify-center group">
              <div className="absolute inset-0 rounded-full border border-amber-500/30 scale-[1.3] transition-transform duration-1000 group-hover:scale-[1.5] group-hover:border-amber-500/50"></div>
              <div className="absolute inset-0 rounded-full border border-amber-500/10 scale-[1.6] transition-transform duration-1000 group-hover:scale-[1.8]"></div>

              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/20 transition-all duration-700 hover:bg-amber-500/10 hover:border-amber-500/50">
                <div className="flex size-16 items-center justify-center rounded-full border border-white/10">
                  <div className="size-10 rounded-full bg-white/80 transition-all duration-700 group-hover:bg-amber-400 group-hover:scale-90"></div>
                </div>
              </button>
            </div>

            <button className="flex size-14 shrink-0 items-center justify-center text-white/50 transition-all duration-700 hover:text-amber-500">
              <span className="material-symbols-outlined font-light text-3xl">refresh</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
