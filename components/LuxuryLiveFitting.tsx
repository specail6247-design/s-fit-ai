"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import LuxuryCursor from "./masterpiece/LuxuryCursor";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import { getLuxuryItems, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

// Extended Brand Info (Mock)
const BRAND_INFO: Record<string, { description: string; banner: string }> = {
  Gucci: {
    description:
      "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion. Under the new vision of creative director Sabato De Sarno, the House has redefined luxury for the 21st century.",
    banner:
      "https://images.unsplash.com/photo-1548625361-1c5c6356499a?q=80&w=1000&auto=format&fit=crop",
  },
  Chanel: {
    description:
      "Chanel is a French luxury fashion house founded in 1910 by Coco Chanel in Paris. It focuses on women's ready-to-wear clothes, luxury goods, and accessories.",
    banner:
      "https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=1000",
  },
  Tiffany: {
    description:
      "Tiffany & Co. is an American luxury jewelry and specialty retailer headquartered in New York City. It sells jewelry, sterling silver, china, crystal, stationery, fragrances, water bottles, watches, personal accessories, and leather goods.",
    banner:
      "https://images.unsplash.com/photo-1617038224531-16d44a30554d?q=80&w=1000",
  },
  default: {
    description:
      "Experience the pinnacle of fashion with our curated luxury collection. Each piece is a masterpiece of design and craftsmanship.",
    banner:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
  },
};

const LoadingLine = () => (
  <motion.div
    className="absolute inset-0 z-50 flex items-center justify-center bg-black"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 1, delay: 2 }}
    onAnimationComplete={() => console.log("Loaded")}
  >
    <div className="relative h-32 w-32">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <motion.path
          d="M10,10 L90,10 L90,90 L10,90 Z"
          fill="none"
          stroke="#ecab13"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </motion.div>
);

export default function LuxuryLiveFitting() {
  const [items] = useState<ClothingItem[]>(() => getLuxuryItems());
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(() => {
      const all = getLuxuryItems();
      return all.length > 0 ? all[0] : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading || !selectedItem) {
    return <LoadingLine />;
  }

  const brandData =
    BRAND_INFO[selectedItem.brand] || BRAND_INFO["default"];

  return (
    <div
      className={`relative flex h-screen w-full overflow-hidden bg-[#050505] text-[#f5f5f5] ${cinzel.className}`}
    >
      <LuxuryCursor />

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div
            className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-1000 ease-in-out"
            style={{ backgroundImage: `url(${brandData.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative z-10 grid h-full w-full grid-cols-12 gap-0">

        {/* LEFT COLUMN: Brand Experience */}
        <div className="col-span-3 flex flex-col justify-center border-r border-white/5 bg-black/20 p-12 backdrop-blur-sm">
          <motion.div
            key={selectedItem.brand}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-bold tracking-wider text-[#ecab13]">
              {selectedItem.brand.toUpperCase()}
            </h1>
            <div className={`h-0.5 w-16 bg-[#ecab13]`} />
            <p className={`text-lg leading-relaxed text-gray-300 ${playfair.className}`}>
              {brandData.description}
            </p>

            <div className="mt-12">
               <div className="text-xs uppercase tracking-[0.2em] text-[#ecab13] mb-2">Collection</div>
               <div className="text-2xl">Fall / Winter 2024</div>
            </div>
          </motion.div>
        </div>

        {/* CENTER COLUMN: Main Fitting Visual */}
        <div className="col-span-6 relative flex flex-col items-center justify-center p-8">
            {/* Header */}
            <div className="absolute top-8 w-full text-center">
                <span className="text-xs tracking-[0.4em] uppercase text-white/40">Masterpiece Fit</span>
            </div>

            {/* Main Stage */}
            <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] w-full max-w-xl shadow-2xl"
            >
                {/* Gold Frame Border */}
                <div className="absolute -inset-1 border border-[#ecab13]/30 z-20 pointer-events-none" />
                <div className="absolute -inset-1 border border-[#ecab13]/10 scale-105 z-10 pointer-events-none" />

                {/* Distortion View */}
                <div className="h-full w-full bg-[#111] overflow-hidden">
                    <LuxuryImageDistortion imageUrl={selectedItem.imageUrl} />
                </div>

                {/* Floating Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8 z-30 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl text-white drop-shadow-lg">{selectedItem.name}</h2>
                        <p className={`text-sm text-gray-300 ${playfair.className}`}>Ref. {selectedItem.id}</p>
                    </div>
                    <div className="text-3xl text-[#ecab13] drop-shadow-lg">
                        {formatPrice(selectedItem.price)}
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute bottom-12 flex gap-6">
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black">
                     <span className="material-symbols-outlined">favorite_border</span>
                </button>
                <button className="flex h-12 w-48 items-center justify-center rounded-full bg-[#ecab13] text-black font-bold tracking-widest uppercase transition hover:bg-white">
                    Add to Vault
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black">
                     <span className="material-symbols-outlined">share</span>
                </button>
            </div>
        </div>

        {/* RIGHT COLUMN: Product List */}
        <div className="col-span-3 h-full overflow-y-auto border-l border-white/5 bg-black/40 backdrop-blur-md">
            <div className="p-8">
                <h3 className="mb-8 text-center text-sm tracking-[0.3em] uppercase text-[#ecab13]">Curated Selection</h3>
                <div className="space-y-12">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative cursor-pointer transition-all duration-700 ${selectedItem.id === item.id ? 'opacity-100 scale-100' : 'opacity-50 hover:opacity-80'}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeBorder"
                                        className="absolute inset-0 border-2 border-[#ecab13]"
                                    />
                                )}
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs uppercase tracking-widest text-gray-400">{item.brand}</p>
                                <p className={`mt-1 text-sm text-white group-hover:text-[#ecab13] transition-colors ${playfair.className}`}>{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Spacer */}
                <div className="h-32" />
            </div>
        </div>

      </div>
    </div>
  );
}
