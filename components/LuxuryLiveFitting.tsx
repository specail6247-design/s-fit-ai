"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { motion } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ecab13] pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: position.x - 16, y: position.y - 16 }}
      transition={{ type: "spring", stiffness: 100, damping: 25, mass: 0.1 }}
    />
  );
};

// Sophisticated Loading Animation
const LuxuryLoader = () => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
    <div className="relative w-32 h-48 border border-white/10 overflow-hidden">
        <motion.div
            className="absolute top-0 left-0 h-px bg-[#ecab13]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
            className="absolute top-0 right-0 w-px bg-[#ecab13]"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.25 }}
        />
        <motion.div
            className="absolute bottom-0 right-0 h-px bg-[#ecab13]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.div
            className="absolute bottom-0 left-0 w-px bg-[#ecab13]"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.75 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
             <span className={`${cinzel.className} text-[#ecab13] text-xs tracking-[0.3em] uppercase animate-pulse`}>Loading</span>
        </div>
    </div>
  </div>
);

const BRAND_INFO = {
    name: "Gucci",
    description: "Florence, 1921. An expression of Italian craftsmanship and imaginative innovation.",
    bannerImage: "https://images.unsplash.com/photo-1540200049848-d9813ea0e120?auto=format&fit=crop&q=80&w=2000"
};

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <div className={`relative flex min-h-screen w-full flex-col bg-black text-white ${playfair.className} cursor-none overflow-x-hidden`}>
      <CustomCursor />
      {isLoading && <LuxuryLoader />}

      {/* Main Container with 2-Column Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full">

        {/* Left Viewport - Luxury Image Distortion */}
        <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 border-r border-white/10">
          <LuxuryImageDistortion
             imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
             className="w-full h-full"
          />

          {/* Top Navigation Overlay */}
          <div className="absolute top-0 w-full z-10 flex items-center justify-between p-8">
            <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#ecab13] transition-colors duration-700">
              <span className="material-symbols-outlined text-white font-light">close</span>
            </button>
            <div className="flex flex-col items-center">
              <h2 className={`${cinzel.className} text-xl font-medium tracking-[0.2em] text-[#ecab13]`}>S_FIT</h2>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">Live Fit AI</span>
            </div>
            <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#ecab13] transition-colors duration-700">
              <span className="material-symbols-outlined text-white font-light">tune</span>
            </button>
          </div>

           {/* Capture Controls Overlay */}
           <div className="absolute bottom-12 w-full z-10 flex items-center justify-center gap-12">
            <button className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white transition-colors duration-700">
              <span className="material-symbols-outlined font-light">photo_library</span>
            </button>

            <button className="group relative flex size-24 items-center justify-center rounded-full border border-white/30 hover:border-[#ecab13] transition-all duration-1000 bg-black/20 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-[#ecab13]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="flex size-20 items-center justify-center rounded-full border border-white/50 group-hover:border-[#ecab13] transition-colors duration-1000">
                  <span className="material-symbols-outlined text-3xl font-light group-hover:text-[#ecab13] transition-colors duration-700">camera</span>
                </div>
            </button>

            <button className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white transition-colors duration-700">
              <span className="material-symbols-outlined font-light">refresh</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar - Brand Info & Masonry Products */}
        <div className="w-full lg:w-1/2 flex flex-col bg-black">

            {/* Brand Experience Banner */}
            <div className="relative h-64 lg:h-80 w-full overflow-hidden border-b border-white/10">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${BRAND_INFO.bannerImage})` }}
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                    <h1 className={`${cinzel.className} text-4xl lg:text-5xl font-bold tracking-widest text-[#ecab13] mb-4`}>{BRAND_INFO.name}</h1>
                    <p className="text-sm lg:text-base text-white/80 leading-relaxed max-w-md font-light italic">{BRAND_INFO.description}</p>
                </div>
            </div>

            {/* Masonry Product List */}
            <div className="flex-1 p-8 lg:p-12 bg-[#050505]">
                <div className="flex items-center justify-between mb-10">
                    <h3 className={`${cinzel.className} text-lg tracking-[0.2em] uppercase text-white/90`}>Collection</h3>
                    <span className="text-xs tracking-widest text-white/50 uppercase">6 Items</span>
                </div>

                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                    {[
                        { name: "Aura Silk Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0", aspect: "aspect-[3/4]" },
                        { name: "Metallic Evening Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", aspect: "aspect-[2/3]" },
                        { name: "Leather Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", aspect: "aspect-[4/5]" },
                        { name: "Tech Trench Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", aspect: "aspect-square" },
                        { name: "Velvet Tuxedo", price: 2850, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E", aspect: "aspect-[3/4]" },
                    ].map((item, i) => (
                        <div key={i} className="group relative break-inside-avoid cursor-pointer">
                            <div className={`w-full ${item.aspect} overflow-hidden bg-[#111] mb-4`}>
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    style={{ backgroundImage: `url("${item.img}")` }}
                                ></div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                   <button className="px-6 py-3 border border-[#ecab13] text-[#ecab13] text-xs tracking-widest uppercase bg-black/40 backdrop-blur-sm hover:bg-[#ecab13] hover:text-black transition-colors duration-500">
                                       Try On
                                   </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 px-1">
                                <h4 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors duration-700">{item.name}</h4>
                                <p className="text-sm font-light text-[#ecab13]">{formatPrice(item.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
