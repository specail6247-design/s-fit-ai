"use client";

import React, { useState } from "react";
import { Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";

const cinzel = Cinzel({ subsets: ["latin"] });

// Mock luxury data
const luxuryItems = [
  {
    id: "gucci-001",
    name: "GG Jacquard Cardigan",
    brand: "Gucci",
    price: 1800,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0JmQ_P90_V20_H1t-26-s2x14P2mN_Q3n20y18n1M2_Q0Y1n542_8-Q_9J3M1lJ2_K2j0y-l2G2t1yH3l2-P_X0V4k_j1N",
    description: "Wool jacquard cardigan with GG pattern."
  },
  {
    id: "gucci-002",
    name: "Silk Bowling Shirt",
    brand: "Gucci",
    price: 1200,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0JmQ_P90_V20_H1t-26-s2x14P2mN_Q3n20y18n1M2_Q0Y1n542_8-Q_9J3M1lJ2_K2j0y-l2G2t1yH3l2-P_X0V4k_j1N",
    description: "Fluid silk bowling shirt with web stripes."
  },
  {
    id: "gucci-003",
    name: "Technical Jersey Pants",
    brand: "Gucci",
    price: 980,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0JmQ_P90_V20_H1t-26-s2x14P2mN_Q3n20y18n1M2_Q0Y1n542_8-Q_9J3M1lJ2_K2j0y-l2G2t1yH3l2-P_X0V4k_j1N",
    description: "Technical jersey pants with Web stripe."
  }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState("Gucci");
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Used for loading state

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className}`}>
      <CustomCursor />

      {/* Brand Experience Overlay (Parallax background) */}
      <div
        className="absolute inset-0 z-0 opacity-20 transition-transform duration-1000 ease-in-out"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')", // Brand banner placeholder
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col z-10">

        {/* Top Navigation */}
        <div className="flex items-center justify-between p-8">
           <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="text-center">
             <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-[#ecab13]">{selectedBrand}</h1>
            <p className="text-xs tracking-widest text-white/60 mt-1">
              {selectedBrand === 'Gucci' ? 'A legacy of Italian craftsmanship.' :
               selectedBrand === 'Chanel' ? 'Elegance and timeless sophistication.' :
               selectedBrand === 'Tiffany' ? 'The ultimate symbol of luxury.' : 'Exclusive Collection'}
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
            <span className="material-symbols-outlined text-white">tune</span>
          </div>
        </div>

        {/* Loading State / Analysis */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm">
            <div className="relative size-32">
              <div className="absolute inset-0 animate-[spin_3s_linear_infinite] border-t-2 border-[#ecab13] rounded-sm"></div>
              <div className="absolute inset-4 animate-[spin_2s_linear_infinite_reverse] border-b-2 border-[#ecab13]/50 rounded-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#ecab13] animate-pulse">ANALYZING</span>
              </div>
            </div>
          </div>
        )}

        {/* Central Product Visual */}
        <div className="flex-1 relative flex items-center justify-center p-8">
            <div className="w-full max-w-md h-full max-h-[60vh] relative rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-[#ecab13]/10">
               <LuxuryImageDistortion
                  imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                  alt="Live Fitting View"
                  className="w-full h-full"
               />

               {/* UI overlay on central image */}
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                   <div>
                       <h2 className="text-xl font-light tracking-wider">Aura Blazer</h2>
                       <p className="text-sm font-bold text-[#ecab13] mt-1">{formatPrice(12500)}</p>
                   </div>
               </div>
            </div>
        </div>

        {/* Vertical/Masonry Product Carousel (Right Side) */}
        <div className="absolute right-8 top-1/4 bottom-1/4 w-32 flex flex-col gap-6 overflow-y-auto scrollbar-hide py-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            {luxuryItems.map((item, i) => (
                <div key={i} className="group relative flex flex-col gap-3 rounded-sm p-2 bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-700 hover:border-[#ecab13]/50 cursor-pointer">
                    <div
                        className="aspect-[3/4] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url("${item.img}")` }}
                    />
                    <div className="text-center pb-2">
                        <p className="truncate text-[9px] font-bold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors duration-700">{item.name}</p>
                        <p className="text-[10px] font-bold text-[#ecab13] mt-1">{formatPrice(item.price)}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-8 flex justify-center gap-12 mt-auto">
             <button className="flex flex-col items-center gap-2 group">
                 <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 group-hover:border-[#ecab13]/50 group-hover:bg-[#ecab13]/10">
                     <span className="material-symbols-outlined text-white transition-colors duration-700 group-hover:text-[#ecab13]">favorite_border</span>
                 </div>
                 <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60">Save</span>
             </button>

             <button
                 className="flex flex-col items-center gap-2 group"
                 onClick={() => {
                     setIsAnalyzing(true);
                     setTimeout(() => setIsAnalyzing(false), 2000);
                 }}
             >
                 <div className="relative flex size-20 items-center justify-center rounded-full border border-[#ecab13] bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(236,171,19,0.2)] transition-transform duration-700 hover:scale-105">
                     <span className="material-symbols-outlined text-3xl text-[#ecab13]">camera</span>
                 </div>
                 <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#ecab13]">Fit Snap</span>
             </button>

             <button className="flex flex-col items-center gap-2 group">
                 <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700 group-hover:border-[#ecab13]/50 group-hover:bg-[#ecab13]/10">
                     <span className="material-symbols-outlined text-white transition-colors duration-700 group-hover:text-[#ecab13]">shopping_bag</span>
                 </div>
                 <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60">Cart</span>
             </button>
        </div>

      </div>
    </div>
  );
}
