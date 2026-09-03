"use client";

import React from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = React.useState<{ name: string; description: string; banner: string } | null>(null);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#101922] text-white ${cinzel.className}`} style={{ cursor: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22><circle cx=%2216%22 cy=%2216%22 r=%2210%22 fill=%22none%22 stroke=%22%23d4af37%22 stroke-width=%222%22/></svg>') 16 16, auto" }}>
      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
      >
        {/* Main Product Visual */}
        <LuxuryImageDistortion
          imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          alt="User reflection"
          className="absolute inset-0 h-full w-full z-0"
        />
        <div className="relative z-10 flex flex-col h-full">
        {/* Sophisticated Loading State */}

        <div className="absolute top-[40%] w-full flex justify-center z-20">
            <div className="relative w-64 h-64 border border-[#d4af37]/20 flex items-center justify-center">
                <div className="absolute inset-0 border-t border-l border-[#d4af37] animate-[spin_3s_linear_infinite]" style={{ transformOrigin: 'center' }}></div>
                <div className="absolute inset-0 border-b border-r border-[#d4af37] animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }}></div>
                <span className={`text-[#d4af37] uppercase tracking-widest text-xs ${cinzel.className}`}>Loading Experience</span>
            </div>
        </div>


        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>


        {/* Brand Experience Parallax Banner */}
        {selectedBrand && (
          <div className="absolute top-0 left-0 w-full h-64 z-0 overflow-hidden" style={{ perspective: "1000px" }}>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out transform hover:scale-105" style={{ backgroundImage: `url(${selectedBrand.banner})` }}></div>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-16">
              <h3 className={`text-3xl font-bold text-[#d4af37] ${playfair.className}`}>{selectedBrand.name}</h3>
              <p className="text-sm text-white/80 mt-2 max-w-md">{selectedBrand.description}</p>
            </div>
          </div>
        )}

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#d4af37]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#d4af37]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#d4af37]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}

          <div className="flex overflow-x-auto px-6 py-8 gap-8 scrollbar-hide z-20 relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              {[
                  { name: "Aura Blazer", price: "$2,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", brand: { name: "Gucci", description: "Timeless elegance with modern flair.", banner: "https://images.unsplash.com/photo-1558769132-cb1fac08c04d?auto=format&fit=crop&q=80&w=1000" } },
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", brand: { name: "Prada", description: "Sophisticated minimalism.", banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000" } },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", brand: { name: "Balenciaga", description: "Avant-garde streetwear.", banner: "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=1000" } },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", brand: { name: "Moncler", description: "Luxury performance wear.", banner: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000" } },
              ].map((item, i) => (
                <div key={i} onClick={() => setSelectedBrand(item.brand)} className="cursor-pointer flex min-w-[160px] flex-col gap-3 rounded-none p-2 opacity-90 transition-all duration-700 hover:scale-105 hover:opacity-100 bg-transparent border border-white/10 hover:border-[#d4af37]/50">
                    <div
                    className="aspect-[2/3] w-full rounded-none bg-cover bg-center bg-no-repeat transition-all duration-1000"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className={`truncate text-xs font-bold uppercase tracking-widest text-white ${playfair.className}`}>{item.name}</p>
                    <p className="text-sm font-light text-[#d4af37] mt-1">{item.price}</p>
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
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#d4af37] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">Fit Snap</span>
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
    </div>
  );
}
