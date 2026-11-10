"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Inter } from "next/font/google";
import LuxuryCursor from "./ui/LuxuryCursor";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-[#F4E4BC] ${inter.className}`}>
      <LuxuryCursor />

      {/* Brand Experience / Parallax Banner */}
      <div
        className="absolute top-0 left-0 w-full h-[30vh] z-0 opacity-40 transition-transform duration-1000 ease-out transform translate-y-[-10%]"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(5,5,5,0.1), #050505), url('https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%"
        }}
      />

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col z-10 transition-opacity duration-1000"
        data-alt="User reflection with AR garment overlay"
      >
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-colors duration-700 clickable">
            <span className="material-symbols-outlined text-[#F4E4BC]">close</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className={`text-2xl font-bold tracking-widest text-[#d4af37] ${cinzel.className}`}>MAISON DU LUXE</h2>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#F4E4BC]/60 mt-1">Live Fitting Experience</span>
          </div>

          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-colors duration-700 clickable">
            <span className="material-symbols-outlined text-[#F4E4BC]">info</span>
          </button>
        </div>

        {/* Sophisticated Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm">
            <div className="relative w-64 h-64 flex flex-col items-center justify-center">
              <div className="absolute inset-0 border border-[#d4af37]/20 rounded-sm"></div>
              {/* Thin gold line tracing animation */}
              <div className="absolute top-0 left-0 h-[1px] bg-[#d4af37] animate-[trace-top_2s_ease-in-out_infinite]" style={{ width: "0%" }}></div>
              <div className="absolute top-0 right-0 w-[1px] bg-[#d4af37] animate-[trace-right_2s_ease-in-out_infinite]" style={{ height: "0%", animationDelay: "0.5s" }}></div>
              <div className="absolute bottom-0 right-0 h-[1px] bg-[#d4af37] animate-[trace-bottom_2s_ease-in-out_infinite]" style={{ width: "0%", animationDelay: "1s" }}></div>
              <div className="absolute bottom-0 left-0 w-[1px] bg-[#d4af37] animate-[trace-left_2s_ease-in-out_infinite]" style={{ height: "0%", animationDelay: "1.5s" }}></div>

              <h3 className={`text-lg text-[#d4af37] tracking-[0.2em] ${cinzel.className} animate-pulse`}>Preparing</h3>
              <p className="text-[10px] tracking-widest text-[#F4E4BC]/50 mt-2 uppercase">Your Private Suite</p>
            </div>
          </div>
        )}

        {/* Upper HUD: Status */}
        <div className="mt-8 space-y-4 px-6">
          <div className="max-w-[280px] p-5 rounded-sm bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 transition-all duration-700 hover:bg-black/60">
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-[#F4E4BC]/70">Drape Analysis</p>
                <p className={`text-sm text-[#d4af37] ${cinzel.className}`}>Perfect</p>
              </div>
              <div className="h-[1px] w-full bg-[#F4E4BC]/10 relative">
                <div className="absolute top-0 left-0 h-full bg-[#d4af37] transition-all duration-1000 ease-out" style={{ width: "100%" }}></div>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#F4E4BC]/40">Fabric Simulation Active</p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/3 flex flex-col gap-6">
          {[
            { label: "Shoulder Drop", value: "Flawless", metric: "99%" },
            { label: "Waist Cinch", value: "Tailored", metric: "96%" },
            { label: "Hem Break", value: "Measured", metric: "100%" },
          ].map((stat, idx) => (
            <div key={idx} className="flex min-w-[140px] flex-col gap-2 p-4 rounded-sm bg-black/40 backdrop-blur-xl border border-[#d4af37]/20 transition-all duration-700 hover:border-[#d4af37]/50">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#F4E4BC]/50">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <span className={`text-lg text-[#d4af37] ${cinzel.className}`}>{stat.value}</span>
                <span className="text-[10px] text-[#F4E4BC]/40">{stat.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12">
          {/* Garment Carousel - Masonry/Vertical Style */}
          <div className="px-6 py-8">
            <h3 className={`text-sm text-[#d4af37] tracking-[0.3em] uppercase mb-6 ${cinzel.className}`}>The Collection</h3>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ maskImage: "linear-gradient(to right, black 80%, transparent)" }}>
              {/* Selected Item */}
              <div className="flex min-w-[200px] flex-col gap-4 group clickable cursor-none">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#d4af37] bg-black">
                  <LuxuryImageDistortion
                    imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Luxury Aura Blazer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className={`text-base text-[#F4E4BC] tracking-wider ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-xs text-[#d4af37] tracking-widest">$2,400</p>
                </div>
              </div>

              {/* Other Items */}
              {[
                { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-4 opacity-60 hover:opacity-100 transition-opacity duration-700 group clickable cursor-none">
                  <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#d4af37]/30 group-hover:border-[#d4af37] bg-black">
                    <LuxuryImageDistortion
                      imageUrl={item.img}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className={`text-sm text-[#F4E4BC] tracking-wider ${cinzel.className}`}>{item.name}</p>
                    <p className="text-xs text-[#F4E4BC]/60 tracking-widest">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-12 mt-4">
            <button className="text-[#F4E4BC]/50 hover:text-[#d4af37] transition-colors duration-700 clickable">
              <span className="material-symbols-outlined text-2xl font-light">tune</span>
            </button>

            <div className="relative flex items-center justify-center clickable cursor-none group">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 scale-150 group-hover:scale-110 transition-transform duration-1000"></div>
              <button className="relative flex size-20 items-center justify-center rounded-full border border-[#d4af37] bg-black/60 backdrop-blur-xl group-hover:bg-[#d4af37]/10 transition-colors duration-700">
                <span className="material-symbols-outlined text-3xl text-[#d4af37] font-light">camera</span>
              </button>
            </div>

            <button className="text-[#F4E4BC]/50 hover:text-[#d4af37] transition-colors duration-700 clickable">
              <span className="material-symbols-outlined text-2xl font-light">favorite_border</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Keyframes for sophisticated loading line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes trace-top { 0% { width: 0%; left: 0; } 50% { width: 100%; left: 0; } 100% { width: 0%; left: 100%; } }
        @keyframes trace-right { 0% { height: 0%; top: 0; } 50% { height: 100%; top: 0; } 100% { height: 0%; top: 100%; } }
        @keyframes trace-bottom { 0% { width: 0%; right: 0; } 50% { width: 100%; right: 0; } 100% { width: 0%; right: 100%; } }
        @keyframes trace-left { 0% { height: 0%; bottom: 0; } 50% { height: 100%; bottom: 0; } 100% { height: 0%; bottom: 100%; } }
      `}} />
    </div>
  );
}
