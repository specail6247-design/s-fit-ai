"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#f5f5f5] font-sans`}
      style={{ cursor: 'none' }}
    >
      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full border border-[#d4af37] transition-all duration-300 ease-out"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHovering ? '40px' : '20px',
          height: isHovering ? '40px' : '20px',
          transform: 'translate(-50%, -50%)',
          opacity: cursorPos.x > -100 ? 1 : 0
        }}
      />

      {/* Main Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with luxury garment overlay"
      >
        {/* Main Visual with Parallax / Distortion */}
        <div className="absolute inset-0 z-0 opacity-80" style={{ transform: `translate(${(cursorPos.x - 500) * -0.01}px, ${(cursorPos.y - 500) * -0.01}px)` }}>
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="Luxury Fashion Fitting"
          />
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />

        {/* Sophisticated Loading Animation (Gold Line Tracing) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[200px] h-[300px] border border-transparent overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent animate-[shimmer_2.5s_infinite]" />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#d4af37] to-transparent animate-[shimmer_2.5s_infinite]" />
        </div>

        {/* Brand Banner Experience */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <h1 className={`${playfair.className} text-4xl font-normal tracking-widest text-white/90 drop-shadow-md`}>AURA LUXE</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] mt-2">Paris 1984</p>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <button
            className="flex size-10 items-center justify-center rounded-full text-white hover:text-[#d4af37] transition-colors duration-700"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="material-symbols-outlined font-light text-2xl">close</span>
          </button>
          <div className="flex items-center gap-3 px-4 py-2 opacity-80">
            <div className="size-1.5 animate-pulse rounded-full bg-[#d4af37]"></div>
            <h2 className={`text-xs font-light tracking-[0.2em] uppercase text-[#d4af37]`}>Live Mode</h2>
          </div>
          <button
            className="flex size-10 items-center justify-center rounded-full text-white hover:text-[#d4af37] transition-colors duration-700"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="material-symbols-outlined font-light text-2xl">tune</span>
          </button>
        </div>

        {/* Floating Fit Stats Sidebar (Right) - Refined */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          {[
            { label: "Shoulder", val: "98%" },
            { label: "Waist", val: "94%" },
            { label: "Hem", val: "100%" }
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-end gap-1 opacity-80 hover:opacity-100 transition-opacity duration-700">
              <p className="text-[9px] font-light uppercase tracking-[0.2em] text-[#a0a0a0]">{stat.label}</p>
              <span className={`${playfair.className} text-xl text-white`}>{stat.val}</span>
              <div className="h-[1px] w-8 bg-[#d4af37]/50 mt-1"></div>
            </div>
          ))}
        </div>

        {/* Right Side Collection Display (Vertical Masonry Style) */}
        <div className="absolute right-8 bottom-32 z-10 w-32 flex flex-col gap-6 max-h-[50vh] overflow-y-auto scrollbar-hide py-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
          {[
              { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#111]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors duration-700">{item.name}</p>
                  <p className={`${playfair.className} text-[#d4af37] text-sm mt-1`}>
                    ${item.price.toLocaleString('en-US')}
                  </p>
                </div>
            </div>
          ))}
        </div>

        {/* Bottom Controls - Minimalist */}
        <div className="mt-auto pb-12 z-10 flex flex-col items-center w-full relative">
          <button
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 rounded-full border border-[#d4af37] opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-1000 ease-out"></div>
            <div className="flex size-16 items-center justify-center rounded-full bg-white text-black transition-transform duration-700 hover:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="material-symbols-outlined text-3xl font-light">camera</span>
            </div>
          </button>
          <div className="absolute bottom-4 mx-auto h-1 w-24 rounded-full bg-white/10"></div>
        </div>

      </div>
    </div>
  );
}
