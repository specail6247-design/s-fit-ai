"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`cursor-gold-ring relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-[#F5F5F5] ${spaceGrotesk.className}`}>
      {/* Brand Experience Parallax Background */}
      <div
        className="absolute inset-0 opacity-30 transition-transform duration-1000 ease-out hover:scale-105"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
      ></div>

      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
            <div className="relative h-40 w-24">
                {/* Thin gold line tracing a box animation */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 160">
                    <rect
                        x="2" y="2" width="96" height="156"
                        fill="none" stroke="#ecab13" strokeWidth="1"
                        strokeDasharray="512" strokeDashoffset="512"
                        className="animate-[dash_2s_ease-in-out_infinite]"
                    />
                </svg>
            </div>
            <h2 className={`${cinzel.className} mt-8 text-xl font-light tracking-[0.2em] text-[#ecab13] uppercase`}>Preparing Atelier</h2>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="z-10 flex items-center justify-between p-8 pt-12">
        <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/50">
          <span className="material-symbols-outlined text-white/80 font-light">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
            <h1 className={`${cinzel.className} text-2xl tracking-[0.3em] uppercase text-[#ecab13]`}>Gucci</h1>
            <p className="text-[10px] tracking-widest text-white/50 uppercase mt-2 font-light">High Jewellery & Couture</p>
        </div>
        <button className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/50">
          <span className="material-symbols-outlined text-white/80 font-light">tune</span>
        </button>
      </div>

      {/* Main Content Area - Layout with whitespace */}
      <div className="z-10 flex flex-1 items-center justify-between px-16 pb-12">

          {/* Left: Product List (Vertical) */}
          <div className="flex h-full w-[300px] flex-col gap-8 overflow-y-auto pr-4 scrollbar-hide pt-10">
              {[
                  { name: "Silk Georgette Gown", price: 12500, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000", brand: "GUCCI" },
                  { name: "Velvet Evening Jacket", price: 8400, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000", brand: "GUCCI" },
                  { name: "Embroidered Cape", price: 15200, img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1000", brand: "GUCCI" },
              ].map((item, i) => (
                  <div key={i} className="group flex flex-col gap-4 cursor-gold-ring">
                      <div className="aspect-[3/4] w-full overflow-hidden">
                         <LuxuryImageDistortion src={item.img} alt={item.name} className="w-full h-full" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                          <p className={`${cinzel.className} text-xs tracking-widest text-white/60 mb-1`}>{item.brand}</p>
                          <p className={`${cinzel.className} text-sm tracking-wider text-white transition-colors duration-700 group-hover:text-[#ecab13]`}>{item.name}</p>
                          <p className="mt-2 text-xs text-white/40">{formatPrice(item.price)}</p>
                      </div>
                  </div>
              ))}
          </div>

          {/* Right: Live Fitting Actions */}
          <div className="flex flex-col items-end justify-center gap-10">
            <button className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-xl transition-all duration-1000 hover:scale-110 hover:border-[#ecab13]">
              <span className="material-symbols-outlined text-2xl text-white/90">photo_camera</span>
            </button>
            <button className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#ecab13] bg-black/80 backdrop-blur-xl transition-all duration-1000 hover:bg-[#ecab13] group">
              <span className="material-symbols-outlined text-3xl text-[#ecab13] group-hover:text-black">view_in_ar</span>
            </button>
            <button className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-xl transition-all duration-1000 hover:scale-110 hover:border-[#ecab13]">
              <span className="material-symbols-outlined text-2xl text-white/90">favorite_border</span>
            </button>
          </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
            to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}
