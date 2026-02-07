"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";
import LuxuryImageDistortion from "@/components/LuxuryImageDistortion";
import { getLuxuryItems, brands, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);

  const activeBrand = selectedItem
    ? (brands.find(b => b.name.toLowerCase() === selectedItem.brand.toLowerCase()) || null)
    : null;

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
        const luxuryItems = getLuxuryItems();
        setItems(luxuryItems);
        if (luxuryItems.length > 0) {
            setSelectedItem(luxuryItems[0]);
        }
        setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <GoldRingCursor />

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
            <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                <div className="relative size-32">
                    <svg className="absolute inset-0 size-full">
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="none"
                            stroke="#ecab13"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`${cinzel.className} text-[#ecab13] text-sm tracking-widest animate-pulse`}>LOADING</span>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Main Viewport (70-75% width) */}
      <div className="relative h-full flex-grow flex flex-col bg-black">
         {/* Background / Main Visual with Distortion */}
         <div className="absolute inset-0 opacity-80">
            {selectedItem ? (
                <LuxuryImageDistortion imageUrl={selectedItem.imageUrl} />
            ) : (
                <div className="size-full bg-zinc-900" />
            )}
         </div>

         {/* Top Nav - Minimal */}
         <div className="z-10 flex items-center justify-between p-8 pointer-events-auto">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-white/60 cursor-pointer hover:text-white transition-colors">arrow_back</span>
               <h2 className={`${cinzel.className} text-xl font-bold tracking-[0.2em] text-white`}>S_FIT LUXE</h2>
            </div>
            <div className="flex gap-4">
               <button className="px-4 py-2 border border-white/20 rounded-full text-xs tracking-widest hover:bg-white/10 uppercase transition-colors">AR Mode</button>
            </div>
         </div>

         {/* Center/Bottom Content of Viewport */}
         <AnimatePresence mode="wait">
             {selectedItem && (
                 <motion.div
                    key={selectedItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-auto p-12 z-10 max-w-2xl pointer-events-none"
                 >
                    {/* Brand Banner / Title */}
                    <div className="mb-2 flex items-center gap-3">
                         {activeBrand && (
                             <span className="text-[#ecab13] text-xs font-bold tracking-[0.3em] uppercase">{activeBrand.name}</span>
                         )}
                         <div className="h-[1px] w-12 bg-[#ecab13]/50"></div>
                    </div>

                    <h1 className={`${cinzel.className} text-6xl text-white mb-4 leading-tight`}>
                       {selectedItem.name.split(" ").slice(0, -1).join(" ")} <br/>
                       <span className="text-[#ecab13] italic">{selectedItem.name.split(" ").slice(-1)}</span>
                    </h1>
                    <p className="text-white/60 text-sm max-w-md leading-relaxed mb-8 line-clamp-3">
                       {selectedItem.description}
                    </p>

                    <div className="flex gap-8">
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Material</p>
                            <p className="text-sm font-medium">100% Italian Silk</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Fit</p>
                            <p className="text-sm font-medium">Tailored / Slim</p>
                        </div>
                    </div>
                 </motion.div>
             )}
         </AnimatePresence>

         {/* Scanning Overlay - Gold */}
         <div
            className="absolute top-[40%] w-full h-[1px] opacity-20 pointer-events-none"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 20px #ecab13"
            }}
         ></div>
      </div>

      {/* Right: Product Sidebar (25-30% width) */}
      <div className="relative h-full w-[400px] border-l border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col z-20">

         <div className="p-8 pb-4 border-b border-white/5">
            <h3 className={`${cinzel.className} text-lg text-[#ecab13] mb-1`}>Curated Selection</h3>
            <p className="text-xs text-white/40 uppercase tracking-widest">Spring / Summer 2025</p>
         </div>

         {/* Vertical Scrollable List */}
         <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            {items.map((item, i) => (
               <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                    className={`group relative aspect-[3/4] w-full bg-[#1a1a1a] border ${selectedItem?.id === item.id ? 'border-[#ecab13]' : 'border-white/5'} hover:border-[#ecab13]/50 transition-colors duration-500 cursor-pointer overflow-hidden`}
                    onClick={() => setSelectedItem(item)}
               >
                  {/* Image Placeholder */}
                   <div className={`absolute inset-0 bg-cover bg-center ${selectedItem?.id === item.id ? 'opacity-100 scale-105' : 'opacity-60'} group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out`}
                        style={{ backgroundImage: `url("${item.imageUrl}")` }}>
                   </div>

                   <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <p className={`${cinzel.className} text-lg text-white`}>{item.name}</p>
                      <p className="text-[#ecab13] text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                   </div>
               </motion.div>
            ))}
         </div>

         {/* Bottom Action Area */}
         <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-white/40 uppercase tracking-widest">Total</span>
                <span className={`${cinzel.className} text-xl text-white`}>{selectedItem ? formatPrice(selectedItem.price) : '$0'}</span>
            </div>
            <button className="w-full py-4 bg-[#ecab13] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#c48a0a] transition-colors relative overflow-hidden group">
               <span className="relative z-10">Add to Wardrobe</span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
         </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
