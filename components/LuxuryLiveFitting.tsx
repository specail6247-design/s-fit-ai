"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

const mockItems = [
  { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

export default function LuxuryLiveFitting() {
  const [activeItem, setActiveItem] = useState(mockItems[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#111] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Cursor */}
      <div
        className="pointer-events-none fixed z-50 size-8 rounded-full border border-[#d4af37] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)`,
        }}
      >
        <div className="absolute inset-1/4 rounded-full bg-[#d4af37]/50 blur-[2px]"></div>
      </div>

      {isLoading ? (
        // Sophisticated Loading State
        <div className="flex h-full w-full items-center justify-center bg-[#111]">
          <div className="relative size-32">
            <div className="absolute inset-0 border border-white/10"></div>
            <div
              className="absolute inset-0 border border-[#d4af37]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                animation: 'drawBox 2s ease-in-out infinite alternate',
              }}
            ></div>
            <style>{`
              @keyframes drawBox {
                0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
                25% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
                50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
              }
            `}</style>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-[#d4af37] text-xs tracking-[0.3em] uppercase ${playfair.className}`}>Loading</span>
            </div>
          </div>
        </div>
      ) : (
        // Main Viewport
        <div className="relative flex h-full w-full flex-col">
          {/* Background / Main Product Visual */}
          <div className="absolute inset-0 z-0 opacity-80">
             <LuxuryImageDistortion imageUrl={activeItem.img} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#111]/80 mix-blend-multiply"></div>
          </div>

          {/* Top Navigation Bar */}
          <div className="z-10 flex items-center justify-between p-8">
            <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#111]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50">
              <span className="material-symbols-outlined text-white/80">close</span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#111]/40 px-6 py-3 backdrop-blur-xl">
              <div className="size-2 animate-pulse rounded-full bg-[#d4af37]"></div>
              <h2 className={`text-sm font-medium tracking-[0.3em] uppercase text-[#d4af37] ${playfair.className}`}>Atelier Fit</h2>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#111]/40 backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50">
              <span className="material-symbols-outlined text-white/80">more_horiz</span>
            </div>
          </div>

          {/* Brand Experience Banner */}
          <div className="z-10 mt-4 px-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]/40 p-8 backdrop-blur-xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000')] bg-cover bg-center opacity-10" style={{ transform: 'translateY(-10%) scale(1.1)' }}></div>
               <div className="relative flex flex-col gap-2">
                 <h1 className={`text-3xl text-white tracking-widest ${playfair.className}`}>MAISON GUCCI</h1>
                 <p className="max-w-md text-sm font-light leading-relaxed text-white/60">
                   Discover the latest collection featuring iconic silhouettes and premium Italian craftsmanship.
                   Experience true luxury in your digital atelier.
                 </p>
               </div>
            </div>
          </div>

          {/* Bottom UI Section */}
          <div className="mt-auto pb-12 z-10 flex flex-col gap-10">
            {/* Garment Carousel - Vertical/Masonry Style Layout */}
            <div className="flex overflow-x-auto px-8 py-4 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
              {mockItems.map((item, i) => {
                const isActive = activeItem.name === item.name;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveItem(item)}
                    className={`flex min-w-[160px] flex-col gap-4 rounded-xl p-2 transition-all duration-1000 ease-in-out cursor-none
                      ${isActive ? 'border border-[#d4af37]/50 bg-[#d4af37]/10 backdrop-blur-xl transform -translate-y-4' : 'border border-white/5 bg-[#111]/40 opacity-60 hover:opacity-100 hover:border-white/20'}`}
                  >
                      <div
                        className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                        style={{ backgroundImage: `url("${item.img}")` }}
                      ></div>
                      <div className="px-2 pb-2 text-center flex flex-col gap-1">
                        <p className={`truncate text-xs tracking-widest uppercase text-white/90 ${playfair.className}`}>{item.name}</p>
                        <p className="text-xs text-[#d4af37] tracking-wider">{formatPrice(item.price)}</p>
                      </div>
                  </div>
                )
              })}
            </div>

            {/* Capture Controls */}
            <div className="flex items-center justify-center gap-16 px-8">
              <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111]/40 text-white backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50 cursor-none">
                <span className="material-symbols-outlined font-light">favorite</span>
              </button>

              <div className="relative flex items-center justify-center group cursor-none">
                <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl transition-all duration-1000 group-hover:bg-[#d4af37]/40 group-hover:blur-3xl"></div>
                <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#111]/80 backdrop-blur-xl transition-all duration-1000 group-hover:border-[#d4af37]">
                  <div className="flex size-20 items-center justify-center rounded-full border border-[#d4af37]/50">
                    <span className="text-[#d4af37] material-symbols-outlined text-3xl font-light transition-transform duration-1000 group-hover:scale-110">camera</span>
                  </div>
                </button>
                <div className="absolute -bottom-8 flex flex-col items-center">
                  <span className={`text-[10px] uppercase tracking-[0.4em] text-[#d4af37]/80 ${playfair.className}`}>Capture</span>
                </div>
              </div>

              <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111]/40 text-white backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50 cursor-none">
                <span className="material-symbols-outlined font-light">share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
