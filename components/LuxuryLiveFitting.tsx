"use client";

import React, { useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import GoldRingCursor from "./ui/GoldRingCursor";
import { getLuxuryItems, brands, Brand } from "@/data/mockData";
import { AnimatePresence, motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const luxuryItems = getLuxuryItems();

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#ecab13] ${spaceGrotesk.className}`}>
      <GoldRingCursor />

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full">

        {/* Main Visual Area (Replaces Background) */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion imageUrl={selectedBrand?.bannerImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"} />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" /> {/* Overlay for readability */}
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 absolute top-0 w-full flex items-center justify-between p-8 pointer-events-none">
           <div className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-[#ecab13]/20 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13] cursor-none">
            <span className="material-symbols-outlined text-[#ecab13]">close</span>
          </div>
          <div className="flex flex-col items-center">
             <h2 className={`${cinzel.className} text-2xl font-bold tracking-[0.2em] uppercase text-white`}>M_FIT</h2>
             <p className="text-[10px] uppercase tracking-widest text-[#ecab13]">Luxury Edition</p>
          </div>
           <div className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-[#ecab13]/20 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13] cursor-none">
            <span className="material-symbols-outlined text-[#ecab13]">flash_on</span>
          </div>
        </div>

        {/* Brand Experience Overlay */}
        <div className="absolute top-32 left-8 max-w-md z-10 pointer-events-none">
            <AnimatePresence mode="wait">
                {selectedBrand && (
                    <motion.div
                        key={selectedBrand.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h1 className={`${cinzel.className} text-6xl font-bold text-white mb-4 drop-shadow-2xl`}>{selectedBrand.name}</h1>
                        <p className="text-white/80 text-lg leading-relaxed font-light backdrop-blur-sm p-4 rounded-xl bg-black/20 border-l-2 border-[#ecab13]">
                            {selectedBrand.description || "The ultimate house of luxury, defining style and elegance."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>


        {/* Right Sidebar: Product List (Masonry-like vertical list) */}
        <div className="absolute right-0 top-0 h-full w-[360px] overflow-y-auto z-20 bg-gradient-to-l from-black via-black/80 to-transparent p-6 pt-32 pb-32 no-scrollbar">
            <div className="flex flex-col gap-12">
                {luxuryItems.map((item) => (
                     <div
                        key={item.id}
                        className="group relative cursor-none"
                        onMouseEnter={() => setSelectedBrand(brands.find(b => b.name === item.brand) || null)}
                     >
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-sm border border-[#ecab13]/20 transition-all duration-1000 group-hover:border-[#ecab13]">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 saturate-0 group-hover:saturate-100"
                             />
                        </div>
                        <div className="mt-4 pl-2 border-l border-transparent transition-all duration-700 group-hover:border-[#ecab13]">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">{item.brand}</p>
                            <h3 className={`${cinzel.className} text-xl text-white mb-2 leading-tight`}>{item.name}</h3>
                            <p className="text-[#ecab13] font-medium tracking-wider">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                            </p>
                        </div>
                     </div>
                ))}
            </div>
        </div>

        {/* Loading State / Capture Controls (Bottom Center) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6 pointer-events-auto cursor-none group">
            {/* Gold Line Loading Animation */}
             <div className="relative size-20 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                 {/* Thin gold line tracing a box/circle */}
                 <svg className="absolute inset-0 size-full rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="48" fill="none" stroke="#ecab13" strokeWidth="0.5" strokeDasharray="300" strokeDashoffset="300" className="animate-[trace_4s_linear_infinite]" />
                 </svg>
                 <div className="size-16 rounded-full border border-[#ecab13] flex items-center justify-center bg-black/50 backdrop-blur-md">
                    <span className="material-symbols-outlined text-2xl text-white">camera</span>
                 </div>
             </div>
             <span className={`${cinzel.className} text-xs tracking-[0.4em] uppercase text-white/60`}>Capture Look</span>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes trace {
            0% { stroke-dashoffset: 300; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -300; }
        }
      `}</style>
    </div>
  );
}
