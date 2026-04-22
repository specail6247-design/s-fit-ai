"use client";

import React, { useEffect, useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState("GUCCI");

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const cursor = document.getElementById('luxury-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        const target = e.target as HTMLElement;
        const isHoverable = target.closest('button') || target.closest('a') || target.closest('.group');
        if (isHoverable) {
          cursor.classList.add('scale-150', 'bg-[#c9b037]/20');
        } else {
          cursor.classList.remove('scale-150', 'bg-[#c9b037]/20');
        }
      }
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white duration-1000 ${spaceGrotesk.className}`}>
      <div id="luxury-cursor" className="pointer-events-none fixed z-[9999] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9b037] transition-transform duration-300 ease-out"></div>
      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />

        {/* Brand Experience Banner */}
        {selectedBrand && (
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 saturate-[0.9] contrast-[1.1] transition-opacity duration-1000" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000")', backgroundAttachment: 'fixed' }}>
            <div className="absolute top-1/3 left-8 max-w-sm p-6 backdrop-blur-md bg-black/40 border border-[#c9b037]/30">
              <h3 className={`text-2xl text-[#c9b037] mb-2 ${cinzel.className}`}>The Essence of Modern Luxury</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Discover the latest collection embodying timeless elegance and contemporary design.
                Experience the craftsmanship and heritage of {selectedBrand}.
              </p>
            </div>
          </div>
        )}

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <button className="flex size-12 items-center justify-center rounded-full focus-visible:ring-2 outline-none group" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }} aria-label="Close">
            <span className="material-symbols-outlined text-white" aria-hidden="true">close</span>
          </button>
          <div className="flex flex-col items-center justify-center rounded-full px-4 py-2" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <h2 className={`text-sm font-bold tracking-[0.2em] uppercase text-[#c9b037] ${cinzel.className}`}>{selectedBrand}</h2>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Luxury Collection</p>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full focus-visible:ring-2 outline-none group" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }} aria-label="Flash">
            <span className="material-symbols-outlined text-white" aria-hidden="true">flash_on</span>
          </button>
        </div>

        {/* Upper HUD: Loading & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] text-white ${cinzel.className}`}>Analysis</p>
                <p className="text-xs font-bold leading-none text-[#c9b037]">95%</p>
              </div>
              {/* Sophisticated Loading Animation */}
              <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
                <div className="absolute inset-0 h-full animate-[spin_4s_linear_infinite] border-t-2 border-[#c9b037]"></div>
                <div className="h-full bg-[#c9b037] duration-1000" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]" aria-hidden="true">target</span>
                Masterpiece Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-4">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-light">98%</span>
              <span className="text-[10px] text-[#c9b037]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-light">94%</span>
              <span className="text-[10px] text-[#c9b037]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className={`text-[10px] font-bold uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-light">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#c9b037]" aria-hidden="true">verified</span>
            </div>
          </div>
        </div>

        {/* Masonry Garment Carousel (Vertical left sidebar) */}
        <div className="absolute left-4 top-1/4 bottom-32 z-10 overflow-y-auto scrollbar-hide w-36 px-2 py-4 flex flex-col gap-6" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
          <div className="flex w-full flex-col gap-3 rounded-xl border border-[#c9b037] bg-black/40 p-2 backdrop-blur-md duration-1000 group cursor-pointer hover:bg-black/60">
            <div
              className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat saturate-[0.9] contrast-[1.1]"
              data-alt="Luxury blue blazer thumbnail"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
            ></div>
            <div className="px-1 pb-1 text-center">
              <p className={`truncate text-xs font-bold uppercase tracking-widest text-white ${cinzel.className}`}>Aura Blazer</p>
              <p className="text-[10px] font-bold text-[#c9b037]">$2,400</p>
            </div>
          </div>

          {[
              { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <div key={i} className="flex w-full flex-col gap-3 rounded-xl p-2 opacity-80 duration-1000 hover:opacity-100 group cursor-pointer" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.1)" }}>
                <div
                className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat saturate-[0.9] contrast-[1.1]"
                style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <div className="px-1 pb-1 text-center">
                <p className={`truncate text-xs font-bold uppercase tracking-widest text-white ${cinzel.className}`}>{item.name}</p>
                <p className="text-[10px] font-bold text-white/50">{item.price}</p>
                </div>
            </div>
          ))}
        </div>

        {/* Capture Controls */}
        <div className="absolute bottom-10 inset-x-0 flex items-center justify-center gap-10 p-4 z-10">
          <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white focus-visible:ring-2 outline-none group" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }} aria-label="Photo Library">
            <span className="material-symbols-outlined" aria-hidden="true">photo_library</span>
          </button>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#c9b037]/30 blur-xl"></div>
            <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-[#c9b037] bg-transparent group focus-visible:ring-2 outline-none" aria-label="Fit Snap">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#c9b037]/10 backdrop-blur-sm border border-[#c9b037]/50 duration-1000 group-hover:bg-[#c9b037]/30">
                <span className="material-symbols-outlined text-4xl text-[#c9b037]" aria-hidden="true">camera</span>
              </div>
            </button>
            <div className="absolute -bottom-8 flex flex-col items-center">
              <span className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9b037] ${cinzel.className}`}>Capture</span>
            </div>
          </div>
          <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white focus-visible:ring-2 outline-none group" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }} aria-label="Refresh">
            <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          </button>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20 absolute bottom-2 left-1/2 -translate-x-1/2 z-10"></div>
      </div>
    </div>
  );
}
