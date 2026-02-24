/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/masterpiece/LuxuryCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import { getLuxuryItems, ClothingItem } from "@/data/mockData";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Mock Brand Descriptions/Banners (since they are not in mockData)
const BRAND_DETAILS: Record<string, { description: string, banner: string }> = {
    "Gucci": {
        description: "Founded in Florence, Italy, in 1921, Gucci is one of the world's leading luxury brands, renowned for its creativity, innovation, and Italian craftsmanship.",
        banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" // Placeholder
    },
    "Chanel": {
        description: "Chanel is a French luxury fashion house founded in 1910 by Coco Chanel in Paris. It focuses on women's high fashion and ready-to-wear clothes, luxury goods, and accessories.",
        banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" // Placeholder
    },
    "Tiffany": {
        description: "Tiffany & Co. is an American luxury jewelry and specialty retailer headquartered in New York City.",
        banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNDky8wcMr6IK9CsH5lHzP94q1xpgzj4sRCwHxgBWqLc4bhwFC8wVPIX4A2ale1spgQJk6lEtR4Mf0mCG37C472JNMeZq_wm2AVX1NajotLS_B5KG84rqBjAb0hJ5bFvwqOFWmJ9VMqD-XEpESBv6RThxTv4WJTrcMde1L9BvbZjeHKxhKv-qw0gwOK03_YR1dqSy_c1YLMtdsLGRMR3psVHe8np-XEjOll6sldTVo9-9zduCb3RbuXjsiyVRTGv4ZJcY4hBUZQ24" // Placeholder
    },
};

