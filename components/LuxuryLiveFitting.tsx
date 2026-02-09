'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getLuxuryItems, ClothingItem } from '@/data/mockData';
import TheVault from '@/components/ui/TheVault';
import SensoryAmbience from '@/components/SensoryAmbience';
import Link from 'next/link';
import { Cinzel, Space_Grotesk } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{h:number, m:number, s:number}>({ h:0, m:0, s:0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        return { h: 0, m: 0, s: 0 };
      }

      return {
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTime()); // Initial calculation

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-1 text-2xl font-mono text-[#ecab13] font-bold tracking-widest">
       <span>{String(timeLeft.h).padStart(2, '0')}</span><span className="text-zinc-600">:</span>
       <span>{String(timeLeft.m).padStart(2, '0')}</span><span className="text-zinc-600">:</span>
       <span>{String(timeLeft.s).padStart(2, '0')}</span>
    </div>
  );
}

export default function LuxuryLiveFitting() {
  const {
    saveLook,
    toggleVault,
    savedLooks,
    isAudioEnabled,
    setAudioEnabled
  } = useStore();

  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    setItems(getLuxuryItems());
  }, []);

  const handleSaveLook = (e: React.MouseEvent, item: ClothingItem) => {
    e.stopPropagation();
    saveLook(item);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-[#ecab13] ${spaceGrotesk.className} relative overflow-x-hidden selection:bg-[#ecab13] selection:text-black`}>
      {/* Background Ambience */}
      <SensoryAmbience />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#ecab13]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
            <h1 className={`${cinzel.className} text-xl tracking-[0.2em] font-bold bg-gradient-to-r from-[#ecab13] to-[#b8860b] bg-clip-text text-transparent`}>
              S_FIT <span className="text-white">LUXURY</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setAudioEnabled(!isAudioEnabled)}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isAudioEnabled ? 'text-[#ecab13] animate-pulse' : 'text-zinc-600 hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-lg">{isAudioEnabled ? 'volume_up' : 'volume_off'}</span>
              <span className="hidden md:inline">Ambience</span>
            </button>

            <button
              onClick={toggleVault}
              className="relative flex items-center gap-2 px-5 py-2.5 border border-[#ecab13]/30 rounded-full hover:bg-[#ecab13]/10 transition-all active:scale-95 group"
            >
              <span className="material-symbols-outlined text-[#ecab13] text-lg group-hover:rotate-12 transition-transform">sensor_door</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ecab13]">The Vault</span>
              {savedLooks.length > 0 && (
                <span className="absolute -top-1 -right-1 size-5 bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  {savedLooks.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-[#ecab13]"></div>
            <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-[0.3em]">Phase 7: The Extra Mile</p>
            <div className="h-px w-8 bg-[#ecab13]"></div>
          </div>
          <h2 className={`${cinzel.className} text-5xl md:text-6xl text-white mb-8 leading-tight`}>
            Curated <span className="italic text-[#ecab13]">Excellence</span>
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed max-w-xl mx-auto text-sm tracking-wide">
            Experience our most exclusive collection. Each piece is selected for its craftsmanship and timeless appeal.
            Enable immersive audio for the full sensory experience.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative bg-[#0a0a0a] border ${item.isLocked ? 'border-zinc-800' : 'border-[#ecab13]/20'} rounded-2xl overflow-hidden hover:border-[#ecab13]/50 transition-all duration-500 shadow-2xl shadow-black`}>

                {/* Image Area */}
                <div className="aspect-[3/4] relative bg-zinc-900 overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${item.isLocked ? 'grayscale opacity-40 blur-sm' : ''}`}
                  />

                  {/* Styling Tip Overlay (On Hover) */}
                  {!item.isLocked && item.stylingTip && (
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                      <div className="size-12 rounded-full border border-[#ecab13] flex items-center justify-center mb-6 text-[#ecab13]">
                        <span className="material-symbols-outlined">style</span>
                      </div>
                      <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Stylist Note</p>
                      <p className={`${cinzel.className} text-white text-lg italic leading-relaxed mb-8`}>
                        &quot;{item.stylingTip}&quot;
                      </p>
                      <button
                        onClick={(e) => handleSaveLook(e, item)}
                        className="px-8 py-3 bg-[#ecab13] text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded hover:bg-white transition-colors"
                      >
                        Save to Vault
                      </button>
                    </div>
                  )}

                  {/* Locked Overlay */}
                  {item.isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                      <div className="size-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-6 text-zinc-500 shadow-xl">
                        <span className="material-symbols-outlined text-3xl">lock</span>
                      </div>
                      <h3 className={`${cinzel.className} text-2xl text-white mb-2`}>Exclusive Drop</h3>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-6">Unlocks In</p>

                      {item.unlockDate && <Countdown targetDate={item.unlockDate} />}

                      <div className="mt-8 h-px w-12 bg-zinc-800"></div>
                      <p className="mt-4 text-zinc-600 text-[10px] font-mono uppercase">
                        Tier 1 Access Only
                      </p>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 pr-4">
                      <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-wider mb-2">{item.brand}</p>
                      <h3 className={`${cinzel.className} text-white text-lg truncate group-hover:text-[#ecab13] transition-colors`}>{item.name}</h3>
                    </div>
                    {!item.isLocked && (
                      <button
                         onClick={(e) => handleSaveLook(e, item)}
                         className="size-8 flex items-center justify-center rounded-full hover:bg-[#ecab13]/10 text-zinc-500 hover:text-[#ecab13] transition-colors"
                      >
                        <span className="material-symbols-outlined">bookmark_add</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                     <p className="text-zinc-400 text-sm font-light">{item.currency} {item.price.toLocaleString()}</p>
                     {!item.isLocked && <p className="text-[#ecab13] text-[10px] uppercase font-bold tracking-wider">In Stock</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      {/* The Vault Drawer */}
      <TheVault />
    </div>
  );
}
