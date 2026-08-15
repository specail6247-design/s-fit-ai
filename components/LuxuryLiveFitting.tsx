"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { useStore } from "@/store/useStore";
import { brands } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock LuxuryImageDistortion
const LuxuryImageDistortion = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <motion.div
      initial={{ scale: 1.1, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${src}')` }}
    />
  </div>
);

export default function LuxuryLiveFitting() {
  const { selectedBrand } = useStore();
  const brand = brands.find((b) => b.id === selectedBrand);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-[#F4E4BC] cursor-custom ${playfair.className}`}>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          >
            <div className="relative size-32">
              {/* Thin gold line tracing a box */}
              <motion.div
                className="absolute inset-0 border border-[#C9B037]/30"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={{ clipPath: ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[#C9B037] font-bold tracking-widest text-xs uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              >
                Loading
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main AR Viewport Container */}
      <div className="relative flex h-screen w-full flex-col">

        {/* Brand Parallax Background */}
        {brand && brand.bannerImage && (
          <LuxuryImageDistortion
            src={brand.bannerImage}
            alt={`${brand.name} banner`}
            className="absolute inset-0 opacity-40 mix-blend-overlay"
          />
        )}

        {/* Default Background if no brand */}
        {(!brand || !brand.bannerImage) && (
          <div
            className="absolute inset-0"
            style={{
                backgroundImage: "linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
          />
        )}

        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-40"
            style={{
                background: "linear-gradient(90deg, transparent, #C9B037, transparent)",
                boxShadow: "0 0 20px #C9B037"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700"
          >
            <span className="material-symbols-outlined text-[#F4E4BC] font-light">close</span>
          </motion.div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-normal tracking-[0.3em] uppercase text-[#C9B037] drop-shadow-md">
              {brand ? brand.name : "Live Fit"}
            </h2>
            {brand && brand.description && (
              <p className="text-[10px] uppercase tracking-widest text-white/50 max-w-[200px] text-center truncate">
                {brand.description}
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700"
          >
            <span className="material-symbols-outlined text-[#F4E4BC] font-light">flash_on</span>
          </motion.div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-8 space-y-6 px-8 z-10 flex flex-col items-center">
          <div className="w-[300px] rounded-2xl p-6 border border-white/5 bg-[#0a0a0a]/30 backdrop-blur-2xl transition-all duration-1000">
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-[#F4E4BC]">Alignment</p>
                <p className="text-sm font-normal tracking-wider text-[#C9B037]">95%</p>
              </div>
              <div className="h-[2px] w-full overflow-hidden bg-white/5">
                <div className="h-full bg-gradient-to-r from-[#C9B037]/20 to-[#C9B037]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center justify-center gap-2 text-[9px] font-light uppercase tracking-[0.3em] text-[#F4E4BC]/50 mt-2">
                <span className="material-symbols-outlined text-[12px]">filter_center_focus</span>
                Aesthetic Lock
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl"
          >
            <p className="text-[9px] font-light uppercase tracking-[0.2em] text-[#F4E4BC]/60">Drape</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#C9B037]">98%</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl"
          >
            <p className="text-[9px] font-light uppercase tracking-[0.2em] text-[#F4E4BC]/60">Silhouette</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#C9B037]">94%</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex min-w-[140px] flex-col gap-2 rounded-xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl"
          >
            <p className="text-[9px] font-light uppercase tracking-[0.2em] text-[#F4E4BC]/60">Hem Line</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#C9B037]">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#C9B037] ml-auto">check</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-12 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent pt-20">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-8 py-6 scrollbar-hide gap-8" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>

            {/* Selected Garment */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex min-w-[180px] flex-col gap-4 rounded-2xl border border-[#C9B037]/30 bg-[#0a0a0a]/60 p-3 backdrop-blur-2xl transition-all duration-700"
            >
              <div
                className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-inner grayscale-[20%]"
                data-alt="Luxury blue blazer thumbnail"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              ></div>
              <div className="px-2 pb-2 text-center">
                <p className="truncate text-xs font-normal uppercase tracking-[0.15em] text-[#F4E4BC] mb-1">Aura Blazer</p>
                <p className="text-sm font-light text-[#C9B037] tracking-widest">$2,400</p>
              </div>
            </motion.div>

            {/* Other Garments */}
            {[
                { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, opacity: 1 }}
                className="flex min-w-[180px] flex-col gap-4 rounded-2xl p-3 opacity-60 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700"
              >
                  <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat grayscale-[40%]"
                  style={{ backgroundImage: `url("${item.img}")` }}
                  ></div>
                  <div className="px-2 pb-2 text-center">
                  <p className="truncate text-xs font-normal uppercase tracking-[0.15em] text-[#F4E4BC]/80 mb-1">{item.name}</p>
                  <p className="text-sm font-light text-[#C9B037]/70 tracking-widest">{item.price}</p>
                  </div>
              </motion.div>
            ))}
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-16 p-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#F4E4BC] border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700"
            >
              <span className="material-symbols-outlined font-light">photo_library</span>
            </motion.button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9B037]/10 blur-2xl"></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#C9B037]/50 bg-transparent transition-all duration-700"
              >
                <div className="flex size-[4.5rem] items-center justify-center rounded-full bg-[#C9B037]">
                  <span className="material-symbols-outlined text-3xl text-[#0a0a0a]">camera</span>
                </div>
              </motion.button>
              <div className="absolute -bottom-8 flex flex-col items-center">
                <span className="text-[9px] font-light uppercase tracking-[0.4em] text-[#C9B037]">Capture</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex size-14 shrink-0 items-center justify-center rounded-full text-[#F4E4BC] border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700"
            >
              <span className="material-symbols-outlined font-light">refresh</span>
            </motion.button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-4 h-[2px] w-24 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
