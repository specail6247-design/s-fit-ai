"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";
import { motion } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock Brand Data
const LUXURY_BRANDS = [
  {
    id: "gucci",
    name: "GUCCI",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2000",
    description: "Florentine luxury redefined for the modern era."
  },
  {
    id: "prada",
    name: "PRADA",
    bannerImage: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=2000",
    description: "Avant-garde elegance and intellectual fashion."
  }
];

const GARMENTS = [
  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
  { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(LUXURY_BRANDS[0]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeGarment, setActiveGarment] = useState(GARMENTS[0]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [activeGarment]);

  // Custom cursor tracking
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className}`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] size-8 rounded-full border border-[#C9B037] mix-blend-difference"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />

      {/* Brand Banner with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${selectedBrand.bannerImage})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Top Navigation */}
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-[0.2em] text-[#C9B037]">S_FIT <span className="font-light text-white">LUXURY</span></h1>
          </div>

          {/* Brand Selector */}
          <div className="flex gap-6">
            {LUXURY_BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`text-sm tracking-[0.15em] transition-all duration-700 ${
                  selectedBrand.id === brand.id
                    ? 'text-[#C9B037] border-b border-[#C9B037] pb-1'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Description */}
        <motion.div
          key={selectedBrand.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="px-12 max-w-xl"
        >
          <p className="text-lg font-light text-white/70 italic">{selectedBrand.description}</p>
        </motion.div>

        {/* Central Display Area */}
        <div className="flex-1 flex px-12 py-8 gap-12">

          {/* Main Visual - Luxury Image Distortion */}
          <div className="relative w-2/3 h-full rounded-sm border border-white/10 overflow-hidden bg-black/50 backdrop-blur-sm">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Sophisticated Loading Animation: Thin gold line tracing a box */}
                <div className="relative w-16 h-16">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <rect
                      x="10" y="10" width="80" height="80"
                      fill="none"
                      stroke="#C9B037"
                      strokeWidth="1"
                      strokeDasharray="320"
                      strokeDashoffset="320"
                      className="animate-[dash_2s_ease-in-out_infinite]"
                    />
                  </svg>
                  <style>{`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `}</style>
                </div>
              </div>
            ) : (
              <LuxuryImageDistortion
                imageUrl={activeGarment.img}
                intensity={0.3}
              />
            )}

            {/* Overlay Info */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
              <div>
                <h2 className="text-4xl font-light mb-2">{activeGarment.name}</h2>
                <p className="text-[#C9B037] text-xl tracking-wider">{formatPrice(activeGarment.price)}</p>
              </div>
              <button className="pointer-events-auto px-8 py-3 bg-[#C9B037] text-black text-sm tracking-widest hover:bg-white transition-colors duration-700">
                TRY ON
              </button>
            </div>
          </div>

          {/* Masonry/Vertical Product List */}
          <div className="w-1/3 h-full overflow-y-auto scrollbar-hide flex flex-col gap-8 pr-4">
            {GARMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => {
                  setIsLoading(true);
                  setActiveGarment(item);
                }}
                className={`group cursor-pointer relative aspect-[3/4] w-full overflow-hidden border transition-all duration-1000 ${
                  activeGarment.name === item.name
                    ? 'border-[#C9B037] scale-[1.02]'
                    : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-lg font-light tracking-wide">{item.name}</p>
                  <p className="text-sm text-[#C9B037] mt-1">{formatPrice(item.price)}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
