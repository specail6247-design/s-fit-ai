"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ['latin'] });

export default function ARLiveFitting() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);

    // Simulate loading for 2.5s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          width: 32,
          height: 32,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-[#ecab13]"
        animate={{
          x: mousePos.x - 2,
          y: mousePos.y - 2,
          width: 4,
          height: 4,
        }}
        transition={{
          type: 'tween',
          duration: 0,
        }}
      />

      {/* Sophisticated Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* Thin gold line tracing a box */}
              <motion.div
                className="absolute inset-0 border border-[#ecab13]"
                initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
                animate={{
                  clipPath: [
                    'polygon(0 0, 100% 0, 100% 0, 0 0)',
                    'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  ],
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className={`text-lg font-bold tracking-[0.3em] text-[#ecab13] ${cinzel.className}`}
              >
                S_FIT
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        {/* Luxury Image Distortion Background */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection with AR garment overlay"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />
        </div>
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 15px #ecab13"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className={`text-sm font-bold tracking-widest uppercase text-[#ecab13] ${cinzel.className}`}>Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Experience Banner */}
        <div className="absolute inset-x-0 top-24 z-10 mx-6 overflow-hidden rounded-xl border border-[#ecab13]/30 bg-black/40 backdrop-blur-md">
          <div
            className="h-24 w-full bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=1000")' }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center p-4">
            <h3 className={`text-lg font-bold tracking-[0.2em] text-[#ecab13] ${cinzel.className}`}>MAISON VANGUARD</h3>
            <p className="text-xs text-white/80">Fall/Winter 2024 Collection. Exclusively engineered for the modern silhouette.</p>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-40 space-y-6 px-6 z-10">
          <div className="max-w-[280px] rounded-xl p-5 transition-all duration-1000" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-sm font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-sm font-bold leading-none text-[#ecab13]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[14px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/4 z-10 flex flex-col gap-4">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">98%</span>
              <span className="text-xs font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">94%</span>
              <span className="text-xs font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[16px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-4 py-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-5">
              <div className="flex min-w-[160px] flex-col gap-3 rounded-2xl border-2 border-[#ecab13] bg-[#ecab13]/20 p-2 backdrop-blur-md transition-all duration-1000 hover:scale-105 hover:opacity-100">
                <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2">
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-white">Aura Blazer</p>
                  <p className="text-xs font-bold text-[#ecab13]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-3 rounded-2xl p-2 opacity-80 transition-all duration-1000 hover:scale-105 hover:opacity-100" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                    className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2">
                    <p className="truncate text-xs font-bold uppercase tracking-wider text-white">{item.name}</p>
                    <p className="text-xs font-bold text-white/50">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
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
