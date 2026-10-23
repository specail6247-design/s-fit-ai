"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryCursor } from "./ui/LuxuryCursor";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for the sophisticated animation
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${inter.className}`}>
      <LuxuryCursor />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]"
          >
            <div className="relative w-40 h-40">
              {/* Thin gold line tracing a box */}
              <motion.div
                className="absolute inset-0 border border-[#d4af37]"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" }}
                animate={{ clipPath: ["polygon(0 0, 0 0, 0 0, 0 0)", "polygon(0 0, 100% 0, 100% 0, 0 0)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"] }}
                transition={{ duration: 2, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" // fallback
                }}
              />
              {/* Better tracing effect */}
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-[#d4af37]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
              <motion.div
                className="absolute top-0 right-0 w-[1px] bg-[#d4af37]"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5, ease: "linear", delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-[1px] bg-[#d4af37]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "linear", delay: 1.0 }}
                style={{ originX: 1 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-[1px] bg-[#d4af37]"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5, ease: "linear", delay: 1.5 }}
                style={{ originY: 1 }}
              />

              <div className={`absolute inset-0 flex items-center justify-center ${cinzel.className}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-[#d4af37] text-sm tracking-[0.3em] uppercase"
                >
                  S_Fit
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Luxury Gold Scanning Effect Overlay */}
        <motion.div
            animate={{ top: ["20%", "80%", "20%"] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="absolute w-full h-[1px] opacity-40"
            style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                boxShadow: "0 0 20px #d4af37"
            }}
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <button className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-[#d4af37]/20" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-[#d4af37] font-light">close</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="size-1.5 animate-pulse rounded-full bg-[#d4af37]"></div>
            <h2 className={`text-xs font-light tracking-[0.4em] uppercase text-[#d4af37] ${cinzel.className}`}>Atelier Fit</h2>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-[#d4af37]/20" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-[#d4af37] font-light">tune</span>
          </button>
        </div>

        {/* Brand Experience Area */}
        <div className="px-8 mt-4 z-10 flex justify-between items-start pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex flex-col gap-2 max-w-sm pointer-events-auto"
          >
            <h1 className={`text-3xl font-light text-[#d4af37] tracking-wider ${cinzel.className}`}>MAISON S_FIT</h1>
            <p className="text-xs font-light tracking-widest uppercase text-white/60 leading-relaxed">
              Exquisite tailoring meets AI precision. Experience the autumn collection in real-time, rendered with immaculate physical accuracy.
            </p>
          </motion.div>

          {/* Fit Stats Sidebar (Right) - Luxury style */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.7 }}
            className="flex flex-col gap-4 pointer-events-auto"
          >
            {[
              { label: "Drape", value: "98%", status: "Perfect" },
              { label: "Tension", value: "Optimal", status: "Verified" },
              { label: "Silhouette", value: "Match", status: "Aligned" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-end gap-1">
                <p className="text-[9px] font-light uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg font-light ${cinzel.className} text-[#d4af37]`}>{stat.value}</span>
                  <span className="text-[8px] font-light uppercase tracking-widest text-white/60">{stat.status}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right-aligned Vertical Garment Gallery */}
        <div className="absolute right-8 top-1/3 bottom-32 z-20 flex flex-col gap-8 overflow-y-auto no-scrollbar pointer-events-auto pr-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="flex w-32 flex-col gap-4 group cursor-pointer"
          >
            <div className="p-1 border border-[#d4af37]/50 rounded-sm">
                <LuxuryImageDistortion
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                  alt="Aura Blazer"
                  className="aspect-[3/4] w-full rounded-sm"
                />
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-light uppercase tracking-widest text-white transition-colors duration-700 group-hover:text-[#d4af37]">Aura Blazer</p>
              <p className={`text-[11px] font-light text-[#d4af37]/80 ${cinzel.className}`}>$2,400</p>
            </div>
          </motion.div>

          {[
              { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 + (i * 0.2) }}
              className="flex w-32 flex-col gap-4 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-700"
            >
                <LuxuryImageDistortion
                  src={item.img}
                  alt={item.name}
                  className="aspect-[3/4] w-full rounded-sm"
                />
                <div className="flex flex-col items-end gap-1">
                <p className="text-[10px] font-light uppercase tracking-widest text-white transition-colors duration-700 group-hover:text-[#d4af37]">{item.name}</p>
                <p className={`text-[11px] font-light text-white/50 ${cinzel.className}`}>{item.price}</p>
                </div>
            </motion.div>
          ))}
        </div>

        {/* Capture Controls - Luxury Aesthetic */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-16 pointer-events-auto">
          <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-700 hover:bg-[#d4af37]/20" style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined font-light">photo_library</span>
          </button>

          <div className="relative flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/10 blur-xl transition-all duration-1000 group-hover:bg-[#d4af37]/30 group-hover:blur-2xl"></div>
            <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/40 backdrop-blur-xl transition-all duration-1000 group-hover:border-[#d4af37]">
              <div className="flex size-20 items-center justify-center rounded-full border border-[#d4af37]/20 transition-transform duration-700 group-hover:scale-95">
                <span className="material-symbols-outlined text-4xl text-[#d4af37] font-light">camera</span>
              </div>
            </button>
            <div className="absolute -bottom-8 flex flex-col items-center">
              <span className="text-[9px] font-light uppercase tracking-[0.4em] text-[#d4af37]">Capture</span>
            </div>
          </div>

          <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-700 hover:bg-[#d4af37]/20" style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined font-light">refresh</span>
          </button>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-white/20 mt-auto z-10"></div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
