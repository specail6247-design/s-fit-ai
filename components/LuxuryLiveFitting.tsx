'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Cinzel, Lato } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';
import LuxuryCursor from './ui/LuxuryCursor';
import { brands, getItemsByBrand, ClothingItem } from '@/data/mockData';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

function formatPrice(price: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function LuxuryLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black absolute inset-0 z-50">
      <div className="relative w-24 h-24">
         <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full"
         >
            <motion.rect
                x="10" y="10" width="80" height="80"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
         </motion.svg>
      </div>
      <p className={`mt-4 text-[#D4AF37] text-xs tracking-[0.3em] uppercase ${cinzel.className}`}>
         Defining Luxury
      </p>
    </div>
  );
}

export default function LuxuryLiveFitting() {
  const [activeBrandId, setActiveBrandId] = useState('gucci');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const activeBrand = useMemo(() => brands.find(b => b.id === activeBrandId), [activeBrandId]);
  const items = useMemo(() => getItemsByBrand(activeBrandId), [activeBrandId]);

  useEffect(() => {
      if (items.length > 0) {
          setSelectedItem(items[0]);
      }
  }, [items]);

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-black text-[#F5F5F5] ${lato.className}`}>
      <LuxuryCursor />

      <AnimatePresence>
        {isLoading && (
            <motion.div
                className="absolute inset-0 z-50"
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <LuxuryLoader />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Background / Main Visual */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000" style={{ opacity: isLoading ? 0 : 1 }}>
        {selectedItem && (
            <LuxuryImageDistortion
                key={selectedItem.id} // Re-mount or update on item change
                imageUrl={selectedItem.imageUrl}
                className="w-full h-full opacity-60"
                intensity={1.2}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Brand Header (Parallax-like) */}
      <div className="absolute top-0 left-0 p-12 z-10 w-full flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`text-6xl text-[#D4AF37] mb-2 ${cinzel.className}`}
            >
                {activeBrand?.name}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm tracking-[0.2em] text-gray-400 uppercase max-w-md leading-relaxed"
            >
                Legacy of timeless elegance and modern innovation.
            </motion.p>
        </div>

        {/* Navigation / Mode Switcher */}
        <div className="flex gap-8 text-xs tracking-[0.2em] text-[#D4AF37] pointer-events-auto">
            <button className="uppercase hover:text-white transition-colors" onClick={() => setActiveBrandId('gucci')}>Gucci</button>
            <button className="uppercase hover:text-white transition-colors" onClick={() => setActiveBrandId('chanel')}>Chanel</button>
            <button className="uppercase hover:text-white transition-colors" onClick={() => setActiveBrandId('tiffany')}>Tiffany</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full h-full pt-32 pb-12 px-12 pointer-events-none">

        {/* Left: Product Details & Controls */}
        <div className="flex flex-col justify-end w-1/3 pb-12 space-y-8 pointer-events-auto">
            <AnimatePresence mode="wait">
                {selectedItem && (
                    <motion.div
                        key={selectedItem.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs uppercase tracking-[0.3em]">{selectedItem.category}</span>
                        </div>
                        <h2 className={`text-5xl text-white mb-4 leading-tight ${cinzel.className}`}>{selectedItem.name}</h2>
                        <p className="text-3xl text-[#D4AF37] mb-6 font-light">
                            {formatPrice(selectedItem.price, selectedItem.currency)}
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-sm text-sm border-l border-white/20 pl-4">
                            {selectedItem.description}
                        </p>

                        <div className="flex gap-4">
                            <button className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.2em] text-xs hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
                                Add to Vault
                            </button>
                            <button className="px-8 py-3 bg-white text-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all duration-500">
                                Try On
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fit Stats - Minimal */}
            <div className="flex gap-12 pt-8 border-t border-white/10 mt-auto">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Fit Match</p>
                    <p className={`text-2xl text-[#D4AF37] ${cinzel.className}`}>98%</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Drape</p>
                    <p className={`text-2xl text-white ${cinzel.className}`}>Fluid</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Size</p>
                    <p className={`text-2xl text-white ${cinzel.className}`}>IT 42</p>
                </div>
            </div>
        </div>

        {/* Right: Vertical Product List */}
        <div className="w-1/3 ml-auto flex flex-col h-full pl-12 pt-20 pointer-events-auto">
            <h3 className={`text-[#D4AF37] text-lg mb-8 text-right ${cinzel.className}`}>The Collection</h3>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-8 pr-4 pb-20 mask-gradient-b">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="group cursor-pointer flex items-center justify-end gap-6 text-right"
                        onClick={() => setSelectedItem(item)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className={`transition-all duration-700 ${selectedItem?.id === item.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}>
                            <p className={`text-lg mb-1 ${cinzel.className} ${selectedItem?.id === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>
                                {item.name}
                            </p>
                            <p className="text-xs tracking-widest text-gray-400">
                                {formatPrice(item.price, item.currency)}
                            </p>
                        </div>
                        <div className={`relative w-20 h-28 overflow-hidden border transition-all duration-700 ${selectedItem?.id === item.id ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/10 opacity-60 grayscale'}`}>
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
