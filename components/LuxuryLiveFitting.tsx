"use client";

import React, { useEffect, useRef, useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const MOCK_ITEMS = [
    { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
    { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" }
  ];

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className}`}>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#d4af37] pointer-events-none z-50 transition-transform duration-75 ease-out mix-blend-difference"
        style={{ willChange: 'transform' }}
      />

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
           <div className="relative w-24 h-24">
             <div className="absolute inset-0 border border-[#d4af37]/20"></div>
             <div className="absolute inset-0 border-t-2 border-[#d4af37] animate-[spin_2s_linear_infinite] origin-center w-full h-full"></div>
             <div className="absolute inset-0 flex items-center justify-center text-[#d4af37] text-xs uppercase tracking-widest font-bold">AI</div>
           </div>
        </div>
      ) : null}

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col p-8 transition-opacity duration-1000"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors duration-700">
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex flex-col items-center gap-1">
             <h1 className={`text-2xl text-[#d4af37] tracking-[0.3em] uppercase ${cinzel.className}`}>Gucci</h1>
             <p className="text-xs text-white/60 tracking-widest uppercase">Florence, Italy - 1921</p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors duration-700">
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        <div className="flex-1 flex mt-12 gap-12 h-full overflow-hidden">
            {/* Left side UI */}
            <div className="w-1/3 flex flex-col justify-between z-10 pb-12">
               <div>
                   <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-[#d4af37]/30 bg-black/40 backdrop-blur-md mb-8">
                     <div className="size-2 animate-pulse rounded-full bg-[#d4af37]"></div>
                     <h2 className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">Luxury Live Fit</h2>
                   </div>

                   <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl w-full max-w-xs space-y-4">
                      <p className="text-xs font-medium uppercase tracking-tighter text-white/50">Body Stability</p>
                      <div className="flex items-end justify-between">
                        <p className="text-xs font-bold leading-none text-white">Precision</p>
                        <p className="text-sm font-bold leading-none text-[#d4af37]">99%</p>
                      </div>
                      <div className="h-1 w-full overflow-hidden bg-white/10">
                        <div className="h-full bg-[#d4af37] transition-all duration-1000 ease-in-out" style={{ width: "99%" }}></div>
                      </div>
                   </div>
               </div>

               <div className="space-y-4 max-w-xs">
                    <div className="p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl flex justify-between items-center">
                        <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
                        <span className="text-lg font-bold text-[#d4af37]">98%</span>
                    </div>
                    <div className="p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl flex justify-between items-center">
                        <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
                        <span className="text-lg font-bold text-[#d4af37]">94%</span>
                    </div>
               </div>
            </div>

            {/* Right side UI: Vertical Carousel */}
            <div className="w-2/3 flex justify-end overflow-y-auto no-scrollbar pb-24 z-10 pr-4">
                <div className="flex flex-col gap-8 w-64">
                   {MOCK_ITEMS.map((item, i) => (
                      <div key={i} className="flex flex-col gap-4 group cursor-pointer">
                          <div className="w-full aspect-[3/4]">
                             <LuxuryImageDistortion imageUrl={item.img} alt={item.name} />
                          </div>
                          <div className="flex flex-col items-center text-center">
                             <h3 className={`text-lg text-white tracking-widest uppercase group-hover:text-[#d4af37] transition-colors duration-700 ${cinzel.className}`}>{item.name}</h3>
                             <p className="text-sm font-light text-white/60 mt-1">${item.price.toLocaleString()}</p>
                          </div>
                      </div>
                   ))}
                </div>
            </div>
        </div>

        {/* Bottom Capture */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
            <button className="relative flex size-20 items-center justify-center rounded-full border border-[#d4af37] bg-black/40 backdrop-blur-md group hover:bg-[#d4af37]/20 transition-all duration-700">
                <div className="flex size-14 items-center justify-center rounded-full border border-[#d4af37]">
                <span className="material-symbols-outlined text-2xl text-[#d4af37]">camera</span>
                </div>
            </button>
        </div>
      </div>
    </div>
  );
}
