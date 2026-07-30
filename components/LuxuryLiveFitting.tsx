"use client";

import React from "react";
import { Playfair_Display, Cinzel } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedBrand, setSelectedBrand] = useState<{name: string, desc: string, banner: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const brands = [
    { name: "AURA", desc: "Redefining modern elegance with timeless silhouettes and sustainable luxury.", banner: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2000" },
    { name: "VANGUARD", desc: "Avant-garde streetwear meets high fashion craftsmanship.", banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" },
    { name: "MAISON", desc: "Classic Parisian chic, tailored for the contemporary wardrobe.", banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000" }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#d4af37] bg-black ${playfair.className} cursor-none`}>
      {/* Main AR Viewport Container */}

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 flex size-12 items-center justify-center rounded-full border border-[#d4af37]"
        animate={{ x: cursorPos.x - 24, y: cursorPos.y - 24 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      >
        <div className="size-2 rounded-full bg-[#d4af37]" />
      </motion.div>

      <style global jsx>{`
        @keyframes traceLine {
          0% { width: 0; height: 1px; top: 0; left: 0; }
          25% { width: 100%; height: 1px; top: 0; left: 0; }
          50% { width: 100%; height: 100%; top: 0; left: 0; border-right: 1px solid #d4af37; border-top: 1px solid #d4af37; }
          75% { width: 100%; height: 100%; top: 0; left: 0; border: 1px solid #d4af37; border-bottom: 1px solid transparent; border-left: 1px solid transparent; }
          100% { width: 100%; height: 100%; top: 0; left: 0; border: 1px solid #d4af37; }
        }
        .luxury-loader::before {
          content: '';
          position: absolute;
          border-top: 1px solid #d4af37;
          animation: traceLine 2s ease-in-out forwards;
        }
      `}</style>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
                <div className="relative size-32 luxury-loader flex items-center justify-center">
                    <span className={`text-[#d4af37] tracking-widest ${cinzel.className}`}>LOADING</span>
                </div>
            </div>
        )}

        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection with AR garment overlay"
            className="w-full h-full"
          />
        </div>

        <AnimatePresence>
        {selectedBrand && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="absolute inset-x-0 top-24 z-10 mx-auto max-w-2xl px-6"
            >
                <div className="relative h-48 overflow-hidden rounded-xl border border-[#d4af37]/30 shadow-2xl">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedBrand.banner})` }}
                        animate={{ y: ["0%", "10%", "0%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className={`text-2xl text-[#d4af37] ${cinzel.className}`}>{selectedBrand.name}</h3>
                        <p className="text-sm text-gray-300 mt-2 font-serif italic">{selectedBrand.desc}</p>
                    </div>
                </div>
            </motion.div>
        )}
        </AnimatePresence>

        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #2b8cee, transparent)",
                boxShadow: "0 0 15px #d4af37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <div className="size-2 animate-pulse rounded-full bg-[#d4af37]"></div>
            <h2 className={`text-sm font-bold tracking-widest uppercase text-[#d4af37] ${cinzel.className}`}>Lux Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#d4af37]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#d4af37]/10">
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
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-[#d4af37]">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-[#d4af37]">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#d4af37]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Brand & Garment Selection */}
          <div className="absolute left-6 top-1/4 z-10 flex flex-col gap-10 h-[60vh] overflow-y-auto scrollbar-hide w-64 pr-4 pb-20">
            <div className="flex flex-col gap-4">
                <h3 className={`text-lg text-[#d4af37] uppercase tracking-widest ${cinzel.className}`}>Houses</h3>
                {brands.map((brand, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedBrand(brand)}
                        className={`text-left text-sm tracking-wider transition-all duration-700 hover:text-[#d4af37] ${selectedBrand?.name === brand.name ? 'text-[#d4af37] font-bold' : 'text-gray-500'}`}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-6 mt-8">
                <h3 className={`text-lg text-[#d4af37] uppercase tracking-widest ${cinzel.className}`}>Collection</h3>
                <div className="flex flex-col gap-8">
                  <div className="group relative flex w-full flex-col gap-3 transition-transform duration-1000 hover:scale-[1.02]">
                    <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent opacity-0 blur transition-opacity duration-1000 group-hover:opacity-100"></div>
                    <div
                      className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat grayscale transition-all duration-1000 group-hover:grayscale-0"
                      data-alt="Luxury blue blazer thumbnail"
                      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                    ></div>
                    <div className="flex items-end justify-between px-1">
                      <p className={`text-sm tracking-wider text-gray-200 ${cinzel.className}`}>Aura Blazer</p>
                      <p className="text-xs font-serif text-[#d4af37]">{formatPrice(2400)}</p>
                    </div>
                  </div>

                  {[
                      { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                      { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                      { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
                  ].map((item, i) => (
                    <div key={i} className="group relative flex w-full flex-col gap-3 transition-transform duration-1000 hover:scale-[1.02]">
                        <div
                        className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat grayscale transition-all duration-1000 group-hover:grayscale-0"
                        style={{ backgroundImage: `url("${item.img}")` }}
                        ></div>
                        <div className="flex items-end justify-between px-1">
                        <p className={`text-sm tracking-wider text-gray-400 transition-colors duration-700 group-hover:text-gray-200 ${cinzel.className}`}>{item.name}</p>
                        <p className="text-xs font-serif text-[#d4af37]/60 transition-colors duration-700 group-hover:text-[#d4af37]">{formatPrice(item.price)}</p>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
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
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
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
