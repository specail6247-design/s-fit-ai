"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const cinzel = Cinzel({ subsets: ["latin"] });

// Mock LuxuryImageDistortion Component
function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string; alt?: string }) {
  return (
    <div className="relative overflow-hidden group w-full h-full rounded-xl">
      <motion.img
        src={imageUrl}
        alt={alt || "Luxury Item"}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}

// Loading Animation Component
function LuxuryLoading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-md">
      <div className="relative w-32 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
          <motion.rect
            x="5" y="5" width="90" height="110"
            stroke="#d4af37"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-[#d4af37] text-xs uppercase tracking-widest font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading
        </motion.div>
      </div>
    </div>
  );
}


export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand] = useState("GUCCI");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white dark:bg-[#050505] ${cinzel.className}`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#d4af37] pointer-events-none z-[100] transition-transform duration-75 ease-out"
        style={{ mixBlendMode: 'difference' }}
      />

      <AnimatePresence>
        {isLoading && <LuxuryLoading key="loading" />}
      </AnimatePresence>

      {/* Main Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with luxury garment"
      >
        <div className="absolute inset-0 z-0">
           <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {/* Brand Banner Parallax */}
        <motion.div
           className="absolute top-[15%] left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-md text-center pointer-events-none"
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
        >
           <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white/90" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{selectedBrand}</h1>
           <p className="mt-2 text-sm tracking-widest text-[#d4af37] uppercase">The Fall Collection</p>
        </motion.div>

        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                boxShadow: "0 0 15px #d4af37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#d4af37]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#d4af37]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#d4af37]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-4 py-8 scrollbar-hide space-x-6" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <motion.div
                className="flex w-40 flex-col gap-3 p-2 bg-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div
                  className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat shadow-2xl"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-1 text-center">
                  <p className="truncate text-xs font-bold uppercase tracking-widest text-white">Aura Blazer</p>
                  <p className="text-xs font-medium text-[#d4af37] mt-1">$2,400</p>
                </div>
              </motion.div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex w-40 flex-col gap-3 p-2 bg-transparent opacity-70 hover:opacity-100 transition-opacity duration-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div
                    className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat shadow-xl grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-1 text-center">
                    <p className="truncate text-xs font-bold uppercase tracking-widest text-white">{item.name}</p>
                    <p className="text-xs font-medium text-white/70 mt-1">{item.price}</p>
                    </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#d4af37] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
