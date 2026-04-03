"use client";

import React, { useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById("luxury-custom-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className}`}>
      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-custom-cursor"
        className="pointer-events-none fixed z-50 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ecab13] opacity-60 mix-blend-screen transition-transform duration-75"
      ></div>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Parallax Background using Brand Default Image */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="M_FIT_LUXE Experience"
          />
        </div>

        {/* Brand Banner & Description overlay */}
        <div className="absolute top-32 inset-x-0 flex flex-col items-center justify-center z-0 opacity-80 pointer-events-none">
           <h1 className="text-4xl font-light tracking-[0.5em] text-[#ecab13] uppercase drop-shadow-md">M_FIT_LUXE</h1>
           <p className="mt-4 max-w-md text-center text-sm font-light tracking-widest text-white/70">
             Experience high-fidelity authentic rendering.
           </p>
        </div>

        {/* Advanced Framer Motion SVG Loading State Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mix-blend-screen opacity-40">
           <svg className="absolute w-[80%] h-[60%] max-w-sm" viewBox="0 0 100 100" preserveAspectRatio="none">
             <motion.rect
               x="0" y="0" width="100" height="100"
               fill="none"
               stroke="#ecab13"
               strokeWidth="0.5"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
           </svg>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-20 flex items-center justify-between p-4 pt-8 transition-opacity duration-700">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <span className="material-symbols-outlined text-[#ecab13]">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#ecab13]">Luxe AI Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <span className="material-symbols-outlined text-[#ecab13]">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-20 transition-opacity duration-1000">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-widest text-[#ecab13]/70">Fit Integrity</p>
                <p className="text-xs font-bold leading-none text-[#ecab13]">99%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "99%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px] text-[#ecab13]">target</span>
                Spatial Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Left) */}
        <div className="absolute left-4 top-1/3 z-20 flex flex-col gap-4 transition-all duration-1000">
          <div className="flex min-w-[140px] flex-col gap-1 rounded-lg p-4" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ecab13]/70">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white">100%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-1 rounded-lg p-4" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ecab13]/70">Tailoring</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white">98%</span>
              <span className="text-[10px] font-bold text-[#ecab13]">+2%</span>
            </div>
          </div>
        </div>

        {/* Vertical Product List Sidebar (Right) */}
        <div className="absolute right-6 top-1/4 z-20 h-3/4 overflow-y-auto scrollbar-hide" style={{ maskImage: "linear-gradient(to bottom, transparent, black 5%, black 90%, transparent)" }}>
          <div className="flex flex-col gap-6 py-6 pb-24 pr-2">
            <div className="flex min-w-32 flex-col gap-3 rounded-xl border border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-md">
              <div
                className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
                data-alt="Luxury blue blazer thumbnail"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              ></div>
              <div className="px-2 pb-2 text-center">
                <p className="truncate text-xs font-bold uppercase tracking-widest text-white">Aura Blazer</p>
                <p className="text-xs font-light tracking-wider text-[#ecab13]">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(2400)}
                </p>
              </div>
            </div>

            {[
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <div key={i} className="flex min-w-32 flex-col gap-3 rounded-xl p-2 opacity-60 hover:opacity-100 transition-opacity duration-700" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div
                  className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundImage: `url("${item.img}")` }}
                  ></div>
                  <div className="px-2 pb-2 text-center">
                  <p className="truncate text-xs font-bold uppercase tracking-widest text-white">{item.name}</p>
                  <p className="text-xs font-light tracking-wider text-white/50">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                  </p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-20">
          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-[#0a0a0a]/80 backdrop-blur-sm transition-transform duration-700 hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#ecab13]/40">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ecab13]/80">Capture Fit</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}
