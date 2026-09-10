"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import LuxuryImageDistortion from "./ui/LuxuryImageDistortion";
import CustomCursor from "./ui/CustomCursor";

const cinzel = Cinzel({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`relative flex h-screen w-full items-center justify-center bg-black ${cinzel.className}`}>
        <div className="relative w-48 h-64 overflow-hidden border border-[#C9B037]/20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C9B037] transform origin-left animate-[loadingLine_2s_ease-in-out_infinite]" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-[#C9B037] transform origin-top animate-[loadingLineVertical_2s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#C9B037] transform origin-right animate-[loadingLine_2s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#C9B037] transform origin-bottom animate-[loadingLineVertical_2s_ease-in-out_infinite_1.5s]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-[#C9B037] text-sm uppercase tracking-[0.3em]">Loading</span>
          </div>
        </div>
        <style jsx global>{`
          @keyframes loadingLine {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(1); }
            100% { transform: scaleX(0); transform-origin: right; }
          }
          @keyframes loadingLineVertical {
            0% { transform: scaleY(0); }
            50% { transform: scaleY(1); }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${spaceGrotesk.className} cursor-none`}>
      <CustomCursor />

      {/* Main AR Viewport Container with LuxuryImageDistortion */}
      <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
      </div>

      {/* Top Navigation Bar */}
      <div className="z-10 flex items-center justify-between p-8">
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037]/50 cursor-none">
          <span className="material-symbols-outlined text-white font-light">close</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className={`text-xl font-medium tracking-[0.2em] uppercase text-white ${cinzel.className}`}>Balenciaga</h2>
          <span className="text-[10px] uppercase tracking-widest text-white/50 mt-1">Live Fitting</span>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#C9B037]/50 cursor-none">
          <span className="material-symbols-outlined text-white font-light">tune</span>
        </div>
      </div>

      {/* Brand Description (Parallax effect placeholder) */}
      <div className="absolute top-32 left-8 z-10 max-w-xs animate-fade-in-up">
        <p className={`text-sm leading-relaxed text-white/70 ${spaceGrotesk.className} font-light`}>
          Experience the latest Fall/Winter collection. Precision-tailored to your measurements.
        </p>
      </div>

      {/* Floating Fit Stats Sidebar (Right) - Simplified & Elegant */}
      <div className="absolute right-8 top-1/3 z-10 flex flex-col gap-6">
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Shoulder</p>
          <div className="flex items-baseline gap-2">
             <span className={`text-2xl font-light text-[#C9B037] ${cinzel.className}`}>98%</span>
          </div>
        </div>
        <div className="h-[1px] w-12 bg-white/10 self-end"></div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Waist</p>
          <div className="flex items-baseline gap-2">
             <span className={`text-2xl font-light text-white ${cinzel.className}`}>94%</span>
          </div>
        </div>
      </div>

      {/* Bottom UI Section */}
      <div className="mt-auto pb-12 z-10 w-full px-8">
        {/* Garment Carousel - Masonry/Vertical style conceptually, applied horizontally here for space */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>

            {/* Active Item */}
            <div className="flex min-w-[160px] flex-col gap-4 transition-all duration-1000 transform hover:scale-105 cursor-none">
              <div
                className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat border border-[#C9B037]/30 shadow-2xl"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
              >
                  <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                     <div className="w-full">
                        <p className={`truncate text-sm tracking-wider uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                        <p className="text-xs tracking-widest text-[#C9B037] mt-1">{formatPrice(2400)}</p>
                     </div>
                  </div>
              </div>
            </div>

            {[
                { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                { name: "Moto Jacket", price: 1800, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <div key={i} className="flex min-w-[140px] flex-col gap-4 opacity-50 transition-all duration-1000 transform hover:opacity-100 hover:scale-105 cursor-none">
                  <div
                  className="aspect-[3/4] w-full rounded-sm bg-cover bg-center bg-no-repeat border border-white/10"
                  style={{ backgroundImage: `url("${item.img}")` }}
                  >
                      <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <div className="w-full">
                            <p className={`truncate text-xs tracking-wider uppercase text-white ${cinzel.className}`}>{item.name}</p>
                            <p className="text-[10px] tracking-widest text-white/50 mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                  </div>
              </div>
            ))}
        </div>

        {/* Capture Controls - Minimalist */}
        <div className="flex items-center justify-center gap-16 mt-4">
          <button className="text-white/50 hover:text-white transition-colors duration-700 cursor-none">
            <span className="material-symbols-outlined font-light text-3xl">photo_camera_back</span>
          </button>

          <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition-all duration-1000 hover:border-[#C9B037] hover:bg-[#C9B037]/10 cursor-none group">
             <div className="size-16 rounded-full border border-white/10 group-hover:border-[#C9B037]/50 transition-colors duration-1000 flex items-center justify-center">
                <div className="size-2 bg-white rounded-full group-hover:bg-[#C9B037] transition-colors duration-1000"></div>
             </div>
          </button>

          <button className="text-white/50 hover:text-white transition-colors duration-700 cursor-none">
            <span className="material-symbols-outlined font-light text-3xl">flip_camera_ios</span>
          </button>
        </div>
      </div>
    </div>
  );
}
