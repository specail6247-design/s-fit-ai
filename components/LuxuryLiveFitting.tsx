"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./luxury/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState({
    name: "MAISON MARGIELA",
    bannerImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    description: "Haute Couture Collection",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className={`relative flex h-screen w-full items-center justify-center bg-[#0a0a0a] text-[#d4af37] ${playfair.className}`}>
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 border border-[#d4af37]/20"></div>
          <div className="absolute inset-0 border-t border-l border-[#d4af37] animate-[spin_3s_linear_infinite]" style={{ transformOrigin: 'center' }}></div>
          <div className="absolute inset-0 border-b border-r border-[#d4af37] animate-[spin_2s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }}></div>
          <p className="text-sm tracking-[0.3em] uppercase animate-pulse">Initializing</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${playfair.className}`}>
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border border-[#d4af37] transition-transform duration-75"
        style={{
          width: '40px',
          height: '40px',
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
        }}
      />

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Main Product Visual */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury garment display"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        {/* Brand Banner Experience */}
        <div className="absolute top-0 w-full h-48 z-0 overflow-hidden opacity-30">
           <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${selectedBrand.bannerImage}')`,
              transform: 'translateY(-10px)'
            }}
          />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-12">
          <button className="flex size-14 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-[#d4af37]">close</span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl tracking-[0.2em] uppercase text-[#d4af37] font-light">{selectedBrand.name}</h1>
            <p className="text-xs tracking-widest text-white/70">{selectedBrand.description}</p>
          </div>

          <button className="flex size-14 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-[#d4af37]">favorite_border</span>
          </button>
        </div>

        {/* Right Info Panel */}
        <div className="absolute right-12 top-1/3 z-10 flex flex-col gap-8 max-w-xs">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-light leading-tight">Cashmere<br/>Overcoat</h2>
            <p className={`text-2xl text-[#d4af37] tracking-wider ${spaceGrotesk.className}`}>$12,500</p>
          </div>

          <p className={`text-sm text-white/60 leading-relaxed font-light ${spaceGrotesk.className}`}>
            Crafted from rare Mongolian cashmere, this masterpiece redefines winter elegance. The drape responds to your movement with unparalleled grace.
          </p>

          <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent" />

          <div className={`flex flex-col gap-4 text-xs uppercase tracking-widest text-white/50 ${spaceGrotesk.className}`}>
            <div className="flex justify-between items-center group cursor-none">
              <span className="group-hover:text-[#d4af37] transition-colors duration-700">Fabric Origin</span>
              <span className="text-white text-right">Italy</span>
            </div>
            <div className="flex justify-between items-center group cursor-none">
              <span className="group-hover:text-[#d4af37] transition-colors duration-700">Craftsmanship</span>
              <span className="text-white text-right">Hand-stitched</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section - Vertical Masonry Style Carousel */}
        <div className="absolute left-12 bottom-12 z-10 w-64 h-[60vh] overflow-y-auto no-scrollbar pb-20">
          <div className="flex flex-col gap-8">
            <h3 className={`text-sm tracking-[0.2em] uppercase text-[#d4af37] mb-4 ${spaceGrotesk.className}`}>Complete the Look</h3>

            {[
              { name: "Silk Blouse", price: "$3,100", img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=600" },
              { name: "Tailored Trousers", price: "$1,850", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600" },
              { name: "Leather Boots", price: "$4,500", img: "https://images.unsplash.com/photo-1608256246200-53e65389ce0d?auto=format&fit=crop&q=80&w=600" },
            ].map((item, i) => (
              <div key={i} className="group relative flex flex-col gap-4 cursor-none overflow-hidden pb-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 group-hover:border-[#d4af37]/50 transition-colors duration-1000">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                <div className="flex justify-between items-baseline px-2">
                  <p className={`text-sm tracking-wider uppercase text-white/80 group-hover:text-white transition-colors duration-700 ${spaceGrotesk.className}`}>{item.name}</p>
                  <p className={`text-sm tracking-widest text-[#d4af37] ${spaceGrotesk.className}`}>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="absolute bottom-12 right-12 z-10 flex items-center gap-6">
          <button className={`group relative overflow-hidden rounded-full border border-[#d4af37] bg-transparent px-12 py-4 transition-all duration-700 hover:bg-[#d4af37] ${spaceGrotesk.className}`}>
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase text-[#d4af37] group-hover:text-black transition-colors duration-700">Virtual Try-On</span>
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
