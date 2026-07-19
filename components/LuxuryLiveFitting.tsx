"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Inter } from "next/font/google";
import { motion, useMotionValue, useSpring } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedBrand] = useState('Gucci');

  // Custom cursor logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 3000);
    return () => clearTimeout(timer);
  }, [cursorX, cursorY]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const garments = [
    { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
    { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${inter.className}`}>
      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] size-8 rounded-full border border-[#ecab13]/60 mix-blend-screen hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1 bg-[#ecab13] rounded-full hidden md:block"
        style={{ x: useSpring(useMotionValue(cursorX.get() + 14), { damping: 30, stiffness: 200 }), y: useSpring(useMotionValue(cursorY.get() + 14), { damping: 30, stiffness: 200 }) }}
      />

      {/* Main Background with Distortion */}
      <div className="absolute inset-0">
        <LuxuryImageDistortion
          imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          alt="Luxury fashion background"
        />
      </div>

      {/* Loading State Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm">
          <div className="relative size-32">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
              <motion.rect
                x="5" y="5" width="90" height="90"
                fill="none" stroke="#ecab13" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className={`${cinzel.className} text-[#ecab13] text-xs uppercase tracking-widest`}>Fitting</p>
            </div>
          </div>
        </div>
      )}

      {/* Main UI Container (Fades out when loading) */}
      <motion.div
        className="relative z-10 flex h-full w-full flex-col"
        animate={{ opacity: isAnalyzing ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#1a1a1a]/40 border border-white/5 backdrop-blur-xl transition-all duration-700 hover:bg-[#1a1a1a]/80">
            <span className="material-symbols-outlined text-white/70 hover:text-white transition-colors duration-700">close</span>
          </div>
          <h2 className={`${cinzel.className} text-lg tracking-[0.2em] uppercase text-white/90`}>
            Digital Mirror
          </h2>
          <div className="flex size-12 items-center justify-center rounded-full bg-[#1a1a1a]/40 border border-white/5 backdrop-blur-xl transition-all duration-700 hover:bg-[#1a1a1a]/80">
            <span className="material-symbols-outlined text-white/70 hover:text-white transition-colors duration-700">tune</span>
          </div>
        </div>

        {/* Brand Banner Experience */}
        <div className="absolute left-8 top-1/4 max-w-xs">
          <motion.div
            className="flex flex-col gap-4 p-6 bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={`${cinzel.className} text-2xl text-[#ecab13]`}>{selectedBrand}</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Experience the latest collection straight from the runway. High-fidelity rendering applied to every thread.
            </p>
          </motion.div>
        </div>

        {/* Garment Selection (Vertical Masonry-style) */}
        <div className="absolute right-8 top-1/4 bottom-32 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-8">
          {garments.map((item, i) => (
            <motion.div
              key={i}
              className="group flex flex-col gap-3 w-48 p-2 bg-[#0a0a0a]/40 border border-white/5 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/30"
              whileHover={{ x: -10 }}
            >
              <div
                className="aspect-[3/4] w-full rounded-sm bg-cover bg-center filter saturate-[0.9] contrast-[1.1] transition-all duration-1000 group-hover:saturate-100"
                style={{ backgroundImage: `url("${item.img}")` }}
              />
              <div className="px-2 pb-2">
                <p className={`${cinzel.className} text-xs uppercase text-white/80 group-hover:text-white transition-colors duration-700`}>{item.name}</p>
                <p className="text-xs font-light text-[#ecab13]/80 mt-1">{formatPrice(item.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Capture Controls */}
        <div className="mt-auto pb-12 flex justify-center items-center gap-16">
          <button className="text-white/50 hover:text-white transition-colors duration-700">
            <span className="material-symbols-outlined text-3xl font-light">history</span>
          </button>

          <div className="relative group flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border border-[#ecab13]/30 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
            <button className="relative flex size-20 items-center justify-center rounded-full border border-white/20 bg-[#0a0a0a]/50 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13] hover:bg-[#ecab13]/10">
              <div className="size-16 rounded-full border border-white/10" />
            </button>
          </div>

          <button className="text-white/50 hover:text-white transition-colors duration-700">
            <span className="material-symbols-outlined text-3xl font-light">share</span>
          </button>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
