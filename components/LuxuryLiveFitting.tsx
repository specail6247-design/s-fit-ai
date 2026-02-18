"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import GoldRingCursor from "./GoldRingCursor";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Mock Data
const BRANDS = {
  GUCCI: {
    name: "GUCCI",
    description: "Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship.",
    banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000",
  },
  PRADA: {
    name: "PRADA",
    description: "Thinking fashion since 1913. Prada represents the best of Italian culture and tradition.",
    banner: "https://images.unsplash.com/photo-1550614000-4b9519e02a9e?auto=format&fit=crop&q=80&w=1000",
  },
};

const PRODUCTS = [
  { id: 1, name: "Aura Blazer", brand: "GUCCI", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
  { id: 2, name: "Silk Gown", brand: "GUCCI", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { id: 3, name: "Moto Jacket", brand: "PRADA", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { id: 4, name: "Tech Coat", brand: "PRADA", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

const LuxuryLoader = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
    <div className="relative size-24">
       {/* Gold line tracing animation */}
       <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
         <motion.rect
            x="2" y="2" width="96" height="96"
            fill="transparent"
            stroke="#D4AF37"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
         />
       </svg>
       <div className="flex h-full items-center justify-center">
         <span className={`text-xs font-bold tracking-widest text-[#D4AF37] ${cinzel.className}`}>LOADING</span>
       </div>
    </div>
  </div>
);

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrandKey, setSelectedBrandKey] = useState<keyof typeof BRANDS>("GUCCI");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const currentBrand = BRANDS[selectedBrandKey];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${playfair.className}`}>
      <GoldRingCursor />

      <AnimatePresence>
        {isLoading && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <LuxuryLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Visual / Distortion Background */}
      <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion image={selectedProduct.img} />
          {/* Dark Overlay for UI legibility */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Scanning Effect Overlay */}
      <div
          className="pointer-events-none absolute top-[40%] z-0 h-[1px] w-full opacity-30 mix-blend-screen"
          style={{
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 30px #D4AF37"
          }}
      ></div>

      {/* Top Navigation Bar */}
      <div className="z-10 flex items-center justify-between p-8">
        <button className="group flex size-14 items-center justify-center rounded-full transition-all duration-700 active:scale-95 hover:border-[#D4AF37]" style={{ background: "rgba(16, 25, 34, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <span className="material-symbols-outlined text-white transition-colors duration-500 group-hover:text-[#D4AF37]">close</span>
        </button>

        <div className="flex items-center gap-4">
            <h2 className={`text-2xl font-bold tracking-[0.2em] uppercase text-white ${cinzel.className}`}>
                {currentBrand.name} <span className="text-[#D4AF37] mx-2">/</span> COLLECTION
            </h2>
        </div>

        <button className="group flex size-14 items-center justify-center rounded-full transition-all duration-700 active:scale-95 hover:border-[#D4AF37]" style={{ background: "rgba(16, 25, 34, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <span className="material-symbols-outlined text-white transition-colors duration-500 group-hover:text-[#D4AF37]">shopping_bag</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="z-10 grid h-full grid-cols-12 gap-6 p-8 pt-0">

        {/* Left Side: Controls & Info */}
        <div className="col-span-3 flex flex-col justify-end gap-8 pb-12">
            {/* Brand Info Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-4 rounded-sm border-l-2 border-[#D4AF37] bg-black/40 p-6 backdrop-blur-md"
            >
                <h3 className={`text-xl font-bold text-[#D4AF37] ${cinzel.className}`}>{currentBrand.name}</h3>
                <p className="text-sm font-light leading-relaxed text-white/80">
                    {currentBrand.description}
                </p>
            </motion.div>

            {/* Stability Indicator */}
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    <span>Tracking Stability</span>
                    <span>100%</span>
                </div>
                <div className="h-[1px] w-full bg-white/20">
                    <motion.div
                        className="h-full bg-[#D4AF37]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                    />
                </div>
            </div>
        </div>

        {/* Center: Camera / Fit Area (Visuals handled by background) */}
        <div className="col-span-6 flex flex-col justify-end items-center pb-12">
             <div className="relative flex items-center justify-center group">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4AF37]/10 blur-3xl transition-opacity duration-1000 group-hover:bg-[#D4AF37]/20"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-black/40 transition-transform duration-700 active:scale-95 hover:scale-105 backdrop-blur-sm">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/80">
                  <span className="material-symbols-outlined text-4xl text-[#D4AF37]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className={`text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] ${cinzel.className}`}>Capture</span>
              </div>
            </div>
        </div>

        {/* Right Side: Product Sidebar */}
        <div className="col-span-3 flex flex-col gap-6 overflow-hidden pb-12">
            <h3 className={`text-right text-sm font-bold uppercase tracking-widest text-white/50 ${cinzel.className}`}>Select Item</h3>

            <div className="flex flex-1 flex-col gap-8 overflow-y-auto scrollbar-hide pr-2">
                {PRODUCTS.map((product) => (
                    <motion.div
                        key={product.id}
                        layoutId={`product-${product.id}`}
                        onClick={() => setSelectedProduct(product)}
                        className={`group relative flex cursor-pointer flex-col gap-3 rounded-sm p-4 transition-all duration-700 ${selectedProduct.id === product.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.img}
                                alt={product.name}
                                className={`h-full w-full object-cover transition-transform duration-1000 ${selectedProduct.id === product.id ? 'scale-110 grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

                            {selectedProduct.id === product.id && (
                                <div className="absolute bottom-4 left-4">
                                     <span className="material-symbols-outlined text-[#D4AF37]">check_circle</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <h4 className={`text-lg font-bold uppercase text-white ${cinzel.className}`}>{product.name}</h4>
                            <p className="text-sm font-medium text-[#D4AF37]">{formatPrice(product.price)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>

      {/* System UI Safe Area */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 rounded-full bg-white/10"></div>
    </div>
  );
}
