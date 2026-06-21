"use client";

import React, { useEffect, useState } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-white dark:bg-[#101922] cursor-none ${spaceGrotesk.className}`}>
      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed z-[100] size-8 rounded-full border border-[#ecab13] transition-transform duration-100 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(236, 171, 19, 0.5), inset 0 0 10px rgba(236, 171, 19, 0.5)'
        }}
      />
      <div
        className="pointer-events-none fixed z-[100] size-1 rounded-full bg-[#ecab13]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection"
            className="w-full h-full"
          />
        </div>

        {/* Sophisticated Loading Animation (Thin Gold Line Box Trace) */}
        <div className="absolute inset-x-8 top-1/4 bottom-1/3 z-10 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full max-w-sm max-h-[500px]">
             {/* Left Line */}
            <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ecab13] to-transparent opacity-40 animate-[slide-down_3s_ease-in-out_infinite]" style={{ boxShadow: "0 0 8px #ecab13" }}></div>
            {/* Right Line */}
            <div className="absolute right-0 bottom-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#ecab13] to-transparent opacity-40 animate-[slide-up_3s_ease-in-out_infinite]" style={{ boxShadow: "0 0 8px #ecab13" }}></div>
            {/* Top Line */}
            <div className="absolute top-0 right-0 h-[1px] w-full bg-gradient-to-l from-transparent via-[#ecab13] to-transparent opacity-40 animate-[slide-left_3s_ease-in-out_infinite]" style={{ boxShadow: "0 0 8px #ecab13" }}></div>
            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-40 animate-[slide-right_3s_ease-in-out_infinite]" style={{ boxShadow: "0 0 8px #ecab13" }}></div>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className={`text-sm font-bold tracking-widest uppercase text-[#ecab13] ${cinzel.className}`}>S_FIT AI LUXURY</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Banner (Parallax & Description) */}
        <div className="z-10 px-8 pt-4 pb-2 text-center flex flex-col items-center">
          <div className="relative overflow-hidden w-full max-w-sm rounded-lg mb-4 h-24" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000")' }}
            ></div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className={`text-2xl font-bold tracking-[0.3em] text-white uppercase ${cinzel.className}`}>GUCCI</h3>
            </div>
          </div>
          <p className={`text-xs text-white/70 tracking-widest max-w-xs ${spaceGrotesk.className}`}>
            Experience the latest Fall Collection in real-time. Handcrafted elegance meets AI precision.
          </p>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-6 px-8 z-10">
          <div className="max-w-[280px] rounded-2xl p-6 transition-all duration-1000" style={{ background: "rgba(16, 25, 34, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className={`text-xs font-medium uppercase tracking-widest text-white/80 ${cinzel.className}`}>Body Stability</p>
                <p className={`text-sm font-bold leading-none text-[#ecab13] ${cinzel.className}`}>95%</p>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#ecab13]/50 to-[#ecab13] transition-all duration-1000 ease-out" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ecab13]/70">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000 hover:scale-105" style={{ background: "rgba(16, 25, 34, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-white/60 ${cinzel.className}`}>Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white">98%</span>
              <span className="text-[10px] font-medium text-[#ecab13]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000 hover:scale-105" style={{ background: "rgba(16, 25, 34, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-white/60 ${cinzel.className}`}>Waist</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white">94%</span>
              <span className="text-[10px] font-medium text-[#ecab13]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 transition-all duration-1000 hover:scale-105" style={{ background: "rgba(16, 25, 34, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-white/60 ${cinzel.className}`}>Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white">100%</span>
              <span className="material-symbols-outlined text-[16px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-4 py-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div className="flex min-w-[160px] flex-col gap-3 rounded-2xl border border-[#ecab13]/40 bg-[#101922]/80 p-2 backdrop-blur-xl transition-all duration-1000 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className={`truncate text-xs font-bold uppercase tracking-widest text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-xs font-medium text-[#ecab13] mt-1">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(2400)}
                  </p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: 12500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 8500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 15400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-3 rounded-2xl p-2 opacity-60 transition-all duration-1000 hover:opacity-100" style={{ background: "rgba(16, 25, 34, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div
                    className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition-all duration-1000"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className={`truncate text-xs font-bold uppercase tracking-widest text-white/80 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-xs font-medium text-white/50 mt-1">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                    </p>
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
