"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });

// Dummy Brand Data
const BRANDS = [
  {
    id: "gucci",
    name: "Gucci",
    bannerImage: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1000",
    description: "Italian luxury fashion house based in Florence, Italy."
  },
  {
    id: "prada",
    name: "Prada",
    bannerImage: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=1000",
    description: "Specializing in leather handbags, travel accessories, shoes, and ready-to-wear."
  }
];

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-[#F5F5F5] ${spaceGrotesk.className}`}>

      {/* Custom Gold Ring Cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full border border-[#C9B037] mix-blend-difference"
        style={{ width: 40, height: 40, top: mousePos.y - 20, left: mousePos.x - 20 }}
        animate={{ x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]"
          >
            {/* Sophisticated Loading Animation (Gold Line Tracing a Box) */}
            <div className="relative size-32">
              <svg viewBox="0 0 100 100" className="size-full">
                <motion.rect
                  x="10" y="10" width="80" height="80"
                  fill="none"
                  stroke="#C9B037"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
              <div className={`absolute inset-0 flex items-center justify-center text-[#C9B037] text-xs uppercase tracking-widest ${cinzel.className}`}>
                Loading
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Banner with Parallax */}
      <div className="relative h-1/3 w-full overflow-hidden shrink-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.3), rgba(10,10,10,0.8)), url(${selectedBrand.bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-4xl text-[#C9B037] uppercase tracking-widest ${cinzel.className}`}
          >
            {selectedBrand.name}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-2 text-sm max-w-md text-[#F5F5F5]/70"
          >
            {selectedBrand.description}
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-10 scrollbar-hide">

        {/* Brand Selector */}
        <div className="mb-10 flex justify-center gap-6">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className={`text-xs uppercase tracking-widest transition-colors duration-700 ${selectedBrand.id === brand.id ? 'text-[#C9B037] border-b border-[#C9B037] pb-1' : 'text-[#F5F5F5]/50 hover:text-[#F5F5F5]'}`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Masonry-Style Product Grid */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">

            {/* Main Product Card */}
            <div className="break-inside-avoid">
              <div className="flex flex-col gap-4">
                <div className="aspect-[3/4] w-full">
                  <LuxuryImageDistortion>
                    <div
                      className="size-full bg-cover bg-center"
                      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                    />
                  </LuxuryImageDistortion>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg text-[#F5F5F5] uppercase tracking-wider ${cinzel.className}`}>Aura Blazer</h3>
                    <p className="text-xs text-[#F5F5F5]/50 mt-1">Silk & Metallic Blend</p>
                  </div>
                  <p className="text-sm font-bold text-[#C9B037]">{formatPrice(12500)}</p>
                </div>
              </div>
            </div>

            {/* Additional Products */}
            {[
              { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", aspect: "aspect-square" },
              { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", aspect: "aspect-[4/5]" },
              { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", aspect: "aspect-[3/4]" },
            ].map((item, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex flex-col gap-4">
                  <div className={`${item.aspect} w-full`}>
                    <LuxuryImageDistortion>
                      <div
                        className="size-full bg-cover bg-center saturate-[.9] contrast-[1.1]"
                        style={{ backgroundImage: `url("${item.img}")` }}
                      />
                    </LuxuryImageDistortion>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-base text-[#F5F5F5] uppercase tracking-wider ${cinzel.className}`}>{item.name}</h3>
                    </div>
                    <p className="text-sm font-bold text-[#C9B037]">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>

    </div>
  );
}
