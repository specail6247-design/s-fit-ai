"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [selectedBrand] = useState<string | null>("S_FIT AI");
  const [isLoading, setIsLoading] = useState(true);

  // Gold Ring Custom Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const items = [
    { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Gold Ring Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-[#ecab13] mix-blend-difference"
        animate={{
          x: cursorPos.x - 4,
          y: cursorPos.y - 4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.1 }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative h-40 w-40">
              <motion.div
                className="absolute inset-0 border border-[#ecab13]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                style={{ borderRadius: "10%" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-light tracking-widest text-[#ecab13] ${cinzel.className}`}>
                  LOADING
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        <LuxuryImageDistortion
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          alt="User reflection with AR garment overlay"
          className="absolute inset-0 z-0 h-full w-full"
        />

        {/* Brand Banner Parallax */}
        <AnimatePresence>
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-24 z-10 w-full px-6 text-center"
            >
              <h1 className={`text-3xl font-bold tracking-widest text-white drop-shadow-lg ${cinzel.className}`}>
                {selectedBrand}
              </h1>
              <p className="mt-2 text-xs font-light tracking-widest text-[#ecab13] drop-shadow-md">
                AUTUMN/WINTER COLLECTION
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-colors duration-700">
            <span className="material-symbols-outlined font-light">close</span>
          </button>
          <div className="flex items-center gap-3 rounded-full bg-black/40 px-6 py-2.5 backdrop-blur-xl border border-[#ecab13]/30">
            <div className="size-2 rounded-full bg-[#ecab13] shadow-[0_0_10px_#ecab13]"></div>
            <h2 className={`text-sm tracking-[0.2em] uppercase text-white ${cinzel.className}`}>Luxury Fit</h2>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-colors duration-700">
            <span className="material-symbols-outlined font-light">tune</span>
          </button>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/3 z-10 flex flex-col gap-4">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl bg-black/40 p-4 backdrop-blur-xl border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-1000">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Shoulder</p>
            <div className="flex items-baseline justify-between">
              <span className={`text-2xl text-white ${cinzel.className}`}>98%</span>
              <span className="text-[10px] font-bold text-[#ecab13]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl bg-black/40 p-4 backdrop-blur-xl border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-1000">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Waist</p>
            <div className="flex items-baseline justify-between">
              <span className={`text-2xl text-white ${cinzel.className}`}>94%</span>
              <span className="text-[10px] font-bold text-[#ecab13]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl bg-black/40 p-4 backdrop-blur-xl border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-1000">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Hem Line</p>
            <div className="flex items-baseline justify-between">
              <span className={`text-2xl text-white ${cinzel.className}`}>100%</span>
              <span className="material-symbols-outlined text-[16px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10">
          {/* Garment Carousel (Masonry/Vertical feel) */}
          <div className="flex overflow-x-auto px-6 py-6 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div className="group flex min-w-[160px] flex-col gap-3 rounded-2xl border border-[#ecab13]/50 bg-black/40 p-2 backdrop-blur-xl cursor-pointer hover:bg-black/60 transition-all duration-1000">
              <div
                className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden relative"
                data-alt="Luxury blue blazer thumbnail"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-1000"></div>
              </div>
              <div className="px-2 pb-2 flex flex-col items-center">
                <p className={`text-xs uppercase tracking-widest text-white ${cinzel.className}`}>Aura Blazer</p>
                <p className="text-xs font-light text-[#ecab13] mt-1">$12,400</p>
              </div>
            </div>

            {items.map((item, i) => (
              <div key={i} className="group flex min-w-[160px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl opacity-70 hover:opacity-100 cursor-pointer hover:border-[#ecab13]/30 transition-all duration-1000">
                  <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden relative"
                  style={{ backgroundImage: `url("${item.img}")` }}
                  >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-1000"></div>
                  </div>
                  <div className="px-2 pb-2 flex flex-col items-center">
                    <p className={`text-xs uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-1000 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-xs font-light text-white/50 group-hover:text-[#ecab13] mt-1 transition-colors duration-1000">{item.price}</p>
                  </div>
              </div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-6 mt-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 hover:scale-95 transition-all duration-700">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13]/50 bg-black/80 hover:bg-black hover:scale-95 transition-all duration-1000 shadow-[0_0_30px_rgba(236,171,19,0.2)] active:scale-90">
                <div className="flex size-20 items-center justify-center rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 hover:scale-95 transition-all duration-700">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
