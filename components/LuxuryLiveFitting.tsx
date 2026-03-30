"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [activeGarment, setActiveGarment] = useState(0);

  const garments = [
    {
      name: "Aura Blazer",
      price: "$2,400",
      brand: "Maison Margiela",
      brandDesc: "Avant-garde luxury meets precise tailoring.",
      bannerImg: "https://images.unsplash.com/photo-1543082589-d102e1b108cb?auto=format&fit=crop&q=80&w=1000",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
    },
    {
      name: "Silk Gown",
      price: "$3,100",
      brand: "Alexander McQueen",
      brandDesc: "Dark romanticism defined by British craftsmanship.",
      bannerImg: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0"
    },
    {
      name: "Moto Jacket",
      price: "$1,800",
      brand: "Balenciaga",
      brandDesc: "Architectural shapes intersecting modern street culture.",
      bannerImg: "https://images.unsplash.com/photo-1550614000-4b95dd24479e?auto=format&fit=crop&q=80&w=1000",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA"
    },
    {
      name: "Tech Coat",
      price: "$4,500",
      brand: "Prada",
      brandDesc: "Intellectual fashion bridging luxury with utility.",
      bannerImg: "https://images.unsplash.com/photo-1502163140606-888448ae8cfe?auto=format&fit=crop&q=80&w=1000",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk"
    },
  ];

  const currentBrand = garments[activeGarment];

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-[#f8f7f6] ${spaceGrotesk.className}`}>
      {/* Main AR Viewport Container (Perserved from ARLiveFitting) */}
      <div
        className="relative flex h-screen w-full flex-col transition-all duration-1000 ease-in-out"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Luxury Custom Cursor (Gold Ring) */}
        <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
          <div className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ecab13] transition-transform duration-75 ease-out"
               style={{ boxShadow: '0 0 10px rgba(236, 171, 19, 0.3)' }}
               id="custom-cursor" />
        </div>

        {/* Dynamic Brand Banner Experience */}
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30 transition-opacity duration-1000">
          <LuxuryImageDistortion
            imageUrl={currentBrand.bannerImg}
            className="absolute inset-0"
            alt={`${currentBrand.brand} banner`}
          />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-20 flex items-center justify-between p-6 pt-10">
          <button aria-label="Close" className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 transition-colors duration-700 hover:border-[#ecab13]/50 cursor-pointer">
            <span className="material-symbols-outlined text-white font-light">close</span>
          </button>
          <div className="flex flex-col items-center">
            <div className={`text-[#ecab13] text-sm tracking-[0.2em] uppercase font-light ${cinzel.className}`}>
              {currentBrand.brand}
            </div>
            <div className="text-[10px] text-white/50 tracking-widest uppercase mt-1">
              Live Fitting
            </div>
          </div>
          <button aria-label="More options" className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 transition-colors duration-700 hover:border-[#ecab13]/50 cursor-pointer">
            <span className="material-symbols-outlined text-white font-light">more_horiz</span>
          </button>
        </div>

        {/* Brand Description & Status HUD */}
        <div className="mt-6 space-y-4 px-6 z-20">
          <div className="max-w-[300px] rounded-xl p-5 bg-black/40 backdrop-blur-xl border border-white/5 transition-all duration-1000">
            <div className="flex flex-col gap-4">
              <div>
                <p className={`text-lg text-[#f8f7f6] leading-tight ${cinzel.className}`}>
                  {currentBrand.brandDesc}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-end justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-white/60">Sartorial Match</p>
                  <p className="text-xs font-light text-[#ecab13]">95%</p>
                </div>
                {/* Sophisticated Gold Line Loading/Progress */}
                <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-[#ecab13] transition-all duration-1000 ease-out" style={{ width: "95%", boxShadow: "0 0 10px #ecab13" }}></div>
                </div>
                <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  <span className="material-symbols-outlined text-[10px] text-[#ecab13]">trip_origin</span>
                  Form locked
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-6 top-1/3 z-20 flex flex-col gap-6">
          <div className="flex flex-col items-end gap-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Drape</p>
            <div className={`text-2xl text-[#f8f7f6] ${cinzel.className}`}>Perfect</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Silhouette</p>
            <div className={`text-2xl text-[#f8f7f6] ${cinzel.className}`}>Tailored</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Proportion</p>
            <div className={`text-2xl text-[#ecab13] ${cinzel.className}`}>1:1.618</div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-20 flex flex-col items-center">

          {/* Vertical Masonry/Larger Cards replacement logic: we switch from a horizontal small carousel to a larger centered selector or prominent vertical sidebar. Since the user asked for "perhaps strictly vertical or masonry style" with "larger product cards", let's make a vertical scrolling list on the left side instead of bottom. Wait, it is currently at the bottom. Let's move it to a vertical stack on the left. */}
        </div>

        {/* Vertical Product Selector (Left Side) */}
        <div className="absolute left-6 top-1/3 bottom-32 z-20 flex flex-col gap-4 overflow-y-auto scrollbar-hide w-36 pr-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            {garments.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveGarment(i)}
                  className={`flex flex-col gap-3 p-2 cursor-pointer transition-all duration-700 ease-out ${activeGarment === i ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-70'}`}
                >
                    <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-white/10">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-110"
                          style={{ backgroundImage: `url("${item.img}")` }}
                        ></div>
                        {activeGarment === i && (
                          <div className="absolute inset-0 border border-[#ecab13] z-10"></div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className={`text-xs text-[#f8f7f6] truncate ${cinzel.className}`}>{item.name}</p>
                        <p className="text-[10px] tracking-widest text-[#ecab13]">{item.price}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Refined Capture Controls (Centered Bottom) */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-12">
            <button aria-label="View mosaic" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 text-white/70 transition-all duration-700 hover:text-white hover:border-white/20">
                <span className="material-symbols-outlined font-light">auto_awesome_mosaic</span>
            </button>

            <div className="relative flex items-center justify-center group cursor-pointer">
                {/* Sophisticated Loading/Capture Ring */}
                <svg className="absolute inset-0 w-[100px] h-[100px] -m-[10px] animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#ecab13" strokeWidth="1" strokeDasharray="300" strokeDashoffset="0" />
                </svg>

                <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-xl transition-all duration-1000 group-hover:bg-[#ecab13] group-hover:border-[#ecab13]">
                    <span className="material-symbols-outlined text-3xl text-white font-light transition-colors duration-1000 group-hover:text-black">camera</span>
                </button>
                <div className="absolute -bottom-8 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#ecab13]">Capture</span>
                </div>
            </div>

            <button aria-label="Tune settings" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/5 text-white/70 transition-all duration-700 hover:text-white hover:border-white/20">
                <span className="material-symbols-outlined font-light">tune</span>
            </button>
        </div>

      </div>
    </div>
  );
}
