"use client";

import React, { useEffect, useState } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import LuxuryImageDistortion from "@/components/ui/LuxuryImageDistortion";
import { useStore } from "@/store/useStore";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Local brand details mapping
const BRAND_DETAILS: Record<string, { banner: string; description: string }> = {
  gucci: {
    banner: "https://images.unsplash.com/photo-1548622176-633857343516?auto=format&fit=crop&q=80&w=2000",
    description: "Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship."
  },
  chanel: {
    banner: "https://images.unsplash.com/photo-1541597455068-49e3562bdfa4?auto=format&fit=crop&q=80&w=2000",
    description: "A timeless classic. Chanel is the ultimate symbol of elegance and luxury."
  },
  tiffany: {
    banner: "https://images.unsplash.com/photo-1519445173368-246e4c2748e8?auto=format&fit=crop&q=80&w=2000",
    description: "Tiffany & Co. has been the world's premier jeweler and America's house of design since 1837."
  },
  default: {
     banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
     description: "Experience the epitome of luxury and style with our curated collection."
  }
};

const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(num)) return price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);
};

const LuxuryLoader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="relative size-32">
       <motion.svg className="size-full overflow-visible" viewBox="0 0 100 100">
          <motion.rect
            x="0" y="0" width="100" height="100"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
       </motion.svg>
       <div className="absolute inset-0 flex items-center justify-center">
         <span className={`${cinzel.className} text-[10px] tracking-[0.3em] text-[#D4AF37] animate-pulse`}>LOADING</span>
       </div>
    </div>
  </div>
);

export default function LuxuryLiveFitting() {
  const { selectedBrand } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const brandInfo = selectedBrand && BRAND_DETAILS[selectedBrand.toLowerCase()]
    ? BRAND_DETAILS[selectedBrand.toLowerCase()]
    : BRAND_DETAILS.default;

  return (
    <div className={`relative flex h-screen w-full cursor-none flex-col overflow-hidden bg-[#0a0a0a] text-[#D4AF37] ${playfair.className}`}>
      <LuxuryCursor />

      {/* Brand Banner Background Parallax Effect */}
      <div
        className="absolute inset-0 z-0 opacity-20 transition-all duration-[2000ms] ease-in-out"
        style={{
            backgroundImage: `url('${brandInfo.banner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%) contrast(120%)"
        }}
      />

      {/* Main Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col z-10"
        data-alt="User reflection with Luxury garment overlay"
      >
        {/* Ambient Gold Glow & Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_120%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/90" />

        {/* Top Navigation Bar - Minimalist */}
        <div className="z-10 flex items-center justify-between p-8">
          <button className="group flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 transition-all duration-700 hover:border-[#D4AF37] hover:bg-black/60">
            <span className="material-symbols-outlined text-[#D4AF37] opacity-80 group-hover:opacity-100">close</span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <h2 className={`${cinzel.className} text-3xl font-bold tracking-[0.2em] uppercase text-[#D4AF37]`}>
              {selectedBrand ? selectedBrand : 'S_FIT'} <span className="font-thin text-white">LUXE</span>
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            {/* Brand Description */}
             <motion.p
                key={brandInfo.description}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-md text-center text-[10px] tracking-widest text-white/60"
            >
                {brandInfo.description}
            </motion.p>
          </div>

          <button className="group flex size-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 transition-all duration-700 hover:border-[#D4AF37] hover:bg-black/60">
            <span className="material-symbols-outlined text-[#D4AF37] opacity-80 group-hover:opacity-100">flash_on</span>
          </button>
        </div>

        {/* Upper HUD: Refined Status */}
        <div className="absolute left-8 top-32 z-10 flex flex-col gap-6">
          <div className="group flex items-center gap-4 rounded-sm border-l-2 border-[#D4AF37] bg-black/40 p-4 backdrop-blur-md transition-all duration-1000 hover:bg-black/60">
             <div className="flex flex-col gap-1">
                <p className={`${cinzel.className} text-xs font-bold uppercase tracking-widest text-white/80`}>Stability</p>
                <div className="flex items-center gap-2">
                    <div className="h-[1px] w-24 bg-white/20">
                        <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: "95%" }}></div>
                    </div>
                    <span className="text-xs text-[#D4AF37]">95%</span>
                </div>
             </div>
          </div>
        </div>

        {/* Floating Stats - Minimal Vertical Layout */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-8">
          {[
            { label: "Shoulder", value: "98%" },
            { label: "Waist", value: "94%" },
            { label: "Hem Line", value: "100%" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-end gap-1 transition-all duration-700 hover:translate-x-[-5px]">
              <p className={`${cinzel.className} text-[10px] font-bold uppercase tracking-[0.2em] text-white/60`}>{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-thin text-[#D4AF37]">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Product Visual - Distortion Effect & Loading State */}
        <div className="absolute bottom-32 right-12 z-0 w-80 h-[28rem]">
             <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full flex items-center justify-center bg-black/20 backdrop-blur-sm border border-[#D4AF37]/10"
                    >
                        <LuxuryLoader />
                    </motion.div>
                ) : (
                    <LuxuryImageDistortion
                        key="product"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                        alt="Active Luxury Item"
                        className="h-full w-full rounded-sm border border-[#D4AF37]/20 shadow-2xl shadow-black/50"
                    />
                )}
             </AnimatePresence>
        </div>

        {/* Bottom UI Section - Masonry / Vertical Cards */}
        <div className="mt-auto z-10 w-full bg-gradient-to-t from-black via-black/90 to-transparent pb-12 pt-24">

          {/* Garment Selector - More Spacious */}
          <div className="mb-10 flex justify-center overflow-x-auto px-8 py-4 scrollbar-hide">
            <div className="flex items-end gap-8">
               {/* Selected Item */}
              <div className="relative flex flex-col gap-4">
                <div className="relative h-72 w-56 overflow-hidden rounded-sm border border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
                        className="size-full object-cover opacity-90"
                        alt="Selected"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <p className={`${cinzel.className} text-xl text-white drop-shadow-md`}>Aura Blazer</p>
                        <p className="font-serif text-lg italic text-[#D4AF37]">{formatPrice(2400)}</p>
                    </div>
                </div>
                <div className="mx-auto h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              </div>

              {/* Other Items */}
              {[
                  { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
              ].map((item, i) => (
                <div key={i} className="group relative h-56 w-40 cursor-pointer overflow-hidden rounded-sm opacity-50 transition-all duration-700 hover:h-64 hover:opacity-100 border border-white/5 hover:border-[#D4AF37]/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.img}
                        className="size-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        alt={item.name}
                    />
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:bg-transparent" />
                    <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <p className={`${cinzel.className} text-xs text-white`}>{item.name}</p>
                        <p className="text-[10px] text-[#D4AF37]">{formatPrice(item.price)}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls - Elegant */}
          <div className="flex items-center justify-center gap-16">
            <button className="flex size-16 items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-700 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10">
              <span className="material-symbols-outlined text-white/60 transition-colors hover:text-[#D4AF37]">photo_library</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
              <button className="relative flex size-28 items-center justify-center rounded-full border-[1px] border-[#D4AF37] bg-black transition-transform duration-1000 hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <div className="h-[92%] w-[92%] rounded-full border border-white/10 bg-gradient-to-br from-[#D4AF37] to-[#5e4b10] shadow-inner"></div>
                <span className="absolute text-black/80 material-symbols-outlined text-5xl">camera</span>
              </button>
            </div>

            <button className="flex size-16 items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-700 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10">
              <span className="material-symbols-outlined text-white/60 transition-colors hover:text-[#D4AF37]">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
