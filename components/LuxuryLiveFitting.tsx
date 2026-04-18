"use client";

import React, { useEffect, useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById("luxury-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        const target = e.target as HTMLElement;
        const isClickable = target.closest("button") || target.closest("a") || target.closest(".group");
        if (isClickable) {
          cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
          cursor.style.borderColor = "#ffffff";
        } else {
          cursor.style.transform = "translate(-50%, -50%) scale(1)";
          cursor.style.borderColor = "#c9b037"; // Gold ring
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Cursor */}
      <div
        id="luxury-cursor"
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-[#c9b037] transition-transform duration-300 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {loading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="relative h-32 w-24">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 133">
              <rect x="2" y="2" width="96" height="129" fill="none" stroke="#c9b037" strokeWidth="1" strokeDasharray="450" strokeDashoffset="450" className="animate-[dash_2s_ease-in-out_infinite]" />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center ${cinzel.className}`}>
              <span className="text-[#c9b037] text-sm uppercase tracking-widest">Loading</span>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dash {
              0% { stroke-dashoffset: 450; }
              50% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -450; }
            }
          `}} />
        </div>
      ) : (
        <>
          {/* Main Product Visual */}
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />

          {/* Brand Experience Parallax Overlay */}
          {selectedBrand && (
            <div className="absolute inset-0 z-0 bg-cover bg-fixed bg-center opacity-30 transition-opacity duration-1000" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000')" }}>
            </div>
          )}

          {/* Vignette */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/50 to-[#050505]"></div>

          {/* Top Navigation Bar */}
          <div className="z-10 flex items-center justify-between p-8">
            <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#c9b037]/50" aria-label="Close">
              <span className="material-symbols-outlined text-white/70 group-hover:text-[#c9b037]" aria-hidden="true">close</span>
            </button>
            <div className={`flex flex-col items-center gap-1 ${cinzel.className}`}>
              <h2 className="text-xl font-bold tracking-[0.3em] uppercase text-[#c9b037]">Masterpiece Fit</h2>
              {selectedBrand && <p className="text-[10px] tracking-widest text-white/50 uppercase">Atelier Mode</p>}
            </div>
            <button
              className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#c9b037]/50"
              onClick={() => setSelectedBrand(!selectedBrand)}
              aria-label="Toggle Brand"
            >
              <span className="material-symbols-outlined text-white/70 group-hover:text-[#c9b037]" aria-hidden="true">diamond</span>
            </button>
          </div>

          {/* Brand Description (Visible when selected) */}
          <div className={`absolute left-8 top-1/4 z-10 max-w-xs transition-all duration-1000 ${selectedBrand ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
            <h3 className={`${cinzel.className} text-2xl mb-4 text-[#c9b037]`}>Maison Heritage</h3>
            <p className="text-xs leading-relaxed text-white/70">
              Experience the pinnacle of craftsmanship. Each garment is digitally woven with exact physics matching our real-world atelier.
            </p>
          </div>

          {/* Right Stats Sidebar */}
          <div className="absolute right-8 top-1/4 z-10 flex flex-col gap-6">
            <div className="group flex flex-col gap-2 rounded-xl border border-white/5 bg-black/40 p-4 backdrop-blur-md transition-all duration-700 hover:border-[#c9b037]/30">
              <p className={`text-[10px] uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>Drape Accuracy</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light">99.8%</span>
              </div>
            </div>
            <div className="group flex flex-col gap-2 rounded-xl border border-white/5 bg-black/40 p-4 backdrop-blur-md transition-all duration-700 hover:border-[#c9b037]/30">
              <p className={`text-[10px] uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>Fabric Tension</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light">Optimal</span>
              </div>
            </div>
          </div>

          {/* Bottom UI Section */}
          <div className="mt-auto z-10 pb-16 pt-32 bg-gradient-to-t from-[#050505] to-transparent">
            {/* Masonry-style Garment List (Horizontal Scroll) */}
            <div className="flex overflow-x-auto px-8 pb-8 scrollbar-hide space-x-6">
              {[
                { name: "Silk Evening Gown", price: 12500, brand: "Maison", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Velvet Dinner Jacket", price: 8200, brand: "Atelier", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Cashmere Overcoat", price: 15800, brand: "Heritage", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="group relative flex min-w-[200px] flex-col gap-4 cursor-pointer">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 transition-all duration-1000 group-hover:border-[#c9b037]/50 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110 saturate-[0.9] contrast-[1.1]" style={{ backgroundImage: `url("${item.img}")` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <p className={`text-[9px] uppercase tracking-widest text-[#c9b037] ${cinzel.className}`}>{item.brand}</p>
                    <p className="truncate text-sm font-light text-white">{item.name}</p>
                    <p className="text-xs text-white/50">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Capture Controls */}
            <div className="flex items-center justify-center gap-16 px-8 mt-4">
              <button className="group flex flex-col items-center gap-2 transition-all duration-700" aria-label="Archive">
                <span className="material-symbols-outlined text-white/50 group-hover:text-white" aria-hidden="true">inventory_2</span>
                <span className={`text-[8px] uppercase tracking-widest text-white/50 group-hover:text-white ${cinzel.className}`}>Archive</span>
              </button>

              <button className="group relative flex items-center justify-center transition-transform duration-700 hover:scale-105" aria-label="Capture Fit">
                <div className="absolute inset-0 rounded-full border border-[#c9b037]/30 transition-all duration-1000 group-hover:scale-125 group-hover:border-[#c9b037]/10"></div>
                <div className="flex size-20 items-center justify-center rounded-full border border-[#c9b037] bg-black/60 backdrop-blur-md">
                  <div className="size-16 rounded-full bg-[#c9b037]/10 transition-colors duration-700 group-hover:bg-[#c9b037]/20"></div>
                </div>
              </button>

              <button className="group flex flex-col items-center gap-2 transition-all duration-700" aria-label="Purchase">
                <span className="material-symbols-outlined text-white/50 group-hover:text-white" aria-hidden="true">shopping_bag</span>
                <span className={`text-[8px] uppercase tracking-widest text-white/50 group-hover:text-white ${cinzel.className}`}>Acquire</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
