"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Custom Cursor from Prompt 1.5
function GoldRingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') !== null ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('.cursor-interact') !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#ecab13] mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 24 : 16),
        y: position.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? "rgba(236, 171, 19, 0.1)" : "transparent",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
}

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, ] = useState("S_FIT AI");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Format price
  const formatPrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const garments = [
    { name: "Silk Gown", price: "3100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: "1800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Tech Coat", price: "4500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      <GoldRingCursor />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative w-48 h-64 border border-[#ecab13]/20 overflow-hidden flex items-center justify-center">
               <motion.div
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
                 className="absolute inset-0"
               >
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.rect
                      x="0" y="0" width="100" height="100"
                      fill="none"
                      stroke="#ecab13"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                 </svg>
               </motion.div>
               <h1 className={`${cinzel.className} text-[#ecab13] text-2xl tracking-widest uppercase`}>S_FIT</h1>
            </div>
            <p className="mt-8 text-[#ecab13]/60 text-xs tracking-[0.3em] uppercase animate-pulse">Initializing Masterpiece...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Luxury Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Main Background with LuxuryImageDistortion */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {/* Top Navigation Bar - Gold/Black/Serif Theme */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 hover:border-[#ecab13]/30 transition-all duration-700">
            <span className="material-symbols-outlined text-white">close</span>
          </button>
          <div className="flex flex-col items-center gap-1">
            <h2 className={`${cinzel.className} text-xl font-bold tracking-[0.2em] uppercase text-[#ecab13]`}>{selectedBrand}</h2>
            <div className="flex items-center gap-2">
              <div className="size-1.5 animate-pulse rounded-full bg-[#ecab13]"></div>
              <span className="text-[10px] tracking-widest uppercase text-white/50">Atelier Live</span>
            </div>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 hover:border-[#ecab13]/30 transition-all duration-700">
            <span className="material-symbols-outlined text-white">tune</span>
          </button>
        </div>

        {/* Brand Parallax Banner Area */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="z-10 px-8 mt-4"
        >
          <p className="text-white/70 text-sm max-w-sm font-light leading-relaxed">
            Experience the exclusive collection with S_FIT AI&apos;s hyper-realistic simulation. Every thread rendered in pure cinematic quality.
          </p>
        </motion.div>

        {/* Floating Fit Stats (Minimalist) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[10px] uppercase tracking-widest text-[#ecab13]">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className={`${cinzel.className} text-2xl font-light`}>98%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[10px] uppercase tracking-widest text-[#ecab13]">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className={`${cinzel.className} text-2xl font-light`}>100%</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section - Masonry/Vertical Style Cards */}
        <div className="mt-auto z-10 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-12 px-8">
          <div className="flex items-end justify-between mb-8">
            <h3 className={`${cinzel.className} text-3xl font-light text-white`}>The Collection</h3>
          </div>

          {/* Garment Cards - Larger, more spaced out */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory">

            {/* Featured Item */}
            <div className="flex-none w-64 snap-center cursor-interact group">
              <div className="aspect-[3/4] w-full rounded-sm overflow-hidden relative border border-white/10 group-hover:border-[#ecab13]/50 transition-colors duration-1000">
                <Image fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" alt="Aura Blazer" unoptimized className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                    <p className="text-[10px] tracking-widest uppercase text-[#ecab13]">Featured</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <p className={`${cinzel.className} text-lg text-white group-hover:text-[#ecab13] transition-colors duration-700`}>Aura Blazer</p>
                <p className="text-sm font-light text-white/70">{formatPrice("2400")}</p>
              </div>
            </div>

            {/* Other Items */}
            {garments.map((item, i) => (
              <div key={i} className="flex-none w-56 snap-center cursor-interact group opacity-70 hover:opacity-100 transition-opacity duration-700">
                <div className="aspect-[3/4] w-full rounded-sm overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-colors duration-1000">
                  <Image fill src={item.img} alt={item.name} unoptimized className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <p className={`${cinzel.className} text-base text-white`}>{item.name}</p>
                  <p className="text-xs font-light text-white/50">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Capture Controls - Redesigned for Luxury */}
          <div className="flex items-center justify-center gap-12 mt-8">
            <button className="flex size-12 items-center justify-center text-white/50 hover:text-white transition-colors duration-700 cursor-interact">
              <span className="material-symbols-outlined font-light text-2xl">photo_library</span>
            </button>

            <button className="relative flex size-20 items-center justify-center rounded-full border border-[#ecab13] bg-transparent group cursor-interact overflow-hidden">
                <div className="absolute inset-0 bg-[#ecab13] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                <span className="material-symbols-outlined text-3xl text-[#ecab13] group-hover:text-black z-10 transition-colors duration-700 font-light">camera</span>
            </button>

            <button className="flex size-12 items-center justify-center text-white/50 hover:text-white transition-colors duration-700 cursor-interact">
              <span className="material-symbols-outlined font-light text-2xl">autorenew</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
