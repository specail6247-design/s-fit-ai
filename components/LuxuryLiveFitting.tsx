"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";

// Mock data
interface LuxuryItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  img: string;
  description: string;
}

const luxuryItems: LuxuryItem[] = [
  {
    id: 1,
    name: "Aura Blazer",
    brand: "Gucci",
    price: 2400,
    currency: "USD",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0",
    description: "A statement piece featuring sharp tailoring and a luxurious wool-silk blend. Perfect for the modern executive."
  },
  {
    id: 2,
    name: "Silk Gown",
    brand: "Versace",
    price: 3100,
    currency: "USD",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0",
    description: "Flowing silhouette with the iconic Medusa print. Crafted from the finest Italian silk."
  },
  {
    id: 3,
    name: "Moto Jacket",
    brand: "Balmain",
    price: 1800,
    currency: "USD",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA",
    description: "Edgy yet sophisticated, this structured leather jacket features signature gold buttons."
  },
  {
    id: 4,
    name: "Tech Coat",
    brand: "Prada",
    price: 4500,
    currency: "USD",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk",
    description: "Innovation meets tradition. Re-nylon gabardine fabric offering water resistance and style."
  },
];

const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(price);
};

export default function LuxuryLiveFitting() {
  const [selectedItem, setSelectedItem] = useState(luxuryItems[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemSelect = (item: LuxuryItem) => {
    setSelectedItem(item);
    setIsLoading(true);
  };

  // Simulate loading on item change
  useEffect(() => {
      if (isLoading) {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
      }
  }, [isLoading]);

  const fontStyle = { fontFamily: 'var(--font-cinzel), serif' };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#f5f5f5]">
      <CustomCursor />

      {/* Main Viewport Container */}
      <div className="relative flex h-full w-full">

        {/* Background / Main Visual with Distortion */}
        <div className="absolute inset-0 z-0">
             <LuxuryImageDistortion imageUrl={selectedItem.img} />
             <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 w-full z-20 flex items-center justify-between p-8">
          <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] cursor-none">
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 style={fontStyle} className="text-2xl font-bold tracking-[0.2em] uppercase text-[#D4AF37]">S_FIT LUXE</h2>
            <div className="h-[1px] w-12 bg-[#D4AF37] mt-2"></div>
          </div>
          <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-all hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] cursor-none">
             <span className="material-symbols-outlined text-white">shopping_bag</span>
          </div>
        </div>

        {/* Left Side: Brand Experience & Info */}
        <div className="relative z-10 flex w-[40%] flex-col justify-center px-16 space-y-10">
            {isLoading ? (
                 <div className="h-[300px] w-full flex items-center justify-center">
                     <div className="relative size-32">
                         <div className="absolute inset-0 border border-white/10"></div>
                         <div className="absolute inset-0 border-t-2 border-[#D4AF37] animate-[spin_2s_linear_infinite]"></div>
                     </div>
                 </div>
            ) : (
                <div className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                        <p className="text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">Collection 2024</p>
                    </div>

                    <div>
                        <h1 style={fontStyle} className="text-7xl text-white leading-[0.9] mb-2">
                            {selectedItem.brand}
                        </h1>
                        <p style={fontStyle} className="text-4xl text-white/80 italic font-light">
                            {selectedItem.name}
                        </p>
                    </div>

                    <p className="text-sm font-light text-white/70 max-w-md leading-relaxed border-l-2 border-[#D4AF37]/30 pl-4">
                        {selectedItem.description}
                    </p>

                    <div className="pt-4 flex items-center gap-8">
                        <p style={fontStyle} className="text-4xl text-[#D4AF37]">
                            {formatPrice(selectedItem.price, selectedItem.currency)}
                        </p>
                        <button className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-500 cursor-none">
                            Virtual Try-On
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Right Side: Vertical Product List (Masonry-ish) */}
        <div className="relative z-10 flex w-[30%] ml-auto h-full flex-col justify-center pr-12">
            <div className="flex flex-col gap-8 overflow-y-auto max-h-[85vh] pr-4 scrollbar-hide py-10 items-end">
                {luxuryItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        className={`group relative w-[280px] cursor-none transition-all duration-1000 ${selectedItem.id === item.id ? 'scale-110 opacity-100' : 'scale-90 opacity-40 hover:opacity-80 hover:scale-95'}`}
                    >
                        <div className={`aspect-[3/4] w-full relative overflow-hidden border transition-colors duration-500 ${selectedItem.id === item.id ? 'border-[#D4AF37]' : 'border-white/10'}`}>
                             <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                             />
                        </div>

                        {/* Selected Indicator Line */}
                         <div className={`absolute -left-6 top-1/2 h-[1px] bg-[#D4AF37] transition-all duration-700 ${selectedItem.id === item.id ? 'w-6' : 'w-0'}`}></div>

                        <div className="absolute bottom-4 left-4 z-10">
                            <p style={fontStyle} className="text-lg text-white drop-shadow-md">{item.brand}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Loading / Status Overlay (Footer) */}
        <div className="absolute bottom-8 left-16 right-16 flex items-center justify-between z-10 pointer-events-none">
             <div className="flex items-center gap-4">
                 <div className="h-[1px] w-24 bg-white/20"></div>
                 <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Powered by S_FIT AI Engine</span>
             </div>
        </div>

      </div>
    </div>
  );
}
