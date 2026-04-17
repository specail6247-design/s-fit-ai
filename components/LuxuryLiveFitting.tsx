"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('.group');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex h-screen w-full items-center justify-center bg-[#050505] text-[#C9B037] ${spaceGrotesk.className}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="relative size-16">
            <div className="absolute inset-0 animate-[spin_3s_linear_infinite] border-t-2 border-[#C9B037] rounded-sm opacity-20"></div>
            <div className="absolute inset-0 animate-[spin_2s_linear_infinite_reverse] border-r-2 border-[#C9B037] rounded-sm opacity-50"></div>
            <div className="absolute inset-2 border border-[#C9B037] rounded-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-0.5 h-0.5 bg-[#C9B037] animate-ping"></div>
            </div>
          </div>
          <p className={`text-xs uppercase tracking-[0.3em] font-light ${cinzel.className}`}>Preparing Atelier</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-all duration-300 ease-out"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
      >
        <div
          className={`absolute -ml-4 -mt-4 rounded-full border border-[#C9B037] transition-all duration-300 ease-out
            ${isHovering ? 'size-12 bg-[#C9B037]/10 scale-150' : 'size-8'}`}
        />
        <div className="absolute -ml-1 -mt-1 size-2 rounded-full bg-[#C9B037]" />
      </div>

      {/* Main Luxury Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with luxury AR garment overlay"
      >
        {/* Parallax Brand Background */}
        <div
          className="absolute inset-0 z-0 opacity-20 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.9) contrast(1.1)",
            transform: `translate(${cursorPos.x * -0.01}px, ${cursorPos.y * -0.01}px) scale(1.05)`
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-12">
          <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#050505]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037]/50" aria-label="close">
            <span className="material-symbols-outlined text-white transition-colors group-hover:text-[#C9B037]" aria-hidden="true">close</span>
          </button>

          <div className="flex flex-col items-center gap-1 bg-[#050505]/40 px-8 py-3 backdrop-blur-xl border border-white/5 rounded-sm">
            <h2 className={`text-sm tracking-[0.3em] uppercase text-[#C9B037] ${cinzel.className}`}>Maison Margiela</h2>
            <p className="text-[10px] tracking-widest text-white/50 uppercase">Paris</p>
          </div>

          <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#050505]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037]/50" aria-label="flash">
            <span className="material-symbols-outlined text-white transition-colors group-hover:text-[#C9B037]" aria-hidden="true">flash_on</span>
          </button>
        </div>

        {/* Center Canvas / Fit View */}
        <div className="relative z-0 flex-1 flex items-center justify-center pointer-events-none">
           {/* Placeholder for the user's camera feed or 3D model */}
           <div className="absolute inset-y-10 inset-x-20 border border-[#C9B037]/10 rounded-3xl overflow-hidden opacity-50">
             <div className="w-full h-full bg-[#050505]/50 backdrop-blur-3xl" />
           </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) - Luxury Redesign */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex flex-col items-end gap-1">
             <div className="h-0.5 w-12 bg-[#C9B037]/30 mb-1" />
             <p className={`text-[10px] uppercase tracking-widest text-[#C9B037] ${cinzel.className}`}>Shoulder Drape</p>
             <p className="text-xl font-light text-white">98<span className="text-sm text-white/50">%</span></p>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="h-0.5 w-8 bg-[#C9B037]/30 mb-1" />
             <p className={`text-[10px] uppercase tracking-widest text-[#C9B037] ${cinzel.className}`}>Waist Cinch</p>
             <p className="text-xl font-light text-white">94<span className="text-sm text-white/50">%</span></p>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="h-0.5 w-16 bg-[#C9B037] mb-1" />
             <p className={`text-[10px] uppercase tracking-widest text-[#C9B037] ${cinzel.className}`}>Hem Alignment</p>
             <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-[#C9B037] text-sm" aria-hidden="true">verified</span>
                 <p className="text-xl font-light text-white">100<span className="text-sm text-white/50">%</span></p>
             </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto z-10 pb-12">

          {/* Garment Carousel - Vertical/Masonry style within horizontal scroll */}
          <div className="flex overflow-x-auto px-8 py-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div className="flex items-end gap-6">

              {/* Active Item - Featured Larger */}
              <button className="group flex min-w-[220px] flex-col gap-4 bg-[#050505]/80 p-3 backdrop-blur-xl border border-[#C9B037]/50 transition-all duration-1000 hover:border-[#C9B037]">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111]">
                   {/* Using the LuxuryImageDistortion component as requested */}
                   <LuxuryImageDistortion
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                      alt="Aura Blazer"
                      className="w-full h-full"
                   />
                </div>
                <div className="flex flex-col items-center gap-1 pb-2">
                  <p className={`text-xs uppercase tracking-[0.2em] text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-sm font-light text-[#C9B037]">$2,400</p>
                </div>
              </button>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <button key={i} className="group flex min-w-[160px] flex-col gap-3 bg-[#050505]/40 p-2 backdrop-blur-md border border-white/10 transition-all duration-1000 hover:border-[#C9B037]/50 hover:-translate-y-4">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111]">
                      {/* Using standard image for non-active items to save performance, but adding hover scale */}
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url("${item.img}")`, filter: "saturate(0.9) contrast(1.1)" }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 pb-1 opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                      <p className={`text-[10px] uppercase tracking-[0.15em] text-white ${cinzel.className}`}>{item.name}</p>
                      <p className="text-xs font-light text-[#C9B037]">{item.price}</p>
                    </div>
                </button>
              ))}
            </div>
          </div>

          {/* Capture Controls - Slower, smoother interactions */}
          <div className="flex items-center justify-center gap-16 pt-4">
            <button className="group flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#050505]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037]/50" aria-label="Library">
              <span className="material-symbols-outlined text-white transition-colors duration-700 group-hover:text-[#C9B037]" aria-hidden="true">photo_library</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9B037]/20 blur-2xl"></div>
              <button className="group relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#C9B037]/50 bg-[#050505] transition-all duration-1000 hover:border-[#C9B037] hover:scale-105" aria-label="Capture Fit">
                <div className="flex size-20 items-center justify-center rounded-full border border-white/10 transition-all duration-700 group-hover:border-[#C9B037]/30">
                  <span className="material-symbols-outlined text-3xl text-[#C9B037]" aria-hidden="true">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className={`text-[9px] font-light uppercase tracking-[0.4em] text-[#C9B037] ${cinzel.className}`}>Capture Fit</span>
              </div>
            </div>

            <button className="group flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#050505]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#C9B037]/50" aria-label="Refresh">
              <span className="material-symbols-outlined text-white transition-colors duration-700 group-hover:text-[#C9B037]" aria-hidden="true">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
