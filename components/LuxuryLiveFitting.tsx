"use client";

import React, { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { LuxuryCursor } from "./ui/LuxuryCursor";
import { LuxuryImageDistortion } from "./ui/LuxuryImageDistortion";


const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${playfair.className}`}>
      <LuxuryCursor />

      {/* Sophisticated Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-1000">
          <div className="relative h-32 w-24">
            <div className="absolute inset-0 border border-transparent border-t-[#C9B037] border-r-[#C9B037] animate-[spin_2s_linear_infinite] rounded-sm opacity-80" />
            <div className="absolute inset-2 border border-transparent border-b-[#C9B037] border-l-[#C9B037] animate-[spin_2.5s_linear_infinite_reverse] rounded-sm opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-[#C9B037]">Loading</span>
            </div>
          </div>
        </div>
      )}
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
        {/* Scanning Effect Overlay - Luxury Gold */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-40 transition-transform duration-1000 ease-in-out"
            style={{
                background: "linear-gradient(90deg, transparent, #C9B037, transparent)",
                boxShadow: "0 0 20px #C9B037"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-colors duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10" aria-label="Close">
            <span className="material-symbols-outlined text-white font-light">close</span>
          </button>
          <div className="flex items-center gap-3 rounded-full border border-[#C9B037]/30 bg-black/40 px-6 py-3 backdrop-blur-xl">
            <div className="size-2 animate-pulse rounded-full bg-[#C9B037]"></div>
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C9B037]">Luxury Fit AI</h2>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-colors duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10" aria-label="Flash">
            <span className="material-symbols-outlined text-white font-light">flash_on</span>
          </button>
        </div>

        {/* Upper HUD: Brand Banner & Status */}
        <div className="mt-4 space-y-6 px-8 z-10 flex flex-col items-center">
          <div className="text-center transition-all duration-1000">
            <h1 className="text-3xl tracking-widest uppercase text-white drop-shadow-lg">Aura Collection</h1>
            <p className="mt-2 text-xs font-light tracking-[0.3em] text-white/70 uppercase">Exclusive Fall / Winter</p>
          </div>

          <div className="w-[280px] rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037]/50">
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-xs font-light uppercase tracking-widest text-white/80">Alignment</p>
                <p className="text-xs font-semibold leading-none text-[#C9B037]">98%</p>
              </div>
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#C9B037] transition-all duration-1000" style={{ width: "98%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-4">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-transform duration-700 hover:scale-105">
            <p className="text-xs font-light uppercase tracking-widest text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-white">Perfect</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-transform duration-700 hover:scale-105">
            <p className="text-xs font-light uppercase tracking-widest text-white/60">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-white">Ideal</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-8 py-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
            <div className="flex items-stretch gap-8 mx-auto">
              <div className="group flex w-48 flex-col gap-4 rounded-xl border border-[#C9B037] bg-black/60 p-2 backdrop-blur-2xl transition-all duration-700 hover:scale-105 cursor-pointer">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <LuxuryImageDistortion
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                    className="h-full w-full object-cover grayscale-[20%] sepia-[10%] transition-all duration-1000 group-hover:grayscale-0 group-hover:sepia-0"
                  />
                </div>
                <div className="px-2 pb-2 text-center">
                  <p className="truncate text-sm font-medium uppercase tracking-widest text-white">Aura Blazer</p>
                  <p className="mt-1 text-xs font-light text-[#C9B037]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="group flex w-48 flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl transition-all duration-1000 hover:scale-105 hover:border-[#C9B037]/50 hover:bg-black/60 cursor-pointer">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                      <LuxuryImageDistortion
                        src={item.img}
                        className="h-full w-full object-cover grayscale-[30%] opacity-80 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    </div>
                    <div className="px-2 pb-2 text-center">
                    <p className="truncate text-sm font-light uppercase tracking-widest text-white/90">{item.name}</p>
                    <p className="mt-1 text-xs font-light text-white/50 transition-colors duration-700 group-hover:text-[#C9B037]">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                    </p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 p-8">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10 hover:text-[#C9B037]" aria-label="Gallery">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-[#C9B037]/20 blur-2xl transition-all duration-1000 group-hover:bg-[#C9B037]/40"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#C9B037] bg-black/80 backdrop-blur-xl transition-transform duration-700 group-hover:scale-105" aria-label="Capture">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#C9B037]/30 transition-colors duration-700 group-hover:border-[#C9B037]">
                  <span className="material-symbols-outlined text-4xl text-[#C9B037] font-light transition-transform duration-700 group-hover:scale-110">camera</span>
                </div>
              </button>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10 hover:text-[#C9B037]" aria-label="Refresh">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
