"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

// Mock data for luxury items (can be replaced with real data import)
const LUXURY_ITEMS = [
  {
    id: 1,
    name: "Royal Velvet Gown",
    price: 12500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0",
    brand: "Gucci",
    description: "A masterpiece of Italian craftsmanship, featuring hand-stitched velvet and gold embroidery."
  },
  {
    id: 2,
    name: "Obsidian Silk Suit",
    price: 8900,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA",
    brand: "Armani",
    description: "Tailored to perfection, this silk suit embodies modern elegance and timeless style."
  },
  {
    id: 3,
    name: "Ethereal Trench",
    price: 4500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk",
    brand: "Burberry",
    description: "The classic trench reimagined with future-forward materials and a distinct silhouette."
  },
];

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(LUXURY_ITEMS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#f5f5f5] cursor-none ${playfair.className}`}>
      <CustomCursor />

      {/* Background/Main Visual with Distortion */}
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion imageUrl={selectedItem.img} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="relative h-32 w-32">
              <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="283" strokeDashoffset="75" className="opacity-50" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl text-[#D4AF37] ${cinzel.className}`}>L</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <div className="relative z-10 flex h-full w-full">

        {/* Left Panel: Brand & Details */}
        <div className="flex w-1/3 flex-col justify-center p-12 pl-24 space-y-8">
            <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-6"
            >
                {/* Brand Header */}
                <div className="border-l-2 border-[#D4AF37] pl-6">
                    <h3 className={`text-lg uppercase tracking-[0.2em] text-[#D4AF37] ${cinzel.className}`}>
                        {selectedItem.brand}
                    </h3>
                    <h1 className={`mt-2 text-6xl font-medium leading-tight text-white ${playfair.className}`}>
                        {selectedItem.name}
                    </h1>
                </div>

                {/* Description */}
                <p className="max-w-md text-lg leading-relaxed text-white/70 font-light">
                    {selectedItem.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-4 pt-4">
                    <span className={`text-4xl text-[#D4AF37] ${cinzel.className}`}>
                        {formatPrice(selectedItem.price)}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-white/40">
                        Excl. Tax
                    </span>
                </div>

                {/* CTA Button */}
                <button className="group mt-8 flex items-center gap-4 border border-[#D4AF37] px-8 py-4 text-[#D4AF37] transition-all duration-700 hover:bg-[#D4AF37] hover:text-black">
                    <span className={`text-sm uppercase tracking-[0.2em] ${cinzel.className}`}>
                        Fitting Room
                    </span>
                    <span className="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-2">
                        arrow_forward
                    </span>
                </button>
            </motion.div>
        </div>

        {/* Right Panel: Collection Selector (Vertical Masonry feel) */}
        <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black via-black/90 to-transparent p-8 pr-12 flex flex-col justify-center">
            <div className="flex flex-col gap-8 overflow-y-auto scrollbar-hide py-20 pr-4">
                {LUXURY_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative cursor-pointer overflow-hidden transition-all duration-700 ${
                            selectedItem.id === item.id
                            ? "h-64 border-[#D4AF37] opacity-100 scale-105"
                            : "h-40 border-white/10 opacity-50 hover:opacity-80"
                        } border border-opacity-20`}
                    >
                        {/* Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.img})` }}
                        />

                        {/* Overlay */}
                        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${selectedItem.id === item.id ? 'opacity-0' : 'opacity-60'}`} />

                        {/* Label (Only visible on active or hover) */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4">
                            <p className={`text-xs uppercase tracking-widest text-[#D4AF37] ${cinzel.className}`}>
                                {item.brand}
                            </p>
                            <p className="text-sm font-medium text-white">
                                {item.name}
                            </p>
                        </div>

                        {/* Selection Indicator */}
                        {selectedItem.id === item.id && (
                            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Navigation / HUD Elements */}
        <div className="absolute top-8 left-12 right-12 flex justify-between items-center z-20">
            <div className={`text-xl font-bold tracking-widest text-white ${cinzel.className}`}>
                S_FIT <span className="text-[#D4AF37]">LUXE</span>
            </div>
            <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-white/50">
                <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">New Arrivals</span>
                <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300 text-[#D4AF37]">Collection</span>
                <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Runway</span>
            </div>
        </div>

      </div>
    </div>
  );
}
