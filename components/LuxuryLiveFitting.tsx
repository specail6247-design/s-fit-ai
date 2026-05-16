"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white dark:bg-[#0a0a0a] cursor-none ${cinzel.className}`}>
      {/* Gold Ring Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex size-8 items-center justify-center rounded-full border border-[#ecab13] bg-transparent"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <div className="size-1 rounded-full bg-[#ecab13]" />
      </motion.div>
      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col" data-alt="User reflection with AR garment overlay">
        <LuxuryImageDistortion
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          alt="Luxury product background"
          className="absolute inset-0 z-0 h-full w-full"
        />

        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

        {/* Sophisticated Loading Animation (Gold Box Trace) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-64 h-80">
                {/* Top line */}
                <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ecab13] to-transparent animate-pulse" />
                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ecab13] to-transparent animate-pulse delay-75" />
                {/* Left line */}
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ecab13] to-transparent animate-pulse delay-150" />
                {/* Right line */}
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ecab13] to-transparent animate-pulse delay-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[#ecab13] text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Initializing</p>
                </div>
            </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Experience Banner */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-[90%] overflow-hidden rounded-xl border border-white/10 transition-all duration-1000">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80")',
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="relative p-6 text-center bg-black/40 backdrop-blur-md">
            <h3 className="text-2xl tracking-[0.3em] font-light text-[#ecab13] uppercase mb-2">Maison Guccí</h3>
            <p className="text-xs text-white/70 font-sans tracking-wide">
              Fall/Winter 2024 Collection • Italian Silk & Cashmere
            </p>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10 hidden">
          {/* Hidden for luxury mode to keep UI minimal */}
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-6 py-8 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-3">
              <div className="flex min-w-32 flex-col gap-2 rounded-xl border border-[#ecab13] transition-all duration-700 hover:scale-105 bg-[#0a0a0a] p-1 backdrop-blur-md">
                <div
                  className="aspect-[3/5] h-48 w-32 rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-1 pb-1">
                  <p className="truncate text-[10px] font-bold uppercase text-white">Aura Blazer</p>
                  <p className="text-[10px] font-bold text-[#ecab13]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-32 flex-col gap-2 rounded-xl p-2 transition-all duration-700 hover:scale-105 hover:border-[#ecab13] opacity-80" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                    className="aspect-[3/5] h-48 w-32 rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-1 pb-1">
                    <p className="truncate text-[10px] font-bold uppercase text-white">{item.name}</p>
                    <p className="text-[10px] font-bold text-[#ecab13]">${item.price.toLocaleString()}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#0a0a0a]/10">
                  <span className="material-symbols-outlined text-4xl text-[#0a0a0a]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
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
