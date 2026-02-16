"use client";

import React, { useState } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import GoldRingCursor from "./GoldRingCursor";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

const ITEMS = [
  {
    id: 1,
    name: "Aura Blazer",
    price: 2400,
    brand: "HERMÈS",
    brandDesc: "Contemporary artisan luxury since 1837.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0",
    description: "Tailored from Italian wool with a modern silhouette."
  },
  {
    id: 2,
    name: "Silk Gown",
    price: 3100,
    brand: "GENTLE MONSTER",
    brandDesc: "Avant-garde eyewear and fashion.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0",
    description: "Flowing silk chiffon with hand-stitched detailing."
  },
  {
    id: 3,
    name: "Moto Jacket",
    price: 1800,
    brand: "ADER ERROR",
    brandDesc: "Based on simplicity, expressing contemporary sensibility.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA",
    description: "Premium leather with gunmetal hardware."
  },
  {
    id: 4,
    name: "Tech Coat",
    price: 4500,
    brand: "PRADA",
    brandDesc: "Thinking fashion since 1913.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk",
    description: "Water-resistant technical fabric with structured fit."
  },
];

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemSelect = (item: typeof ITEMS[0]) => {
    if (item.id === selectedItem.id) return;
    setIsLoading(true);
    // Simulate loading transition
    setTimeout(() => {
        setSelectedItem(item);
        setIsLoading(false);
    }, 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-black text-[#D4AF37] ${playfair.className} cursor-none`}>
      <GoldRingCursor />

      {/* Main Content Area (Left/Center) */}
      <div className="relative flex-1 h-full">
        {/* Main Visual with Distortion */}
        <div
          className="absolute inset-0 z-0"
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
        >
           <AnimatePresence mode="wait">
             {!isLoading && (
               <motion.div
                 key={selectedItem.id}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1.0 }}
                 className="absolute inset-0"
               >
                 <LuxuryImageDistortion image={selectedItem.img} hover={isHoveringImage} />
               </motion.div>
             )}
           </AnimatePresence>

           {/* Loading Overlay */}
           {isLoading && (
             <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
                <div className="relative size-32">
                    <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                        <motion.rect
                            x="10" y="10" width="80" height="80"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] ${cinzel.className} animate-pulse`}>Fitting</span>
                    </div>
                </div>
             </div>
           )}

           {/* Gradient Overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
           <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Brand Experience Overlay */}
        <div className="absolute left-8 bottom-32 max-w-md pointer-events-none">
            <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className={`text-4xl font-bold text-white mb-2 ${cinzel.className}`}>{selectedItem.brand}</h1>
                <p className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4 border-l-2 border-[#D4AF37] pl-4">
                    {selectedItem.brandDesc}
                </p>
                <p className="text-white/80 text-lg italic leading-relaxed font-light">
                    &quot;{selectedItem.description}&quot;
                </p>
            </motion.div>
        </div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-8">
          <button className="group flex items-center gap-3 transition-transform active:scale-95">
             <div className="flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md group-hover:border-[#D4AF37] transition-colors">
                <span className="material-symbols-outlined text-[#D4AF37]">arrow_back</span>
             </div>
             <span className={`text-sm font-bold tracking-[0.2em] uppercase text-white/80 group-hover:text-[#D4AF37] transition-colors ${cinzel.className}`}>Exit</span>
          </button>

          <div className="flex items-center gap-4 rounded-full px-8 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/20">
            <div className="size-2 animate-pulse rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></div>
            <h2 className={`text-sm font-bold tracking-[0.3em] uppercase text-white ${cinzel.className}`}>Live Fitting</h2>
          </div>

          <button className="flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md hover:border-[#D4AF37] transition-colors">
            <span className="material-symbols-outlined text-[#D4AF37]">settings</span>
          </button>
        </div>

        {/* Upper HUD: Stability & AI Status (Left) */}
        <div className="absolute left-8 top-32 z-10">
          <div className="min-w-[280px] p-6 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30">
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between border-b border-[#D4AF37]/20 pb-2">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] ${cinzel.className}`}>Body Stability</p>
                <p className={`text-xl font-bold leading-none text-white ${cinzel.className}`}>98%</p>
              </div>
              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <div className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" style={{ width: "98%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <span className="material-symbols-outlined text-[14px] text-[#D4AF37]">target</span>
                Precision Lock
              </p>
            </div>
          </div>
        </div>

         {/* Bottom Controls (Center) */}
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-12 pointer-events-auto">
            <button className="flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
              <span className="material-symbols-outlined">favorite</span>
            </button>

            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4AF37]/20 blur-xl group-hover:bg-[#D4AF37]/40 transition-all duration-700"></div>
              <button className="relative flex size-24 items-center justify-center rounded-full border border-[#D4AF37] bg-black/20 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                <div className="size-20 rounded-full border border-[#D4AF37]/50 flex items-center justify-center">
                    <div className="size-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-black">
                        <span className="material-symbols-outlined text-3xl">camera_alt</span>
                    </div>
                </div>
              </button>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] ${cinzel.className}`}>Capture</span>
              </div>
            </div>

            <button className="flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
              <span className="material-symbols-outlined">share</span>
            </button>
         </div>
      </div>

      {/* Right Sidebar: Product Selection & Stats */}
      <div className="relative w-[400px] h-full z-20 border-l border-[#D4AF37]/20 bg-black/80 backdrop-blur-xl flex flex-col">
        {/* Fit Stats (Top of Sidebar) */}
        <div className="p-8 border-b border-[#D4AF37]/20">
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6 ${cinzel.className}`}>Fit Analysis</h3>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">Shoulder Fit</span>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-light text-white">Perfect</span>
                        <span className="material-symbols-outlined text-[#D4AF37] text-sm">check_circle</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">Waist Line</span>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-light text-white">Tight</span>
                        <span className="text-[10px] text-[#D4AF37]">+0.5&quot;</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">Hem Length</span>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-light text-white">Ideal</span>
                        <span className="material-symbols-outlined text-[#D4AF37] text-sm">check_circle</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Product List (Scrollable) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6 ${cinzel.className}`}>Collection</h3>
            <div className="flex flex-col gap-8">
                {ITEMS.map((item) => (
                    <motion.div
                        key={item.id}
                        className={`group relative cursor-pointer`}
                        onClick={() => handleItemSelect(item)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Selection Indicator */}
                        {selectedItem.id === item.id && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute -left-4 top-0 bottom-0 w-[2px] bg-[#D4AF37]"
                            />
                        )}

                        <div className={`relative aspect-[3/4] w-full overflow-hidden mb-4 border transition-all duration-500 ${selectedItem.id === item.id ? 'border-[#D4AF37]' : 'border-transparent opacity-60 group-hover:opacity-100'}`}>
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url("${item.img}")` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h4 className={`text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors ${cinzel.className}`}>{item.name}</h4>
                            <p className="text-sm text-white/60 font-light italic">{formatPrice(item.price)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Bottom Actions (Inside Sidebar) */}
        <div className="p-8 border-t border-[#D4AF37]/20 bg-black/40 backdrop-blur-md">
             <button className="w-full h-14 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500">
                Add to Cart
             </button>
        </div>
      </div>

      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
