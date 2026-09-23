"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const brands = {
    gucci: {
      name: "GUCCI",
      description: "A century of Italian craftsmanship meets modern design.",
      banner: "https://images.unsplash.com/photo-1558769132-cb1fac084092?auto=format&fit=crop&q=80&w=1000",
    },
  };

  if (loading) {
    return (
      <div className={`relative flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white ${cinzel.className}`}>
        <div className="relative size-32">
          <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
            <rect
              x="10" y="10" width="80" height="80"
              fill="none" stroke="#d4af37" strokeWidth="2"
              strokeDasharray="320" strokeDashoffset="320"
              className="animate-[trace_2s_ease-in-out_forwards]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm tracking-[0.3em] text-[#d4af37]">S_FIT</span>
          </div>
        </div>
        <style>{`
          @keyframes trace {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className}`}
      style={{ cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"none\" stroke=\"%23d4af37\" stroke-width=\"2\"/></svg>') 12 12, auto" }}
    >
      <div className="absolute inset-0 z-0">
        {selectedBrand ? (
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-1000 ease-in-out hover:scale-105"
            style={{ backgroundImage: `linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.9)), url('${brands.gucci.banner}')` }}
          />
        ) : (
          <LuxuryImageDistortion
            imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection with AR garment overlay"
          />
        )}
      </div>

      {/* Scanning Effect Overlay */}
      <div
          className="absolute top-[40%] w-full h-[1px] opacity-40 z-10"
          style={{
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
              boxShadow: "0 0 20px #d4af37"
          }}
      ></div>

      {/* Top Navigation Bar */}
      <div className="z-20 flex items-center justify-between p-6 pt-10">
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#d4af37]/50">
          <span className="material-symbols-outlined text-white/80">close</span>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md">
          <div className="size-2 animate-pulse rounded-full bg-[#d4af37]"></div>
          <h2 className="text-sm tracking-[0.2em] text-[#d4af37]">Luxury Fit AI</h2>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:border-[#d4af37]/50">
          <span className="material-symbols-outlined text-white/80">flash_on</span>
        </div>
      </div>

      {/* Brand Info Overlay */}
      {selectedBrand && (
        <div className="absolute inset-x-0 top-32 z-20 mx-auto max-w-lg text-center px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl tracking-widest text-[#d4af37] mb-4">{brands.gucci.name}</h1>
          <p className={`text-sm text-white/70 ${spaceGrotesk.className}`}>{brands.gucci.description}</p>
        </div>
      )}

      {/* Floating Fit Stats Sidebar (Right) */}
      <div className={`absolute right-6 top-1/3 z-20 flex flex-col gap-6 ${spaceGrotesk.className}`}>
        <div className="flex min-w-[140px] flex-col gap-2 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-all duration-700 hover:border-[#d4af37]/50">
          <p className="text-xs tracking-widest text-white/50 uppercase">Shoulder</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-white">98%</span>
            <span className="text-xs text-[#d4af37]">+2%</span>
          </div>
        </div>
        <div className="flex min-w-[140px] flex-col gap-2 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-all duration-700 hover:border-[#d4af37]/50">
          <p className="text-xs tracking-widest text-white/50 uppercase">Waist</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-white">94%</span>
            <span className="text-xs text-[#d4af37]">+1%</span>
          </div>
        </div>
      </div>

      {/* Bottom UI Section */}
      <div className="mt-auto pb-12 z-20">
        {/* Garment Selection (Masonry-style or Vertical) */}
        <div className="flex overflow-x-auto px-6 py-8 gap-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>

          <div
            className="flex min-w-[160px] flex-col gap-4 rounded-xl border-0 p-2 transition-all duration-1000 cursor-pointer group"
            onClick={() => setSelectedBrand("gucci")}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              />
              <div className="absolute inset-0 border border-[#d4af37]/0 transition-colors duration-700 group-hover:border-[#d4af37]/50 rounded-lg"></div>
            </div>
            <div className="px-2 text-center">
              <p className="truncate text-xs tracking-widest text-white mb-2">Aura Blazer</p>
              <p className={`text-sm text-[#d4af37] ${spaceGrotesk.className}`}>$2,400</p>
            </div>
          </div>

          {[
              { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
          ].map((item, i) => (
            <div key={i} className="flex min-w-[160px] flex-col gap-4 rounded-xl border-0 p-2 transition-all duration-1000 cursor-pointer group opacity-60 hover:opacity-100">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                </div>
                <div className="px-2 text-center">
                  <p className="truncate text-xs tracking-widest text-white mb-2">{item.name}</p>
                  <p className={`text-sm text-white/50 ${spaceGrotesk.className}`}>{item.price}</p>
                </div>
            </div>
          ))}
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-12 p-6">
          <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition-colors duration-700 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined font-light">photo_library</span>
          </button>
          <div className="relative flex items-center justify-center group">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/20 blur-2xl transition-opacity duration-700 group-hover:bg-[#d4af37]/40"></div>
            <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-[1px] border-[#d4af37] bg-transparent transition-transform duration-700 hover:scale-105">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#d4af37] transition-transform duration-700 group-hover:scale-95">
                <span className="material-symbols-outlined text-4xl text-black font-light">camera</span>
              </div>
            </button>
            <div className="absolute -bottom-8 flex flex-col items-center">
              <span className="text-xs tracking-[0.4em] text-[#d4af37]">CAPTURE</span>
            </div>
          </div>
          <button className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition-colors duration-700 hover:border-[#d4af37]/50">
            <span className="material-symbols-outlined font-light">refresh</span>
          </button>
        </div>
      </div>

      {/* System UI Safe Area */}
      <div className="mx-auto mb-2 h-1 w-32 rounded-full bg-white/10"></div>
    </div>
  );
}
