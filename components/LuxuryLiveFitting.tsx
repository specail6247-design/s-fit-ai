"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import CustomCursor from "./CustomCursor";

const cinzel = Cinzel({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

const BRAND_DETAILS: Record<string, { banner: string, description: string }> = {
  Gucci: {
    banner: "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=1000",
    description: "Italian luxury fashion house based in Florence, Italy."
  },
  Chanel: {
    banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000",
    description: "French luxury fashion house founded in 1910 by Coco Chanel."
  }
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
  };

  if (isLoading) {
    return (
      <div className={`relative flex h-screen w-full flex-col items-center justify-center bg-[#101922] text-[#ecab13] ${cinzel.className}`}>
        {/* Sophisticated Loading State: Gold line tracing */}
        <div className="relative w-64 h-64 flex flex-col items-center justify-center">
            <div className="absolute inset-0 border border-[#ecab13]/20"></div>
            <div className="absolute inset-0 border-t border-l border-[#ecab13] animate-[spin_3s_linear_infinite] origin-center opacity-70" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 5%, 5% 5%, 5% 100%, 0 100%)' }}></div>
            <h2 className="text-xl tracking-[0.3em] uppercase animate-pulse duration-1000">Loading</h2>
            <p className={`mt-4 text-xs tracking-widest text-white/50 uppercase ${playfair.className}`}>Preparing the experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${cinzel.className}`} style={{ cursor: 'none' }}>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Background Visual - Integrating LuxuryImageDistortion */}
        <div className="absolute inset-0 z-0 opacity-40">
           <LuxuryImageDistortion
              imageUrl={selectedBrand && BRAND_DETAILS[selectedBrand] ? BRAND_DETAILS[selectedBrand].banner : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"}
           />
           {/* Fallback gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent mix-blend-multiply" />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]">
            <span className="material-symbols-outlined text-white/80">close</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2">
            <h2 className={`text-lg font-bold tracking-[0.2em] uppercase text-[#ecab13] ${cinzel.className}`}>Exclusive Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]">
            <span className="material-symbols-outlined text-white/80">menu</span>
          </div>
        </div>

        {/* Brand Parallax Section (if selected) */}
        <div className={`absolute top-24 left-0 right-0 z-10 flex flex-col items-center justify-center px-8 transition-all duration-1000 ease-in-out ${selectedBrand ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
           <h1 className="text-4xl tracking-[0.2em] uppercase text-[#ecab13] mb-4 drop-shadow-lg">{selectedBrand}</h1>
           <p className={`text-sm text-white/80 max-w-md text-center tracking-wider ${playfair.className} bg-black/40 p-4 backdrop-blur-md rounded-lg border border-white/10`}>
             {selectedBrand && BRAND_DETAILS[selectedBrand]?.description}
           </p>
        </div>

        {/* Masonry Layout for Products (Replacing Bottom UI) */}
        <div className="absolute top-1/4 right-8 bottom-32 z-10 w-64 overflow-y-auto scrollbar-hide pr-2 flex flex-col gap-6">
             <div className="text-xs uppercase tracking-widest text-[#ecab13]/70 mb-2 border-b border-[#ecab13]/30 pb-2">Collection</div>

             {[
                  { name: "Aura Blazer", brand: "Gucci", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
                  { name: "Silk Gown", brand: "Chanel", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Tech Coat", brand: "Gucci", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
             ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-3 rounded-lg border border-white/10 bg-black/50 p-3 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/60 cursor-pointer ${selectedBrand && selectedBrand !== item.brand ? 'opacity-30 grayscale' : 'opacity-100'}`}
                  onClick={() => handleBrandClick(item.brand)}
                >
                    <div
                      className={`w-full rounded bg-cover bg-center bg-no-repeat transition-all duration-700 ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}
                      style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-1 pb-1">
                      <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{item.brand}</p>
                      <p className="truncate text-sm tracking-wide text-white">{item.name}</p>
                      <p className={`text-xs text-[#ecab13] mt-2 ${playfair.className}`}>{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
        </div>

        {/* Action Controls - Minimalized */}
        <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-12 p-4">
            <button className="flex flex-col items-center justify-center gap-2 text-white/60 transition-colors duration-700 hover:text-[#ecab13]">
              <span className="material-symbols-outlined text-3xl font-light">view_in_ar</span>
              <span className="text-[10px] uppercase tracking-[0.2em]">AR View</span>
            </button>
            <div className="relative flex items-center justify-center group">
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/20 blur-xl transition-all duration-700 group-hover:bg-[#ecab13]/40"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-black/60 backdrop-blur-md transition-all duration-700 group-hover:scale-105">
                <div className="flex size-16 items-center justify-center rounded-full border border-[#ecab13]/30">
                  <span className="material-symbols-outlined text-3xl text-[#ecab13]">photo_camera</span>
                </div>
              </button>
            </div>
            <button className="flex flex-col items-center justify-center gap-2 text-white/60 transition-colors duration-700 hover:text-[#ecab13]">
              <span className="material-symbols-outlined text-3xl font-light">shopping_bag</span>
              <span className="text-[10px] uppercase tracking-[0.2em]">Cart</span>
            </button>
        </div>

      </div>
    </div>
  );
}
