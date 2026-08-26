"use client";

import React from "react";
import { Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"], display: 'swap' });

export default function LuxuryLiveFitting() {
  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white dark:bg-[#0a0a0a] ${playfair.className}`}>
      {/* Main AR Viewport Container */}
      <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000">
        <div
          className="relative flex h-screen w-full flex-col"
          data-alt="User reflection with AR garment overlay"
        >
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60 transition-all duration-1000"
            style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                boxShadow: "0 0 20px #d4af37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-white hover:text-[#d4af37] transition-colors duration-700">close</span>
          </div>
          <div className="flex items-center gap-3 rounded-full px-6 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <div className="relative flex items-center justify-center size-3">
              <div className="absolute inset-0 border border-[#d4af37] rounded-sm animate-[spin_3s_linear_infinite]"></div>
              <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#d4af37]">Luxury Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-white hover:text-[#d4af37] transition-colors duration-700">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-none p-4" style={{ background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-white/80">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#d4af37]">95%</p>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-none bg-white/10">
                <div className="h-full rounded-none bg-[#d4af37] transition-all duration-1000" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px] text-[#d4af37]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/4 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-none p-4" style={{ background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light">98%</span>
              <span className="text-[10px] font-bold text-[#d4af37]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-none p-4" style={{ background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light">94%</span>
              <span className="text-[10px] font-bold text-[#d4af37]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-none p-4" style={{ background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light">100%</span>
              <span className="material-symbols-outlined text-[16px] text-[#d4af37]">verified</span>
            </div>
          </div>
        </div>

        {/* Left Side Brand Info & Vertical Carousel */}
        <div className="absolute left-6 top-1/4 z-10 flex flex-col gap-8 h-2/3">
          {/* Brand Experience Banner */}
          <div className="w-64 relative rounded-none border border-[#d4af37]/30 bg-black/40 p-4 backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600")' }}></div>
            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-xl font-bold tracking-[0.2em] uppercase text-[#d4af37]">Maison S_FIT</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">Discover the essence of high fashion. Hand-stitched with precision and engineered for the modern vanguard.</p>
            </div>
          </div>

          {/* Garment Vertical Carousel */}
          <div className="flex-1 overflow-y-auto scrollbar-hide py-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex flex-col gap-6">
              <div className="flex w-48 flex-col gap-3 border border-[#d4af37] bg-black/60 p-2 backdrop-blur-md transition-all duration-700">
                <div
                  className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-white">Aura Blazer</p>
                  <p className="text-sm font-light text-[#d4af37] mt-1">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex w-48 flex-col gap-3 border border-white/10 bg-black/40 p-2 backdrop-blur-md opacity-70 hover:opacity-100 transition-all duration-700 cursor-pointer">
                    <div
                    className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className="truncate text-xs font-bold uppercase tracking-wider text-white">{item.name}</p>
                    <p className="text-sm font-light text-white/60 mt-1">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10 w-full flex justify-center">
          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-6 backdrop-blur-md bg-black/30 border border-[#d4af37]/20 rounded-full mb-8">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white hover:text-[#d4af37] transition-colors duration-700" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-none">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/20 blur-2xl transition-all duration-1000 group-hover:bg-[#d4af37]/40"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-[#d4af37] bg-transparent">
                <div className="flex size-20 items-center justify-center rounded-full border-[1px] border-[#d4af37]/50 bg-black/50 backdrop-blur-sm group-hover:bg-[#d4af37]/10 transition-colors duration-1000">
                  <span className="material-symbols-outlined text-4xl text-[#d4af37] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]">Capture</span>
              </div>

              {/* Custom Gold Ring Cursor (only visible on hover over camera) */}
              <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none size-32 rounded-full border-[1px] border-[#d4af37] transition-opacity duration-700 animate-[spin_4s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white hover:text-[#d4af37] transition-colors duration-700" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-40 bg-white/20"></div>
        </div>
      </LuxuryImageDistortion>
    </div>
  );
}
