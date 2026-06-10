"use client";

import React, { useState } from "react";
import { Cinzel } from "next/font/google";
import { LuxuryImageDistortion } from "@/components/ui/LuxuryImageDistortion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"] });

// Mock data
const brands = [
  {
    id: "gucci",
    name: "Gucci",
    description: "Florentine craftsmanship meets contemporary luxury.",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "chanel",
    name: "Chanel",
    description: "Timeless elegance and revolutionary spirit.",
    banner: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000",
  }
];

const garments = [
  { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
  { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${cinzel.className}`}>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative h-32 w-24">
              <motion.div
                className="absolute inset-0 border border-luxury-gold/20"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 border border-luxury-gold"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs tracking-[0.3em] text-luxury-gold uppercase"
            >
              Initializing Mirror
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">
        <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection"
            className="absolute inset-0 z-0"
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8">
          <Link href="/luxury" className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-1000 group">
            <span className="material-symbols-outlined text-luxury-gold/70 group-hover:text-luxury-gold transition-colors duration-700">close</span>
          </Link>
          <div className="flex items-center gap-3 px-8 py-3 bg-black/40 backdrop-blur-xl border border-luxury-gold/20 rounded-full">
            <div className="size-2 animate-pulse rounded-full bg-luxury-gold"></div>
            <h2 className="text-sm font-light tracking-[0.2em] uppercase text-luxury-gold/90">Live Fit AI</h2>
          </div>
          <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-1000 group">
            <span className="material-symbols-outlined text-luxury-gold/70 group-hover:text-luxury-gold transition-colors duration-700">flash_on</span>
          </div>
        </div>

        {/* Brand Experience Banner */}
        <div className="z-10 px-8 py-6 max-w-lg">
            <div className="relative overflow-hidden rounded-2xl bg-black/60 backdrop-blur-2xl border border-luxury-gold/20 p-6 transition-all duration-1000 group hover:border-luxury-gold/40">
                {/* Subtle parallax background for brand */}
                <div
                    className="absolute inset-0 opacity-10 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('${selectedBrand.banner}')` }}
                />
                <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold/60 mb-2">Partner Brand</p>
                    <h3 className="text-2xl mb-2 text-white/90">{selectedBrand.name}</h3>
                    <p className="text-sm text-white/50 font-sans font-light leading-relaxed">{selectedBrand.description}</p>

                    <div className="mt-4 flex gap-2">
                        {brands.map(b => (
                            <button
                                key={b.id}
                                onClick={() => setSelectedBrand(b)}
                                className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-700 uppercase tracking-wider ${selectedBrand.id === b.id ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/10' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                            >
                                {b.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>


        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2 p-4 bg-black/40 backdrop-blur-xl border-l border-luxury-gold/30 transition-all duration-1000 hover:border-luxury-gold">
            <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold/60">Shoulder</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white/90">98%</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-black/40 backdrop-blur-xl border-l border-luxury-gold/30 transition-all duration-1000 hover:border-luxury-gold">
            <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold/60">Waist</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-white/90">94%</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 w-full">
          {/* Garment Carousel - Luxury Vertical Masonry Style */}
          <div className="flex overflow-x-auto px-8 py-8 gap-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
              {garments.map((item, i) => (
                <div
                    key={i}
                    className={`flex min-w-[160px] flex-col gap-4 rounded-xl p-3 transition-all duration-1000 group hover:-translate-y-2 cursor-pointer ${i === 0 ? 'bg-luxury-gold/5 border border-luxury-gold/40' : 'bg-black/40 backdrop-blur-xl border border-white/10 hover:border-luxury-gold/30'}`}
                >
                    <div className="overflow-hidden rounded-lg">
                        <div
                        className="aspect-[3/4] w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url("${item.img}")` }}
                        ></div>
                    </div>
                    <div className="px-2 pb-2 text-center">
                    <p className="truncate text-xs tracking-[0.1em] uppercase text-white/90 mb-1">{item.name}</p>
                    <p className="text-sm text-luxury-gold font-light">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 mt-8">
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-700">
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-luxury-gold/20 blur-2xl transition-all duration-1000 group-hover:bg-luxury-gold/40"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-luxury-gold bg-black/80 transition-all duration-700 group-hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border border-luxury-gold/30 transition-all duration-700 group-hover:border-luxury-gold">
                  <span className="material-symbols-outlined text-3xl text-luxury-gold/80 group-hover:text-luxury-gold transition-colors duration-700">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold">Capture</span>
              </div>
            </div>
            <button className="flex size-14 shrink-0 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-700">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
