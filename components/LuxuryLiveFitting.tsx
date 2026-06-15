"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Gold custom cursor
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] size-8 rounded-full border-2 border-[#ecab13] mix-blend-difference"
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        transition: "transform 0.1s ease-out, width 0.2s, height 0.2s",
      }}
    />
  );
}

// Sophisticated Loading Animation (Gold Box Trace)
function LuxuryLoadingState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      <div className="relative w-24 h-32 border border-[#333]">
        <div className="absolute top-0 left-0 h-px bg-[#ecab13] w-full animate-[trace-top_2s_ease-in-out_infinite]" />
        <div className="absolute top-0 right-0 w-px bg-[#ecab13] h-full animate-[trace-right_2s_ease-in-out_infinite_0.5s]" />
        <div className="absolute bottom-0 right-0 h-px bg-[#ecab13] w-full animate-[trace-bottom_2s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-0 left-0 w-px bg-[#ecab13] h-full animate-[trace-left_2s_ease-in-out_infinite_1.5s]" />
      </div>
      <style>{`
        @keyframes trace-top {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.1% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes trace-right {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes trace-bottom {
          0% { transform: scaleX(0); transform-origin: right; }
          50% { transform: scaleX(1); transform-origin: right; }
          50.1% { transform: scaleX(1); transform-origin: left; }
          100% { transform: scaleX(0); transform-origin: left; }
        }
        @keyframes trace-left {
          0% { transform: scaleY(0); transform-origin: bottom; }
          50% { transform: scaleY(1); transform-origin: bottom; }
          50.1% { transform: scaleY(1); transform-origin: top; }
          100% { transform: scaleY(0); transform-origin: top; }
        }
      `}</style>
    </div>
  );
}

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for luxury feel
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

  const selectedBrand = {
    name: "AURA LUXURY",
    description: "Elegance defined by pure craftsmanship and timeless design.",
    bannerImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop"
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className}`}>
      <CustomCursor />
      {isLoading && <LuxuryLoadingState />}

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col duration-1000"
        data-alt="User reflection with AR garment overlay"
      >
        {/* Replace static background with LuxuryImageDistortion */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-12">
          <div className="flex size-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-1000 cursor-pointer">
            <span className="material-symbols-outlined text-white">close</span>
          </div>

          <div className="flex items-center gap-3">
             <h2 className={`text-xl font-bold uppercase text-white tracking-[0.2em] ${cinzel.className}`}>S_FIT AI</h2>
          </div>

          <div className="flex size-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#ecab13]/50 transition-colors duration-1000 cursor-pointer">
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Banner Experience */}
        <div className="z-10 mt-4 mx-6 flex flex-col items-center">
             <h3 className={`text-sm tracking-widest text-[#ecab13] uppercase ${cinzel.className}`}>{selectedBrand.name}</h3>
             <p className="text-[10px] text-white/60 tracking-wider text-center mt-2 max-w-[200px] uppercase">{selectedBrand.description}</p>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-8 space-y-4 px-6 z-10 flex justify-between">
          <div className="w-[240px] rounded-sm p-4 bg-black/40 backdrop-blur-md border border-white/10">
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className={`text-xs font-medium uppercase tracking-widest text-white/80 ${cinzel.className}`}>Body Stability</p>
                <p className={`text-xs font-bold leading-none text-[#ecab13] ${cinzel.className}`}>95%</p>
              </div>
              <div className="h-0.5 w-full overflow-hidden bg-white/10">
                <div className="h-full bg-[#ecab13] transition-all duration-1000" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/50 pt-2">
                <span className="material-symbols-outlined text-[12px] text-[#ecab13]">target</span>
                Tracking Locked
              </p>
            </div>
          </div>

          <div className="w-[180px] rounded-sm p-4 bg-black/40 backdrop-blur-md border border-white/10 flex flex-col gap-3">
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <p className="text-[9px] uppercase tracking-widest text-white/60">Shoulder</p>
                <p className={`text-sm text-white ${cinzel.className}`}>98%</p>
             </div>
             <div className="flex items-end justify-between border-b border-white/10 pb-2">
                <p className="text-[9px] uppercase tracking-widest text-white/60">Waist</p>
                <p className={`text-sm text-white ${cinzel.className}`}>94%</p>
             </div>
             <div className="flex items-end justify-between pb-1">
                <p className="text-[9px] uppercase tracking-widest text-white/60">Hem Line</p>
                <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
             </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto z-10 pb-12">
          {/* Garment Carousel - Vertical/Masonry Style items but arranged horizontally for carousel */}
          <div className="flex overflow-x-auto px-6 py-6 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
              {/* Selected Item */}
              <div className="flex min-w-[180px] flex-col gap-4">
                <div
                  className="aspect-[3/5] w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 border-x border-y border-[#ecab13] shadow-[0_0_20px_rgba(236,171,19,0.15)] relative overflow-hidden group cursor-pointer"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <p className={`text-xs uppercase tracking-widest text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-[10px] tracking-widest text-[#ecab13] mt-1">{formatPrice(12500)}</p>
                </div>
              </div>

              {/* Other Items */}
              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-4 opacity-60 hover:opacity-100 transition-opacity duration-1000 cursor-pointer">
                    <div
                    className="aspect-[3/5] w-full bg-cover bg-center bg-no-repeat border border-white/10"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="flex flex-col items-center text-center px-2">
                    <p className={`text-xs uppercase tracking-widest text-white/80 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-[10px] tracking-widest text-white/50 mt-1">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 mt-8">
            <button className="text-white/60 hover:text-white transition-colors duration-1000 flex flex-col items-center gap-2 group">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform duration-1000">photo_library</span>
              <span className="text-[8px] uppercase tracking-widest">Gallery</span>
            </button>
            <div className="relative flex items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/20 blur-xl group-hover:bg-[#ecab13]/40 transition-colors duration-1000"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-black/60 backdrop-blur-md group-hover:bg-black/80 transition-colors duration-1000">
                <div className="flex size-14 items-center justify-center rounded-full border border-[#ecab13]/50 bg-[#ecab13]/10">
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13] ${cinzel.className}`}>Capture</span>
              </div>
            </div>
            <button className="text-white/60 hover:text-white transition-colors duration-1000 flex flex-col items-center gap-2 group">
              <span className="material-symbols-outlined text-2xl group-hover:rotate-180 transition-transform duration-1000">refresh</span>
              <span className="text-[8px] uppercase tracking-widest">Retake</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 bg-white/20"></div>
      </div>
    </div>
  );
}
