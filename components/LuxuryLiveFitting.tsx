"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white cursor-none ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-[#ecab13] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />
      <div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-2 rounded-full bg-[#ecab13] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        }}
      />

      {/* Main Viewport Container */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center">

        {/* Brand Banner Parallax Background */}
        <div
          className="absolute inset-0 z-0 opacity-20 duration-1000 ease-out transition-transform"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,1)), url('https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80&w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: typeof window !== 'undefined' ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px) scale(1.05)` : "scale(1.05)",
            filter: "saturate(0.5) contrast(1.2)"
          }}
        />

        {/* Central Luxury Image Distortion Wrapper */}
        <div className="z-10 h-full w-full max-w-md md:max-w-xl flex items-center justify-center p-8">
            <LuxuryImageDistortion
                imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                className="w-full aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5"
            />
        </div>

        {/* Sophisticated Loading Animation (Scan Line) */}
        {isLoading && (
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                <motion.div
                    className="absolute w-[90%] max-w-md h-[1px] bg-[#ecab13] shadow-[0_0_15px_#ecab13]"
                    animate={{
                        top: ["10%", "90%", "10%"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        )}

        {/* Top Navigation Bar */}
        <div className="absolute top-0 z-30 flex w-full items-center justify-between p-6 pt-10">
          <button className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-700 active:scale-95">
            <span className="material-symbols-outlined text-white/80">arrow_back</span>
          </button>

          <div className="flex flex-col items-center">
            <h1 className={`text-xl font-bold tracking-[0.3em] uppercase text-[#ecab13] ${cinzel.className}`}>S_FIT AI</h1>
            <p className="text-[10px] tracking-widest text-white/50 uppercase">Luxury Mode</p>
          </div>

          <button className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-700 active:scale-95">
            <span className="material-symbols-outlined text-white/80">more_vert</span>
          </button>
        </div>

        {/* Brand Story / Description (Left overlay on desktop, hidden on mobile) */}
        <div className="absolute left-12 top-1/3 z-30 hidden lg:flex flex-col max-w-[280px]">
            <h2 className={`text-4xl text-white mb-4 ${cinzel.className}`}>Aura <br/>Collection</h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Discover the intersection of timeless elegance and modern silhouette. Woven with metallic threads for a subtle, luminous finish under any lighting.
            </p>
            <button className="text-[#ecab13] text-xs font-bold tracking-widest uppercase border-b border-[#ecab13]/30 w-fit pb-1 hover:border-[#ecab13] transition-colors duration-700 active:scale-95">
                Read Brand Story
            </button>
        </div>

        {/* Floating Fit Stats (Right) */}
        <div className="absolute right-6 top-1/3 z-30 flex flex-col gap-4">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 bg-black/40 backdrop-blur-xl border border-white/10 transition-transform duration-1000 hover:scale-105">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl text-white ${cinzel.className}`}>Perfect</span>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-xl p-4 bg-black/40 backdrop-blur-xl border border-white/10 transition-transform duration-1000 hover:scale-105">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Material</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl text-white ${cinzel.className}`}>Silk</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="absolute bottom-0 w-full pb-12 z-30 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pt-20">

          {/* Enhanced Garment Carousel */}
          <div className="flex overflow-x-auto px-6 py-8 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
            <div className="flex items-end gap-6 mx-auto">

              {/* Active Item */}
              <div className="flex min-w-[160px] flex-col gap-4 rounded-2xl border border-[#ecab13]/50 bg-[#ecab13]/5 p-2 backdrop-blur-xl transition-all duration-1000">
                <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center"
                  style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")',
                      filter: 'saturate(0.9) contrast(1.1)'
                  }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className={`truncate text-sm text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-xs tracking-widest text-[#ecab13] mt-1">$2,400</p>
                </div>
              </div>

              {/* Inactive Items */}
              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[120px] flex-col gap-3 rounded-2xl p-2 opacity-50 bg-white/5 backdrop-blur-xl border border-white/10 hover:opacity-100 hover:scale-105 transition-all duration-1000 cursor-pointer">
                    <div
                        className="aspect-[3/4] w-full rounded-xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${item.img}")`,
                            filter: 'saturate(0.9) contrast(1.1)'
                        }}
                    ></div>
                    <div className="px-2 pb-1 text-center">
                        <p className={`truncate text-xs text-white ${cinzel.className}`}>{item.name}</p>
                        <p className="text-[10px] tracking-widest text-white/40 mt-1">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls - Premium Style */}
          <div className="flex items-center justify-center gap-12 mt-4">
            <button className="flex flex-col items-center gap-2 group active:scale-95 transition-transform duration-700">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-700">
                  <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors duration-700">style</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors duration-700">Library</span>
            </button>

            <div className="relative flex items-center justify-center active:scale-95 transition-transform duration-700">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl"></div>
              <button
                className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-[#ecab13]/50 bg-black/40 backdrop-blur-xl hover:border-[#ecab13] hover:bg-black/60 transition-all duration-1000 group"
                onClick={() => setIsLoading(!isLoading)}
              >
                <div className="flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-[#ecab13]/10 transition-colors duration-1000">
                  <span className={`text-sm tracking-[0.2em] text-[#ecab13] uppercase ${cinzel.className}`}>Fit</span>
                </div>
              </button>
            </div>

            <button className="flex flex-col items-center gap-2 group active:scale-95 transition-transform duration-700">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-700">
                  <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors duration-700">360</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors duration-700">Turn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hide default scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
