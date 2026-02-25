"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/masterpiece/LuxuryCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import { getLuxuryItems, ClothingItem, brands } from "@/data/mockData";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

const BRAND_DETAILS: Record<string, { banner: string; description: string }> = {
  gucci: {
    banner: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80",
    description: "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion. Under the new vision, the House has redefined luxury for the 21st century.",
  },
  chanel: {
    banner: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80",
    description: "Chanel is a French luxury fashion house founded in 1910 by Coco Chanel in Paris. It focuses on women's high fashion and ready-to-wear clothes, luxury goods, and accessories.",
  },
  tiffany: {
    banner: "https://images.unsplash.com/photo-1617038224538-2763fcc16346?auto=format&fit=crop&q=80",
    description: "Tiffany & Co. is an American luxury jewelry and specialty retailer. It sells jewelry, sterling silver, china, crystal, stationery, fragrances, and leather goods.",
  },
  default: {
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80",
    description: "Experience the pinnacle of fashion with our curated selection of luxury brands. Each piece is a masterpiece of design and craftsmanship.",
  }
};

function LoadingState() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm">
           <div className="relative size-32">
              <svg className="size-full" viewBox="0 0 100 100">
                 <motion.rect
                    x="2" y="2" width="96" height="96"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className={`${cinzel.className} text-[#D4AF37] text-[10px] tracking-[0.3em] animate-pulse`}>LOADING</span>
              </div>
           </div>
        </div>
    );
}

export default function LuxuryLiveFitting() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
        setItems(getLuxuryItems());
        setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBrandSelect = (brandId: string) => {
      setIsLoading(true);
      if (selectedBrand === brandId) {
          setSelectedBrand(null);
      } else {
          setSelectedBrand(brandId);
          setSelectedItem(null); // Reset item selection when changing brand
      }
      setTimeout(() => setIsLoading(false), 800);
  };

  const handleItemSelect = (item: ClothingItem) => {
      setSelectedItem(item);
  };

  const currentBrandDetails = selectedBrand && BRAND_DETAILS[selectedBrand.toLowerCase()]
      ? BRAND_DETAILS[selectedBrand.toLowerCase()]
      : BRAND_DETAILS.default;

  return (
    <div className={`relative flex h-screen w-full cursor-none overflow-hidden bg-[#0a0a0a] text-[#D4AF37] ${playfair.className}`}>
      <LuxuryCursor />
      <AnimatePresence>
        {isLoading && <LoadingState />}
      </AnimatePresence>

      {/* Background with subtle texture */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-black opacity-80" />

      {/* Main Content Grid */}
      <div className="relative z-10 grid h-full w-full grid-cols-12 gap-4 p-8">
          {/* Left Panel: Brand & Navigation */}
          <div className="col-span-3 flex flex-col justify-between border-r border-[#D4AF37]/20 pr-8">
              {/* Header */}
              <div>
                  <h1 className={`${cinzel.className} text-4xl font-bold tracking-widest text-[#D4AF37]`}>S_FIT</h1>
                  <p className="mt-2 text-xs font-light tracking-[0.3em] text-white/50">LUXURY COLLECTION</p>
              </div>

              {/* Brand List */}
              <div className="flex flex-col gap-4 py-8 overflow-y-auto max-h-[60vh] scrollbar-hide">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Brands</h3>
                  <div className="flex flex-col gap-4">
                      {brands.filter(b => b.isLuxury).map(brand => (
                          <button
                              key={brand.id}
                              onClick={() => handleBrandSelect(brand.id)}
                              className={`group flex items-center justify-between text-left text-lg transition-all duration-700 ${selectedBrand === brand.id ? "text-[#D4AF37] translate-x-2" : "text-white/40 hover:text-white"}`}
                          >
                              <span className={`font-light ${selectedBrand === brand.id ? "font-normal" : ""}`}>{brand.name}</span>
                              {selectedBrand === brand.id && <motion.div layoutId="activeBrandIndicator" className="h-px w-8 bg-[#D4AF37]" />}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-4">
                  <div className="h-px w-12 bg-[#D4AF37]/50" />
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Select a piece to begin fitting</p>
              </div>
          </div>

          {/* Middle Panel: Product Visual or Brand Experience */}
          <div className="col-span-5 flex items-center justify-center p-8 relative">
              <AnimatePresence mode="wait">
                  {selectedItem ? (
                      <motion.div
                        key="product-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="h-[80vh] w-full relative"
                      >
                          <LuxuryImageDistortion imageUrl={selectedItem.imageUrl} />

                          {/* Overlay Details */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute bottom-0 left-0 p-6 bg-black/60 backdrop-blur-md border border-[#D4AF37]/20 max-w-md w-full"
                          >
                              <h2 className={`${cinzel.className} text-3xl text-white mb-2`}>{selectedItem.name}</h2>
                              <p className="text-[#D4AF37] text-xl font-bold font-mono">
                                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedItem.currency }).format(selectedItem.price)}
                              </p>
                              <p className="text-white/60 text-sm mt-4 font-light leading-relaxed">{selectedItem.description}</p>

                              <button className="mt-6 w-full py-4 border border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
                                  Try On
                              </button>
                          </motion.div>
                      </motion.div>
                  ) : (
                      <motion.div
                        key="brand-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="flex h-full w-full flex-col items-center justify-center text-center"
                      >
                           {/* Brand Banner Parallax Effect (Simulated via CSS/Motion) */}
                           <div className="relative h-[60vh] w-full overflow-hidden border border-[#D4AF37]/20">
                                <motion.div
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                                    className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                                    style={{ backgroundImage: `url(${currentBrandDetails.banner})`, filter: 'grayscale(100%)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                <div className="absolute bottom-10 left-10 right-10 text-left">
                                    <h2 className={`${cinzel.className} text-5xl text-white mb-4`}>
                                        {selectedBrand ? brands.find(b => b.id === selectedBrand)?.name : "LUXURY"}
                                    </h2>
                                    <p className="text-lg font-light text-[#D4AF37] max-w-md leading-relaxed">
                                        {currentBrandDetails.description}
                                    </p>
                                </div>
                           </div>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>

          {/* Right Panel: Product List */}
          <div className="col-span-4 h-full overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 gap-4 pb-20">
                  {items.filter(item => !selectedBrand || item.brand.toLowerCase() === selectedBrand.toLowerCase()).map((item) => (
                      <motion.div
                          key={item.id}
                          layoutId={item.id}
                          onClick={() => handleItemSelect(item)}
                          className={`group relative aspect-[3/4] cursor-pointer overflow-hidden border border-[#D4AF37]/10 transition-all duration-1000 hover:border-[#D4AF37]/50 ${selectedItem?.id === item.id ? "border-[#D4AF37] opacity-60 grayscale" : ""}`}
                      >
                          {/* Image */}
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                              style={{ backgroundImage: `url(${item.imageUrl})` }}
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                          {/* Info */}
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                              <p className="text-xs font-bold uppercase text-white truncate">{item.name}</p>
                              <p className="text-[10px] text-[#D4AF37]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency }).format(item.price)}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
