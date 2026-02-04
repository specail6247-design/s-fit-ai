"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import { brands, mockClothingItems, ClothingItem } from "@/data/mockData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// Custom Cursor Component
function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Use requestAnimationFrame for smoother performance if needed, but direct update is often fine for simple cursors
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-[#D4AF37] mix-blend-difference transition-transform duration-100 ease-out will-change-transform"
      style={{ boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)" }}
    />
  );
}

// Format Price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
};

export default function LuxuryLiveFitting() {
  // Initialize with default item to avoid hydration mismatch if possible, or handle via mounted check
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(
    mockClothingItems.find(i => i.isLuxury) || mockClothingItems[0]
  );

  // Derived state for brand
  const activeBrand = selectedItem ? brands.find(b => b.name === selectedItem.brand) : undefined;

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Trigger loading simulation when item changes
  useEffect(() => {
    if (selectedItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedItem]);

  // Filter for luxury items mostly, or just all items
  const displayItems = mockClothingItems.filter(item => item.isLuxury || item.price > 100);

  if (!mounted) return null;

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#D4AF37] ${cinzel.className} cursor-none`}>
      <LuxuryCursor />

      {/* Background with Distortion */}
      <LuxuryImageDistortion imageUrl={selectedItem?.imageUrl || ""} />

      {/* Brand Experience Banner */}
      <AnimatePresence mode="wait">
        {activeBrand && (
            <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full z-0 h-[40vh] overflow-hidden pointer-events-none"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
                    style={{ backgroundImage: `url(${activeBrand.bannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layer */}
      <div className="z-10 flex h-full w-full p-8 md:p-12 relative">

        {/* Left: Brand Info & Status */}
        <div className="flex w-1/3 flex-col justify-between h-full pt-12 pb-8">
            <div className="space-y-8">
                <AnimatePresence mode="wait">
                    {activeBrand && (
                        <motion.div
                            key={activeBrand.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <h1 className="text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
                                {activeBrand.name}
                            </h1>
                            <p className={`mt-6 max-w-md text-sm leading-relaxed text-[#D4AF37]/80 ${spaceGrotesk.className}`}>
                                {activeBrand.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Price Tag */}
                <AnimatePresence mode="wait">
                    {selectedItem && (
                        <motion.div
                            key={selectedItem.id + "price"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-baseline gap-3"
                        >
                            <span className="text-5xl font-light text-white drop-shadow-lg">{formatPrice(selectedItem.price)}</span>
                            <span className={`text-xs uppercase tracking-widest text-[#D4AF37]/60 ${spaceGrotesk.className}`}>USD</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Loading / Status State */}
            <div className="h-20 w-full flex items-center">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative h-16 w-16"
                        >
                            {/* Thin gold line tracing a box */}
                            <svg className="h-full w-full" viewBox="0 0 100 100">
                                <motion.rect
                                    x="2" y="2" width="96" height="96"
                                    fill="none"
                                    stroke="#D4AF37"
                                    strokeWidth="1"
                                    strokeDasharray="400"
                                    strokeDashoffset="400"
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-[8px] uppercase tracking-widest text-white ${spaceGrotesk.className}`}>Fitting</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="fit-status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-px w-12 bg-[#D4AF37]/50" />
                            <span className={`text-[10px] uppercase tracking-widest text-[#D4AF37] ${spaceGrotesk.className}`}>
                                Ready to Wear
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Center: Main Viewport (Spacer) */}
        <div className="flex-1"></div>

        {/* Right: Product Selector (Masonry) */}
        <div className="flex w-[320px] flex-col h-full relative">
             {/* Gradient Mask for Scroll */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            <div className="h-full overflow-y-auto pr-4 scrollbar-hide py-20">
                <div className="flex flex-col gap-8">
                    {displayItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            layoutId={`product-${item.id}`}
                            onClick={() => setSelectedItem(item)}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group cursor-pointer relative aspect-[3/4] w-full overflow-hidden rounded-sm transition-all duration-700 ${
                                selectedItem?.id === item.id
                                ? "opacity-100 scale-100"
                                : "opacity-50 hover:opacity-100 hover:scale-[1.02]"
                            }`}
                        >
                            {/* Product Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.imageUrl})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            {/* Selection Border */}
                            {selectedItem?.id === item.id && (
                                <motion.div
                                    layoutId="activeBorder"
                                    className="absolute inset-0 border-[1px] border-[#D4AF37]"
                                    transition={{ duration: 0.5 }}
                                />
                            )}

                            <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-white truncate mb-1">{item.name}</p>
                                <p className={`text-[10px] text-[#D4AF37] ${spaceGrotesk.className}`}>{formatPrice(item.price)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute bottom-8 left-12 z-20 flex items-center gap-4 text-[10px] font-light tracking-[0.2em] text-white/30">
        <span>EST. 2025</span>
        <div className="h-px w-12 bg-white/20"></div>
        <span>MASTERPIECE ENGINE</span>
        <div className="h-px w-12 bg-white/20"></div>
        <span>LUXURY MODE</span>
      </div>

    </div>
  );
}
