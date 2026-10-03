"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand] = useState<{name: string, banner: string, description: string} | null>({
    name: "Aura Luxury",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    description: "Crafting timeless elegance through meticulously designed evening wear. A symphony of silk and structure."
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className={`relative flex h-screen w-full items-center justify-center bg-[#050505] text-[#ecab13] ${playfair.className}`}>
        <div className="relative w-64 h-80 border border-[#ecab13]/20 flex items-center justify-center">
            {/* Sophisticated Loading Animation (Gold Line Tracing Box) */}
            <div className="absolute top-0 left-0 h-[1px] w-full bg-[#ecab13] origin-left scale-x-0 animate-[trace-top_2s_ease-in-out_infinite]" />
            <div className="absolute top-0 right-0 h-full w-[1px] bg-[#ecab13] origin-top scale-y-0 animate-[trace-right_2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute bottom-0 right-0 h-[1px] w-full bg-[#ecab13] origin-right scale-x-0 animate-[trace-bottom_2s_ease-in-out_infinite_1s]" />
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-[#ecab13] origin-bottom scale-y-0 animate-[trace-left_2s_ease-in-out_infinite_1.5s]" />

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes trace-top { 0%, 100% { transform: scaleX(0); } 50% { transform: scaleX(1); } }
              @keyframes trace-right { 0%, 100% { transform: scaleY(0); } 50% { transform: scaleY(1); } }
              @keyframes trace-bottom { 0%, 100% { transform: scaleX(0); } 50% { transform: scaleX(1); } }
              @keyframes trace-left { 0%, 100% { transform: scaleY(0); } 50% { transform: scaleY(1); } }
            `}} />

            <span className="tracking-[0.3em] uppercase text-xs">Curating</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex min-h-screen w-full flex-col bg-[#050505] text-[#f8f7f6] ${spaceGrotesk.className}`} style={{ cursor: 'url("/gold-ring.svg") 16 16, auto' }}>

      {/* Brand Parallax Banner */}
      {selectedBrand && (
        <div className="relative w-full h-[40vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center ease-out will-change-transform"
            style={{
              backgroundImage: `url("${selectedBrand.banner}")`,
              transform: `translateY(${scrollY * 0.5}px) scale(1.05)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            <h1 className={`text-4xl md:text-6xl font-normal text-[#ecab13] mb-4 ${playfair.className}`}>{selectedBrand.name}</h1>
            <p className="max-w-xl text-sm md:text-base text-white/70 leading-relaxed font-light tracking-wide">{selectedBrand.description}</p>
          </div>
        </div>
      )}

      {/* Main Luxury AR Viewport Container */}
      <div className="relative flex flex-col items-center justify-start p-8 md:p-16 z-20 w-full max-w-7xl mx-auto space-y-16">

        {/* The Visual Piece */}
        <div className="w-full max-w-2xl aspect-[3/4] relative overflow-hidden bg-[#101010] shadow-2xl shadow-black/50 mx-auto transition-all duration-1000">
           <LuxuryImageDistortion src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="Main Luxury Fit" />
        </div>

        {/* Masonry Style Product Cards */}
        <div className="w-full">
            <h2 className={`text-2xl text-[#ecab13] mb-8 uppercase tracking-widest ${playfair.className}`}>The Collection</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {[
                  { name: "Aura Silk Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
                  { name: "Evening Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Sartorial Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col gap-4 bg-[#0a0a0a] p-4 border border-white/5 hover:border-[#ecab13]/30 transition-all duration-700 ease-in-out cursor-pointer break-inside-avoid">
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-[1.02]"
                        style={{ backgroundImage: `url("${item.img}")`, aspectRatio: i % 2 === 0 ? '3/4' : '4/5' }}
                    ></div>
                    <div className="flex flex-col gap-1 items-center text-center pb-2">
                        <p className={`text-lg tracking-wide text-white transition-colors duration-700 group-hover:text-[#ecab13] ${playfair.className}`}>{item.name}</p>
                        <p className="text-sm font-light text-white/50 tracking-wider">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
}
