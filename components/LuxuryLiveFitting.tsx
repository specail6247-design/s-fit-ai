"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";
import { brands, getItemsByBrand, getLuxuryItems, ClothingItem, Brand } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-cinzel' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space' });

// Mock Data extensions for Luxury Experience
const BRAND_BANNERS: Record<string, string> = {
  'gucci': 'https://images.unsplash.com/photo-1548622150-1ddf86d4b799?q=80&w=2000&auto=format&fit=crop',
  'chanel': 'https://images.unsplash.com/photo-1550614000-4b9519e0926f?q=80&w=2000&auto=format&fit=crop',
  'tiffany': 'https://images.unsplash.com/photo-1574312675765-27a94dc0032e?q=80&w=2000&auto=format&fit=crop',
  'zara': 'https://images.unsplash.com/photo-1582239401569-b5704a292723?q=80&w=2000&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop'
};

const BRAND_DESCRIPTIONS: Record<string, string> = {
  'gucci': 'Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail.',
  'chanel': 'A brand that needs no introduction. Timeless elegance, iconic designs, and a legacy that has shaped the world of fashion.',
  'tiffany': 'Expertly crafted jewelry and iconic designs. The world’s premier jeweler and America’s house of design since 1837.',
  'zara': 'Fast fashion giant known for delivering the latest trends in clothing, footwear, and accessories.',
  'default': 'Explore the finest collection of luxury and contemporary fashion.'
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  // Initialize with default luxury items
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(() => {
      const items = getLuxuryItems();
      return items.length > 0 ? items[0] : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filter items: Show Luxury by default if no brand selected, else show brand items
  const displayedItems = selectedBrand
    ? getItemsByBrand(selectedBrand.id)
    : getLuxuryItems();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandSelect = (brand: Brand | null) => {
    setIsLoading(true);
    setSelectedBrand(brand);

    // Update active item immediately to avoid effect synchronization issues
    const items = brand ? getItemsByBrand(brand.id) : getLuxuryItems();
    if (items.length > 0) {
        setActiveItem(items[0]);
    } else {
        setActiveItem(null);
    }

    // Reset loading after transition
    setTimeout(() => setIsLoading(false), 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#e5e5e5] ${cinzel.variable} ${spaceGrotesk.variable} font-sans`}>
      <CustomCursor />

      {/* Background Ambience / Brand Banner */}
      <div className="absolute inset-0 z-0">
         <motion.div
            key={selectedBrand?.id || 'default'}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center opacity-30 saturate-0"
            style={{ backgroundImage: `url(${BRAND_BANNERS[selectedBrand?.id.toLowerCase() || 'default']})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 flex h-full w-full">

        {/* LEFT COLUMN: Brand Info & Navigation */}
        <div className="w-[400px] flex-shrink-0 flex flex-col justify-between p-12 border-r border-[#ecab13]/10 bg-black/40 backdrop-blur-sm">
          {/* Header */}
          <div className="space-y-2">
             <h1 className="text-4xl font-serif text-[#ecab13] tracking-widest">S_FIT</h1>
             <p className="text-xs font-sans tracking-[0.3em] text-white/50 uppercase">Luxury Edition</p>
          </div>

          {/* Brand Info */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedBrand?.id || 'all'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-6xl font-serif text-white mb-4 leading-none">
                        {selectedBrand ? selectedBrand.name : "THE VAULT"}
                    </h2>
                    <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs">
                        {selectedBrand ? BRAND_DESCRIPTIONS[selectedBrand.id.toLowerCase()] || BRAND_DESCRIPTIONS['default'] : BRAND_DESCRIPTIONS['default']}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Price (if active item) */}
            {activeItem && (
                 <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="pt-8 border-t border-[#ecab13]/20"
                 >
                    <p className="font-sans text-xs tracking-widest text-[#ecab13] uppercase mb-1">Estimated Value</p>
                    <p className="font-serif text-4xl text-white">{formatPrice(activeItem.price)}</p>
                 </motion.div>
            )}
          </div>

          {/* Navigation / Back */}
          <div>
            <button className="group flex items-center gap-3 text-sm font-sans tracking-widest text-white/70 hover:text-[#ecab13] transition-colors duration-500">
                <span className="block h-[1px] w-8 bg-current transition-all duration-500 group-hover:w-12"></span>
                BACK TO ATELIER
            </button>
          </div>
        </div>

        {/* CENTER: Main Visual (Distortion) */}
        <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
             {/* Loading State Overlay */}
             <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                    >
                        <div className="relative w-32 h-32">
                            {/* Gold Line Tracing Box */}
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <motion.rect
                                    x="10" y="10" width="80" height="80"
                                    fill="none"
                                    stroke="#ecab13"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                                />
                            </svg>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>

             {/* Main Visual */}
             <div className="relative w-full h-full max-w-[60vh] aspect-[3/4] border border-[#ecab13]/20 bg-white/5">
                {activeItem ? (
                    <LuxuryImageDistortion imageUrl={activeItem.imageUrl} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-serif italic">
                        Select a Masterpiece
                    </div>
                )}

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ecab13]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ecab13]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#ecab13]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ecab13]"></div>
             </div>
        </div>

        {/* RIGHT COLUMN: Product List (Masonry-ish Vertical) */}
        <div className="w-[320px] h-full overflow-y-auto overflow-x-hidden border-l border-[#ecab13]/10 bg-black/40 backdrop-blur-sm scrollbar-hide">
            <div className="p-8 space-y-12 pb-32">
                {/* Brand Selector (Horizontal scroll or small list) */}
                <div className="space-y-4">
                     <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#ecab13] uppercase">House Selection</p>
                     <div className="flex flex-wrap gap-4">
                        {brands.filter(b => b.isLuxury).map(brand => (
                            <button
                                key={brand.id}
                                onClick={() => handleBrandSelect(brand)}
                                className={`text-sm font-serif transition-all duration-500 ${selectedBrand?.id === brand.id ? 'text-white border-b border-[#ecab13]' : 'text-white/40 hover:text-white'}`}
                            >
                                {brand.name}
                            </button>
                        ))}
                        <button
                            onClick={() => handleBrandSelect(null)}
                             className={`text-sm font-serif transition-all duration-500 ${!selectedBrand ? 'text-white border-b border-[#ecab13]' : 'text-white/40 hover:text-white'}`}
                        >
                            All
                        </button>
                     </div>
                </div>

                {/* Products */}
                <div className="space-y-8">
                     <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#ecab13] uppercase">Collection</p>

                     <div className="flex flex-col gap-12">
                        {displayedItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => setActiveItem(item)}
                                className="group cursor-pointer"
                            >
                                <div className={`relative aspect-[3/4] w-full mb-4 overflow-hidden transition-all duration-700 ${activeItem?.id === item.id ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-80'}`}>
                                    <Image
                                      src={item.imageUrl}
                                      alt={item.name}
                                      fill
                                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                      unoptimized
                                    />
                                    {activeItem?.id === item.id && (
                                        <div className="absolute inset-0 border-[1px] border-[#ecab13]" />
                                    )}
                                </div>
                                <div className="space-y-1 text-center">
                                    <p className="font-serif text-lg text-white group-hover:text-[#ecab13] transition-colors duration-300">{item.name}</p>
                                    <p className="font-sans text-xs text-white/50">{formatPrice(item.price)}</p>
                                </div>
                            </motion.div>
                        ))}
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
