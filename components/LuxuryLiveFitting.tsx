"use client";

import React, { useRef, useEffect, useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedBrand] = useState({
    name: "AURA LUXURY",
    desc: "Defining the essence of modern elegance and uncompromising craftsmanship.",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000"
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 size-8 rounded-full border border-[#D4AF37] mix-blend-difference transition-transform duration-75 ease-out"
      />

      {/* Brand Banner Parallax Background */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url(${selectedBrand.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Brand Experience Header */}
        <div className="z-10 flex flex-col items-center justify-center p-8 pt-12 space-y-4">
          <h1 className={`text-3xl tracking-widest text-[#D4AF37] ${cinzel.className}`}>{selectedBrand.name}</h1>
          <p className="text-xs tracking-wider text-white/70 max-w-md text-center">{selectedBrand.desc}</p>
        </div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 w-full z-20 flex items-center justify-between p-6">
          <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-xl transition-colors duration-700 hover:border-[#D4AF37]">
            <span className="material-symbols-outlined text-[#D4AF37]">close</span>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-xl transition-colors duration-700 hover:border-[#D4AF37]">
            <span className="material-symbols-outlined text-[#D4AF37]">tune</span>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl border border-[#D4AF37]/20 bg-black/50 p-4 backdrop-blur-xl transition-all duration-700 hover:border-[#D4AF37]/50">
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/50">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl text-[#D4AF37] ${cinzel.className}`}>98%</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl border border-[#D4AF37]/20 bg-black/50 p-4 backdrop-blur-xl transition-all duration-700 hover:border-[#D4AF37]/50">
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/50">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl text-[#D4AF37] ${cinzel.className}`}>94%</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 w-full">
          {/* Garment Carousel - Luxury Masonry/Vertical Style */}
          <div className="flex overflow-x-auto px-8 py-8 scrollbar-hide gap-8" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-8">

              {[
                  { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", selected: true },
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", selected: false },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", selected: false },
                  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", selected: false },
              ].map((item, i) => (
                <div key={i} className={`flex min-w-[160px] flex-col gap-4 rounded-xl p-2 transition-all duration-1000 ${item.selected ? 'border border-[#D4AF37] bg-[#D4AF37]/5 scale-105' : 'border border-white/10 bg-black/40 opacity-60 hover:opacity-100 hover:border-[#D4AF37]/50'}`}>
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden">
                      <LuxuryImageDistortion imageUrl={item.img} alt={item.name} />
                    </div>
                    <div className="px-2 pb-2 text-center">
                      <p className={`truncate text-[11px] font-medium tracking-widest uppercase text-white/90 ${cinzel.className}`}>{item.name}</p>
                      <p className="text-[11px] tracking-wider text-[#D4AF37] mt-1">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls with SVG Loading Animation */}
          <div className="flex items-center justify-center gap-16 p-4 mt-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors duration-700 bg-black/40 backdrop-blur-xl">
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-pointer" onClick={handleCapture}>
              {isCapturing && (
                <svg className="absolute inset-0 size-24 -m-2 animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
                  <rect x="2" y="2" width="96" height="96" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="400" className="animate-[dash_2s_ease-in-out_infinite]" />
                </svg>
              )}
              <div className={`absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-2xl transition-opacity duration-1000 ${isCapturing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-black">
                <div className="flex size-16 items-center justify-center rounded-full border border-[#D4AF37]/30 transition-transform duration-700 group-hover:scale-95">
                  <span className="material-symbols-outlined text-3xl text-[#D4AF37]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className={`text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] ${cinzel.className}`}>Try On</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors duration-700 bg-black/40 backdrop-blur-xl">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-1 w-32 rounded-full bg-white/20"></div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -400;
          }
        }
      `}} />
    </div>
  );
}
