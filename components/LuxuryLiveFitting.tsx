"use client";

import React, { useEffect, useState } from "react";
import { Cinzel, Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Custom cursor tracking
    const cursor = document.getElementById("luxury-cursor");
    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${inter.className}`}>

      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-cursor"
        className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ecab13] bg-transparent opacity-70 transition-transform duration-100 ease-out"
        style={{ mixBlendMode: 'difference' }}
      ></div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              <motion.svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <motion.rect
                  x="10" y="10" width="80" height="80"
                  fill="none"
                  stroke="#ecab13"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
              <span className={`text-[#ecab13] text-xs uppercase tracking-[0.3em] ${cinzel.className}`}>S_FIT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        <LuxuryImageDistortion
          imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          altText="User reflection with AR luxury garment overlay"
        />

        {/* Brand Banner Experience (Parallax effect simulated via Framer Motion in LuxuryImageDistortion, here we just show the brand) */}
        <div className="absolute top-[20%] w-full z-10 flex flex-col items-center justify-center opacity-80 pointer-events-none">
          <h1 className={`text-5xl font-extralight tracking-widest text-[#ecab13] mix-blend-plus-lighter ${cinzel.className}`}>
            AURA
          </h1>
          <p className="mt-4 max-w-md text-center text-xs font-light tracking-[0.2em] text-white/70">
            Aura transcends conventional design, blending high-twist Italian silk with microscopic metallic particles for an unparalleled luminescent finish.
          </p>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <button className="flex size-12 items-center justify-center rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700 outline-none focus-visible:ring-2 focus-visible:ring-[#ecab13]" aria-label="Close">
            <span className="material-symbols-outlined text-white">close</span>
          </button>
          <div className="flex items-center gap-3 rounded-full px-6 py-2 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10">
            <div className="size-1.5 animate-pulse rounded-full bg-[#ecab13]"></div>
            <h2 className={`text-sm font-bold tracking-[0.2em] uppercase text-white ${cinzel.className}`}>Luxury Fit AI</h2>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-700 outline-none focus-visible:ring-2 focus-visible:ring-[#ecab13]" aria-label="Flash">
            <span className="material-symbols-outlined text-white">flash_on</span>
          </button>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10">
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className={`text-xs uppercase tracking-[0.2em] text-white/80 ${cinzel.className}`}>Body Tracking</p>
                <p className="text-xs font-light text-[#ecab13]">95%</p>
              </div>
              <div className="h-0.5 w-full overflow-hidden bg-white/10">
                <div className="h-full bg-[#ecab13] transition-all duration-1000 ease-out" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[10px]">target</span>
                Spatial Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-4">
          <div className="flex min-w-[120px] flex-col gap-1 border-r-2 border-[#ecab13] bg-[#0a0a0a]/60 p-4 backdrop-blur-md">
            <p className="text-[9px] uppercase tracking-widest text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl text-white ${cinzel.className}`}>98%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 border-r-2 border-[#ecab13] bg-[#0a0a0a]/60 p-4 backdrop-blur-md">
            <p className="text-[9px] uppercase tracking-widest text-white/60">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl text-white ${cinzel.className}`}>94%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 border-r-2 border-[#ecab13] bg-[#0a0a0a]/60 p-4 backdrop-blur-md">
            <p className="text-[9px] uppercase tracking-widest text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl text-[#ecab13] ${cinzel.className}`}>100%</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel (Vertical/Masonry style aspect ratios) */}
          <div className="flex overflow-x-auto px-4 py-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div className="group flex min-w-[140px] flex-col gap-3 p-2 transition-all duration-700">
                <div
                  className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat border border-[#ecab13] shadow-[0_0_15px_rgba(236,171,19,0.3)] transition-all duration-700 group-hover:scale-[1.02]"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-1 flex flex-col items-center">
                  <p className={`text-[10px] uppercase tracking-widest text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-[10px] text-[#ecab13] tracking-widest mt-1">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="group flex min-w-[140px] flex-col gap-3 p-2 opacity-60 hover:opacity-100 transition-all duration-700">
                    <div
                    className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat border border-white/20 transition-all duration-700 group-hover:border-[#ecab13] group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-1 flex flex-col items-center">
                      <p className={`text-[10px] uppercase tracking-widest text-white ${cinzel.className}`}>{item.name}</p>
                      <p className="text-[10px] text-white/50 tracking-widest mt-1 transition-colors duration-700 group-hover:text-[#ecab13]">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-4 mt-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 text-white hover:border-[#ecab13]/50 transition-colors duration-700 outline-none focus-visible:ring-2 focus-visible:ring-[#ecab13]" aria-label="Photo Library">
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/20 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-[#0a0a0a] transition-transform duration-700 hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Capture">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#ecab13]/10">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className={`text-[9px] uppercase tracking-[0.4em] text-[#ecab13] ${cinzel.className}`}>Capture</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 text-white hover:border-[#ecab13]/50 transition-colors duration-700 outline-none focus-visible:ring-2 focus-visible:ring-[#ecab13]" aria-label="Refresh">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 bg-white/20"></div>
      </div>
    </div>
  );
}
