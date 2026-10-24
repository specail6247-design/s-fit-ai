"use client";

import React, { useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryCursor from "./ui/LuxuryCursor";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: 'optional' });
const cinzel = Cinzel({ subsets: ["latin"], display: 'optional' });

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState("Vogue Couture");

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <LuxuryCursor />
      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Brand Experience Banner */}
        <div className="absolute top-0 left-0 w-full h-48 z-0 overflow-hidden opacity-40">
          <div
            className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Thin Gold Line Loading Animation */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[80%] max-w-sm h-96 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite]"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-[shimmer_2s_infinite_reverse]"></div>
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent animate-[shimmerVertical_2s_infinite]"></div>
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent animate-[shimmerVertical_2s_infinite_reverse]"></div>
            </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-6 pt-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/20 transition-all duration-700 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined text-white/80">close</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className={`text-xl font-medium tracking-[0.2em] uppercase text-[#d4af37] ${cinzel.className}`}>
              {selectedBrand}
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mt-1">Haute Couture Fitting</p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/20 transition-all duration-700 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined text-white/80">tune</span>
          </div>
        </div>

        {/* Upper HUD: Brand Description & Status */}
        <div className="mt-8 space-y-6 px-6 z-10">
          <div className="max-w-[280px]">
            <p className="text-xs text-white/70 leading-relaxed font-light transition-all duration-1000">
              Experience the latest collection with our high-fidelity real-time simulation. Fabrics rendered with physical accuracy.
            </p>
          </div>

          <div className="max-w-[240px] rounded-sm p-5 bg-black/40 backdrop-blur-md border-l-2 border-[#d4af37]">
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">Pose Tracking</p>
                <p className="text-xs font-serif text-[#d4af37] tracking-widest">LOCKED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">Shoulder Drape</p>
            <span className={`text-xl text-white ${cinzel.className}`}>Perfect</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">Waist Silhouette</p>
            <span className={`text-xl text-white ${cinzel.className}`}>Tailored</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">Hem Line</p>
            <span className="material-symbols-outlined text-lg text-[#d4af37] font-light">verified</span>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-6 py-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div className="flex min-w-[160px] flex-col gap-4 p-2 transition-all duration-1000 ease-in-out cursor-pointer group">
                <LuxuryImageDistortion
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                  alt="Aura Blazer"
                  className="aspect-[2/3] w-full border border-[#d4af37]"
                />
                <div className="flex flex-col items-center text-center">
                  <p className={`text-sm tracking-widest uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-[10px] tracking-widest text-[#d4af37] mt-1">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-4 p-2 opacity-50 hover:opacity-100 transition-opacity duration-1000 ease-in-out cursor-pointer group">
                  <LuxuryImageDistortion
                    imageUrl={item.img}
                    alt={item.name}
                    className="aspect-[2/3] w-full border border-white/10 group-hover:border-[#d4af37]/50 transition-colors duration-1000"
                  />
                  <div className="flex flex-col items-center text-center">
                    <p className={`text-sm tracking-widest uppercase text-white/80 group-hover:text-white transition-colors duration-1000 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-[10px] tracking-widest text-white/40 group-hover:text-[#d4af37] transition-colors duration-1000 mt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 p-6 mt-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors duration-700 bg-transparent border border-white/10 hover:border-white/30">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-2xl group-hover:bg-[#d4af37]/20 transition-all duration-1000"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-black/50 backdrop-blur-sm group-hover:border-[#d4af37] transition-all duration-1000">
                <div className="flex size-20 items-center justify-center rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent group-hover:from-[#d4af37]/20 group-hover:to-transparent transition-all duration-1000">
                  <span className="material-symbols-outlined text-4xl text-[#d4af37] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#d4af37]">Capture</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors duration-700 bg-transparent border border-white/10 hover:border-white/30">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-3 h-1 w-32 rounded-full bg-white/10"></div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmerVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
}
