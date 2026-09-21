"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState<{name: string, description: string, banner: string} | null>({
    name: "AURA LUXE",
    description: "Exquisite craftsmanship meets modern AI.",
    banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000"
  });
  const [isLoading, setIsLoading] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  if (isLoading) {
    return (
      <div className={`flex h-screen w-full items-center justify-center bg-[#0a0a0a] ${cinzel.className}`}>
        <div className="relative size-32">
          <div className="absolute inset-0 border border-white/10"></div>
          {/* Sophisticated loading line animation */}
          <div className="absolute top-0 left-0 h-[1px] w-0 bg-[#ecab13] shadow-[0_0_8px_#ecab13]" style={{ animationName: 'traceTop', animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
          <div className="absolute top-0 right-0 h-0 w-[1px] bg-[#ecab13] shadow-[0_0_8px_#ecab13]" style={{ animationName: 'traceRight', animationDuration: '2s', animationIterationCount: 'infinite', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 right-0 h-[1px] w-0 bg-[#ecab13] shadow-[0_0_8px_#ecab13]" style={{ animationName: 'traceBottom', animationDuration: '2s', animationIterationCount: 'infinite', animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-0 h-0 w-[1px] bg-[#ecab13] shadow-[0_0_8px_#ecab13]" style={{ animationName: 'traceLeft', animationDuration: '2s', animationIterationCount: 'infinite', animationDelay: '1.5s' }}></div>
          <div className="flex h-full w-full items-center justify-center">
             <span className="text-xs font-bold tracking-[0.3em] text-[#ecab13]">S_FIT</span>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes traceTop { 0% { width: 0; } 25% { width: 100%; } 100% { width: 100%; } }
            @keyframes traceRight { 0% { height: 0; } 25% { height: 100%; } 100% { height: 100%; } }
            @keyframes traceBottom { 0% { width: 0; right: 0; left: auto; } 25% { width: 100%; right: 0; left: auto; } 100% { width: 100%; right: 0; left: auto; } }
            @keyframes traceLeft { 0% { height: 0; bottom: 0; top: auto; } 25% { height: 100%; bottom: 0; top: auto; } 100% { height: 100%; bottom: 0; top: auto; } }
          `}} />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className} cursor-none`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-[#ecab13] transition-transform duration-75 ease-out will-change-transform"
        style={{ boxShadow: "0 0 10px rgba(236, 171, 19, 0.3)" }}
      ></div>

      {/* Brand Parallax Background */}
      {selectedBrand && (
        <div
          className="absolute inset-0 z-0 opacity-20 bg-fixed bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${selectedBrand.banner})` }}
        ></div>
      )}

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col z-10">

        {/* Main Visual with Luxury Distortion */}
        <div className="absolute inset-0 z-0">
           <LuxuryImageDistortion
             src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
             className="w-full h-full"
           />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-10">
          <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:border-[#ecab13]">
            <span className="material-symbols-outlined text-white font-light">close</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold tracking-[0.3em] uppercase text-white">Live Fit AI</h2>
            {selectedBrand && (
              <p className={`text-[10px] uppercase tracking-widest text-[#ecab13] mt-1 ${spaceGrotesk.className}`}>
                {selectedBrand.name}
              </p>
            )}
          </div>
          <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:border-[#ecab13]">
            <span className="material-symbols-outlined text-white font-light">tune</span>
          </div>
        </div>

        {selectedBrand && (
          <div className="z-10 px-8 py-4 max-w-md mx-auto text-center mt-4">
            <p className={`text-sm text-white/70 font-light leading-relaxed ${spaceGrotesk.className}`}>
              {selectedBrand.description}
            </p>
          </div>
        )}

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10">
          {/* Garment Carousel - Vertical/Masonry style mapping to horizontal scroll with taller cards */}
          <div className="flex overflow-x-auto px-8 py-8 gap-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            {[
                { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", active: true },
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", active: false },
                { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", active: false },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tba বৃহত্তরXN-rcW2ILAk", active: false },
            ].map((item, i) => (
              <div key={i} className={`flex min-w-[200px] flex-col gap-4 p-2 transition-all duration-1000 ${item.active ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-80'}`}>
                  <div
                    className={`aspect-[3/4] w-full bg-cover bg-center bg-no-repeat transition-all duration-700 ${item.active ? 'border border-[#ecab13] shadow-[0_0_20px_rgba(236,171,19,0.2)]' : 'border border-white/10 grayscale hover:grayscale-0'}`}
                    style={{ backgroundImage: `url("${item.img}")` }}
                  ></div>
                  <div className="px-2 pb-2 text-center">
                    <p className="truncate text-xs font-bold uppercase tracking-widest text-white">{item.name}</p>
                    <p className={`text-sm mt-2 ${spaceGrotesk.className} ${item.active ? 'text-[#ecab13]' : 'text-white/50'}`}>
                      {formatPrice(item.price)}
                    </p>
                  </div>
              </div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 p-8 mt-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:border-[#ecab13] hover:text-[#ecab13]">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13] bg-black/60 backdrop-blur-md transition-all duration-1000 hover:bg-[#ecab13]/10 hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#ecab13]/50">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ecab13]">Capture</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:border-[#ecab13] hover:text-[#ecab13]">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}