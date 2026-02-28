"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock Brand Data
const BRAND_DETAILS: Record<string, { bannerImage: string, description: string }> = {
  Gucci: {
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000",
    description: "Florence, 1921. Redefining modern luxury."
  },
  Chanel: {
    bannerImage: "https://images.unsplash.com/photo-1550596334-7bb40a71b6ba?auto=format&fit=crop&q=80&w=2000",
    description: "Elegance is refusal."
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState("Gucci");
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentBrand = BRAND_DETAILS[selectedBrand];

  if (isLoading) {
    return (
      <div className={`flex h-screen w-full items-center justify-center bg-black ${spaceGrotesk.className}`}>
        <div className="relative flex flex-col items-center">
          <div className="h-16 w-16 relative">
            {/* Sophisticated Gold Line Tracing Box Loading Animation */}
            <motion.div
              className="absolute inset-0 border border-transparent"
              style={{
                borderImage: "linear-gradient(to right, #d4af37, transparent) 1",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
               className="absolute inset-2 border border-[#d4af37]/30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-[#d4af37] text-2xl ${playfair.className}`}>S</span>
            </div>
          </div>
          <motion.p
            className="mt-6 text-[#d4af37] text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            Preparing Masterpiece
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className} cursor-none`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-[#d4af37]"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-[#d4af37]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 28,
          mass: 0.1
        }}
      />

      {/* Background Brand Experience */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={selectedBrand}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center grayscale mix-blend-overlay opacity-30"
          style={{ backgroundImage: `url('${currentBrand.bannerImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full flex-col px-8 py-10">

        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-700 hover:border-[#d4af37]">
            <span className="material-symbols-outlined text-white">close</span>
          </button>

          <div className="flex flex-col items-center">
             <h1 className={`text-3xl text-[#d4af37] ${playfair.className} tracking-wider`}>
               {selectedBrand}
             </h1>
             <p className="text-xs tracking-[0.2em] text-white/50 uppercase mt-2">
               {currentBrand.description}
             </p>
          </div>

          <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-700 hover:border-[#d4af37]">
            <span className="material-symbols-outlined text-white">tune</span>
          </button>
        </div>

        {/* Central Display - Product Visual */}
        <div className="flex-1 flex items-center justify-center relative">
           <motion.div
             className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden"
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.2 }}
           >

              <LuxuryImageDistortion className="absolute inset-0 z-0" imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format\&fit=crop\&q=80\&w=1000" isHovered={true} />
              {/* <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                alt="Main Product Visual"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 filter saturate-90 contrast-125"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
           </motion.div>
        </div>

        {/* Bottom Section - Larger, Masonry/Vertical Style Cards */}
        <div className="mt-auto">
          <h3 className={`text-xl mb-6 text-white/80 ${playfair.className} italic`}>Curated Selection</h3>

          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
            {[
              { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
              { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col min-w-[200px] gap-4 snap-center cursor-pointer group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (i * 0.1) }}
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/10 transition-all duration-700 group-hover:border-[#d4af37]">

              <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <p className={`text-sm tracking-wide text-white group-hover:text-[#d4af37] transition-colors duration-700 ${playfair.className}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-white/50 tracking-wider">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capture / Action Controls */}
          <div className="flex items-center justify-center gap-12 mt-8 py-4 border-t border-white/10">
             <button className="text-white/50 hover:text-white transition-colors duration-700">
               <span className="material-symbols-outlined text-2xl">favorite_border</span>
             </button>

             <button className="relative group">
                <div className="absolute inset-0 rounded-full border border-[#d4af37] scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125" />
                <div className="w-16 h-16 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-700 group-hover:scale-95">
                  <span className="material-symbols-outlined text-3xl">checkroom</span>
                </div>
             </button>

             <button className="text-white/50 hover:text-white transition-colors duration-700">
               <span className="material-symbols-outlined text-2xl">share</span>
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
