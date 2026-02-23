"use client";

import React, { useState } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import LuxuryImageDistortion from "@/components/ui/LuxuryImageDistortion";
import { mockClothingItems, ClothingItem } from "@/data/mockData";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Brand Details Mapping
const BRAND_DETAILS: Record<string, { banner: string; description: string }> = {
  Gucci: {
    banner: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2969&auto=format&fit=crop",
    description: "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion.",
  },
  Chanel: {
    banner: "https://images.unsplash.com/photo-1541533848490-bc9c79e2ad13?q=80&w=2969&auto=format&fit=crop",
    description: "A timeless classic, Chanel sets the standard for luxury and elegance in the fashion world.",
  },
  Tiffany: {
    banner: "https://images.unsplash.com/photo-1596942515064-2d9369305148?q=80&w=2874&auto=format&fit=crop",
    description: "Tiffany & Co. has been the world's premier jeweler and America's house of design since 1837.",
  },
  // Default fallback
  Default: {
    banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2971",
    description: "Experience the pinnacle of fashion with our curated luxury collection.",
  }
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Derived state: Filter items based on selection
  const filteredItems = selectedBrand
      ? mockClothingItems.filter(i => i.brand === selectedBrand)
      : mockClothingItems.filter(i => i.isLuxury); // Default to luxury items

  const handleBrandSelect = (brandName: string) => {
    setLoading(true);
    setSelectedBrand(brandName);
    // Simulate loading delay for "Slower, smoother" feel
    setTimeout(() => setLoading(false), 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const currentBrandDetails = (selectedBrand && BRAND_DETAILS[selectedBrand]) || BRAND_DETAILS['Default'];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-[#D4AF37] ${playfair.className} cursor-none`}>
      <LuxuryCursor />

      {/* Background / Main View */}
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion
            src={currentBrandDetails?.banner || BRAND_DETAILS['Default'].banner}
            alt="Brand Ambience"
            className="h-full w-full opacity-40 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
      </div>

      {/* Header */}
      <header className="z-10 flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
          <div className={`text-2xl font-bold tracking-[0.2em] ${cinzel.className}`}>
            LUXURY MODE
          </div>
          <div className="h-[1px] w-24 bg-[#D4AF37]/50" />
        </div>
        <nav className="flex gap-8 text-sm uppercase tracking-widest text-[#D4AF37]/70">
          {['Collection', 'Runway', 'Atelier'].map((item) => (
            <button key={item} className="hover:text-[#D4AF37] transition-colors duration-500">
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="z-10 grid h-full grid-cols-12 gap-8 px-8 pb-8">

        {/* Left: Brand & Info */}
        <div className="col-span-3 flex flex-col justify-center space-y-8">
          <AnimatePresence mode="wait">
            {loading ? (
               <motion.div
                 key="loader"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="space-y-4"
               >
                 <div className="relative h-1 w-full overflow-hidden bg-[#D4AF37]/20">
                   <motion.div
                     className="absolute inset-y-0 left-0 bg-[#D4AF37]"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                   />
                 </div>
                 <p className="text-xs tracking-[0.3em] uppercase">Curating Collection...</p>
               </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <h1 className={`text-6xl leading-tight ${cinzel.className}`}>
                  {selectedBrand || "The Collection"}
                </h1>
                <p className="text-lg leading-relaxed text-[#D4AF37]/80 italic">
                  {currentBrandDetails?.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                   {/* Brand Selector */}
                   {['Gucci', 'Chanel', 'Tiffany'].map(b => (
                     <button
                       key={b}
                       onClick={() => handleBrandSelect(b)}
                       className={`border px-6 py-3 text-xs uppercase tracking-widest transition-all duration-700
                         ${selectedBrand === b
                           ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                           : 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
                         }`}
                     >
                       {b}
                     </button>
                   ))}
                   <button
                       onClick={() => handleBrandSelect("")}
                       className="border border-[#D4AF37]/30 px-6 py-3 text-xs uppercase tracking-widest transition-all duration-700 hover:border-[#D4AF37]"
                   >
                     View All
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Active Item Display (Distortion Integration) */}
        <div className="col-span-5 flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
                {selectedItem && (
                    <motion.div
                        key={selectedItem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm border border-[#D4AF37]/20 shadow-2xl shadow-black/50"
                    >
                        <LuxuryImageDistortion
                            src={selectedItem.imageUrl}
                            alt={selectedItem.name}
                            className="h-full w-full"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                            <h3 className={`text-2xl ${cinzel.className}`}>{selectedItem.name}</h3>
                            <p className="text-xl text-[#D4AF37]">{formatPrice(selectedItem.price)}</p>
                        </div>
                    </motion.div>
                )}
                {!selectedItem && (
                    <div className="flex h-full w-full items-center justify-center border border-[#D4AF37]/10 bg-black/20 backdrop-blur-sm">
                        <p className="text-[#D4AF37]/40 tracking-widest uppercase">Select an Item</p>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Right: Product List (Masonry-ish Vertical Scroll) */}
        <div className="col-span-4 h-full overflow-y-auto pr-4 scrollbar-hide">
          <div className="space-y-8 pt-12">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className={`group cursor-pointer transition-all duration-700 ${selectedItem?.id === item.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                <div className="flex gap-4">
                  <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden border border-[#D4AF37]/20 transition-all duration-700 group-hover:border-[#D4AF37]">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                       src={item.imageUrl}
                       alt={item.name}
                       className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                     />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-widest text-[#D4AF37]/60">{item.brand}</p>
                    <h3 className={`mt-1 text-lg leading-tight ${playfair.className} group-hover:text-white transition-colors duration-500`}>
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-[#D4AF37]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredItems.length === 0 && (
                <div className="py-20 text-center text-[#D4AF37]/50">
                    <p>No luxury items found.</p>
                </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Status */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/50">
             <div className="h-1 w-1 rounded-full bg-[#D4AF37] animate-pulse" />
             System Status: Optimized
        </div>
      </div>
    </div>
  );
}