export default function LuxuryLiveFitting() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch with delay to avoid synchronous state update warning
    const timer = setTimeout(() => {
        const luxuryItems = getLuxuryItems();
        setItems(luxuryItems);
        if (luxuryItems.length > 0) {
          setSelectedItem(luxuryItems[0]);
        }
        setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemSelect = (item: ClothingItem) => {
    if (selectedItem?.id === item.id) return;
    setIsLoading(true);
    setSelectedItem(item);
    // Simulate network delay for high fidelity loading
    setTimeout(() => setIsLoading(false), 1200);
  };

  const brandDetail = selectedItem && BRAND_DETAILS[selectedItem.brand] ? BRAND_DETAILS[selectedItem.brand] : { description: "Luxury fashion house.", banner: "" };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#D4AF37] ${playfair.className} cursor-none`}>
      <LuxuryCursor />

      {/* Background with slight texture or gradient */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      {/* Main Content Grid */}
      <div className="z-10 grid h-full w-full grid-cols-1 md:grid-cols-12 gap-0">

        {/* Left Panel: Brand & Details (3 cols) */}
        <div className="hidden md:flex col-span-3 flex-col border-r border-[#D4AF37]/20 relative bg-black">
           {/* Brand Banner Background with Parallax/Zoom Effect */}
           <AnimatePresence mode="wait">
             {selectedItem && brandDetail.banner && (
               <motion.div
                 key={`banner-${selectedItem.brand}`}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.6 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1.5 }}
                 className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
               >
                 <motion.img
                   src={brandDetail.banner}
                   alt={`${selectedItem.brand} Banner`}
                   className="h-full w-full object-cover grayscale opacity-60"
                   initial={{ scale: 1.1, y: -20 }}
                   animate={{ scale: 1, y: 0 }}
                   transition={{ duration: 10, ease: "easeOut" }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="z-10 flex flex-col justify-between h-full p-8 backdrop-blur-[2px]">
               {/* Header */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1 }}
               >
                 <h1 className={`${cinzel.className} text-2xl font-bold tracking-widest text-white`}>S_FIT <span className="text-[#D4AF37]">LUXE</span></h1>
                 <p className="mt-2 text-xs font-light tracking-[0.2em] text-white/60 uppercase">High Fidelity Virtual Try-On</p>
               </motion.div>

               {/* Brand Info */}
               <AnimatePresence mode="wait">
                 {selectedItem && (
                    <motion.div
                      key={selectedItem.brand}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-4"
                    >
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                        <h2 className="text-4xl italic text-white drop-shadow-lg">{selectedItem.brand}</h2>
                        <p className="text-sm leading-relaxed text-white/90 font-light drop-shadow-md">
                            {brandDetail.description}
                        </p>
                    </motion.div>
                 )}
               </AnimatePresence>

               {/* Stats */}
               <div className="space-y-6">
                  <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Category</p>
                      <p className="text-xl text-white capitalize">{selectedItem?.category || "N/A"}</p>
                  </div>
                  <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Collection</p>
                      <p className="text-xl text-white">Fall 2024</p>
                  </div>
               </div>
           </div>
        </div>

        {/* Center Panel: Main Visual (6 cols) */}
        <div className="col-span-12 md:col-span-6 relative flex flex-col items-center justify-center p-4">
           {/* Main Visual Area */}
           <div className="relative w-full h-[80vh] max-w-md md:max-w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                  {isLoading ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative size-64 flex items-center justify-center"
                      >
                          {/* Thin gold line tracing a box animation */}
                          <div className="absolute inset-0 border border-[#D4AF37]/20"></div>
                          <motion.div
                            className="absolute inset-0 border-t border-[#D4AF37]"
                            animate={{ left: ["0%", "100%", "100%", "0%", "0%"], width: ["0%", "100%", "0%", "0%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute inset-0 border-r border-[#D4AF37]"
                            animate={{ top: ["0%", "0%", "100%", "100%", "0%"], height: ["0%", "100%", "100%", "0%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                          />
                          <motion.div
                            className="absolute inset-0 border-b border-[#D4AF37]"
                            animate={{ right: ["0%", "0%", "0%", "100%", "100%"], width: ["0%", "0%", "100%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.0 }}
                          />
                          <motion.div
                            className="absolute inset-0 border-l border-[#D4AF37]"
                            animate={{ bottom: ["0%", "0%", "0%", "0%", "100%"], height: ["0%", "0%", "0%", "100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                          />

                          <p className={`${cinzel.className} text-[#D4AF37] text-xs tracking-[0.3em] animate-pulse`}>RENDERING</p>
                      </motion.div>
                  ) : (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="w-full h-full"
                      >
                         {selectedItem && (
                             <LuxuryImageDistortion
                                imageUrl={selectedItem.imageUrl}
                                className="w-full h-full"
                             />
                         )}
                      </motion.div>
                  )}
              </AnimatePresence>
           </div>

           {/* Capture Button - Floating */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <button className="group relative flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-30 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100"></div>
                 <div className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-30 animate-pulse delay-150"></div>
                 <div className="relative flex size-16 items-center justify-center rounded-full bg-[#D4AF37] text-black transition-all duration-500 group-hover:bg-white">
                    <span className="material-symbols-outlined text-2xl">camera_alt</span>
                 </div>
              </button>
           </div>
        </div>

        {/* Right Panel: Garment Selection (3 cols) */}
        <div className="hidden md:flex col-span-3 flex-col border-l border-[#D4AF37]/20 bg-black/40 backdrop-blur-sm">
           <div className="p-6 border-b border-[#D4AF37]/10 flex justify-between items-end">
              <h3 className={`${cinzel.className} text-sm font-bold tracking-widest text-[#D4AF37] uppercase`}>The Collection</h3>
              <p className="text-[10px] text-white/40">{items.length} ITEMS</p>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {/* Vertical List */}
              {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className={`group relative cursor-pointer transition-all duration-700 ${selectedItem?.id === item.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  >
                      <div className={`aspect-[3/4] w-full overflow-hidden rounded-sm bg-zinc-800 border ${selectedItem?.id === item.id ? 'border-[#D4AF37]' : 'border-transparent'}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                      </div>
                      <div className="mt-3 flex justify-between items-baseline border-b border-[#D4AF37]/20 pb-2 group-hover:border-[#D4AF37]">
                          <h4 className="text-sm text-white font-light tracking-wide truncate pr-2">{item.name}</h4>
                          <span className={`${cinzel.className} text-[#D4AF37] text-xs`}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, minimumFractionDigits: 0 }).format(item.price)}
                          </span>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </div>

      {/* Mobile Overlay for Collection */}
      <div className="md:hidden absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-8 z-20">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className="min-w-[140px] flex flex-col gap-2"
                  >
                       <div className={`aspect-[3/4] w-full rounded-sm bg-zinc-800 overflow-hidden border ${selectedItem?.id === item.id ? 'border-[#D4AF37]' : 'border-transparent'}`}>
                          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                       </div>
                       <div>
                          <p className={`text-xs truncate ${selectedItem?.id === item.id ? 'text-white' : 'text-white/60'}`}>{item.name}</p>
                          <p className="text-[#D4AF37] text-xs">
                             {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, minimumFractionDigits: 0 }).format(item.price)}
                          </p>
                       </div>
                  </div>
              ))}
          </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
