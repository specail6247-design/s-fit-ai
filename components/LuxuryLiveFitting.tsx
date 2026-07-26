"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { LuxuryImageDistortion } from "./ui/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

const brands = [
  {
    name: "Aura",
    description: "Modern elegance refined for the digital age.",
    bannerImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"
  },
  {
    name: "Lumina",
    description: "Avant-garde silhouettes bathed in light.",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
  }
];

const garments = [
  { name: "Silk Gown", price: 3100, img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=1000", brand: "Aura" },
  { name: "Velvet Jacket", price: 2400, img: "https://images.unsplash.com/photo-1550614000-4b95dd244cb8?auto=format&fit=crop&q=80&w=1000", brand: "Aura" },
  { name: "Tech Coat", price: 4500, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000", brand: "Lumina" },
];

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className={`relative flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-[#C9B037] ${playfair.className}`}>
        <div className="relative w-48 h-64 border border-[#C9B037]/20 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9B037] to-transparent animate-[shimmer_2s_infinite]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9B037] to-transparent animate-[shimmer_2s_infinite]"></div>
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9B037] to-transparent animate-[shimmer_2s_infinite]"></div>
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9B037] to-transparent animate-[shimmer_2s_infinite]"></div>
            <span className="text-xl tracking-widest uppercase animate-pulse">S_FIT AI</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${playfair.className} cursor-none`}>
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full border-2 border-[#C9B037] transition-transform duration-100 ease-out flex items-center justify-center"
        style={{ transform: `translate(${cursorPos.x - 16}px, ${cursorPos.y - 16}px)` }}
      >
          <div className="w-1 h-1 bg-[#C9B037] rounded-full"></div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Parallax Banner Background */}
        <div className="absolute inset-0 z-0">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                style={{
                    backgroundImage: `url('${selectedBrand.bannerImage}')`,
                    filter: "brightness(0.3)"
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        </div>

        {/* Top Navigation */}
        <div className="z-10 flex items-center justify-between p-8">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-[#C9B037]">Live Fit AI</h2>
          <div className="flex gap-4">
              {brands.map(brand => (
                  <button
                    key={brand.name}
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-sm tracking-widest uppercase transition-colors duration-700 ${selectedBrand.name === brand.name ? 'text-[#C9B037]' : 'text-white/50 hover:text-white'}`}
                  >
                      {brand.name}
                  </button>
              ))}
          </div>
        </div>

        {/* Brand Info */}
        <div className="z-10 px-8 py-4 flex flex-col items-center justify-center flex-1">
             <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#C9B037] to-[#F4E4BC] mb-4">
                {selectedBrand.name}
            </h1>
            <p className="text-lg md:text-xl text-white/70 italic tracking-wider max-w-2xl text-center">
                &quot;{selectedBrand.description}&quot;
            </p>
        </div>

        {/* Bottom Carousel */}
        <div className="mt-auto pb-16 z-10 w-full">
          <div className="flex overflow-x-auto px-8 py-8 gap-8 scrollbar-hide items-end">
             {garments.filter(g => g.brand === selectedBrand.name).map((item, i) => (
                <div key={i} className="flex min-w-[280px] flex-col gap-4 group">
                    <div className="w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/10 group-hover:border-[#C9B037]/50 transition-colors duration-700">
                        <LuxuryImageDistortion
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1 items-center text-center">
                        <p className="text-sm font-semibold tracking-widest uppercase text-white group-hover:text-[#C9B037] transition-colors duration-700">{item.name}</p>
                        <p className="text-sm text-white/50 tracking-wider font-sans">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(item.price)}
                        </p>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
