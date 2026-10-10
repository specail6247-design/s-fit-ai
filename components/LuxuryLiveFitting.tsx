"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
/* eslint-disable-next-line @next/next/no-page-custom-font */
import { Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], display: "optional" });

const BRANDS = [
  {
    id: "gucci",
    name: "Gucci",
    description: "Italian luxury house renowned for eclectic and contemporary design.",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "chanel",
    name: "Chanel",
    description: "The epitome of timeless elegance and haute couture.",
    bannerImage: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000",
  }
];

const PRODUCTS = [
  { name: "Silk Evening Gown", price: 12500, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000", brand: "chanel" },
  { name: "Velvet Tuxedo Jacket", price: 8900, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000", brand: "gucci" },
  { name: "Cashmere Overcoat", price: 15200, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=1000", brand: "chanel" },
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [isFitting, setIsFitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
        <div className="relative size-32">
          <style>{`
            @keyframes drawBox {
              to { stroke-dashoffset: 0; }
            }
          `}</style>
          <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100">
             <rect x="10" y="10" width="80" height="80" fill="none" stroke="#d4af37" strokeWidth="1"
                   strokeDasharray="320" strokeDashoffset="320"
                   style={{ animation: 'drawBox 3s ease-in-out infinite' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${cinzel.className} text-[#d4af37] text-xs tracking-widest`}>S_FIT</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/50 mix-blend-difference transition-transform duration-700 ease-out"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        ></div>
        <div
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37] mix-blend-difference"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        ></div>
      </div>

      {/* Background Main Visual */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isFitting ? 'opacity-100' : 'opacity-40'}`}>
        <LuxuryImageDistortion
          src={selectedBrand.bannerImage}
          alt={`${selectedBrand.name} Brand Visual`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90"></div>
      </div>

      {/* UI Overlay - Fades out during fitting for Digital Mirror effect */}
      <div className={`relative z-10 flex h-full flex-col transition-opacity duration-1000 ${isFitting ? 'opacity-0' : 'opacity-100'}`}>

        {/* Header */}
        <header className="flex items-center justify-between p-8">
          <h1 className={`${cinzel.className} text-2xl text-[#d4af37] tracking-[0.2em] uppercase`}>
            Luxury Mode
          </h1>
          <div className="flex gap-4">
            {BRANDS.map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`text-xs tracking-widest uppercase transition-colors duration-700 ${selectedBrand.id === brand.id ? 'text-[#d4af37]' : 'text-white/50 hover:text-white'}`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </header>

        {/* Brand Description */}
        <div className="px-8 mt-4 max-w-md">
          <p className="text-sm font-light leading-relaxed text-white/70">
            {selectedBrand.description}
          </p>
        </div>

        {/* Product Selection - Vertical Masonry Layout */}
        <div className="mt-auto px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PRODUCTS.filter(p => p.brand === selectedBrand.id).map((product, idx) => (
              <div key={idx} className="group flex flex-col gap-4 cursor-none">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    style={{ filter: "saturate(0.9) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className={`${cinzel.className} text-lg text-white/90`}>{product.name}</h3>
                  <p className="text-[#d4af37] text-sm tracking-widest">{formatPrice(product.price)}</p>
                </div>
                <button
                  onClick={() => setIsFitting(true)}
                  className="mt-4 border border-[#d4af37]/30 py-3 text-xs tracking-widest uppercase text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-700"
                >
                  Virtual Try-On
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Mirror Exit Control */}
      {isFitting && (
        <div className="absolute bottom-12 left-1/2 z-50 -translate-x-1/2">
          <button
            onClick={() => setIsFitting(false)}
            className={`${cinzel.className} px-8 py-3 border border-[#d4af37] text-[#d4af37] text-sm tracking-widest bg-black/50 backdrop-blur-md hover:bg-[#d4af37] hover:text-black transition-all duration-700`}
          >
            Exit Mirror
          </button>
        </div>
      )}
    </div>
  );
}
