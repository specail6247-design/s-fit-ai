"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./ui/GoldRingCursor";
import { brands, mockClothingItems, type ClothingItem, type Brand } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>(undefined);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with Gucci
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const brand = brands.find(b => b.name === 'GUCCI');
      if (brand) {
        setSelectedBrand(brand);
        const brandItems = mockClothingItems.filter(item => item.brand === 'Gucci');
        setItems(brandItems);
        setSelectedItem(brandItems[0]);
      }
      setIsLoading(false);
    }, 2500); // 2.5s loading for effect

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-[#050505] text-[#D4AF37] ${cinzel.className}`}>
      <GoldRingCursor />

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>

      <AnimatePresence mode="wait">
        {isLoading ? (
            <motion.div
                key="loader"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#D4AF37]"
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                <div className="relative h-32 w-32">
                    <motion.div
                        className="absolute left-0 top-0 h-[1px] bg-[#D4AF37]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute right-0 top-0 w-[1px] bg-[#D4AF37]"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 h-[1px] bg-[#D4AF37]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 1.6 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-[1px] bg-[#D4AF37]"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 2.4 }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: "0.1em" }}
                            animate={{ opacity: 1, letterSpacing: "0.3em" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-xs font-bold"
                        >
                            LUXURY
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        ) : (
            <motion.div
                key="content"
                className="relative z-10 grid h-full w-full grid-cols-12 gap-8 p-8 md:p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                {/* Background Brand Image (Subtle Parallax) */}
                {selectedBrand && (
                    <motion.div
                        className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay grayscale"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        style={{
                            backgroundImage: `url(${selectedBrand.bannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                )}

                {/* Left Column: Brand Info & Product Details */}
                <div className="col-span-12 flex flex-col justify-between lg:col-span-3">
                    <div className="space-y-6 pt-12">
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                         >
                            <h1 className="text-5xl font-bold uppercase tracking-widest text-white md:text-7xl">
                                {selectedBrand?.name}
                            </h1>
                            <div className="mt-2 h-[1px] w-24 bg-[#D4AF37]"></div>
                         </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`max-w-xs text-sm leading-relaxed text-[#D4AF37]/80 ${playfair.className}`}
                        >
                            {selectedBrand?.description}
                        </motion.p>
                    </div>

                    <div className="mt-auto pb-12">
                        <AnimatePresence mode="wait">
                            {selectedItem && (
                                <motion.div
                                    key={selectedItem.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.7 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Collection 2024</p>
                                        <h2 className="text-3xl text-white">{selectedItem.name}</h2>
                                    </div>

                                    <div className="flex items-baseline gap-4">
                                        <p className="text-2xl text-[#D4AF37]">{formatPrice(selectedItem.price, selectedItem.currency)}</p>
                                    </div>

                                    <p className={`text-sm text-white/60 ${playfair.className}`}>{selectedItem.description}</p>

                                    <div className="pt-8">
                                        <button className="group relative overflow-hidden border border-[#D4AF37] px-8 py-4 text-xs uppercase tracking-[0.2em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black">
                                            <span className="relative z-10">Add to Vault</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Center Column: Main Visual (Distortion) */}
                <div className="col-span-12 flex items-center justify-center lg:col-span-6">
                    <div className="relative h-[60vh] w-full lg:h-[80vh]">
                         {/* Decorative Frame */}
                         <div className="absolute inset-0 z-20 border border-[#D4AF37]/20 pointer-events-none">
                            <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#D4AF37]"></div>
                            <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#D4AF37]"></div>
                            <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#D4AF37]"></div>
                            <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#D4AF37]"></div>
                         </div>

                         <AnimatePresence mode="wait">
                            {selectedItem && (
                                <motion.div
                                    key={selectedItem.id}
                                    className="h-full w-full"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <LuxuryImageDistortion imageUrl={selectedItem.textureUrl || selectedItem.imageUrl} />
                                </motion.div>
                            )}
                         </AnimatePresence>
                    </div>
                </div>

                {/* Right Column: Product List */}
                <div className="col-span-12 h-full overflow-hidden lg:col-span-3">
                    <div className="h-full overflow-y-auto pr-2 scrollbar-hide mask-gradient-b">
                        <div className="flex flex-col gap-8 pt-12 pb-24">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
                                    onClick={() => setSelectedItem(item)}
                                    className="group cursor-pointer"
                                >
                                    <div className="flex gap-4">
                                        <div className={`relative h-32 w-24 overflow-hidden bg-[#101922] transition-all duration-700 ${selectedItem?.id === item.id ? 'border border-[#D4AF37]' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className={`text-xs uppercase tracking-widest text-white transition-colors duration-500 ${selectedItem?.id === item.id ? 'text-[#D4AF37]' : ''}`}>
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-xs text-white/50">{formatPrice(item.price, item.currency)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button */}
       <div className="absolute top-8 right-8 z-50">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-md transition-all duration-500 hover:bg-[#D4AF37] hover:text-black">
               <span className="material-symbols-outlined">close</span>
          </button>
       </div>
    </div>
  );
}
