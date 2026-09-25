"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { brands } from "@/data/mockData";
import { useStore } from "@/store/useStore";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const { selectedBrand } = useStore();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const brand = brands.find((b) => b.id === selectedBrand);

  useEffect(() => {
    // Simulate loading for the sophisticated animation
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className}`}
    >
      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none absolute z-50 rounded-full border border-[#D4AF37] transition-all duration-75 ease-out"
        style={{
          width: '32px',
          height: '32px',
          left: `${cursorPos.x - 16}px`,
          top: `${cursorPos.y - 16}px`,
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
        }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            {/* Sophisticated Loading Animation (thin gold line tracing a box) */}
            <div className="relative size-32">
              <motion.svg
                className="absolute inset-0 size-full"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Preparing</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">

        {/* Parallax Brand Banner Background (if selected) */}
        {brand && brand.bannerImage ? (
          <motion.div
             className="absolute inset-0 z-0 opacity-20"
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
             style={{
               backgroundImage: `url('${brand.bannerImage}')`,
               backgroundSize: "cover",
               backgroundPosition: "center"
             }}
          />
        ) : (
          <motion.div
             className="absolute inset-0 z-0 opacity-20"
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
             style={{
               backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')`,
               backgroundSize: "cover",
               backgroundPosition: "center"
             }}
          />
        )}

        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-60 z-10"
            style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 15px #D4AF37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]">
            <span className="material-symbols-outlined text-[#D4AF37] font-light">close</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37]">Live Fit AI</h2>
            {brand && (
                <p className={`text-[10px] tracking-[0.2em] text-[#D4AF37]/70 ${spaceGrotesk.className}`}>{brand.name} EXCLUSIVE</p>
            )}
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]">
            <span className="material-symbols-outlined text-[#D4AF37] font-light">tune</span>
          </div>
        </div>

        {/* Brand Experience Area */}
        {brand && (
          <div className="z-10 mt-6 px-8 text-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 1 }}
             >
               <h1 className="text-3xl font-light tracking-[0.1em] text-[#D4AF37]">The {brand.name} Collection</h1>
               {brand.description && (
                 <p className={`mt-2 text-xs uppercase tracking-widest text-[#D4AF37]/60 max-w-md mx-auto ${spaceGrotesk.className}`}>
                   {brand.description}
                 </p>
               )}
             </motion.div>
          </div>
        )}

        {/* Floating Fit Stats Sidebar (Right) - Luxury Styling */}
        <div className={`absolute right-8 top-1/3 z-10 flex flex-col gap-6 ${spaceGrotesk.className}`}>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-sm border border-[#D4AF37]/20 bg-black/40 p-4 backdrop-blur-xl"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60">Shoulder Drape</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-light text-[#D4AF37] ${cinzel.className}`}>98%</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.7 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-sm border border-[#D4AF37]/20 bg-black/40 p-4 backdrop-blur-xl"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60">Waist Contour</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-light text-[#D4AF37] ${cinzel.className}`}>94%</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-sm border border-[#D4AF37]/20 bg-black/40 p-4 backdrop-blur-xl"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-light text-[#D4AF37] ${cinzel.className}`}>Perfect</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 px-8">
          {/* Garment Carousel - Masonry/Vertical Layout Style (but horizontal scroll) */}
          <div className="flex overflow-x-auto py-8 gap-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>

            {/* Main Selected Product */}
            <motion.div
              className="flex min-w-[200px] flex-col gap-4 rounded-sm border border-[#D4AF37] bg-[#D4AF37]/5 p-2 backdrop-blur-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[3/4] w-full rounded-sm overflow-hidden">
                 <LuxuryImageDistortion imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" />
              </div>
              <div className="px-2 pb-2 text-center">
                <p className="text-sm font-light tracking-widest uppercase text-white">Aura Blazer</p>
                <p className={`mt-1 text-xs tracking-widest text-[#D4AF37] ${spaceGrotesk.className}`}>$2,400</p>
              </div>
            </motion.div>

            {[
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex min-w-[160px] flex-col gap-3 rounded-sm border border-white/10 bg-black/40 p-2 backdrop-blur-xl opacity-60 transition-all duration-700 hover:opacity-100 hover:border-[#D4AF37]/50"
                whileHover={{ scale: 1.05 }}
              >
                  <div className="aspect-[3/4] w-full rounded-sm overflow-hidden">
                     <LuxuryImageDistortion imageUrl={item.img} />
                  </div>
                  <div className="px-2 pb-1 text-center">
                  <p className="text-xs font-light tracking-widest uppercase text-white/80">{item.name}</p>
                  <p className={`mt-1 text-[10px] tracking-widest text-[#D4AF37]/80 ${spaceGrotesk.className}`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                  </p>
                  </div>
              </motion.div>
            ))}
          </div>

          {/* Capture Controls - Elegant */}
          <div className="mt-8 flex items-center justify-center gap-12">
            <button className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#D4AF37] hover:text-[#D4AF37]">
              <span className="material-symbols-outlined font-light text-xl">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4AF37]/20 blur-2xl"></div>
              <button className="relative flex size-24 items-center justify-center rounded-full border-[1px] border-[#D4AF37] bg-transparent transition-all duration-1000 hover:bg-[#D4AF37]/10">
                <div className="flex size-20 items-center justify-center rounded-full border-[0.5px] border-[#D4AF37]/50 bg-black/80">
                  <span className="material-symbols-outlined text-4xl text-[#D4AF37] font-light">camera_alt</span>
                </div>
              </button>
            </div>
            <button className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#D4AF37] hover:text-[#D4AF37]">
              <span className="material-symbols-outlined font-light text-xl">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
