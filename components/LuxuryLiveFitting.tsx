"use client";

import React, { useState, useEffect } from "react";
import { Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"] });

const ITEMS = [
    { id: 1, name: "Aura Blazer", price: 2400, brand: "Hermes", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
    { id: 2, name: "Silk Gown", price: 3100, brand: "Gucci", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
    { id: 3, name: "Moto Jacket", price: 1800, brand: "Saint Laurent", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
    { id: 4, name: "Tech Coat", price: 4500, brand: "Prada", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

const BRAND_STORIES: Record<string, string> = {
  "Hermes": "A high-fashion luxury goods manufacturer established in 1837. It specializes in leather, lifestyle accessories, home furnishings, perfumery, jewelry, watches and ready-to-wear.",
  "Gucci": "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion. Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship.",
  "Saint Laurent": "Founded in 1961, Yves Saint Laurent was the first couture house to introduce the concept of luxury ready-to-wear in a 1966 collection called ‘Rive Gauche’, synonymous with youth and freedom.",
  "Prada": "Prada is an Italian luxury fashion house that was founded in 1913 by Mario Prada. It specializes in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other fashion accessories."
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

export default function LuxuryLiveFitting() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(ITEMS[0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#000000] text-[#D4AF37] ${cinzel.className} cursor-none`}>
      <CustomCursor />

      <AnimatePresence>
        {loading && (
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            >
                <div className="relative h-32 w-32 flex flex-col items-center gap-4">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                        <motion.path
                            d="M10,10 L90,10 L90,90 L10,90 Z"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                        />
                    </svg>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        Initializing
                    </motion.span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Brand Banner Overlay (Subtle) */}
        <div
            className="absolute top-0 left-0 right-0 h-[400px] z-0 opacity-10 transition-opacity duration-1000 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to bottom, black, transparent), url(${selectedItem.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)'
            }}
        />

        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-20 pointer-events-none"
            style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 30px #D4AF37"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-20 flex items-center justify-between p-8 pt-10">
          <button className="flex size-14 items-center justify-center rounded-full transition-all duration-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-[#D4AF37]">close</span>
          </button>
          <div className="flex items-center gap-3 rounded-full px-6 py-3 backdrop-blur-md" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <div className="size-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Luxury Fit AI</h2>
          </div>
          <button className="flex size-14 items-center justify-center rounded-full transition-all duration-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
            <span className="material-symbols-outlined text-[#D4AF37]">flash_on</span>
          </button>
        </div>

        {/* Left Side: Stats & HUD */}
        <div className="absolute left-8 top-32 z-10 flex flex-col gap-8 w-[280px]">
           {/* Body Stability */}
           <div className="rounded-sm p-6 backdrop-blur-md transition-all duration-1000" style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37]/80">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#D4AF37]">98%</p>
              </div>
              <div className="h-[1px] w-full overflow-hidden bg-[#D4AF37]/20">
                <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: "98%" }}></div>
              </div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/60">
                <span className="material-symbols-outlined text-[12px]">diamond</span>
                Precision Lock
              </p>
            </div>
          </div>

          {/* Brand Story */}
          <div className="rounded-sm p-6 backdrop-blur-md transition-all duration-1000" style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-3 border-b border-[#D4AF37]/20 pb-2">{selectedItem.brand}</h3>
              <p className="text-[11px] text-[#D4AF37]/80 leading-relaxed font-sans opacity-80">
                  {BRAND_STORIES[selectedItem.brand] || "Defining modern luxury with timeless elegance and craftsmanship."}
              </p>
          </div>

          {/* Floating Fit Stats */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-sm p-4 backdrop-blur-md transition-all duration-1000 hover:translate-x-2" style={{ background: "rgba(0, 0, 0, 0.2)", borderLeft: "2px solid #D4AF37" }}>
                <p className="text-[10px] font-bold uppercase text-[#D4AF37]/60 tracking-widest">Shoulder</p>
                <span className="text-xl font-normal text-[#D4AF37]">Perfect</span>
            </div>
          </div>
        </div>

        {/* Right Side: Vertical Product Collection */}
        <div className="absolute right-0 top-0 bottom-0 z-10 w-[400px] overflow-y-auto scrollbar-hide bg-gradient-to-l from-black/95 to-transparent pt-32 pb-48 pl-10 pr-8 transition-all duration-700">
           <div className="flex flex-col gap-12">
             {ITEMS.map((item) => (
                <div
                    key={item.id}
                    className={`group relative cursor-pointer transition-all duration-700 hover:scale-105 ${selectedItem.id === item.id ? 'opacity-100 scale-105' : 'opacity-60'}`}
                    onClick={() => setSelectedItem(item)}
                >
                    <div className={`aspect-[3/4] w-full overflow-hidden rounded-sm border transition-all duration-700 relative ${selectedItem.id === item.id ? 'border-[#D4AF37]' : 'border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50'}`}>
                        {selectedItem.id === item.id ? (
                            <div className="w-full h-full relative">
                                <LuxuryImageDistortion imageUrl={item.img} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                            </div>
                        ) : (
                            <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url("${item.img}")` }}></div>
                        )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">{item.name}</p>
                            <p className="text-xs text-[#D4AF37]/60 uppercase tracking-widest">{item.brand}</p>
                        </div>
                        <p className="text-sm font-bold text-[#D4AF37]">{formatPrice(item.price)}</p>
                    </div>
                </div>
             ))}
           </div>
        </div>

        {/* Bottom Center: Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-12">
            <button className="flex size-16 items-center justify-center rounded-full text-[#D4AF37] transition-all duration-700 hover:bg-[#D4AF37]/10" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
              <span className="material-symbols-outlined text-xl">photo_library</span>
            </button>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4AF37]/20 blur-2xl group-hover:bg-[#D4AF37]/40 transition-all duration-1000"></div>
              <button className="relative flex size-28 items-center justify-center rounded-full border border-[#D4AF37] bg-black/50 backdrop-blur-sm transition-all duration-700 group-hover:scale-105">
                <div className="flex size-24 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20">
                  <span className="material-symbols-outlined text-5xl text-[#D4AF37]">camera</span>
                </div>
              </button>
            </div>
            <button className="flex size-16 items-center justify-center rounded-full text-[#D4AF37] transition-all duration-700 hover:bg-[#D4AF37]/10" style={{ border: "1px solid rgba(212, 175, 55, 0.3)" }}>
              <span className="material-symbols-outlined text-xl">refresh</span>
            </button>
        </div>

        {/* System UI Safe Area */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-40 rounded-full bg-[#D4AF37]/30"></div>
      </div>
    </div>
  );
}
