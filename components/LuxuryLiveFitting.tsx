"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cinzel, Space_Grotesk } from "next/font/google";
import CustomCursor from "./ui/CustomCursor";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Mock Luxury Data
const PRODUCTS = [
    {
        id: 1,
        name: "Aura Blazer",
        price: 2400,
        brand: "Hermès",
        description: "Structured silhouette with metallic liquid silk finish.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0"
    },
    {
        id: 2,
        name: "Ethereal Gown",
        price: 12500,
        brand: "Versace",
        description: "Hand-draped chiffon with 24k gold thread embroidery.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0"
    },
    {
        id: 3,
        name: "Obsidian Jacket",
        price: 4800,
        brand: "Balenciaga",
        description: "Distressed architectural leather with silver hardware.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA"
    },
    {
        id: 4,
        name: "Cyber Coat",
        price: 6500,
        brand: "Prada",
        description: "Tech-nylon trench with responsive LED weave.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk"
    },
];

export default function LuxuryLiveFitting() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial reveal
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProductSelect = (product: typeof PRODUCTS[0]) => {
      if (product.id === selectedProduct.id) return;
      setIsLoading(true);
      setTimeout(() => {
          setSelectedProduct(product);
          setIsLoading(false);
      }, 800);
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white ${spaceGrotesk.className}`}>
      <CustomCursor />

      {/* Background & Main Visual */}
      <div className="absolute inset-0 z-0">
         <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
            <LuxuryImageDistortion imageUrl={selectedProduct.img} />
         </div>
         {/* Vignette & Gradients */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
         <div className="grain-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Loading Overlay (Gold Trace) */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="relative size-32">
                <div className="absolute inset-0 border border-[#D4AF37]/20" />
                <svg className="absolute inset-0 size-full animate-[spin_3s_linear_infinite]">
                    <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="100 200" />
                </svg>
            </div>
        </div>
      )}

      {/* Main Content Layer */}
      <div className={`relative z-10 flex h-full flex-col p-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className={`${cinzel.className} text-xl tracking-[0.2em] text-[#D4AF37]`}>S_FIT <span className="text-white">LUXE</span></h2>
                <div className="h-[1px] w-12 bg-[#D4AF37] mt-2" />
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-colors hover:bg-white/10 hover:border-[#D4AF37]">
                <span className="material-symbols-outlined text-white">close</span>
            </button>
        </div>

        {/* Center/Left Info Block */}
        <div className="mt-auto mb-10 max-w-md space-y-6">
            <div className="space-y-2">
                <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase opacity-0 animate-[fadeIn_1s_0.5s_forwards]">{selectedProduct.brand}</p>
                <h1 className={`${cinzel.className} text-5xl text-white leading-tight opacity-0 animate-[fadeIn_1s_0.7s_forwards]`}>
                    {selectedProduct.name}
                </h1>
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs opacity-0 animate-[fadeIn_1s_0.9s_forwards]">
                    {selectedProduct.description}
                </p>
            </div>

            <div className="flex items-center gap-6 opacity-0 animate-[fadeIn_1s_1.1s_forwards]">
                <p className={`${cinzel.className} text-3xl text-[#D4AF37]`}>
                    {selectedProduct.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('.00', '')}
                </p>
                <button className="group flex items-center gap-3 bg-[#D4AF37] px-8 py-3 text-[#050505] transition-all hover:bg-white hover:pl-10">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Try On</span>
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
            </div>
        </div>

        {/* Right Product Selector (Masonry/Vertical) */}
        <div className="absolute right-0 top-0 bottom-0 z-20 w-48 flex flex-col justify-center gap-8 p-6 bg-gradient-to-l from-[#050505] to-transparent">
            {PRODUCTS.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleProductSelect(item)}
                    className={`
                        group relative aspect-[3/4] w-full cursor-pointer overflow-hidden border transition-all duration-700
                        ${selectedProduct.id === item.id
                            ? 'border-[#D4AF37] scale-100 opacity-100 shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                            : 'border-white/10 scale-90 opacity-40 hover:opacity-80 hover:scale-95 hover:border-white/30'
                        }
                    `}
                >
                    <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        unoptimized
                    />
                    {selectedProduct.id !== item.id && (
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    )}
                </div>
            ))}
        </div>

      </div>

      <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
