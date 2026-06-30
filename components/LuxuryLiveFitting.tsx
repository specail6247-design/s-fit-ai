"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock data for luxury brands
const brands = [
  {
    id: "chanel",
    name: "CHANEL",
    description: "The ultimate expression of modern luxury and timeless elegance.",
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "gucci",
    name: "GUCCI",
    description: "Eclectic, contemporary, romantic—products represent the pinnacle of Italian craftsmanship.",
    bannerImage: "https://images.unsplash.com/photo-1558769132-cb1fac0840c2?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
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
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 border border-transparent border-t-[#D4AF37] border-r-[#D4AF37] animate-[spin_3s_linear_infinite] rounded-sm opacity-80" />
          <div className="absolute inset-2 border border-transparent border-b-[#D4AF37] border-l-[#D4AF37] animate-[spin_2s_linear_infinite_reverse] rounded-sm opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-[#D4AF37] tracking-[0.3em] text-xs ${playfair.className} uppercase`}>S_FIT</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${playfair.className}`}
    >
      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-[#D4AF37] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          width: isHovering ? "60px" : "30px",
          height: isHovering ? "60px" : "30px",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: isHovering ? "0 0 20px rgba(212, 175, 55, 0.4)" : "none"
        }}
      />
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-[#D4AF37] mix-blend-difference"
        style={{
          width: "4px",
          height: "4px",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {/* Parallax Brand Banner Background */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url('${selectedBrand.bannerImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translate(${(mousePosition.x - window.innerWidth/2) * -0.01}px, ${(mousePosition.y - window.innerHeight/2) * -0.01}px) scale(1.05)`
          }}
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <div
            className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="material-symbols-outlined text-white font-light">arrow_back</span>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl tracking-[0.4em] uppercase text-[#D4AF37] font-light">S_FIT AI</h2>
            <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase mt-1">Luxury Collection</p>
          </div>

          <div
            className="flex size-12 items-center justify-center rounded-full transition-colors duration-700 hover:bg-white/10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="material-symbols-outlined text-white font-light">menu</span>
          </div>
        </div>

        {/* Brand Description Overlay */}
        <div className="z-10 flex flex-col items-center justify-center pt-8 px-8 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase mb-4 text-white drop-shadow-lg">
            {selectedBrand.name}
          </h1>
          <p className="text-sm md:text-base text-white/70 font-sans tracking-wide leading-relaxed font-light">
            {selectedBrand.description}
          </p>

          {/* Brand Selector */}
          <div className="flex gap-4 mt-8">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`text-xs tracking-[0.2em] uppercase pb-1 transition-all duration-700 border-b ${
                  selectedBrand.id === brand.id
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center Main Product Display with Distortion Effect */}
        <div className="z-10 flex-1 flex items-center justify-center p-8 mt-4">
          <div
            className="relative w-full max-w-sm aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-2xl transition-all duration-1000 ease-out"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
             <LuxuryImageDistortion
                imageUrl="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800"
                alt="Luxury Evening Gown"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-2">Exquisite</p>
                <h3 className="text-2xl font-light mb-1">Silk Evening Gown</h3>
                <p className="text-lg text-white/80 font-serif">{formatPrice(12500)}</p>
             </div>
          </div>
        </div>

        {/* Bottom UI Section - Masonry/Vertical Carousel */}
        <div className="mt-auto z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent pt-12 pb-10">
          <div className="px-8 flex justify-between items-end mb-6">
             <h4 className="text-sm tracking-[0.2em] text-white/60 uppercase">Curated For You</h4>
             <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">View All</span>
          </div>

          <div className="flex overflow-x-auto px-8 gap-8 pb-4 scrollbar-hide snap-x">
            {[
                { name: "Cashmere Coat", price: 8400, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500", brand: "CHANEL" },
                { name: "Classic Flap Bag", price: 10200, img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=500", brand: "CHANEL" },
                { name: "Silk Blouse", price: 2100, img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=500", brand: "GUCCI" },
            ].map((item, i) => (
              <div
                key={i}
                className="snap-center shrink-0 flex flex-col gap-4 w-48 group cursor-none"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                  <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#1a1a1a]">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        style={{ backgroundImage: `url("${item.img}")` }}
                      ></div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                      <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">{item.brand}</p>
                      <p className="text-sm font-light tracking-wide text-white group-hover:text-[#D4AF37] transition-colors duration-700">{item.name}</p>
                      <p className="text-xs text-white/60 mt-1">{formatPrice(item.price)}</p>
                  </div>
              </div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-8 mt-4">
            <button
                className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors duration-700 border border-white/10 hover:border-white/30"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <button
                className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-transparent group-hover:bg-[#D4AF37]/10 transition-all duration-700"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex size-20 items-center justify-center rounded-full border border-white/20">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]">Try On</span>
                </div>
              </button>
            </div>
            <button
                className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors duration-700 border border-white/10 hover:border-white/30"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
              <span className="material-symbols-outlined font-light">tune</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
