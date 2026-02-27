"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// --- MOCK DATA FOR LUXURY MODE ---
const LUXURY_ITEMS = [
  {
    id: "lx-001",
    name: "Aura Blazer",
    brand: "Gucci",
    price: 2400,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
  },
  {
    id: "lx-002",
    name: "Silk Gown",
    brand: "Chanel",
    price: 3100,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0"
  },
  {
    id: "lx-003",
    name: "Moto Jacket",
    brand: "Saint Laurent",
    price: 1800,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA"
  },
  {
    id: "lx-004",
    name: "Tech Coat",
    brand: "Prada",
    price: 4500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk"
  }
];

const BRAND_DETAILS: Record<string, { description: string, banner: string }> = {
  "Gucci": {
    description: "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion.",
    banner: "https://images.unsplash.com/photo-1548695602-9907f1e73715?auto=format&fit=crop&q=80&w=2000"
  },
  "Chanel": {
    description: "A brand that has become the symbol of French elegance and timeless style.",
    banner: "https://images.unsplash.com/photo-1541336032412-2048a6143d16?auto=format&fit=crop&q=80&w=2000"
  },
  "Saint Laurent": {
    description: "Iconic French fashion house known for its modern and iconic pieces.",
    banner: "https://images.unsplash.com/photo-1536998003793-b13c28fae74b?auto=format&fit=crop&q=80&w=2000"
  },
  "Prada": {
    description: "Thinking about fashion since 1913. Prada is synonymous with cutting-edge style.",
    banner: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?auto=format&fit=crop&q=80&w=2000"
  }
};

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(LUXURY_ITEMS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Custom Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulate loading when item changes
  const handleItemSelect = (item: typeof LUXURY_ITEMS[0]) => {
    if (item.id === selectedItem.id) return;
    setIsLoading(true);
    setSelectedItem(item);
    setTimeout(() => setIsLoading(false), 2000); // 2s simulated loading
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const brandInfo = BRAND_DETAILS[selectedItem.brand] || {
    description: "Exclusive luxury fashion piece.",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
  };

  // Slower transition for luxury feel
  const transitionClass = "transition-all duration-700 ease-[0.16,1,0.3,1]";

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white cursor-none ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed z-[100] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37] mix-blend-difference transition-transform duration-100 ease-out will-change-transform"
        style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: `translate(-50%, -50%) scale(${isLoading ? 0.5 : 1})`
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-sm"></div>
      </div>

      {/* Main Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-row"
        data-alt="Luxury fitting interface"
      >
        {/* Left Side: Product Details & Brand Experience */}
        <div className="z-20 flex h-full w-1/3 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl p-8 pt-12">
            <div className={`mb-8 ${transitionClass}`}>
                <h1 className={`${cinzel.className} text-4xl text-[#D4AF37] mb-2 tracking-wide`}>S_FIT LUXE</h1>
                <p className="text-white/60 text-xs tracking-[0.2em] uppercase">Private Atelier</p>
            </div>

            {/* Brand Banner Experience */}
            <div className={`relative mb-8 h-32 w-full overflow-hidden rounded-sm border-y border-[#D4AF37]/20 ${transitionClass}`}>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 grayscale transition-transform duration-[2000ms]"
                    style={{ backgroundImage: `url('${brandInfo.banner}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-4 flex flex-col justify-center">
                    <h2 className={`${cinzel.className} text-2xl text-white mb-1`}>{selectedItem.brand}</h2>
                    <p className="text-[10px] text-white/70 max-w-[80%] leading-relaxed">{brandInfo.description}</p>
                </div>
            </div>

            {/* Vertical Product List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6 pr-2">
                {LUXURY_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className={`group relative cursor-pointer ${selectedItem.id === item.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'} transition-all duration-500`}
                    >
                         <div className={`aspect-[3/4] w-full overflow-hidden rounded-sm border ${selectedItem.id === item.id ? 'border-[#D4AF37]/50' : 'border-white/5'} transition-colors duration-500`}>
                            <div
                                className={`h-full w-full bg-cover bg-center ${selectedItem.id !== item.id && 'grayscale'} group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105`}
                                style={{ backgroundImage: `url("${item.img}")` }}
                            ></div>
                        </div>
                        <div className={`mt-3 flex justify-between items-baseline border-b ${selectedItem.id === item.id ? 'border-[#D4AF37]/30 pb-4' : 'border-white/5 pb-3'} transition-all duration-500`}>
                            <div>
                                <h3 className={`${cinzel.className} ${selectedItem.id === item.id ? 'text-xl' : 'text-lg'} text-white transition-all`}>{item.name}</h3>
                                <p className={`${selectedItem.id === item.id ? 'text-[#D4AF37]' : 'text-white/40'} text-xs mt-1 uppercase tracking-wider transition-colors`}>{item.brand}</p>
                            </div>
                            <p className={`${cinzel.className} ${selectedItem.id === item.id ? 'text-lg text-white/90' : 'text-md text-white/70'} transition-all`}>{formatPrice(item.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Side: Main Visualization */}
        <div className="relative flex-1 bg-[#050505] overflow-hidden">
            {/* 3D Distortion Effect Background */}
             <div className="absolute inset-0 z-0 opacity-60">
                <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
             </div>

             {/* Selected Item Overlay (Faded) */}
             <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {/* This mimics the item being 'worn' or present in the scene */}
             </div>

            {/* Loading State: Tracing Gold Line */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative h-64 w-64">
                         {/* SVG Tracing Animation */}
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                             <rect
                                x="5" y="5" width="90" height="90"
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="0.5"
                                strokeDasharray="400"
                                strokeDashoffset="400"
                                className="animate-[dash_2s_ease-in-out_forwards]"
                             />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`${cinzel.className} text-[#D4AF37] text-xs tracking-[0.4em] animate-pulse`}>FITTING</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Right Controls */}
            <div className="absolute top-8 right-8 z-30 flex items-center gap-6">
                 <button className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors duration-300">
                    Exit Atelier
                 </button>
                 <div className="h-px w-12 bg-[#D4AF37]/50"></div>
                 <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 backdrop-blur-md cursor-pointer hover:bg-[#D4AF37]/10 transition-colors">
                    <span className="material-symbols-outlined text-[#D4AF37] text-xl">shopping_bag</span>
                </div>
            </div>

            {/* Center: Live Fit Status */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/30"></div>
                    <button className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37] bg-black/50 backdrop-blur-md transition-all hover:bg-[#D4AF37]/10 hover:scale-105 duration-500">
                        <span className="material-symbols-outlined text-2xl text-[#D4AF37]">camera</span>
                    </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/80">Capture Look</p>
            </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
