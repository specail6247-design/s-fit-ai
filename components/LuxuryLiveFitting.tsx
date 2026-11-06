"use client";

import React, { useState } from "react";
/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */
import { Playfair_Display, Inter } from "next/font/google";
import { LuxuryCursor } from "./ui/LuxuryCursor";
import { LuxuryImageDistortion } from "./ui/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"], display: "optional" });
const inter = Inter({ subsets: ["latin"], display: "optional" });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState("AURA");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LuxuryCursor />

      <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#C9B037] ${inter.className}`}>
        {/* Loading State: Thin Gold Line Tracing */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]">
            <div className="relative h-64 w-48">
              <div className="absolute inset-0 border border-[#C9B037]/20"></div>
              <div
                className="absolute inset-0 border border-[#d4af37]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  animation: "traceBox 2s ease-in-out infinite"
                }}
              ></div>
              <style>{`
                @keyframes traceBox {
                  0% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
                  25% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
                  50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                  75% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 0; }
                }
              `}</style>
            </div>
            <p className={`absolute mt-80 text-sm tracking-[0.3em] uppercase text-[#d4af37] ${playfair.className}`}>Curating your experience</p>
          </div>
        )}

        {/* Brand Experience Parallax Banner */}
        <div className="absolute inset-0 z-0 h-[40vh] w-full overflow-hidden opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=2000')",
              transform: "translateZ(-1px) scale(2)" // basic parallax setup class logic
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#050505]"></div>
        </div>

        {/* Main Viewport Container */}
        <div className="relative z-10 flex h-full w-full flex-col px-8">

          {/* Top Navigation */}
          <div className="flex items-center justify-between py-12">
            <button className="text-[#C9B037]/60 transition-colors duration-700 hover:text-[#d4af37]">
              <span className="material-symbols-outlined font-light text-3xl">close</span>
            </button>
            <div className={`text-center ${playfair.className}`}>
              <h2 className="text-3xl font-normal tracking-[0.2em] uppercase text-[#d4af37]">Luxury Room</h2>
              <p className="mt-2 text-xs tracking-widest text-[#C9B037]/50 uppercase">{selectedBrand}</p>
            </div>
            <button className="text-[#C9B037]/60 transition-colors duration-700 hover:text-[#d4af37]">
              <span className="material-symbols-outlined font-light text-3xl">tune</span>
            </button>
          </div>

          {/* Brand Description */}
          <div className="mx-auto mt-4 max-w-md text-center">
            <p className="text-sm font-light leading-relaxed tracking-wider text-[#C9B037]/70">
              Experience the pinnacle of craftsmanship. Our AI precisely maps every contour to ensure an impeccable fit for {selectedBrand}'s finest pieces.
            </p>
          </div>

          {/* HUD & Main Visual Area */}
          <div className="relative mt-12 flex flex-1 items-center justify-center">
            {/* The Main Fitting Image with Distortion */}
            <div className="relative h-[60vh] w-full max-w-lg overflow-hidden border border-[#C9B037]/20 p-2">
              <LuxuryImageDistortion
                imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury fitting user reflection"
                className="h-full w-full object-cover transition-all duration-1000"
              />
              {/* Corner Accents */}
              <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#d4af37]"></div>
              <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#d4af37]"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8">
              <div className="flex flex-col gap-2 border-l border-[#C9B037]/20 pl-4 transition-all duration-700 hover:border-[#d4af37]">
                <p className="text-[10px] font-light uppercase tracking-widest text-[#C9B037]/50">Shoulder Alignment</p>
                <span className={`text-2xl text-[#d4af37] ${playfair.className}`}>98.5%</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-[#C9B037]/20 pl-4 transition-all duration-700 hover:border-[#d4af37]">
                <p className="text-[10px] font-light uppercase tracking-widest text-[#C9B037]/50">Waist Drape</p>
                <span className={`text-2xl text-[#d4af37] ${playfair.className}`}>Perfect</span>
              </div>
            </div>
          </div>

          {/* Bottom Masonry/Vertical Products */}
          <div className="mt-auto pb-12 pt-8">
            <h3 className={`mb-6 text-sm tracking-[0.2em] uppercase text-[#C9B037]/60 ${playfair.className}`}>The Collection</h3>
            <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
              {[
                { name: "Aura Silk Blazer", price: 12500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", h: "h-64" },
                { name: "Velvet Evening Gown", price: 28400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", h: "h-72" },
                { name: "Cashmere Trench", price: 15800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", h: "h-64" },
              ].map((item, i) => (
                <div key={i} className="group flex min-w-[200px] flex-col gap-4 cursor-pointer">
                  <div className={`relative w-full ${item.h} overflow-hidden bg-[#111] transition-all duration-1000 group-hover:scale-[1.02]`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover opacity-80 saturate-[0.9] contrast-[1.1] transition-all duration-1000 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className={`text-sm tracking-wider text-[#C9B037] transition-colors duration-700 group-hover:text-[#d4af37] ${playfair.className}`}>{item.name}</p>
                    <p className="text-xs font-light text-[#C9B037]/50">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
