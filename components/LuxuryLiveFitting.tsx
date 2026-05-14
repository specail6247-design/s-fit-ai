"use client";

import React, { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState({
    name: "LUXURY BRAND",
    banner: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
    description: "Haute Couture Collection"
  });

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white dark:bg-[#000000] ${playfairDisplay.className}`}>
      {/* Luxury Gold Ring Cursor (Hidden on coarse pointer devices) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: coarse) {
          .luxury-cursor { display: none !important; }
        }
      `}} />
      <div
        ref={cursorRef}
        className="luxury-cursor pointer-events-none fixed top-0 left-0 z-50 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ecab13] transition-transform duration-75 ease-out will-change-transform"
      >
        <div className="h-1 w-1 rounded-full bg-[#ecab13]"></div>
      </div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 100%), url('${selectedBrand.banner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
      >
        {/* Sophisticated Loading Overlay */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none opacity-80 mix-blend-screen">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="#ecab13" strokeWidth="0.5" className="opacity-20" />
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="#ecab13" strokeWidth="1.5" strokeDasharray="320" strokeDashoffset="320" className="animate-[dash_3s_ease-in-out_infinite]" />
          </svg>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes dash {
              0% { stroke-dashoffset: 320; }
              50% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -320; }
            }
          `}} />
        </div>

        {/* Top Navigation Bar & Brand Info */}
        <div className="z-10 flex flex-col p-4 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
              <span className="material-symbols-outlined text-[#ecab13]">close</span>
            </div>
            <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
              <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#ecab13]">Luxury Live AI</h2>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.2)" }}>
              <span className="material-symbols-outlined text-[#ecab13]">flash_on</span>
            </div>
          </div>
          <div className="mt-8 text-center animate-fade-in-up">
            <h1 className="text-4xl font-normal tracking-widest text-white uppercase">{selectedBrand.name}</h1>
            <p className="mt-2 text-xs tracking-[0.2em] text-white/70 uppercase font-sans">{selectedBrand.description}</p>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#ecab13]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "95%" }}></div>
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
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Vertical List */}
          <div className="flex flex-col gap-6 overflow-y-auto px-6 py-8 pb-32 h-[50vh] scrollbar-hide" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex flex-col items-stretch gap-6">
              <div className="flex min-h-32 gap-4 rounded-xl border-2 border-[#ecab13] bg-[#0a0a0a]/80 p-2 backdrop-blur-md transition-all duration-700 hover:scale-[1.02]">
                <div
                  className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="flex flex-col justify-center px-4 py-2">
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Aura Blazer</p>
                  <p className="text-xs font-bold text-[#ecab13] mt-1">$12,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$23,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$8,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$34,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-h-32 gap-4 rounded-xl p-2 opacity-80 transition-all duration-700 hover:scale-[1.02] hover:opacity-100" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                    className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="flex flex-col justify-center px-4 py-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-white">{item.name}</p>
                    <p className="text-xs font-bold text-white/50 mt-1">{item.price}</p>
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
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-black">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-white/10">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
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
