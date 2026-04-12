"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      {/* Custom Cursor */}
      <div
        className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ecab13] transition-transform duration-75 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: selectedBrand
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${selectedBrand.bannerImage}')`
              : "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm">
             <div className="h-64 w-64 animate-[spin_2s_linear_infinite] rounded-sm border-[1px] border-transparent border-t-[#ecab13]"></div>
          </div>
        )}

        {/* Brand Experience Layer */}
        {selectedBrand && selectedBrand.description && (
          <div className="absolute inset-x-0 top-1/3 z-0 flex flex-col items-center justify-center px-12 text-center opacity-80 mix-blend-screen">
            <p className={`text-4xl font-light leading-relaxed text-white/50 ${cinzel.className}`}>
              {selectedBrand.description}
            </p>
          </div>
        )}

        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-40 transition-all duration-700"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 15px #ecab13"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-3 rounded-full px-6 py-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
            <h2 className={`text-base font-bold tracking-[0.2em] uppercase text-white ${cinzel.className}`}>Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-8 space-y-6 px-8 z-10">
          <div className="max-w-[280px] rounded-xl p-6" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-white/80">Body Stability</p>
                <p className={`text-sm font-bold leading-none text-[#ecab13] ${cinzel.className}`}>95%</p>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#ecab13]/70">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/4 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-lg p-4 transition-transform duration-700 hover:scale-105" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${cinzel.className}`}>98%</span>
              <span className="text-[10px] font-bold text-[#ecab13]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-lg p-4 transition-transform duration-700 hover:scale-105" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${cinzel.className}`}>94%</span>
              <span className="text-[10px] font-bold text-[#ecab13]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-lg p-4 transition-transform duration-700 hover:scale-105" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${cinzel.className}`}>100%</span>
              <span className="material-symbols-outlined text-[16px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-6 py-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div className="flex min-w-48 flex-col gap-3 rounded-xl border border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-xl transition-all duration-700 hover:scale-105">
                <div
                  className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2">
                  <p className={`truncate text-sm font-bold uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-xs font-bold tracking-widest text-[#ecab13]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(2400)}</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-48 flex-col gap-3 rounded-xl p-2 opacity-80 transition-all duration-700 hover:scale-105 hover:opacity-100" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
                    <div
                    className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2">
                    <p className={`truncate text-sm font-bold uppercase text-white ${cinzel.className}`}>{item.name}</p>
                    <p className="text-xs font-bold tracking-widest text-white/50">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-8">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-700 hover:bg-white/10" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-gradient-to-br from-[#ecab13]/20 to-transparent backdrop-blur-sm transition-transform duration-700 hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#ecab13]/50 bg-[#0a0a0a]">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#ecab13]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-700 hover:bg-white/10" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
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
