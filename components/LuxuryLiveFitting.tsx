"use client";

import React, { useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import LuxuryCursor from "./luxury/LuxuryCursor";
import LuxuryImageDistortion from "./luxury/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

// Types
interface Brand {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
}

interface Garment {
  id: string;
  name: string;
  price: number;
  img: string;
}

// Mock Data
const BRANDS: Brand[] = [
  {
    id: "gucci",
    name: "Gucci",
    description: "Italian luxury fashion house based in Florence. Known for eclectic, contemporary, and romantic designs.",
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "prada",
    name: "Prada",
    description: "Italian luxury fashion house specializing in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other fashion accessories.",
    bannerImage: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=2000"
  }
];

const GARMENTS: Garment[] = [
  { id: "1", name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
  { id: "2", name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { id: "3", name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { id: "4", name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand ] = useState<Brand | null>(BRANDS[0]);
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleGarmentSelect = (garment: Garment) => {
    setIsLoading(true);
    setSelectedGarment(garment);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#f4f4f5] ${inter.className}`}>
      <LuxuryCursor />

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Background Image / Camera Feed (Simulated) */}
        <div className="absolute inset-0 z-0">
            {/* The main subject we are fitting onto */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
                }}
            />
            {/* Dark vignette/gradient overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80 pointer-events-none" />
        </div>

        {/* Brand Experience Parallax Background (Visible when a brand is selected) */}
        {selectedBrand && (
            <div
                className="absolute inset-0 z-0 opacity-20 transition-opacity duration-1000 pointer-events-none mix-blend-luminosity"
                style={{
                    backgroundImage: `url('${selectedBrand.bannerImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed', // Parallax effect
                }}
            />
        )}

        {/* Top Navigation */}
        <div className="z-10 flex items-center justify-between p-8">
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined font-light">close</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className={`${playfair.className} text-xl tracking-[0.2em] text-[#d4af37] uppercase`}>
              Couture Fit
            </h2>
            {selectedBrand && (
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 mt-1">
                {selectedBrand.name}
              </span>
            )}
          </div>

          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined font-light">more_horiz</span>
          </button>
        </div>

        {/* Loading Animation (Sophisticated) */}
        {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-700">
                <div className="relative w-48 h-64 border border-white/10 overflow-hidden">
                    {/* Thin gold line tracing the box */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite]" />
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite_0.5s]" />
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite_1s]" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite_1.5s]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`${playfair.className} text-[#d4af37] tracking-[0.2em] animate-pulse text-sm`}>FITTING</span>
                    </div>
                </div>
            </div>
        )}

        {/* Brand Description (Left Side) */}
        {selectedBrand && (
            <div className="absolute left-8 top-1/3 z-10 max-w-[280px]">
                <div className="p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-none">
                    <h3 className={`${playfair.className} text-2xl text-white mb-4`}>{selectedBrand.name}</h3>
                    <p className="text-xs leading-relaxed text-white/70 tracking-wide">
                        {selectedBrand.description}
                    </p>
                </div>
            </div>
        )}

        {/* Bottom Section: Garment Selection */}
        <div className="mt-auto pb-12 z-10">
          <div className="flex overflow-x-auto px-8 py-8 gap-8 scrollbar-hide snap-x">
            {GARMENTS.map((garment) => {
              const isSelected = selectedGarment.id === garment.id;

              return (
                <button
                  key={garment.id}
                  onClick={() => handleGarmentSelect(garment)}
                  className={`relative flex flex-col min-w-[200px] snap-center transition-all duration-1000 group ${isSelected ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-100'}`}
                >
                  {/* Aspect ratio changed to more vertical/masonry style */}
                  <div className={`relative aspect-[3/5] w-full mb-4 overflow-hidden bg-[#111] transition-all duration-1000 ${isSelected ? 'border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border border-white/5 group-hover:border-white/20'}`}>
                    {/* Using the LuxuryImageDistortion for the product visual */}
                    <div className="absolute inset-0">
                        <LuxuryImageDistortion imageUrl={garment.img} className="w-full h-full" />
                    </div>
                    {isSelected && (
                        <div className="absolute inset-0 border border-[#d4af37] opacity-50 transition-opacity duration-1000 pointer-events-none" />
                    )}
                  </div>

                  <div className="text-left">
                    <p className={`${playfair.className} text-lg text-white mb-1 tracking-wide`}>{garment.name}</p>
                    <p className="text-sm text-[#d4af37] tracking-wider">{formatPrice(garment.price)}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-center gap-12 mt-4">
            <button className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-[#d4af37]/50 text-white/70 hover:text-white">
              <span className="material-symbols-outlined font-light">tune</span>
            </button>

            <button className="group relative flex size-24 items-center justify-center rounded-full">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 transition-all duration-1000 group-hover:scale-110 group-hover:border-[#d4af37]" />
              <div className="absolute inset-2 rounded-full border border-[#d4af37]/50 transition-all duration-1000 group-hover:scale-95" />
              <div className="flex size-16 items-center justify-center rounded-full bg-white transition-all duration-1000 group-hover:bg-[#d4af37]">
                <span className="material-symbols-outlined text-2xl text-black">camera</span>
              </div>
            </button>

            <button className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:bg-white/10 hover:border-[#d4af37]/50 text-white/70 hover:text-white">
              <span className="material-symbols-outlined font-light">favorite_border</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
