"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";
import LuxuryImageDistortion from "@/components/LuxuryImageDistortion";
import { mockClothingItems, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Mock Brand Data since data/luxuryProducts.ts was missing
const brandData: Record<string, { description: string, banner: string }> = {
    "Gucci": {
        description: "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion.",
        banner: "https://images.unsplash.com/photo-1548624149-f321943d00d4?auto=format&fit=crop&q=80&w=2000"
    },
    "Chanel": {
        description: "A brand that has become the symbol of elegance and luxury, defining the modern woman.",
        banner: "https://images.unsplash.com/photo-1579969406275-9980863ccb95?auto=format&fit=crop&q=80&w=2000"
    },
    "Hermès": {
        description: "High-end goods established in 1837, renowned for its leather goods, lifestyle accessories, home furnishings, perfumery, jewelry, watches and ready-to-wear.",
        banner: "https://images.unsplash.com/photo-1629737181057-0a35e2365313?auto=format&fit=crop&q=80&w=2000"
    },
    "Tiffany": {
        description: "Tiffany & Co. has been the world's premier jeweler and America's house of design since 1837.",
        banner: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=2000"
    },
    // Default fallback
    "Default": {
        description: "Experience the pinnacle of fashion with our curated luxury collection.",
        banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
    }
};

export default function LuxuryLiveFitting() {
  const [selectedProduct, setSelectedProduct] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter for luxury items
  const luxuryItems = mockClothingItems.filter(item => item.isLuxury);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  const currentBrand = selectedProduct ? brandData[selectedProduct.brand] || brandData["Default"] : brandData["Default"];

  return (
    <div className={`relative flex h-screen w-full flex-row overflow-hidden bg-black text-[#f4f4f4] ${spaceGrotesk.className} cursor-none`}>
      <GoldRingCursor />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
            <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                <div className="relative h-32 w-32">
                    <svg className="absolute inset-0 h-full w-full">
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className={`${cinzel.className} text-xl text-[#D4AF37] tracking-widest`}>S_FIT</span>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Visual Area (Left/Center) */}
      <div className="relative h-full flex-grow bg-[#111]">
        {/* Brand Banner Parallax Background */}
         <div className="absolute inset-0 overflow-hidden opacity-30">
            <motion.div
                className="h-[120%] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${currentBrand.banner}')` }}
                animate={{ y: ["-10%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            />
         </div>

        {/* Main Product / User Visual with Distortion */}
        <div className="absolute inset-0 z-0 flex items-center justify-center p-20">
             <div className="relative h-full w-full max-w-2xl overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/50 backdrop-blur-sm border border-white/10">
                 {/* Fallback image is needed if useTexture fails, but for now we rely on it. */}
                 {/* We pass the imageUrl directly. The Distortion component handles it. */}
                 <LuxuryImageDistortion
                    imageUrl={selectedProduct ? selectedProduct.imageUrl : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"}
                    className="h-full w-full opacity-90 hover:opacity-100 transition-opacity duration-700"
                 />

                 {/* Brand Description Overlay */}
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8 pt-20 pointer-events-none">
                     <motion.div
                        key={selectedProduct?.id || "default"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                     >
                        <h2 className={`${cinzel.className} text-3xl text-white mb-2`}>{selectedProduct ? selectedProduct.name : "Virtual Fitting Room"}</h2>
                        <p className="text-white/70 max-w-md font-light leading-relaxed">{currentBrand.description}</p>
                     </motion.div>
                 </div>
             </div>
        </div>

        {/* Top Header */}
        <div className="absolute top-0 left-0 w-full p-8 z-10 flex justify-between items-start pointer-events-none">
            <div className="pointer-events-auto">
                <h1 className={`${cinzel.className} text-4xl text-white tracking-widest`}>S_FIT <span className="text-[#D4AF37]">LUXE</span></h1>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mt-1">Masterpiece Engine</p>
            </div>

            <div className="flex gap-4 pointer-events-auto">
                 <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 cursor-pointer">
                    <span className="material-symbols-outlined text-white">close</span>
                </div>
            </div>
        </div>
      </div>

      {/* Sidebar (Right) - Product Selection */}
      <div className="relative h-full w-[400px] shrink-0 border-l border-[#D4AF37]/20 bg-[#050505] flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]">
         <div className="p-8 pb-4 border-b border-white/5">
             <h2 className={`${cinzel.className} text-2xl text-[#D4AF37] text-center tracking-widest`}>The Collection</h2>
         </div>

         <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-[#D4AF37]/20 scrollbar-track-transparent">
             {luxuryItems.length > 0 ? luxuryItems.map((item) => (
                 <div
                    key={item.id}
                    className={`group relative cursor-pointer transition-all duration-700 ${selectedProduct?.id === item.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    onClick={() => setSelectedProduct(item)}
                 >
                     <div className={`aspect-[3/4] w-full overflow-hidden rounded-sm transition-all duration-700 border ${selectedProduct?.id === item.id ? 'border-[#D4AF37] grayscale-0' : 'border-transparent grayscale'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            style={{ filter: "contrast(1.1) saturate(0.9)" }}
                        />
                     </div>
                     <div className="mt-4 text-center">
                         <p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-[#D4AF37] transition-colors">{item.brand}</p>
                         <h3 className={`${cinzel.className} text-lg text-white mt-1`}>{item.name}</h3>
                         <p className={`${cinzel.className} text-[#D4AF37] mt-1`}>{formatPrice(item.price)}</p>
                     </div>
                 </div>
             )) : (
                <p className="text-center text-white/50 mt-10">No luxury items found.</p>
             )}
         </div>
      </div>
    </div>
  );
}
