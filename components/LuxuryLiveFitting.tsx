"use client";

import React, { useState } from "react";

import { Playfair_Display, Inter } from "next/font/google";
import LuxuryCursor from "./ui/LuxuryCursor";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"], display: "optional" });
const inter = Inter({ subsets: ["latin"], display: "optional" });

const BRANDS = [
  {
    id: "gucci",
    name: "Gucci",
    description: "Italian luxury and craftsmanship.",
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "prada",
    name: "Prada",
    description: "Avant-garde elegance and sophistication.",
    bannerImage: "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Price formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#F8F7F6] ${inter.className}`}>
      <LuxuryCursor />

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative size-32">
              <motion.div
                className="absolute inset-0 border border-[#d4af37]"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border border-[#d4af37]/50"
                animate={{
                  rotate: [360, 270, 180, 90, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[#d4af37] text-xs tracking-[0.3em] uppercase ${playfair.className}`}>Loading</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Parallax Banner */}
      <motion.div
        className="absolute inset-0 w-full h-[40vh] opacity-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          backgroundImage: `url('${selectedBrand.bannerImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 h-[40vh] bg-gradient-to-b from-[#050505]/20 to-[#050505]" />

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col z-10 p-8">

        {/* Brand Header */}
        <div className="flex flex-col items-center mt-12 mb-8 space-y-4">
          <motion.h1
            className={`text-5xl font-light text-[#d4af37] tracking-widest uppercase ${playfair.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {selectedBrand.name}
          </motion.h1>
          <motion.p
            className="text-sm tracking-widest text-[#F8F7F6]/60 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {selectedBrand.description}
          </motion.p>

          <div className="flex gap-4 mt-6">
            {BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setSelectedBrand(brand);
                    setIsLoading(false);
                  }, 1500);
                }}
                className={`px-6 py-2 text-xs tracking-widest uppercase border transition-all duration-700 ${
                  selectedBrand.id === brand.id
                    ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10'
                    : 'border-white/10 text-white/50 hover:border-white/30'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Masonry/Vertical Layout */}
        <div className="flex-1 flex gap-12 max-w-6xl mx-auto w-full items-center justify-center">

          {/* Main Visual */}
          <div className="flex-1 flex justify-center">
             <div className="w-[400px] h-[600px] rounded-xl overflow-hidden border border-[#d4af37]/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
               <LuxuryImageDistortion
                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                 alt="Luxury Product"
                 className="w-full h-full"
               />
             </div>
          </div>

          {/* Product Details & Sidebar */}
          <div className="flex-1 flex flex-col justify-center space-y-12">
            <div>
              <motion.h2
                className={`text-4xl text-white font-light leading-tight mb-4 ${playfair.className}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Aura Silhouette <br/>
                <span className="italic text-[#d4af37]">Evening Blazer</span>
              </motion.h2>
              <motion.p
                className="text-2xl text-[#d4af37] font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {formatPrice(2400)}
              </motion.p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="material-symbols-outlined text-[#d4af37] text-3xl font-light">auto_awesome</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Material</p>
                  <p className="text-sm text-white tracking-wide">Italian Silk & Metal Alloy</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="material-symbols-outlined text-[#d4af37] text-3xl font-light">straighten</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Fit Intelligence</p>
                  <p className="text-sm text-[#d4af37] tracking-wide flex items-center gap-2">
                    99.8% Match <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 pt-8">
              <button className="flex-1 bg-[#d4af37] text-[#050505] py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F8F7F6] transition-colors duration-700">
                Virtual Try-On
              </button>
              <button className="size-14 flex items-center justify-center border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-700">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
