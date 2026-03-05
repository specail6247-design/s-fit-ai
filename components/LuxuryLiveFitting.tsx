"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import GoldRingCursor from "./GoldRingCursor";

const cinzel = Cinzel({ subsets: ["latin"] });

const BRAND_DETAILS = {
  GUCCI: {
    name: "Gucci",
    description: "Florence, 1921. Eclectic, contemporary, romantic—products represent the pinnacle of Italian craftsmanship.",
    banner: "https://images.unsplash.com/photo-1542295669297-4d352b042bce?auto=format&fit=crop&q=80&w=1000",
  },
  CHANEL: {
    name: "Chanel",
    description: "Paris, 1910. The ultimate symbol of timeless elegance and sophisticated modernity.",
    banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000",
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<keyof typeof BRAND_DETAILS | null>("GUCCI");
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for luxury experience
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white ${cinzel.className}`}>
      <GoldRingCursor />

      {/* Initializing Loader */}
      {isInitializing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative size-16">
              {/* Outer rotating box */}
              <motion.div
                className="absolute inset-0 border border-[#ecab13]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner tracing lines */}
              <motion.div
                className="absolute inset-0 border border-[#ecab13]"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-[#ecab13] text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
              Authenticating
            </p>
          </div>
        </div>
      )}

      {/* Brand Banner Experience (Parallax Effect) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${selectedBrand ? 'opacity-30' : 'opacity-0'}`}
        style={{
          backgroundImage: selectedBrand ? `url(${BRAND_DETAILS[selectedBrand].banner})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Simple Parallax
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      {/* Main Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col duration-700 ease-in-out"
        data-alt="User reflection with luxury garment overlay"
      >
        {/* Background Visual using LuxuryImageDistortion */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full text-[#ecab13] hover:bg-white/5 transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(236, 171, 19, 0.2)" }} aria-label="Close">
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>

          <div className="flex items-center gap-6">
            {(Object.keys(BRAND_DETAILS) as Array<keyof typeof BRAND_DETAILS>).map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`text-sm font-bold tracking-[0.2em] uppercase transition-all duration-700 ${selectedBrand === brand ? 'text-[#ecab13] scale-110 drop-shadow-[0_0_8px_rgba(236,171,19,0.5)]' : 'text-white/50 hover:text-white'}`}
              >
                {brand}
              </button>
            ))}
          </div>

          <button className="flex size-12 items-center justify-center rounded-full text-[#ecab13] hover:bg-white/5 transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(236, 171, 19, 0.2)" }} aria-label="Flash">
            <span className="material-symbols-outlined" aria-hidden="true">flash_on</span>
          </button>
        </div>

        {/* Brand Experience HUD */}
        {selectedBrand && (
          <div className="z-10 absolute left-6 top-1/2 -translate-y-1/2 max-w-[280px]">
            <h1 className="text-4xl font-light tracking-widest text-white mb-4 drop-shadow-md">
              {BRAND_DETAILS[selectedBrand].name}
            </h1>
            <p className="text-xs font-light tracking-wide text-white/70 leading-relaxed border-l border-[#ecab13]/50 pl-4 py-1">
              {BRAND_DETAILS[selectedBrand].description}
            </p>
          </div>
        )}

        {/* Floating Vertical Carousel (Right Side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] scrollbar-hide p-2" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex min-h-40 w-32 flex-col gap-3 rounded-none border border-[#ecab13] bg-black/40 p-2 backdrop-blur-xl transition-all duration-700 hover:scale-105 cursor-pointer">
              <div
                className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat"
                data-alt="Luxury blue blazer thumbnail"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              ></div>
              <div className="px-1 pb-1 text-center">
                <p className="truncate text-xs font-bold uppercase tracking-widest text-white">Aura Blazer</p>
                <p className="text-xs font-light tracking-wider text-[#ecab13]">{formatPrice(2400)}</p>
              </div>
            </div>

            {[
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <div key={i} className="flex min-h-40 w-32 flex-col gap-3 rounded-none border border-white/10 bg-black/40 p-2 backdrop-blur-xl opacity-70 transition-all duration-700 hover:opacity-100 hover:border-white/30 cursor-pointer">
                  <div
                  className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat grayscale-[30%] transition-all duration-700 hover:grayscale-0"
                  style={{ backgroundImage: `url("${item.img}")` }}
                  ></div>
                  <div className="px-1 pb-1 text-center">
                  <p className="truncate text-xs font-bold uppercase tracking-widest text-white">{item.name}</p>
                  <p className="text-xs font-light tracking-wider text-white/50">{formatPrice(item.price)}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capture Controls - Minimalist Gold */}
        <div className="mt-auto pb-12 z-10 flex w-full flex-col items-center">
          <div className="flex items-center justify-center gap-12 p-6 w-full max-w-md">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl duration-1000"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-[#ecab13] bg-black/20 backdrop-blur-md hover:bg-[#ecab13]/10 transition-all duration-700">
                <div className="flex size-20 items-center justify-center rounded-full border-[1px] border-[#ecab13]/50">
                  <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                  </div>
                </div>
              </button>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors duration-700" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>

          {/* System UI Safe Area */}
          <div className="mx-auto mt-4 h-1 w-24 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
}
