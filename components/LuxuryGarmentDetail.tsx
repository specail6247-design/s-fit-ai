'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockClothingItems, getItemById } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export default function LuxuryGarmentDetail() {
  const [currentId, setCurrentId] = useState('gucci-001');
  const item = getItemById(currentId) || mockClothingItems.find(i => i.brand === 'Gucci') || mockClothingItems[0];

  const { addToVault, vaultItems, removeFromVault, setVaultOpen } = useStore();
  const isSaved = vaultItems.some((i) => i.id === item.id);

  const handleVaultToggle = () => {
    if (isSaved) {
      removeFromVault(item.id);
    } else {
      addToVault(item);
      setVaultOpen(true);
    }
  };

  // Countdown for locked items
  const timeLeft = "02:14:59"; // Mocked countdown

  return (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans">
      {/* Top Navigation */}
      <div className="fixed top-0 z-50 w-full bg-[#f8f7f6]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <Link href="/" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-slate-900 dark:text-white text-sm font-bold tracking-[0.2em] uppercase flex-1 text-center">S_FIT AI</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container (Mobile Optimized) */}
      <main className="max-w-md mx-auto pt-16 pb-32">
        {/* 3D Interactive Viewport (Hero Image) */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0) 70%, rgba(10,10,10,1) 100%), url("${item.imageUrl}")`
            }}
          />
          
          {/* Locked Overlay */}
          {item.locked && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="material-symbols-outlined text-4xl text-[#ecab13] mb-2">lock</span>
              <p className="text-white font-bold tracking-widest uppercase text-sm">Exclusive Drop</p>
              <p className="text-[#ecab13] font-mono text-xl mt-2">{timeLeft}</p>
            </div>
          )}

          {/* 3D UI Overlays */}
          <div className="absolute bottom-6 left-4 right-4 flex justify-between items-end z-10">
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 flex flex-col gap-2 border border-white/10">
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">zoom_in</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">360</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">light_mode</span></button>
            </div>
            <div className="text-right">
              <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">Authentic Render</p>
              <h1 className="text-white text-3xl font-extralight leading-tight max-w-[200px] ml-auto">
                {item.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Material Stats */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="flex flex-wrap gap-3 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#2d2d2d] p-4 rounded-xl">
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-[#ecab13] text-xl font-bold leading-tight">99.8%</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Realism</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-white text-xl font-bold leading-tight">High</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Metalness</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-white text-xl font-bold leading-tight">0.85</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Clearcoat</p>
            </div>
          </div>
        </div>

        {/* AI Stylist Note */}
        {item.stylingTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 px-4"
          >
            <div className="flex items-center gap-2 mb-3 bg-[#ecab13]/10 p-3 rounded-lg border border-[#ecab13]/20">
              <span className="material-symbols-outlined text-[#ecab13]">auto_awesome</span>
              <div>
                <h3 className="text-[#ecab13] text-xs font-bold uppercase tracking-wider">AI Stylist Note</h3>
                <p className="text-zinc-300 text-xs italic mt-1">{item.stylingTip}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Material Science Description */}
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Material Science</h2>
            <span className="text-[#ecab13] material-symbols-outlined">info</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {item.description}
          </p>
          
          {/* Chips */}
          <div className="flex gap-2 flex-wrap mb-8">
            <div className="flex h-8 items-center justify-center rounded-full border border-[#ecab13]/30 bg-[#ecab13]/10 px-4">
              <p className="text-[#ecab13] text-[11px] font-bold uppercase tracking-wider">Brushed Aluminum Finish</p>
            </div>
            <div className="flex h-8 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-4">
              <p className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider">Clearcoat Tech</p>
            </div>
            <div className="flex h-8 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-4">
              <p className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider">Silk Blend</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-4 py-4 bg-[#1a1a1a]/30 border-y border-[#2d2d2d] mb-8">
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Weight</span>
            <span className="text-white text-sm">240 GSM</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-[#2d2d2d]/50">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Composition</span>
            <span className="text-white text-sm">70% Silk, 30% Metallic Alloy</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-[#2d2d2d]/50">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Physics Mesh</span>
            <span className="text-white text-sm">12,400 Polygons</span>
          </div>
        </div>

        {/* Debug: Item Switcher */}
        <div className="px-4 mb-24 flex gap-2 overflow-x-auto no-scrollbar">
           <button onClick={() => setCurrentId('gucci-001')} className={`text-xs px-3 py-1 rounded border ${currentId === 'gucci-001' ? 'border-[#ecab13] text-[#ecab13]' : 'border-zinc-700 text-zinc-500'}`}>
             Wool Blazer
           </button>
           <button onClick={() => setCurrentId('gucci-005')} className={`text-xs px-3 py-1 rounded border ${currentId === 'gucci-005' ? 'border-[#ecab13] text-[#ecab13]' : 'border-zinc-700 text-zinc-500'}`}>
             Locked Item
           </button>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-4 pb-8 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#2d2d2d] flex gap-4 items-center z-50">
        <div className="flex flex-col flex-1">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Starting at</span>
          <p className="text-white text-xl font-bold">{item.currency} {item.price.toLocaleString()}</p>
        </div>

        {/* Save to Vault Button */}
        <button
          onClick={handleVaultToggle}
          className={`flex items-center justify-center size-14 rounded-xl border transition-colors ${isSaved ? 'bg-[#ecab13]/20 border-[#ecab13] text-[#ecab13]' : 'border-[#2d2d2d] bg-[#1a1a1a] text-zinc-400 hover:bg-[#2d2d2d]'}`}
        >
          <span className="material-symbols-outlined">{isSaved ? 'bookmark' : 'bookmark_add'}</span>
        </button>

        {item.locked ? (
          <button disabled className="flex-[2] bg-zinc-800 text-zinc-500 h-14 rounded-xl flex items-center justify-center gap-3 cursor-not-allowed">
            <span className="material-symbols-outlined">lock_clock</span>
            <span className="font-bold text-sm tracking-widest uppercase">Drops In {timeLeft}</span>
          </button>
        ) : (
          <Link href="/luxury/fitting" className="flex-[2] bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-[#0a0a0a] h-14 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:scale-[1.02] transition-transform">
            <span className="material-symbols-outlined font-bold">person_add_alt</span>
            <span className="font-bold text-sm tracking-widest uppercase">Try on Mannequin</span>
          </Link>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
