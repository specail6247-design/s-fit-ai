
"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { LuxuryImageDistortion } from "./LuxuryImageDistortion";
import { GoldRingCursor } from "./GoldRingCursor";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand] = useState("S_FIT EXCLUSIVE");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex h-screen w-full items-center justify-center bg-[#0a0a0a] ${cinzel.className}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-32 w-24">
            <div className="absolute inset-0 border border-white/10" />
            <div className="absolute top-0 left-0 h-0 w-0 border-t border-[#ecab13] transition-all duration-[2000ms] ease-in-out animate-[drawTop_2s_forwards]" />
            <div className="absolute top-0 right-0 h-full w-0 border-r border-[#ecab13] transition-all duration-[2000ms] ease-in-out animate-[drawRight_2s_forwards]" />
            <div className="absolute bottom-0 right-0 h-0 w-0 border-b border-[#ecab13] transition-all duration-[2000ms] ease-in-out animate-[drawBottom_2s_forwards]" />
            <div className="absolute bottom-0 left-0 h-full w-0 border-l border-[#ecab13] transition-all duration-[2000ms] ease-in-out animate-[drawLeft_2s_forwards]" />
          </div>
          <h2 className="text-[#ecab13] text-sm tracking-[0.3em] uppercase">Preparing Luxury Fitting</h2>
        </div>
        <style jsx global>{`
          @keyframes drawTop { to { width: 100%; } }
          @keyframes drawRight { to { height: 100%; } }
          @keyframes drawBottom { to { width: 100%; } }
          @keyframes drawLeft { to { height: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className}`}>
      <GoldRingCursor />

      {/* Brand Banner with Parallax */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="relative w-full h-full">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="Luxury Background"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-0" />

      {/* Top Navigation Bar */}
      <div className="z-10 flex items-center justify-between p-8 pt-12">
        <div className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700" style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}>
          <span className="material-symbols-outlined text-white font-light">close</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className={`text-xl font-medium tracking-[0.4em] uppercase text-[#ecab13] ${cinzel.className}`}>{selectedBrand}</h2>
          <p className="text-xs text-white/60 tracking-widest uppercase font-sans">Haute Couture Collection</p>
        </div>
        <div className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700" style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}>
          <span className="material-symbols-outlined text-white font-light">more_horiz</span>
        </div>
      </div>

      {/* Upper HUD */}
      <div className="mt-8 space-y-6 px-8 z-10 flex flex-col items-start w-1/3">
        <div className="rounded-none p-6" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
          <div className="flex flex-col gap-4">
            <h3 className={`text-lg tracking-widest uppercase text-white/80 ${cinzel.className}`}>Pose Calibration</h3>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-light text-[#ecab13]">99%</p>
            </div>
            <div className="h-[1px] w-full bg-white/20">
              <div className="h-full bg-[#ecab13] transition-all duration-1000 ease-in-out" style={{ width: "99%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Masonry Garment Selection (Right Side) */}
      <div className="absolute right-12 top-1/4 z-10 w-64 max-h-[60vh] overflow-y-auto no-scrollbar pb-20">
        <div className="flex flex-col gap-8">
          {[
              { name: "Aura Blazer", price: "$12,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
              { name: "Silk Gown", price: "$13,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Tech Coat", price: "$14,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col gap-4 cursor-pointer transition-all duration-700 hover:scale-105">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 group-hover:border-[#ecab13]/50 transition-colors duration-700">
                  <LuxuryImageDistortion
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <p className={`text-sm tracking-widest uppercase text-white/90 ${cinzel.className}`}>{item.name}</p>
                  <p className="text-sm text-[#ecab13] mt-1 font-sans">{item.price}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom UI Section */}
      <div className="mt-auto pb-12 z-10 flex justify-center w-full">
        {/* Capture Controls */}
        <div className="flex items-center gap-16">
          <button className="cursor-pointer text-white/70 hover:text-white transition-colors duration-700">
            <span className="text-xs uppercase tracking-[0.2em]">Gallery</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl transition-all duration-1000"></div>
            <button className="relative flex size-24 cursor-pointer items-center justify-center rounded-full border border-[#ecab13] bg-transparent hover:bg-[#ecab13]/10 transition-colors duration-700">
              <div className="flex size-20 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-[#ecab13] font-light">camera</span>
              </div>
            </button>
          </div>

          <button className="cursor-pointer text-white/70 hover:text-white transition-colors duration-700">
            <span className="text-xs uppercase tracking-[0.2em]">Reset</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
