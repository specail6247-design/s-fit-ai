/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { useStore } from "@/store/useStore";
import { getLuxuryItems, ClothingItem } from "@/data/mockData";
import AmbientAudio from "./AmbientAudio";
import TheVault from "./TheVault";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [isChecked, setIsChecked] = useState(true);

  // Luxury Items
  const luxuryItems = getLuxuryItems();
  const [selectedItem, setSelectedItem] = useState<ClothingItem>(luxuryItems[0]);

  // Store
  const { addToVault, setVaultOpen, isAudioMuted, setAudioMuted } = useStore();

  const handleSelectItem = (item: ClothingItem) => {
    if (item.locked) return;
    setSelectedItem(item);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f5f6f8] text-white dark:bg-[#101622] ${spaceGrotesk.className}`}>

      <AmbientAudio />
      <TheVault />

      {/* Top App Bar */}
      <div className="z-50 flex items-center justify-between bg-transparent p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md cursor-pointer hover:bg-[#101622]/60 transition-colors border border-white/5">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">S_FIT AI</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Luxury Live Fitting</span>
        </div>
        <div className="flex gap-3">
           <button
            onClick={() => setAudioMuted(!isAudioMuted)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#101622]/60 transition-colors border border-white/5"
            title={isAudioMuted ? "Unmute Ambience" : "Mute Ambience"}
          >
            <span className="material-symbols-outlined">{isAudioMuted ? 'volume_off' : 'volume_up'}</span>
          </button>
          <button
            onClick={() => setVaultOpen(true)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#101622]/60 transition-colors border border-white/5"
            title="Open Vault"
          >
            <span className="material-symbols-outlined">checkroom</span>
          </button>
        </div>
      </div>

      {/* Main Viewport (Photo Fitting Canvas) */}
      <div className="absolute inset-0 z-0">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url("${selectedItem.imageUrl}")`,
            filter: "saturate(1.1) contrast(1.1)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-[#101622]/30"></div>

          {/* Scanning Effect */}
          <div
            className="absolute top-[40%] z-20 h-[2px] w-full opacity-50"
            style={{
              background: "linear-gradient(180deg, transparent 0%, #D4AF37 50%, transparent 100%)",
              boxShadow: "0 0 15px #D4AF37",
            }}
          ></div>

          {/* Stylist Note Overlay */}
          {selectedItem.stylingTip && (
             <div className="absolute top-24 left-4 max-w-[200px] z-30">
               <div className="glass-panel rounded-xl p-4 border border-[#D4AF37]/30 bg-[#101622]/60 backdrop-blur-md shadow-xl">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="material-symbols-outlined text-[#D4AF37] text-sm">auto_awesome</span>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">AI Stylist Note</p>
                 </div>
                 <p className="text-xs font-medium leading-relaxed italic text-white/90">
                   &quot;{selectedItem.stylingTip}&quot;
                 </p>
               </div>
             </div>
          )}

          {/* Item Info Top Right */}
           <div className="glass-panel absolute right-4 top-24 rounded-lg p-4 text-right max-w-[200px] bg-[#101622]/60 backdrop-blur-md border border-[#D4AF37]/30">
            <p className="text-[10px] font-bold uppercase tracking-tighter text-[#D4AF37]">{selectedItem.brand}</p>
            <p className="mt-1 text-sm font-bold truncate text-white">{selectedItem.name}</p>
            <p className="text-xs text-white/70 mt-1">{selectedItem.currency} {selectedItem.price.toLocaleString()}</p>
          </div>

          {/* Fit Heatmap Legend (Optional, keeping for continuity) */}
           {isChecked && (
            <div className="glass-panel absolute bottom-64 left-4 z-20 flex flex-col gap-1.5 rounded-lg p-2 bg-[#101622]/60 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Tight</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Perfect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Loose</span>
              </div>
            </div>
           )}

        </div>
      </div>

      {/* Controls Footer */}
      <div className="mt-auto space-y-4 p-4 z-40 pb-8 bg-gradient-to-t from-[#101622] to-transparent pt-12">

        {/* Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar items-center">
          {luxuryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className={`relative shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${selectedItem.id === item.id ? 'border-[#D4AF37] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/10 opacity-60 hover:opacity-100 grayscale-[30%]'}`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              {/* Locked Overlay */}
              {item.locked && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-1 backdrop-blur-[1px]">
                  <span className="material-symbols-outlined text-[#D4AF37] text-lg mb-1">lock</span>
                  <span className="text-[8px] font-bold uppercase text-white leading-none">
                     Drops In<br/>
                     <span className="text-[#D4AF37]">02:00:00</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
             <button className="flex-1 h-14 rounded-xl bg-[#D4AF37] text-[#101622] text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform active:scale-95 flex items-center justify-center gap-2 hover:bg-[#b5952f]">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
            <button
              onClick={() => addToVault(selectedItem.id)}
              className="size-14 rounded-xl bg-[#101622]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors active:scale-95 group"
              title="Save to Vault"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">bookmark_add</span>
            </button>
        </div>

        {/* Toggle Controls (Heatmap) */}
         <div className="flex justify-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
              </div>
              <span className="text-[10px] font-bold uppercase text-white/50 group-hover:text-white transition-colors">Fit Heatmap</span>
            </label>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
