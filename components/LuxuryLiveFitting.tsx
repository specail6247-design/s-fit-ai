"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Geist_Mono } from "next/font/google";
import { LuxuryImageDistortion } from "./ui/LuxuryImageDistortion";
import LuxuryCursor from "./ui/LuxuryCursor";

const cinzel = Cinzel({ subsets: ["latin"], display: 'swap' });
const geistMono = Geist_Mono({ subsets: ["latin"], display: 'swap' });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState({
    name: "AURA",
    description: "Elegance defined by twilight.",
    banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white ${geistMono.className}`}>
      <LuxuryCursor />

      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <div className="relative w-24 h-32">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133">
              <rect
                x="5" y="5" width="90" height="123"
                fill="none" stroke="#C9B037" strokeWidth="1"
                strokeDasharray="426" strokeDashoffset="426"
                className="animate-[dash_2s_ease-in-out_forwards]"
              />
            </svg>
            <style jsx global>{`
              @keyframes dash {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
        </div>
      ) : (
        <>
          {/* Brand Parallax Banner */}
          <div className="relative h-[30vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear hover:scale-110 saturate-[0.9] contrast-[1.1]"
              style={{ backgroundImage: `url(${selectedBrand.banner})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-[#0A0A0A]"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h1 className={`text-4xl tracking-[0.2em] text-[#F4E4BC] ${cinzel.className}`}>{selectedBrand.name}</h1>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/60">{selectedBrand.description}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-8 lg:flex-row lg:gap-16">
            {/* Main Visual */}
            <div className="flex-1 rounded-sm border border-white/10 p-2">
              <LuxuryImageDistortion
                imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Fitting"
              />
            </div>

            {/* Product List */}
            <div className="mt-8 flex flex-col gap-8 lg:mt-0 lg:w-[400px]">
              <h2 className={`text-2xl text-[#C9B037] ${cinzel.className}`}>Curated Collection</h2>

              <div className="flex flex-col gap-6">
                {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
                ].map((item, i) => (
                  <div key={i} className="group relative flex gap-6 border-b border-white/10 pb-6 transition-colors duration-700 hover:border-[#C9B037]/50 cursor-pointer">
                    <div className="h-32 w-24 shrink-0 overflow-hidden rounded-sm bg-white/5">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover saturate-[0.9] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h3 className={`text-lg tracking-wider text-white ${cinzel.className}`}>{item.name}</h3>
                      <p className="text-sm font-light tracking-widest text-[#F4E4BC]">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
