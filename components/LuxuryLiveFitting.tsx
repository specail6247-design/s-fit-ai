"use client";

import React, { useState, useEffect, useRef } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { brands, type Brand } from "@/data/mockData";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Custom price formatter
const formatPrice = (price: number | string) => {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
  if (isNaN(numPrice)) return price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numPrice);
};

export default function LuxuryLiveFitting() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [selectedBrand] = useState<Brand | null>(
    brands.find((b) => b.isLuxury) || null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        cursorRef.current.style.opacity = "0.8";
      }
    };

    // Set initial opacity to 0 in CSS, only show on move
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-void-black text-pure-white ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border-2 border-luxury-gold transition-opacity duration-75 ease-out opacity-0"
        style={{
          width: '32px',
          height: '32px',
        }}
      />

      {/* Main Viewport Container */}
      <div
        className="relative flex min-h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.7)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Brand Banner (Parallax) */}
        {selectedBrand && selectedBrand.bannerImage && (
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden mix-blend-overlay">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                   src={selectedBrand.bannerImage}
                   alt={selectedBrand.name}
                   className="w-full h-full object-cover transform scale-110 translate-y-[-5%] transition-transform duration-1000 ease-in-out"
                />
            </div>
        )}

        {/* Scanning Effect Overlay - Changed to Gold */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-40 z-0"
            style={{
                background: "linear-gradient(90deg, transparent, var(--color-luxury-gold), transparent)",
                boxShadow: "0 0 20px var(--color-luxury-gold)"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <button className="flex size-14 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700 cursor-none" style={{ background: "rgba(26, 26, 26, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-pure-white">close</span>
          </button>

          <div className="flex flex-col items-center">
             <div className="flex items-center gap-3 rounded-full px-6 py-3" style={{ background: "rgba(26, 26, 26, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
               <div className="size-2.5 animate-pulse rounded-full bg-luxury-gold"></div>
               <h2 className={`text-sm tracking-[0.2em] uppercase text-pure-white ${cinzel.className}`}>Luxury Fit</h2>
             </div>
          </div>

          <button className="flex size-14 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-700 cursor-none" style={{ background: "rgba(26, 26, 26, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-pure-white">tune</span>
          </button>
        </div>

        {/* Brand Experience Header */}
        {selectedBrand && (
            <div className="z-10 mt-6 px-8 text-center animate-fade-in-up duration-1000">
                <h1 className={`text-4xl md:text-5xl tracking-widest uppercase text-luxury-gold ${cinzel.className}`} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>
                    {selectedBrand.name}
                </h1>
                {selectedBrand.description && (
                    <p className="mt-4 text-sm text-pure-white/70 max-w-md mx-auto leading-relaxed tracking-wide">
                        {selectedBrand.description}
                    </p>
                )}
            </div>
        )}

        {/* Floating Fit Stats Sidebar (Right) - Subtle Gold */}
        <div className="absolute right-6 top-1/3 z-10 flex flex-col gap-4 pointer-events-none">
          {[
              { label: 'Shoulder', val: '98%', diff: '+2%' },
              { label: 'Waist', val: '94%', diff: '+1%' },
              { label: 'Hem Line', val: '100%', diff: null },
          ].map((stat, i) => (
             <div key={i} className="flex min-w-[140px] flex-col gap-1.5 rounded-xl p-4 transition-all duration-700" style={{ background: "rgba(26, 26, 26, 0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(201, 176, 55, 0.2)" }}>
                <p className={`text-[11px] font-medium uppercase tracking-widest text-pure-white/50 ${cinzel.className}`}>{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light tracking-wider text-pure-white">{stat.val}</span>
                  {stat.diff ? (
                      <span className="text-[10px] font-bold text-luxury-gold">{stat.diff}</span>
                  ) : (
                      <span className="material-symbols-outlined text-[16px] text-luxury-gold">verified</span>
                  )}
                </div>
              </div>
          ))}
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 w-full px-6">
          {/* Garment Cards - Vertical / Masonry Style */}
          <div className="flex justify-start gap-6 overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex items-stretch gap-6 pl-4">

              {/* Active Item */}
              <div className="flex min-w-[200px] flex-col gap-4 rounded-2xl border border-luxury-gold bg-void-black/80 p-3 backdrop-blur-xl transition-all duration-1000 transform scale-105 shadow-[0_0_30px_rgba(201,176,55,0.15)] cursor-none relative">
                {/* Sophisticated Gold Tracing Loading Animation Example */}
                <div className="absolute inset-0 z-10 pointer-events-none border border-transparent rounded-2xl overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-luxury-gold animate-[trace-top_2s_ease-in-out_infinite]" style={{ transformOrigin: "left" }}></div>
                   <div className="absolute top-0 right-0 w-[2px] h-full bg-luxury-gold animate-[trace-right_2s_ease-in-out_infinite]" style={{ transformOrigin: "top" }}></div>
                   <div className="absolute bottom-0 right-0 w-full h-[2px] bg-luxury-gold animate-[trace-bottom_2s_ease-in-out_infinite]" style={{ transformOrigin: "right" }}></div>
                   <div className="absolute bottom-0 left-0 w-[2px] h-full bg-luxury-gold animate-[trace-left_2s_ease-in-out_infinite]" style={{ transformOrigin: "bottom" }}></div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes trace-top {
                    0% { transform: scaleX(0); opacity: 1; }
                    25% { transform: scaleX(1); opacity: 1; }
                    50% { transform: scaleX(1); opacity: 0; }
                    100% { transform: scaleX(0); opacity: 0; }
                  }
                  @keyframes trace-right {
                    0% { transform: scaleY(0); opacity: 0; }
                    25% { transform: scaleY(0); opacity: 1; }
                    50% { transform: scaleY(1); opacity: 1; }
                    75% { transform: scaleY(1); opacity: 0; }
                    100% { transform: scaleY(0); opacity: 0; }
                  }
                  @keyframes trace-bottom {
                    0% { transform: scaleX(0); opacity: 0; }
                    50% { transform: scaleX(0); opacity: 1; }
                    75% { transform: scaleX(1); opacity: 1; }
                    100% { transform: scaleX(1); opacity: 0; }
                  }
                  @keyframes trace-left {
                    0% { transform: scaleY(0); opacity: 0; }
                    75% { transform: scaleY(0); opacity: 1; }
                    100% { transform: scaleY(1); opacity: 1; }
                  }
                `}} />

                <LuxuryImageDistortion
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                  alt="Aura Blazer"
                  className="aspect-[3/4] w-full rounded-xl"
                />
                <div className="px-2 pb-2 text-center pointer-events-none">
                  <p className={`truncate text-sm tracking-wider uppercase text-pure-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="mt-1 text-sm text-luxury-gold">{formatPrice(2400)}</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-3 rounded-2xl p-2 opacity-60 transition-all duration-700 hover:opacity-100 hover:scale-105 cursor-none" style={{ background: "rgba(26, 26, 26, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <LuxuryImageDistortion
                      imageUrl={item.img}
                      alt={item.name}
                      className="aspect-[3/4] w-full rounded-xl"
                    />
                    <div className="px-2 pb-2 text-center pointer-events-none">
                        <p className={`truncate text-xs tracking-wider uppercase text-pure-white/80 ${cinzel.className}`}>{item.name}</p>
                        <p className="mt-1 text-xs text-pure-white/40">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls - Sophisticated */}
          <div className="flex items-center justify-center gap-12 mt-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-pure-white/70 hover:text-pure-white hover:bg-white/5 transition-all duration-700 cursor-none" style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-none">
              <div className="absolute inset-0 rounded-full bg-luxury-gold/10 blur-2xl transition-all duration-1000 group-hover:bg-luxury-gold/30 group-hover:blur-3xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-luxury-gold/50 bg-void-black/80 backdrop-blur-md transition-transform duration-700 group-hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border border-luxury-gold bg-luxury-gold/10">
                  <span className="material-symbols-outlined text-4xl text-luxury-gold font-extralight">camera</span>
                </div>
              </button>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-pure-white/70 hover:text-pure-white hover:bg-white/5 transition-all duration-700 cursor-none" style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-3 h-1.5 w-32 rounded-full bg-pure-white/10"></div>
      </div>
    </div>
  );
}
