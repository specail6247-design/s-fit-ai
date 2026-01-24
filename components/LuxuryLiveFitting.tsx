"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import LuxuryImageDistortion from "@/components/ui/LuxuryImageDistortion";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Mock Data
const BRANDS = [
  {
    id: 1,
    name: "Maison De Luxe",
    description: "Elegance redefined for the modern era. Handcrafted in Milan.",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    products: [
        { id: 1, name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
        { id: 2, name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
        { id: 3, name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
        { id: 4, name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
    ]
  }
];

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [selectedProduct, setSelectedProduct] = useState(BRANDS[0].products[0]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-[#D4AF37] ${playfair.className}`}>
      <LuxuryCursor />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
            <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                <div className="relative size-32">
                    <motion.svg width="128" height="128" viewBox="0 0 128 128">
                        <motion.rect
                            x="4" y="4" width="120" height="120"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </motion.svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase animate-pulse">Loading</p>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="relative flex h-full w-full flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      >
          {/* Background / Main Viewport */}
          <div
            className="absolute inset-0 -z-20"
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
          />

        {/* Brand Banner (Parallax Hint) */}
        <div className="absolute top-0 left-0 w-full h-[40vh] -z-10 pointer-events-none opacity-40 mix-blend-overlay">
             <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedBrand.banner})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-8 pt-10">
          <button className="flex size-14 items-center justify-center rounded-full transition-all duration-700 hover:scale-105 group" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-[#D4AF37] group-hover:rotate-90 transition-transform duration-700">close</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-[#D4AF37] text-shadow-gold">{selectedBrand.name}</h2>
            <p className="text-[10px] tracking-widest text-white/60 uppercase mt-1 opacity-0 animate-fadeIn delay-1000">{selectedBrand.description}</p>
          </div>

          <button className="flex size-14 items-center justify-center rounded-full transition-all duration-700 hover:scale-105 hover:bg-[#D4AF37]/10" style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
            <span className="material-symbols-outlined text-[#D4AF37]">flash_on</span>
          </button>
        </div>

        {/* Scanning Effect */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-30 pointer-events-none"
            style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 30px #D4AF37"
            }}
        ></div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-8 top-1/4 z-10 flex flex-col gap-8">
            {["Shoulder", "Waist", "Hem Line"].map((stat, i) => (
                <div key={i} className="flex min-w-[160px] flex-col gap-2 rounded-sm p-5 transition-all duration-700 hover:bg-black/60 group cursor-default" style={{ background: "rgba(5, 5, 5, 0.5)", backdropFilter: "blur(16px)", borderLeft: "1px solid rgba(212, 175, 55, 0.3)" }}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 group-hover:text-[#D4AF37] transition-colors">{stat}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-700">Perfect</span>
                        <span className="material-symbols-outlined text-sm text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">check_circle</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Bottom UI Section - Vertical Product List on Left */}
        <div className="absolute left-10 bottom-12 top-1/3 z-20 w-[320px] flex flex-col gap-6">
             <div className="flex items-center gap-2 mb-2">
                 <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                 <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Collection</span>
             </div>

             <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-8 pb-32 mask-image-b">
                 {selectedBrand.products.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedProduct(item)}
                        className={`relative w-full transition-all duration-1000 cursor-pointer group ${selectedProduct.id === item.id ? 'opacity-100 scale-100' : 'opacity-50 scale-95 hover:opacity-80'}`}
                    >
                        <div className={`relative aspect-[3/4] w-full overflow-hidden border ${selectedProduct.id === item.id ? 'border-[#D4AF37]' : 'border-transparent'}`}>
                             {/* Use LuxuryImageDistortion for active or all items */}
                             <LuxuryImageDistortion
                                src={item.img}
                                alt={item.name}
                                className="h-full w-full"
                             />
                        </div>

                        <div className="mt-4 flex flex-col items-start">
                            <p className={`font-serif text-xl italic transition-colors duration-500 ${selectedProduct.id === item.id ? 'text-white' : 'text-white/60'}`}>{item.name}</p>
                            <p className="text-xs font-bold text-[#D4AF37] tracking-widest mt-1">{formatPrice(item.price)}</p>
                        </div>
                    </div>
                 ))}
             </div>
        </div>

        {/* Capture Controls - Centered Bottom */}
        <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-20">
            <button className="group flex flex-col items-center gap-2 transition-all duration-700 hover:scale-110">
                 <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10">
                    <span className="material-symbols-outlined text-white/80 group-hover:text-[#D4AF37]">photo_library</span>
                 </div>
                 <span className="text-[9px] uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all">Gallery</span>
            </button>

            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 transition-all duration-1000 group-hover:scale-150 opacity-20 rounded-full bg-[#D4AF37] blur-3xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/60 backdrop-blur-xl transition-all duration-700 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10">
                <div className="size-20 rounded-full border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-90 transition-transform duration-700">
                    <span className="material-symbols-outlined text-4xl text-[#D4AF37] group-hover:text-white transition-colors">camera</span>
                </div>
              </button>
            </div>

            <button className="group flex flex-col items-center gap-2 transition-all duration-700 hover:scale-110">
                 <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10">
                    <span className="material-symbols-outlined text-white/80 group-hover:text-[#D4AF37]">refresh</span>
                 </div>
                 <span className="text-[9px] uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all">Reset</span>
            </button>
        </div>

        {/* System UI Safe Area */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-24 rounded-full bg-[#D4AF37]/30"></div>
      </motion.div>
    </div>
  );
}
