"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Using the mock data from original component
const GARMENTS = [
  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
  { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" }
];

const BRANDS = [
  { name: "GUCCI", description: "Italian luxury fashion house known for bold, maximalist designs and impeccable craftsmanship." },
  { name: "PRADA", description: "Pioneering minimalist luxury with innovative materials and intellectual design." },
  { name: "CHANEL", description: "The epitome of Parisian elegance, defining modern women's fashion." }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<{name: string, description: string} | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleBrandSelect = (brandName: string) => {
    const brand = BRANDS.find(b => b.name === brandName);
    if (!brand) return;
    setSelectedBrand(selectedBrand?.name === brandName ? null : brand);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#F4E4BC] ${playfair.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] size-8 rounded-full border border-[#C9B037] mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${cursorPos.x - 16}px, ${cursorPos.y - 16}px)`,
        }}
      />

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        <LuxuryImageDistortion
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
          alt="User reflection with AR garment overlay"
          className="absolute inset-0 z-0"
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <div className="flex size-12 items-center justify-center rounded-full border border-[#C9B037]/30 bg-black/60 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10">
            <span className="material-symbols-outlined text-[#F4E4BC]">close</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 border-b border-[#C9B037]">
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-[#C9B037]">Luxury Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-[#C9B037]/30 bg-black/60 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10">
            <span className="material-symbols-outlined text-[#F4E4BC]">flash_on</span>
          </div>
        </div>

        {/* Brand Selection Experience */}
        <div className="z-10 mt-4 px-8 flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => handleBrandSelect(brand.name)}
              className={`px-6 py-2 border transition-all duration-700 ${
                selectedBrand?.name === brand.name
                  ? 'border-[#C9B037] text-[#C9B037] bg-[#C9B037]/10'
                  : 'border-[#F4E4BC]/30 text-[#F4E4BC]/60 hover:border-[#F4E4BC]/80'
              } tracking-widest text-sm`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {selectedBrand && (
          <div className="z-10 px-8 py-6 max-w-lg transition-all duration-1000 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-[#C9B037] mb-2 tracking-wider">{selectedBrand.name}</h3>
            <p className="text-[#F4E4BC]/80 text-sm leading-relaxed">
              {selectedBrand.description}
            </p>
          </div>
        )}

        {/* Loading State / Scanning Effect Overlay */}
        <div className="absolute top-[40%] w-full flex justify-center opacity-70 pointer-events-none z-10">
           <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#C9B037] to-transparent animate-pulse shadow-[0_0_20px_#C9B037]"></div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-8 z-10">
          <div className="max-w-[240px] rounded-xl p-4 transition-all duration-1000" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-[#F4E4BC]">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#C9B037]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#C9B037] transition-all duration-1000" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#F4E4BC]/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/4 z-10 flex flex-col gap-4">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-4 transition-all duration-1000" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-[#F4E4BC]/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#F4E4BC]">98%</span>
              <span className="text-[10px] font-bold text-[#C9B037]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-4 transition-all duration-1000" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-[#F4E4BC]/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#F4E4BC]">94%</span>
              <span className="text-[10px] font-bold text-[#C9B037]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-4 transition-all duration-1000" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(201, 176, 55, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-[#F4E4BC]/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#F4E4BC]">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#C9B037]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-16 z-10 px-8">
          {/* Garment Carousel (Masonry/Vertical style focus) */}
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {GARMENTS.map((item, i) => (
              <div key={i} className={`flex min-w-[200px] flex-col gap-4 p-4 border border-[#C9B037]/20 bg-black/40 backdrop-blur-md transition-all duration-1000 hover:border-[#C9B037] hover:scale-105 ${i === 0 ? 'border-[#C9B037]' : ''}`}>
                  <div
                    className="aspect-[3/4] w-full bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  ></div>
                  <div className="px-2 pb-2 text-center">
                    <p className="text-sm tracking-widest uppercase text-[#F4E4BC] mb-1">{item.name}</p>
                    <p className="text-base text-[#C9B037]">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
              </div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#F4E4BC] border border-[#C9B037]/30 bg-black/60 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10">
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9B037]/30 blur-xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-4 border-[#C9B037] bg-black">
                <div className="flex size-20 items-center justify-center rounded-full border border-[#C9B037]/50">
                  <span className="material-symbols-outlined text-4xl text-[#C9B037]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9B037]">Capture</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#F4E4BC] border border-[#C9B037]/30 bg-black/60 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037] hover:bg-[#C9B037]/10">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-[#C9B037]/50"></div>
      </div>
    </div>
  );
}
