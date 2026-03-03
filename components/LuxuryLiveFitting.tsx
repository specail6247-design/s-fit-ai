"use client";

import React, { useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import CustomCursor from "./CustomCursor";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

const BRAND_DETAILS = {
  "AURA": {
    name: "AURA",
    bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000",
    description: "Defining the silhouette of modern luxury through meticulous tailoring and structural innovation."
  },
  "SILK & STEEL": {
    name: "SILK & STEEL",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    description: "The intersection of ethereal softness and industrial edge."
  }
};

const GARMENTS = [
  {
    id: 1,
    name: "Aura Blazer",
    price: 2400,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0",
    brand: "AURA"
  },
  {
    id: 2,
    name: "Silk Gown",
    price: 3100,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0",
    brand: "SILK & STEEL"
  },
  {
    id: 3,
    name: "Moto Jacket",
    price: 1800,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA",
    brand: "AURA"
  },
  {
    id: 4,
    name: "Tech Coat",
    price: 4500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk",
    brand: "SILK & STEEL"
  },
];

export default function LuxuryLiveFitting() {
  const [activeGarment, setActiveGarment] = useState(GARMENTS[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleGarmentSelect = (garment: typeof GARMENTS[0]) => {
    setIsLoading(true);
    setActiveGarment(garment);

    // Simulate complex AI processing time
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const currentBrand = BRAND_DETAILS[activeGarment.brand as keyof typeof BRAND_DETAILS];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${spaceGrotesk.className}`}>
      <CustomCursor />

      {/* Background with Parallax effect based on Brand */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-[0.16,1,0.3,1] scale-105"
          style={{
            backgroundImage: `url('${currentBrand?.bannerImage || ''}')`,
            opacity: 0.15,
            transform: `scale(${isLoading ? 1.1 : 1.05})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>

      {/* Main AR Viewport Container */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-6 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/50">
            <span className="material-symbols-outlined text-white">close</span>
          </div>

          <div className="flex flex-col items-center">
            <h2 className={`text-xl text-[#ecab13] tracking-[0.3em] uppercase ${cinzel.className}`}>
              Luxury Fit
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="size-1.5 animate-pulse rounded-full bg-[#ecab13]"></div>
              <span className="text-[10px] uppercase tracking-widest text-white/50">Live Sync</span>
            </div>
          </div>

          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/50">
            <span className="material-symbols-outlined text-white">tune</span>
          </div>
        </div>

        {/* Brand Experience Header */}
        <div className="px-8 mt-6 max-w-2xl mx-auto text-center transition-all duration-1000">
          <h1 className={`text-4xl md:text-5xl font-light text-white mb-4 ${cinzel.className}`}>
            {currentBrand.name}
          </h1>
          <p className="text-sm text-white/60 font-light leading-relaxed max-w-md mx-auto">
            {currentBrand.description}
          </p>
        </div>

        {/* Central Fitting View (LuxuryImageDistortion) */}
        <div className="relative flex-1 flex items-center justify-center w-full px-4 my-8">
          {/* Main User Camera Frame */}
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_50px_rgba(236,171,19,0.05)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')"
              }}
            />

            {/* The Garment Overlay using 3D Distortion */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
               <LuxuryImageDistortion imageUrl={activeGarment.img} className="w-full h-full mix-blend-screen opacity-80" />
            </div>

            {/* Sophisticated Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="relative w-32 h-40">
                  {/* Thin gold line tracing box animation */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent animate-[traceTop_2s_ease-in-out_infinite]" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent animate-[traceBottom_2s_ease-in-out_infinite]" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ecab13] to-transparent animate-[traceLeft_2s_ease-in-out_infinite]" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ecab13] to-transparent animate-[traceRight_2s_ease-in-out_infinite]" />

                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                    <span className="material-symbols-outlined text-[#ecab13] animate-pulse">auto_awesome</span>
                    <span className="text-[10px] text-[#ecab13] uppercase tracking-widest">Tailoring</span>
                  </div>
                </div>
              </div>
            )}

            {/* UI Overlays inside frame */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
               <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/10 flex flex-col gap-1">
                 <p className="text-[10px] text-[#ecab13] uppercase tracking-wider font-bold">Fabric Integrity</p>
                 <p className="text-xl font-light text-white">99.8%</p>
               </div>

               <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/10 text-right">
                 <p className="text-[10px] text-white/60 uppercase tracking-wider">{activeGarment.brand}</p>
                 <p className="text-lg font-bold text-white">{formatPrice(activeGarment.price)}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Vertical / Masonry Carousel */}
        <div className="mt-auto pb-8 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex overflow-x-auto px-6 py-4 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            {GARMENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleGarmentSelect(item)}
                className={`group flex min-w-[140px] flex-col gap-3 transition-all duration-700 ${activeGarment.id === item.id ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-80'}`}
              >
                <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl border transition-colors duration-700 ${activeGarment.id === item.id ? 'border-[#ecab13]' : 'border-white/10'}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                  {activeGarment.id === item.id && (
                    <div className="absolute inset-0 border border-[#ecab13] rounded-xl shadow-[inset_0_0_20px_rgba(236,171,19,0.2)]"></div>
                  )}
                </div>
                <div className="text-left px-1">
                  <p className="truncate text-xs font-medium uppercase tracking-wider text-white">{item.name}</p>
                  <p className="text-[11px] text-[#ecab13] mt-1">{formatPrice(item.price)}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Capture Controls - Luxury Redesign */}
          <div className="flex items-center justify-center gap-12 mt-4">
            <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white transition-all duration-700">
              <span className="material-symbols-outlined">favorite</span>
            </button>

            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/20 blur-xl transition-all duration-700 group-hover:bg-[#ecab13]/40"></div>
              <button className="relative flex size-20 items-center justify-center rounded-full border border-[#ecab13] bg-black transition-all duration-700 group-hover:scale-105">
                <div className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-[#ecab13]">
                   <span className="material-symbols-outlined text-black text-3xl">camera</span>
                </div>
              </button>
            </div>

            <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white transition-all duration-700">
              <span className="material-symbols-outlined">ios_share</span>
            </button>
          </div>
        </div>

        {/* Safe Area */}
        <div className="mx-auto mb-2 h-1.5 w-32 rounded-full bg-white/20"></div>
      </div>

      {/* Tailwind Animations for Tracing Box */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes traceTop {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
        @keyframes traceBottom {
          0%, 50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes traceLeft {
          0%, 50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes traceRight {
          0% { transform: translateY(-100%); }
          50%, 100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
}
