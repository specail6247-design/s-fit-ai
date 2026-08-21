"use client";

import React from "react";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });


const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.05s linear',
      }}
    >
      <div
        className={`absolute -left-4 -top-4 rounded-full border border-[#d4af37] transition-all duration-300 ease-out ${isHovering ? 'h-12 w-12 scale-150 bg-[#d4af37]/10' : 'h-8 w-8 scale-100'}`}
      />
      <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#d4af37]" />
    </div>
  );
};

export default function LuxuryLiveFitting() {
  const [selectedBrand] = React.useState({
    name: "Aura",
    description: "The epitome of modern luxury, redefining elegance with bold silhouettes and exquisite materials.",
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000",
  });

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-white dark:bg-[#101922] ${playfair.className}`}>
      <CustomCursor />
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
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                boxShadow: "0 0 15px #d4af37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="relative h-4 w-4 overflow-hidden rounded border border-[#d4af37]/30"><div className="absolute left-0 top-0 h-full w-[2px] animate-[spin_2s_linear_infinite] bg-[#d4af37]"></div></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#d4af37]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#d4af37]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#d4af37]">verified</span>
            </div>
          </div>
        </div>

                {/* Brand Experience Banner */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 rounded-2xl overflow-hidden h-[300px] border border-white/5 opacity-80 transition-all duration-1000">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{
              backgroundImage: `url('${selectedBrand.bannerImage}')`,
              transform: 'scale(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2">{selectedBrand.name}</h3>
            <p className="text-xs text-white/80 leading-relaxed max-w-[280px] font-light">{selectedBrand.description}</p>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-2 py-4 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div className="flex min-w-40 flex-col gap-2 rounded-xl border-2 border-[#d4af37] bg-[#d4af37]/20 p-1 backdrop-blur-md">
                <LuxuryImageDistortion
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                  className="aspect-[3/4] w-full rounded-lg"
                  alt="Luxury blue blazer thumbnail"
                />
                <div className="px-1 pb-1">
                  <p className="truncate text-[10px] font-bold uppercase text-white">Aura Blazer</p>
                  <p className="text-[10px] font-bold text-[#d4af37]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-40 flex-col gap-2 rounded-xl p-1 opacity-80" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <LuxuryImageDistortion
                    imageUrl={item.img}
                    className="aspect-[3/4] w-full rounded-lg"
                    alt={item.name}
                  />
                    <div className="px-1 pb-1">
                    <p className="truncate text-[10px] font-bold uppercase text-white">{item.name}</p>
                    <p className="text-[10px] font-bold text-white/50">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#d4af37]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#d4af37] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
