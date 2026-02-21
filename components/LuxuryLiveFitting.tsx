"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./masterpiece/GoldRingCursor";
import { brands, getItemsByBrand, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });

const BRAND_DETAILS: Record<string, { banner: string, description: string }> = {
  'Gucci': {
    banner: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2500&auto=format&fit=crop',
    description: 'Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail.'
  },
  'Chanel': {
    banner: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=2500&auto=format&fit=crop',
    description: 'A benchmark of luxury and elegance, Chanel continues to inspire women of all ages around the world with its timeless modernity.'
  },
  'Tiffany': {
    banner: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2500&auto=format&fit=crop',
    description: 'America’s house of design and premier jeweler since 1837. Explore our collections of iconic engagement rings, cherished gifts and visionary jewelry designs.'
  },
  'default': {
    banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500&auto=format&fit=crop',
    description: 'Experience the finest in luxury fashion with our curated collection of premium brands.'
  }
};

export default function LuxuryLiveFitting() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("gucci");
  const [selectedProduct, setSelectedProduct] = useState<ClothingItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ClothingItem[]>([]);

  useEffect(() => {
    // Simulate loading delay for "luxury feel"
    const timer = setTimeout(() => {
      // Find brand by ID case-insensitive
      const brand = brands.find(b => b.id.toLowerCase() === selectedBrandId.toLowerCase());
      const brandIdToUse = brand ? brand.id : selectedBrandId;

      const items = getItemsByBrand(brandIdToUse);
      setProducts(items);
      if (items.length > 0) {
        // Only auto-select if no product is selected or if the brand changed significantly
        setSelectedProduct(items[0]);
      } else {
        setSelectedProduct(null);
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedBrandId]);

  const brandInfo = BRAND_DETAILS[Object.keys(BRAND_DETAILS).find(key => key.toLowerCase() === selectedBrandId.toLowerCase()) || 'default'] || BRAND_DETAILS['default'];
  const brandName = brands.find(b => b.id.toLowerCase() === selectedBrandId.toLowerCase())?.name || selectedBrandId;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#101922] text-[#ecab13] selection:bg-[#ecab13] selection:text-[#101922] ${cinzel.className}`}>
      <GoldRingCursor />

      {/* Background - Parallax Brand Banner or AR View */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${brandInfo.banner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%) contrast(1.2)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101922] via-[#101922]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101922] via-transparent to-[#101922]/50" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid h-full w-full grid-cols-12 gap-6 p-8">

        {/* Left Column: Brand & Details */}
        <div className="col-span-4 flex flex-col justify-between pt-12 pl-4">
          <div>
            <motion.h1
              key={`title-${brandName}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl font-bold uppercase tracking-wider text-white"
            >
              {brandName}
            </motion.h1>
            <motion.div
              key={`line-${brandName}`}
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="my-6 h-[2px] bg-[#ecab13]"
            />
            <motion.p
              key={`desc-${brandName}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-md text-sm leading-loose text-white/80 font-sans tracking-wide"
            >
              {brandInfo.description}
            </motion.p>
          </div>

          {/* Selected Product Detail View */}
          <AnimatePresence mode="wait">
            {selectedProduct && (
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="relative mt-8 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-[#ecab13]/30 bg-[#101922]/50 backdrop-blur-sm"
              >
                {/* Luxury Distortion Effect for Active Product */}
                <LuxuryImageDistortion image={selectedProduct.imageUrl} />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">{selectedProduct.name}</h3>
                  <p className="mt-1 text-2xl text-[#ecab13]">{formatPrice(selectedProduct.price)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Column: AR Placeholder (Mirror) */}
        <div className="col-span-4 flex items-center justify-center relative pt-8">
             <div className="relative h-[80vh] w-full overflow-hidden rounded-t-[200px] border border-[#ecab13]/20 bg-black/20 backdrop-blur-sm shadow-[0_0_50px_rgba(236,171,19,0.1)]">
                {/* Simulated Webcam Feed */}
                <div
                    className="absolute inset-0 opacity-60 mix-blend-screen"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

                {/* AR UI Overlays */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#ecab13]/80 font-bold">Live Fitting</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(236, 171, 19, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 171, 19, 0.05) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
             </div>
        </div>

        {/* Right Column: Product Collection (Masonry/Vertical List) */}
        <div className="col-span-4 h-full overflow-y-auto pr-2 scrollbar-hide pt-12">
          <div className="flex flex-col gap-6 pb-32">
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4 sticky top-0 bg-[#101922]/95 backdrop-blur-md py-4 z-20 border-b border-[#ecab13]/10">
              Collection
            </h2>

            {isLoading ? (
               // Luxury Loading State
               <div className="flex flex-col gap-6">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="relative h-48 w-full overflow-hidden rounded-sm bg-[#1a1a1a]">
                     <div className="absolute inset-0 animate-pulse bg-white/5" />
                     {/* Thin gold line tracing */}
                     <div className="absolute inset-0 border border-[#ecab13]/20 opacity-50" />
                   </div>
                 ))}
               </div>
            ) : (
              products.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`group relative flex cursor-pointer overflow-hidden rounded-sm border border-transparent transition-all duration-700 hover:border-[#ecab13]/30 ${selectedProduct?.id === item.id ? 'border-[#ecab13] bg-[#ecab13]/5' : 'bg-white/5'}`}
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="w-24 shrink-0 overflow-hidden bg-[#000]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-2 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-[#ecab13] transition-colors">{item.brand}</p>
                    <h3 className="text-sm font-serif text-white/90 leading-tight">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-[#ecab13]">{formatPrice(item.price)}</p>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] uppercase tracking-wider text-white border-b border-white">View</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {products.length === 0 && !isLoading && (
              <div className="py-20 text-center text-white/30">
                <p>No items found for this collection.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Brand Selector (Quick Switch) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-12 border-t border-[#ecab13]/10 bg-[#101922]/90 py-8 backdrop-blur-xl">
        {brands.filter(b => b.isLuxury).map((brand) => (
          <button
            key={brand.id}
            onClick={() => {
              setIsLoading(true);
              setSelectedBrandId(brand.id);
            }}
            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${selectedBrandId === brand.id || selectedBrandId.toLowerCase() === brand.id.toLowerCase() ? 'text-[#ecab13] scale-110 border-b border-[#ecab13] pb-1' : 'text-white/40 hover:text-white'}`}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}
