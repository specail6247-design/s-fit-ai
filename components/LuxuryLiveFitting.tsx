"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import { getAllItems, getItemsByBrand, type ClothingItem, brands } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Loading Animation Component
const LoadingState = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
    <div className="relative h-24 w-24">
      <motion.div
        className="absolute inset-0 border border-[#ecab13]"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      >
        <svg className="h-full w-full">
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#ecab13" strokeWidth="1" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className={`${cinzel.className} text-xl text-[#ecab13]`}>S_FIT</span>
      </motion.div>
    </div>
  </div>
);

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setItems(getAllItems());
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setItems(getItemsByBrand(brandId));
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const currentBrand = brands.find((b) => b.id === selectedBrand);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <GoldRingCursor />

      {/* Brand Banner with Parallax */}
      <AnimatePresence>
        {selectedBrand && currentBrand && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7 }}
            className="fixed top-0 left-0 z-10 w-full h-[30vh] overflow-hidden"
          >
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentBrand.logo})` }} // Ideally a banner image, using logo as placeholder or mockData should have banner
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h1 className={`${cinzel.className} text-5xl text-[#ecab13] mb-4`}>{currentBrand.name}</h1>
                <p className="text-white/80 max-w-xl text-lg font-light tracking-wide">{currentBrand.isLuxury ? "Experience the pinnacle of fashion." : "Modern essentials for everyday life."}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-20 flex h-full flex-col ${selectedBrand ? "pt-[30vh]" : "pt-24"} px-8 pb-12 transition-all duration-700`}>

        {/* Header (if no brand selected) */}
        {!selectedBrand && (
            <div className="flex flex-col items-center justify-center py-12">
                <h1 className={`${cinzel.className} text-4xl text-[#ecab13] mb-2 tracking-widest`}>S_FIT LUXURY</h1>
                <p className="text-white/50 text-sm tracking-[0.3em] uppercase">The Masterpiece Collection</p>
            </div>
        )}

        {/* Layout: Split View or Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar / Navigation */}
            <div className="lg:col-span-3 space-y-8">
                <div>
                    <h3 className={`${cinzel.className} text-xl text-white mb-6 border-b border-[#ecab13]/30 pb-2`}>Brands</h3>
                    <div className="flex flex-col gap-4">
                        {brands.filter(b => b.isLuxury).map((brand) => (
                            <button
                                key={brand.id}
                                onClick={() => handleBrandSelect(brand.id)}
                                className={`text-left text-lg transition-all duration-500 hover:text-[#ecab13] ${selectedBrand === brand.id ? "text-[#ecab13] pl-4 border-l-2 border-[#ecab13]" : "text-white/60"}`}
                            >
                                {brand.name}
                            </button>
                        ))}
                         <button
                                onClick={() => { setSelectedBrand(null); setItems(getAllItems()); }}
                                className={`text-left text-lg transition-all duration-500 hover:text-[#ecab13] mt-4 pt-4 border-t border-white/10 ${!selectedBrand ? "text-[#ecab13]" : "text-white/60"}`}
                            >
                                View All
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Showcase (Masonry / Grid) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layoutId={`product-${item.id}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                        className="group relative flex flex-col gap-4 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                    >
                        {/* Image Container with Distortion on Hover (conceptually, simpler on grid, full distortion on detail) */}
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1a1a]">
                             {/* Use LuxuryImageDistortion only for selected or main view to save performance,
                                 or use simpler image here. Let's use simpler image for grid, full distortion for detail view.
                                 Wait, prompt says "Integrate the LuxuryImageDistortion component for the main product visual".
                                 I'll use it in the Detail View overlay. */}
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url('${item.imageUrl}')` }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Price Tag */}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                                <span className={`${cinzel.className} text-[#ecab13]`}>{formatPrice(item.price, item.currency)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className={`${cinzel.className} text-lg text-white group-hover:text-[#ecab13] transition-colors duration-300`}>{item.name}</h3>
                            <p className="text-white/50 text-xs tracking-wider uppercase">{item.brand}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Detail View Overlay */}
      <AnimatePresence>
        {selectedItem && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 lg:p-12"
            >
                <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-8 right-8 z-50 p-4 text-white hover:text-[#ecab13] transition-colors"
                >
                    <span className="material-symbols-outlined text-4xl">close</span>
                </button>

                <div className="flex w-full h-full max-w-7xl gap-12 flex-col lg:flex-row">
                    {/* Main Visual with Distortion */}
                    <div className="flex-1 relative h-full w-full rounded-lg overflow-hidden border border-[#ecab13]/20">
                         {/* This is where LuxuryImageDistortion shines */}
                        <LuxuryImageDistortion imageUrl={selectedItem.imageUrl} className="h-full w-full" />

                        <div className="absolute bottom-8 left-8 z-10">
                             <p className="text-[#ecab13] text-xs font-bold tracking-widest uppercase mb-2">Interactive Material</p>
                             <div className="h-[1px] w-12 bg-[#ecab13] mb-4" />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-center space-y-8 p-4">
                        <div>
                            <h2 className={`${cinzel.className} text-5xl text-white mb-4 leading-tight`}>{selectedItem.name}</h2>
                            <p className="text-[#ecab13] text-2xl font-light">{formatPrice(selectedItem.price, selectedItem.currency)}</p>
                        </div>

                        <p className="text-white/70 text-lg leading-relaxed font-light max-w-md">
                            {selectedItem.description || "Experience the finest quality materials and craftsmanship. Designed for the modern connoisseur."}
                        </p>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <div className="flex gap-4">
                                {selectedItem.sizes.map(size => (
                                    <button key={size} className="w-12 h-12 border border-white/20 text-white hover:border-[#ecab13] hover:text-[#ecab13] transition-colors flex items-center justify-center font-light">
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <button className="w-full max-w-md bg-[#ecab13] text-black py-4 px-8 uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300">
                                Add to Wardrobe
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
