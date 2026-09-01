"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { LuxuryImageDistortion } from "./luxury/LuxuryImageDistortion";
import { CustomCursor } from "./luxury/CustomCursor";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Prada");

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
        <div className="relative size-32">
          {/* Sophisticated loading animation: thin gold line tracing a box */}
          <div className="absolute inset-0 border border-transparent border-t-[#d4af37] animate-[spin_2s_linear_infinite] [animation-play-state:running] [animation-fill-mode:forwards]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}} />
          <div className="absolute inset-2 border border-transparent border-r-[#d4af37] animate-[spin_2s_linear_infinite_reverse]" />
          <div className="absolute inset-4 border border-transparent border-b-[#d4af37] animate-[spin_3s_linear_infinite]" />
        </div>
        <p className={`absolute mt-48 text-[#d4af37] tracking-[0.3em] uppercase text-sm ${playfair.className}`}>Curating Experience</p>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className}`}>
      <CustomCursor />

      {/* Brand Banner with Parallax (mock) */}
      {selectedBrand && (
        <div className="absolute top-0 left-0 w-full h-32 z-0 overflow-hidden opacity-40">
           <div className="w-full h-full bg-cover bg-center transform translate-y-[-10px] scale-110 transition-transform duration-1000 ease-out"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000')" }}
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#0a0a0a]"></div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="relative flex h-full w-full flex-col z-10 pt-8 px-6">

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10">
            <span className="material-symbols-outlined text-white/80 group-hover:text-[#d4af37] transition-colors duration-700">arrow_back</span>
          </button>

          <div className="flex flex-col items-center justify-center">
             <h2 className="text-xl font-medium tracking-[0.2em] uppercase text-white/90">S_FIT<span className="text-[#d4af37] mx-2">|</span>LUXURY</h2>
             {selectedBrand && <p className="text-[#d4af37] text-xs tracking-widest uppercase mt-1 opacity-80">{selectedBrand} Collection</p>}
          </div>

          <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10">
            <span className="material-symbols-outlined text-white/80 group-hover:text-[#d4af37] transition-colors duration-700">favorite_border</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 pb-12">

            {/* Left: Product Info & Description */}
            <div className="w-full md:w-1/3 flex flex-col justify-center space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-4">
                        Metallic Silk <br/><span className="italic text-[#d4af37]">Evening Blazer</span>
                    </h1>
                    <p className="text-xl font-light text-white/90 mb-6">{formatPrice(12500)}</p>
                    <div className="w-12 h-[1px] bg-[#d4af37]/50 mb-6"></div>
                    <p className="text-white/60 text-sm leading-relaxed font-sans tracking-wide">
                        An embodiment of modern elegance. Crafted from a proprietary blend of high-twist Italian silk and fine metallic threads, this piece flows like liquid gold.
                        The S_FIT AI engine perfectly maps its unique draping characteristics to your digital silhouette.
                    </p>
                </div>

                <div className="space-y-4">
                    <button className="w-full py-4 border border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-1000 uppercase tracking-widest text-sm font-medium">
                        Purchase Collection
                    </button>
                    <button className="w-full py-4 border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-all duration-1000 uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">360</span>
                        View Details
                    </button>
                </div>
            </div>

            {/* Right/Center: Luxury Image Distortion Viewport */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-auto relative rounded-sm overflow-hidden border border-white/5">
                <LuxuryImageDistortion
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                    alt="Luxury Garment Fit"
                />

                {/* Floating Metrics */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-4 font-sans">
                    <div className="flex flex-col items-end">
                        <span className="text-[#d4af37] text-xs uppercase tracking-widest mb-1">Drape Realism</span>
                        <span className="text-2xl font-light">99.8%</span>
                    </div>
                     <div className="flex flex-col items-end">
                        <span className="text-[#d4af37] text-xs uppercase tracking-widest mb-1">Fabric Weight</span>
                        <span className="text-lg font-light text-white/70">240 GSM</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
